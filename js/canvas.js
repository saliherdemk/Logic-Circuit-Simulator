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
  let cnv = createCanvas(windowWidth - 230, windowHeight - 80);
  cnv.style("position", "absolute");
  cnv.style("right", "0");
  cnv.style("z-index", "3");
  cnv.style("box-shadow", "0px 1px 10px #999");

  strokeWeight(4);
}

function draw() {
  background(255);

  drawForElements(selects);
  drawForElements(currentGates);
  drawForElements(currentIOs);
  drawForElements(currentWires);
  drawForElements(currentComponents);

  drawForElements(currentNodes);
}

function mousePressed() {
  if (mouseButton === RIGHT && !isComponentOpen) {
    selectDiv.style.display = "flex";
    selectDiv.style.left = mouseX + 200 + "px";
    selectDiv.style.top = mouseY + "px";
    isMenuOpen = true;

    return;
  }

  selectMode = true;

  selected.find((el) => el.rollover) || isMenuOpen ? null : (selected = []);

  pressedActionForElements(currentIOs);
  pressedActionForElements(currentGates);
  pressedActionForElements(currentComponents);

  for (let i = 0; i < currentNodes.length; i++) {
    currentNodes[i].active();
  }

  for (let i = 0; i < currentWires.length; i++) {
    currentWires[i].destroy();
  }
  let sel = new Select(mouseX, mouseY, 0, 0, true);
  selects.push(sel);
}

function mouseReleased() {
  releasedActionForElements(currentIOs);
  releasedActionForElements(currentGates);
  releasedActionForElements(selects);
  releasedActionForElements(currentComponents);
}

function doubleClicked() {
  changeValueActionForElements(currentNodes);
  changeNameActionForElements();
}

function windowResized() {
  resizeCanvas(windowWidth - 230, windowHeight - 80);
}
