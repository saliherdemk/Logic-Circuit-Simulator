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
  deleteMode = new DeleteMode();
  let cnv = createCanvas(windowWidth - 230, windowHeight - 80);
  cnv.style("position", "absolute");
  cnv.style("right", "0");
  cnv.style("z-index", "3");
  cnv.style("box-shadow", "0px 1px 10px #999");

  strokeWeight(4);
}

function draw() {
  !(frameCount % 5) && updateDeleted();
  background(255);
  select.draw();
  drawForElements(currentGates);
  drawForElements(currentIOs);
  drawForElements(currentWires);
  drawForElements(currentComponents);
  drawForElements(currentNodes);

  drawLines();
  if (paint.isDrawing) {
    paint.update();
    return;
  }
}

function mousePressed() {
  if (deleteMode.getDeleteMode()) {
    deleteMode.activate();
    return;
  }
  if (paint.active) {
    mouseButton === RIGHT ? paint.openEraser() : paint.openIsDrawing();
    return;
  }

  if (mouseButton === RIGHT && !isComponentOpen) {
    selectDiv.style.display = "flex";
    selectDiv.style.left = mouseX + 200 + "px";
    selectDiv.style.top = mouseY + "px";
    isMenuOpen = true;

    return;
  }

  select.selectMode = true;
  select.setInitialCoordinates(mouseX, mouseY);

  select.selected.find((el) => el.rollover) || isMenuOpen
    ? null
    : select.clearSelected();

  pressedActionForElements(currentIOs);
  pressedActionForElements(currentGates);
  pressedActionForElements(currentComponents);

  for (let i = 0; i < currentNodes.length; i++) {
    currentNodes[i].active();
  }

  for (let i = 0; i < currentWires.length; i++) {
    currentWires[i].destroy();
  }
}

function mouseReleased() {
  releasedActionForElements(currentIOs);
  releasedActionForElements(currentGates);
  select.released();
  releasedActionForElements(currentComponents);
  paint.active && paint.closeIsDrawing();
  paint.active && paint.closeEraser();
  deleteMode.deactivate();
}

function doubleClicked() {
  changeValueActionForElements(currentNodes);
  changeNameActionForElements();
}

function windowResized() {
  resizeCanvas(windowWidth - 230, windowHeight - 80);
}

function keyPressed() {
  if (keyCode == 82) {
    paint.clear();
  }
}
