function preload() {
  andGate = loadImage("./img/andGate.png");
  nandGate = loadImage("./img/nandGate.png");
  norGate = loadImage("./img/norGate.png");
  notGate = loadImage("./img/notGate.png");
  orGate = loadImage("./img/orGate.png");
  xnorGate = loadImage("./img/xnorGate.png");
  xorGate = loadImage("./img/xorGate.png");
}

function setup() {
  paint = new Brush();
  select = new Select();
  organizer = new Organizer();
  let cnv = createCanvas(windowWidth - 230, windowHeight - 80);
  cnv.style("position", "absolute");
  cnv.style("right", "0");
  cnv.style("z-index", "3");
  cnv.style("box-shadow", "0px 1px 10px #999");

  strokeWeight(4);
}

function draw() {
  background(255);

  select.draw();
  organizer.draw();

  drawLines();
  paint.isDrawing && paint.update();
}

function mousePressed() {
  if (paint.active) {
    mouseButton === RIGHT ? paint.openEraser() : paint.openIsDrawing();
    return;
  }

  if (mouseButton === RIGHT && !isComponentOpen) {
    popUpContainer.style.display = "flex";
    popUpContainer.style.left = mouseX + 200 + "px";
    popUpContainer.style.top = mouseY + "px";
    isMenuOpen = true;

    return;
  }
  select.onMousePressed();
  organizer.onMousePressed();
}

function mouseReleased() {
  organizer.onMouseReleased();
  select.deActivateSelectMode();
  paint.active && paint.closeIsDrawing();
  paint.active && paint.closeEraser();
}

function doubleClicked() {
  organizer.onDoubleClicked();
  changeNameActionForElements();
}

function windowResized() {
  resizeCanvas(windowWidth - 230, windowHeight - 80);
}

function keyPressed() {
  // R => 82
  if (keyCode == 82) {
    paint.clear();
  }
}
