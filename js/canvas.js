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
  createCanvas(windowWidth, windowHeight - 100);
  strokeWeight(4);
}

function draw() {
  background(255);
  drawForElements(selects);
  drawForElements(currentGates);
  drawForElements(currentIOs);
  drawForElements(currentWires);
  drawForElements(customGates);

  drawForElements(currentNodes);
}

function mousePressed() {
  selectMode = true;

  selected.find((el) => el.rollover) ? null : (selected = []);

  pressedActionForElements(currentIOs);
  pressedActionForElements(currentGates);
  pressedActionForElements(customGates);

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
  releasedActionForElements(customGates);
}

function doubleClicked() {
  changeValueActionForElements(currentNodes);
  changeNameActionForElements();
}

function keyPressed() {
  var clones = [];
  for (let i = 0; i < selected.length; i++) {
    var clone = _.clone(selected[i]);
    clones.push(clone);
  }
  let cg = new CustomGate(clones, 10, 10);

  cg.setIO();
  customGates.push(cg);

  for (let i = 0; i < currentGates.length; i++) {
    const element = currentGates[i];
    element.isShown = false;
  }
}
