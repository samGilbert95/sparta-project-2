document.addEventListener('DOMContentLoaded',() => {
  let img = new Image();
  img.src = 'images/sprite.png';
  let projImg = new Image();
  projImg.src = 'images/projectile.png';
  let punchSound = document.getElementById('punchNoise');
  let hitSound = document.getElementById('hitNoise');
  let scoreCheck = document.getElementById('score');
  let highCheck = document.getElementById('high');
  let hurtCheck = document.getElementById('hurt');
  let canvas = document.querySelector('#hitCanv');
  let hit = document.querySelector('#styleCanv');
  let ken = document.querySelector('#playerCanv');
  let c = canvas.getContext('2d');
  let h = hit.getContext('2d');
  let k = ken.getContext('2d');
  let score = 0;
  let lives = 3;
  let hitCount = 0;
  let hitboX = 0;
  let hitWidth = 30;
  let hitboxY = 0;
  let width = 47;
  let height = 90;
  let highScore = 0;
  let yPos = 70;
  const standLoop = [0, 1, 2];
  const punchLoop = [0, 1, 0];
  const kickLoop = [0, 1, 0];
  const projLoop = [0];
  let frameCount = 0;
  let stepLoopIndex = 0;
  let punchLoopIndex = 0;
  let kickLoopIndex = 0;
  let projLoopIndex = 0;
  let key = 0;
  let count = 0;
  let x = 300;
  let y = 80;

  img.hitboxHi = function () {
    hitboX = 80;
    hitboxY = 80;
    c.fillRect(0,83,hitboX,10);
  }

  img.hitboxLo = function () {
    hitboX = 80;
    hitboxY = 130;
    c.fillRect(0,130,hitboX,10);
  }

  img.onload = function() {
    highScore = localStorage.getItem("HighScore");
    highCheck.innerHTML = highScore;
    scoreCheck.innerHTML = score;
    hurtCheck.innerHTML = lives;
    c.fillRect(0,hitWidth,80,10);
    init();
  };

  img.destroyProj = function (){
    x = 300;
    window.cancelAnimationFrame(projectile);
  }

  img.rand= () => {
    count = Math.round(Math.random());
  }

  img.checkHit = function() {
    if (x <= hitboX){
      if ((count == 1 && y == hitboxY) ||(count == 0 && y >= hitboxY)){
        hitNoise.play();
        if (score < 1000) {
          score = score + 100;
        } else {
          score = score + 200;
        }
        img.destroyProj();
        scoreCheck.innerHTML = score;
        hitboX = 0;
        hitboxY = 0;
        img.rand();
      }
  }
}

  img.checkHurt = function () {
    if (x <= hitWidth)  {
      punchNoise.play();
      lives--;
      if (lives == 0){
        alert('Game Over');
        alert('Score : ' + score);
        if (score > highScore){
          localStorage.setItem("HighScore",score);
        }
        location.reload();
      }
      img.destroyProj();
      scoreCheck.innerHTML = score;
      hurtCheck.innerHTML = lives;
    }
  }

  function projectile(){
    if (count == 0) {
      y = 83;
      c.clearRect(0,0,canvas.width,canvas.height);
      h.clearRect(x, 83, canvas.width, canvas.height);
      h.drawImage(projImg,0,0,47,90,x,83,50,50);
      c.fillRect(x,y,10,10);
    } else if (count == 1) {
      y = 130;
      c.clearRect(0,0,canvas.width,canvas.height);
      h.clearRect(x, 83, canvas.width, canvas.height);
      h.drawImage(projImg,0,0,47,90,x,120,50,50);
      c.fillRect(x,y,10,10);
    }
    if (x < 0){
      c.clearRect(0,0,canvas.width,canvas.height);
      h.clearRect(0,0,canvas.width,canvas.height);
      x = 300;
    }
    if (score <= 500){
      x = x - 2;
    } else if (score > 500 && score <= 1000){
      x = x - 3;
    } else if (score > 1000 && score <= 2000) {
      x = x - 4;
    } else if (score > 2000 && score <= 3000){
      x = x - 5;
    } else {
      x = x - 6;
    }
  }
  function drawStandFrame(frameX,frameY,canvasX,canvasY){
    width = 47;
    height = 90;
    yPos = 70;
    k.drawImage(img,3 + frameX*width,3 + frameY*height,width,height,canvasX,canvasY,width,height);
  }
  function drawPunchFrame(frameX,frameY,canvasX,canvasY){
    width = 53;
    height = 90;
    yPos = 70;
    k.clearRect(0, 0, canvas.width, canvas.height);
    k.drawImage(img, 283 +frameX*width, 44+frameY*height,width,height,canvasX,canvasY,width,height);
  }
  function drawKickFrame(frameX,frameY,canvasX,canvasY){
    width =59;
    height = 55;
    yPos = 90;
    k.clearRect(0, 0, canvas.width, canvas.height);
    k.drawImage(img,392 + frameX*width, 418 + frameY*height,width,height,canvasX,canvasY,width,height);
  }

  document.onkeypress = (e) => {
    key = e.keyCode;
    return key;
  }

  function init() {
    img.checkHurt();
    if (key === 97){
      window.cancelAnimationFrame(step);
      window.cancelAnimationFrame(kick);
      window.requestAnimationFrame(punch);
    } else if (key === 115) {
      window.cancelAnimationFrame(step);
      window.cancelAnimationFrame(punch);
      window.requestAnimationFrame(kick);
    } else {
      window.cancelAnimationFrame(punch);
      window.cancelAnimationFrame(kick);
      window.requestAnimationFrame(step);
    }
  }
  function step() {
    // Cap frame rate
    frameCount++;
    window.requestAnimationFrame(projectile);
    if (frameCount < 12) {
      window.requestAnimationFrame(step);
      return;
    }
    h.clearRect(0, 0, canvas.width, canvas.height);
    frameCount = 0;
    //Clear area
    k.clearRect(0, 0, canvas.width, canvas.height);
    // loop through drawFrame until currentLoopIndex finished
    drawStandFrame(standLoop[stepLoopIndex], 0, 0, yPos);
    stepLoopIndex++;
    if (stepLoopIndex >= standLoop.length) {
      stepLoopIndex = 0;
    }
    init();
  }
  function punch() {
    // Cap frame rate
    frameCount++;
    window.requestAnimationFrame(projectile);
    if (frameCount < 4) {
      window.requestAnimationFrame(punch);
      return;
    }
    frameCount = 0;
    //Clear area
    // loop through drawFrame until currentLoopIndex finished
    drawPunchFrame(punchLoop[punchLoopIndex], 0, 0, yPos);
    punchLoopIndex++;
    //console.log('Frame :' + punchLoopIndex);
    if (punchLoopIndex == 2){
      img.hitboxHi();
      setTimeout(function(){
        c.clearRect(0,83,60,10);
      }, 100);
      img.checkHit();
    }
    if (punchLoopIndex >= punchLoop.length) {
      punchLoopIndex = 0;
      frameCount = 0;
      key = 0;
    }
    init();
  }
  function kick() {
    // Cap frame rate
    frameCount++;
    window.requestAnimationFrame(projectile);
    if (frameCount < 4) {
      window.requestAnimationFrame(kick);
      return;
    }
    frameCount = 0;
    //Clear area
    // loop through drawFrame until currentLoopIndex finished
    drawKickFrame(kickLoop[kickLoopIndex], 0, 0, yPos);
    kickLoopIndex++;
    if (kickLoopIndex == 2){
      img.hitboxLo();
      setTimeout(function(){
        c.clearRect(0,140,0,10);
      }, 100);
      img.checkHit();
    }
    if (kickLoopIndex >= kickLoop.length) {
      kickLoopIndex = 0;
      frameCount = 0;
      key = 0;
    }
    init();
  }
})
