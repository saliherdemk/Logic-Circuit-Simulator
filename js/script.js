document.addEventListener("contextmenu", (event) => event.preventDefault());

function generateInput() {
  let input = new InputOutput(width / 10 / 5, height - 20, true);
  organizer.addIO(input);

  let node = new Node(0, input, false);
  organizer.addNode(node);

  input.setNode(node);
}

function generateOutput() {
  let output = new InputOutput((width / 10) * 1.3, height - 20, false);
  organizer.addIO(output);

  let node = new Node(0, output, true);
  organizer.addNode(node);

  output.setNode(node);
}

function generateANDGate() {
  let andGate = new Gates((width / 10) * 2, height - 20, "andGate");
  organizer.addGate(andGate);

  let input1 = new Node(0, andGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, andGate, true);
  organizer.addNode(input2);

  let output = new Node(0, andGate, false);

  organizer.addNode(output);
}

function generateNOTGate() {
  let notGate = new NotGate((width / 10) * 4.1, height - 20);
  organizer.addGate(notGate);

  let input = new Node(0, notGate, true);
  organizer.addNode(input);

  let output = new Node(0, notGate, false);
  organizer.addNode(output);
}

function generateORGate() {
  let orGate = new Gates((width / 10) * 3, height - 20, "orGate");
  organizer.addGate(orGate);

  let input1 = new Node(0, orGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, orGate, true);
  organizer.addNode(input2);

  let output = new Node(0, orGate, false);
  organizer.addNode(output);
}

function generateNANDGate() {
  let nandGate = new Gates((width / 10) * 5.2, height - 20, "nandGate");
  organizer.addGate(nandGate);

  let input1 = new Node(0, nandGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, nandGate, true);
  organizer.addNode(input2);

  let output = new Node(0, nandGate, false);
  organizer.addNode(output);
}

function generateNORGate() {
  let norGate = new Gates((width / 10) * 6.3, height - 20, "norGate");
  organizer.addGate(norGate);

  let input1 = new Node(0, norGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, norGate, true);
  organizer.addNode(input2);

  let output = new Node(0, norGate, false);
  organizer.addNode(output);
}

function generateXORGate() {
  let xorGate = new Gates((width / 10) * 7.3, height - 20, "xorGate");
  organizer.addGate(xorGate);

  let input1 = new Node(0, xorGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, xorGate, true);
  organizer.addNode(input2);

  let output = new Node(0, xorGate, false);
  organizer.addNode(output);
}

function generateXNORGate() {
  let xnorGate = new Gates((width / 10) * 8.4, height - 20, "xnorGate");
  organizer.addGate(xnorGate);

  let input1 = new Node(0, xnorGate, true);
  organizer.addNode(input1);

  let input2 = new Node(0, xnorGate, true);
  organizer.addNode(input2);

  let output = new Node(0, xnorGate, false);
  organizer.addNode(output);
}

function generateCustomGate(components, name) {
  var clones = clone(components);
  for (let i = 0; i < clones.length; i++) {
    var e = clones[i];
    if (!(e instanceof Node)) e.isShown = false;
  }
  let cg = new CustomGate(clones, 10, 10);
  cg.changeName(name);

  cg.setIO();
  organizer.addComponent(cg);
}

function deleteSelected() {
  let selected = select.getSelected();
  if (selected.length) {
    for (let i = 0; i < selected.length; i++) {
      const element = selected[i];
      !(element instanceof Wire) && element.delete("force");
    }
  }
  select.clearSelected();
  closeMenu();
}

function toggleBrush(element) {
  element.childNodes[1].src = paint.toggleActive()
    ? "./img/paintActive.png"
    : "./img/paintInActive.png";
}

function openBrushMenu() {
  noLoop();
  brushMenu.style.marginLeft = 0;
}
function closeBrushMenu() {
  loop();
  brushMenu.style.marginLeft = "-190px";
}

function setBrushColor(clr) {
  paint.setColor(color(clr));
}

function setBrushThickness(size) {
  console.log(size);
  paint.setSize(size);
}
