function cloneIO(element, nodeMap) {
  var clonedEl = new InputOutput(
    element.x + 100,
    element.y - 100,
    element.type
  );
  var clonedNode = new Node(element.node.value, clonedEl, element.node.isInput);

  clonedEl.setNode(clonedNode);
  currentIOs.push(clonedEl);
  currentNodes.push(clonedNode);

  nodeMap.set(element.node, clonedNode);
  return clonedEl;
}

function cloneGates(element, nodeMap) {
  var clonedEl;
  if (element instanceof NotGate) {
    clonedEl = new NotGate(element.x + 100, element.y - 100);
    currentGates.push(clonedEl);

    let input = new Node(element.input1, clonedEl, true);
    currentNodes.push(input);

    let output = new Node(element.output, clonedEl, false);
    currentNodes.push(output);

    nodeMap.set(element.input1, input);
    nodeMap.set(element.output, output);
  } else {
    clonedEl = new Gates(element.x + 100, element.y - 100, element.type);
    currentGates.push(clonedEl);

    let input1 = new Node(element.input1.value, clonedEl, true);
    currentNodes.push(input1);

    let input2 = new Node(element.input2.value, clonedEl, true);
    currentNodes.push(input2);

    let output = new Node(element.output.value, clonedEl, false);
    currentNodes.push(output);

    nodeMap.set(element.input1, input1);
    nodeMap.set(element.input2, input2);
    nodeMap.set(element.output, output);
  }
  return clonedEl;
}

function cloneWire(element, nodeMap, force = false) {
  if (
    (selected.includes(element.startNode?.parent) &&
      selected.includes(element.endNode?.parent)) ||
    force
  ) {
    var startNode = nodeMap.get(element.startNode);
    var endNode = nodeMap.get(element.endNode);
    var wire = new Wire(startNode, endNode, true);
    wire.isLineActive = false;
    currentWires.push(wire);
    return wire;
  }
  return false;
}

function cloneCustomGate(element, nodeMap) {
  var newElClones = clone(element.clones);
  var clonedEl = new CustomGate(newElClones, element.x + 100, element.y - 100);
  clonedEl.setIO();
  clonedEl.hideComponents();
  clonedEl.changeName(element.name);
  currentComponents.push(clonedEl);

  for (let i = 0; i < element.clonedInputs.length; i++) {
    nodeMap.set(element.clonedInputs[i], clonedEl.clonedInputs[i]);
  }

  for (let i = 0; i < element.clonedOutputs.length; i++) {
    nodeMap.set(element.clonedOutputs[i], clonedEl.clonedOutputs[i]);
  }
  return clonedEl;
}
