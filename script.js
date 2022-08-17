/*
	
  Խաղի նպատակն է զամբյուղի մեջ հավաքել ձվերը, ընդ որում
  - յուրաքանչյուր հասարակ ձվի համար ստանում եք +1,
  - յուրաքանչյուր ոսկե ձվի համար ստանում եք +3,
  - յուրաքանրյուր սև ձվի համար ստանում եք -2։
  
  Խաղը ավարտվում է, երբ հավաքում եք 20 միավոր (հաղթում եք),
  կամ երբ միավորների քանակը հասնում է -5 (պարտվում եք)։
  
*/

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImage = document.createElement("img");
backgroundImage.src = "https://cdnb.artstation.com/p/assets/images/images/002/268/125/large/razmig-mavlian-chickencoopbackground-all.jpg?1459518171";

const heroImage = document.createElement("img");
heroImage.src = "https://pngicon.ru/file/uploads/2_23.png";

const eggImage = document.createElement("img");
eggImage.src = "https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg";

const blackEggImage = document.createElement("img");
blackEggImage.src = "https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/solid-easter-egg-sticker-13331-20896-300x300.png";

const goldenEggImage = document.createElement("img");
goldenEggImage.src = "https://www.liblogo.com/img-logo/wh491wad6-whatsapp-icon-logo-whatsapp-icon-whatsapp-logo-call-logo-instagram-logo-new.png";

const result = document.querySelector("#result");
const win = document.querySelector("#win");
const lose = document.querySelector("#lose");

let data = {
	score: 0,
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: canvas.width / 2 - 40,
    y: canvas.height / 2 - 40,
    width: 80,
    height: 80
  },
  eggs: [],
  blackEggs: [],
  goldenEggs: []
};

function intersect(rect1, rect2) {
    const x = Math.max(rect1.x, rect2.x),
        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
        y = Math.max(rect1.y, rect2.y),
        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    return (num1 >= x && num2 >= y);
}

function winCondition() {
	return data.score >= 20;
}

function loseCondition() {
	return data.score <= -5;
}

function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

     data.eggs.forEach(function(egg) {
      egg.y += egg.yDelta;
    });
    
     if (data.eggs.length <= 2) {
    data.eggs.push({
      yDelta: 1,
      x: Math.random() * (canvas.width - 35),
      y: 0,
      width: 35,
      height: 35
    });
  }
  
  data.eggs = data.eggs.filter(function(egg) {
    if (egg.y > canvas.height) {
      return false;
    }
    return true;
  });
 
  data.eggs.forEach(function(egg) {
  	if(intersect(data.hero, egg)) {
    	data.score++;
      egg.deleteMe = true;
    }
  });
  
  data.eggs = data.eggs.filter(function(egg) {
  	return egg.deleteMe !== true;
  });
  
  data.blackEggs.forEach(function(egg) {
      egg.y += egg.yDelta;
    });
    
     if (data.blackEggs.length <= 3) {
    data.blackEggs.push({
      yDelta: 1.5,
      x: Math.random() * (canvas.width - 35),
      y: 0,
      width: 35,
      height: 35
    });
  }
  
  data.blackEggs = data.blackEggs.filter(function(egg) {
    if (egg.y > canvas.height) {
      return false;
    }
    return true;
  });
  
  data.blackEggs.forEach(function(egg) {
  	if(intersect(data.hero, egg)) {
    	data.score -= 2;
      egg.deleteMe = true;
    }
  });
  
  data.blackEggs = data.blackEggs.filter(function(egg) {
  	return egg.deleteMe !== true;
  });
  
  data.goldenEggs.forEach(function(egg) {
      egg.y += egg.yDelta;
    });
    
     if (data.goldenEggs.length === 0) {
    data.goldenEggs.push({
      yDelta: 2,
      x: Math.random() * (canvas.width - 35),
      y: 0,
      width: 35,
      height: 35
    });
  }
  
  data.goldenEggs = data.goldenEggs.filter(function(egg) {
    if (egg.y > canvas.height) {
      return false;
    }
    return true;
  });
 
  data.goldenEggs.forEach(function(egg) {
  	if(intersect(data.hero, egg)) {
    	data.score += 3;
      egg.deleteMe = true;
    }
  });
  
  data.goldenEggs = data.goldenEggs.filter(function(egg) {
  	return egg.deleteMe !== true;
  });
  
  result.innerHTML = "Score: " + data.score + "/20";
   
}	

function draw() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

  context.drawImage(heroImage, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

  data.eggs.forEach(function(egg) {
    context.drawImage(eggImage, egg.x, egg.y, egg.width, egg.height);
  });
  
  data.blackEggs.forEach(function(egg) {
    context.drawImage(blackEggImage, egg.x, egg.y, egg.width, egg.height);
  });
  
  data.goldenEggs.forEach(function(egg) {
    context.drawImage(goldenEggImage, egg.x, egg.y, egg.width, egg.height); 
  });

}

function loop() {
  
  if(winCondition()) {
  	win.innerHTML = "You win";
    return;
  }
  
  if(loseCondition()) {
  	lose.innerHTML = "You lose";
    return;
  }
  
  requestAnimationFrame(loop);
  update();
  draw();
 
}


loop();

document.addEventListener("keydown", function(evt) {
  if (evt.code === "ArrowLeft") {
    data.hero.xDelta = -4;
  } else if (evt.code === "ArrowRight") {
    data.hero.xDelta = 4;
  } else if (evt.code === "ArrowDown") {
    data.hero.yDelta = 4;
  } else if (evt.code === "ArrowUp") {
    data.hero.yDelta = -4;
  }
});

document.addEventListener("keyup", function(evt) {
  data.hero.xDelta = 0;
  data.hero.yDelta = 0;
});
