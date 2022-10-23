document.addEventListener("contextmenu", (event) => event.preventDefault());

function generateInput() {
  let input = new InputOutput(width / 10 / 5, height - 20, true);
  currentIOs.push(input);

  let node = new Node(0, input, false);
  currentNodes.push(node);

  input.setNode(node);
}

function generateOutput() {
  let output = new InputOutput((width / 10) * 1.3, height - 20, false);
  currentIOs.push(output);

  let node = new Node(0, output, true);
  currentNodes.push(node);

  output.setNode(node);
}

function generateANDGate() {
  let andGate = new Gates((width / 10) * 2, height - 20, "andGate");
  currentGates.push(andGate);

  let input1 = new Node(0, andGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, andGate, true);
  currentNodes.push(input2);

  let output = new Node(0, andGate, false);
  currentNodes.push(output);
}

function generateNOTGate() {
  let notGate = new NotGate((width / 10) * 4.1, height - 20);
  currentGates.push(notGate);

  let input = new Node(0, notGate, true);
  currentNodes.push(input);

  let output = new Node(0, notGate, false);
  currentNodes.push(output);
}

function generateORGate() {
  let orGate = new Gates((width / 10) * 3, height - 20, "orGate");
  currentGates.push(orGate);

  let input1 = new Node(0, orGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, orGate, true);
  currentNodes.push(input2);

  let output = new Node(0, orGate, false);
  currentNodes.push(output);
}

function generateNANDGate() {
  let nandGate = new Gates((width / 10) * 5.2, height - 20, "nandGate");
  currentGates.push(nandGate);

  let input1 = new Node(0, nandGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, nandGate, true);
  currentNodes.push(input2);

  let output = new Node(0, nandGate, false);
  currentNodes.push(output);
}

function generateNORGate() {
  let norGate = new Gates((width / 10) * 6.3, height - 20, "norGate");
  currentGates.push(norGate);

  let input1 = new Node(0, norGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, norGate, true);
  currentNodes.push(input2);

  let output = new Node(0, norGate, false);
  currentNodes.push(output);
}

function generateXORGate() {
  let xorGate = new Gates((width / 10) * 7.3, height - 20, "xorGate");
  currentGates.push(xorGate);

  let input1 = new Node(0, xorGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, xorGate, true);
  currentNodes.push(input2);

  let output = new Node(0, xorGate, false);
  currentNodes.push(output);
}

function generateXNORGate() {
  let xnorGate = new Gates((width / 10) * 8.4, height - 20, "xnorGate");
  currentGates.push(xnorGate);

  let input1 = new Node(0, xnorGate, true);
  currentNodes.push(input1);

  let input2 = new Node(0, xnorGate, true);
  currentNodes.push(input2);

  let output = new Node(0, xnorGate, false);
  currentNodes.push(output);
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
  currentComponents.push(cg);
}

function deleteSelected() {
  if (selected.length) {
    for (let i = 0; i < selected.length; i++) {
      const element = selected[i];
      !(element instanceof Wire) && element.delete("force");
    }
  }
  selected = [];
  closeCcg();
}
