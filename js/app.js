document.addEventListener('DOMContentLoaded',() => {
  console.log('test');

  let img = new Image();
  img.src = 'images/sprite.png';

  let canvas = document.querySelector('#hitCanv');
  let hit = document.querySelector('#styleCanv');
  let c = canvas.getContext('2d');
  let h = hit.getContext('2d');

  let width = 47;
  let height = 90;
  let yPos = 70;
  const standLoop = [0, 1, 2];
  const punchLoop = [0, 1, 0];
  const kickLoop = [0, 1, 0];
  let frameCount = 0;
  let stepLoopIndex = 0;
  let punchLoopIndex = 0;
  let kickLoopIndex = 0;
  let key = 0;

  img.onload = function() {
    init();
  };

  function drawStandFrame(frameX,frameY,canvasX,canvasY){
    width = 47;
    height = 90;
    yPos = 70;
    h.drawImage(img,3 + frameX*width,3 + frameY*height,width,height,canvasX,canvasY,width,height);
  }
  function drawPunchFrame(frameX,frameY,canvasX,canvasY){
    width = 53;
    height = 90;
    yPos = 70;
    h.drawImage(img, 283 +frameX*width, 44+frameY*height,width,height,canvasX,canvasY,width,height);
  }
  function drawKickFrame(frameX,frameY,canvasX,canvasY){
    width =59;
    height = 55;
    yPos = 95;
    h.clearRect(0, 0, canvas.width, canvas.height);
    h.drawImage(img,392 + frameX*width, 418 + frameY*height,width,height,canvasX,canvasY,width,height);
  }

  document.onkeypress = (e) => {
    key = e.keyCode;
    console.log(key);
    return key;
  }

  function init() {
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
  // drawFrame(0,0,0,yPos);
  // drawFrame(1,0,width,yPos);
  // drawFrame(2,0,width*2,yPos);
  // drawFrame(3,0,width*3,yPos);

  function step() {
    // Cap frame rate
    frameCount++;
    if (frameCount < 6) {
      window.requestAnimationFrame(step);
      return;
    }
    frameCount = 0;
    //Clear area
    h.clearRect(0, 0, canvas.width, canvas.height);
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
    if (frameCount < 4) {
      window.requestAnimationFrame(punch);
      return;
    }
    frameCount = 0;
    //Clear area
    //c.clearRect(0, 0, canvas.width, canvas.height);
    // loop through drawFrame until currentLoopIndex finished
    drawPunchFrame(punchLoop[punchLoopIndex], 0, 0, yPos);
    punchLoopIndex++;
    console.log('Frame :' + punchLoopIndex);
    if (punchLoopIndex == 2){
      c.fillRect(0,83,60,10);
      setTimeout(function(){
        c.clearRect(0,83,60,10)
      }, 100);
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
    if (frameCount < 4) {
      window.requestAnimationFrame(kick);
      return;
    }
    frameCount = 0;
    //Clear area
    //c.clearRect(0, 0, canvas.width, canvas.height);
    // loop through drawFrame until currentLoopIndex finished
    drawKickFrame(kickLoop[kickLoopIndex], 0, 0, yPos);
    kickLoopIndex++;
    console.log('Frame :' + kickLoopIndex);
    if (kickLoopIndex == 2){
      c.fillRect(0,140,70,10);
      setTimeout(function(){
        c.clearRect(0,140,70,10)
      }, 100);
    }
    if (kickLoopIndex >= kickLoop.length) {
      kickLoopIndex = 0;
      frameCount = 0;
      key = 0;
    }
    init();
  }
})
