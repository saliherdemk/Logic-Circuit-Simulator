function cloneIO(element, nodeMap) {
  var cloneEl = new InputOutput(
    element.value,
    element.x + 100,
    element.y - 100,
    true
  );
  var clonedNode = new Node(element.node.value, cloneEl, false);

  cloneEl.setNode(clonedNode);
  currentIOs.push(cloneEl);
  currentNodes.push(clonedNode);

  nodeMap.set(element.node, clonedNode);
}

function cloneGates(element, nodeMap) {
  if (element instanceof NotGate) {
    let clonedEl = new NotGate(element.x + 100, element.y - 100);
    currentGates.push(clonedEl);

    let input = new Node(element.input1, clonedEl, true);
    currentNodes.push(input);

    let output = new Node(element.output, clonedEl, false);
    currentNodes.push(output);

    nodeMap.set(element.input1, input);
    nodeMap.set(element.output, output);
  } else {
    let cloneEl = new Gates(element.x + 100, element.y - 100, element.type);
    currentGates.push(cloneEl);

    let input1 = new Node(element.input1.value, cloneEl, true);
    currentNodes.push(input1);

    let input2 = new Node(element.input2.value, cloneEl, true);
    currentNodes.push(input2);

    let output = new Node(element.output.value, cloneEl, false);
    currentNodes.push(output);

    nodeMap.set(element.input1, input1);
    nodeMap.set(element.input2, input2);
    nodeMap.set(element.output, output);
  }
}

function cloneWire(element, nodeMap) {
  if (
    selected.includes(element.startNode.parent) &&
    selected.includes(element.endNode.parent)
  ) {
    var startNode = nodeMap.get(element.startNode);
    var endNode = nodeMap.get(element.endNode);
    var wire = new Wire(startNode, endNode, true);
    wire.isLineActive = false;
    currentWires.push(wire);
  }
}
