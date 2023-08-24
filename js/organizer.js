class Organizer {
  constructor() {
    this.currentIOs = [];
    this.currentGates = [];
    this.currentWires = [];
    this.currentNodes = [];
    this.currentComponents = [];
    this.prevStateStack = [];
  }
  // Input-Output
  getIOs() {
    return this.currentIOs;
  }

  addIO(io) {
    this.currentIOs.push(io);
  }

  removeIO(io) {
    this.currentIOs.indexOf(io) > -1 && this.currentIOs.splice(index, 1);
  }

  // Gates
  getGates() {
    return this.currentGates;
  }

  addGate(gate) {
    this.currentGates.push(gate);
  }

  removeGate(gate) {
    this.currentGates.indexOf(gate) > -1 && this.currentGates.splice(index, 1);
  }

  // Wires
  getWires() {
    return this.currentWires;
  }

  addWire(wire) {
    this.currentWires.push(wire);
  }

  removeGate(wire) {
    this.currentWires.indexOf(wire) > -1 && this.currentWires.splice(index, 1);
  }

  // Nodes
  getNodes() {
    return this.currentNodes;
  }

  addNode(node) {
    this.currentNodes.push(node);
  }

  removeNode(node) {
    this.currentNodes.indexOf(node) > -1 && this.currentNodes.splice(index, 1);
  }

  // Custom Components
  getComponents() {
    return this.currentComponents;
  }

  addComponent(component) {
    this.currentComponents.push(component);
  }

  removeComponent(component) {
    this.currentComponents.indexOf(component) > -1 &&
      this.currentComponents.splice(index, 1);
  }

  // Stack for storing previous state of the canvas. Parameter is an array
  getStates() {
    return this.prevStateStack;
  }

  addState(state) {
    this.prevStateStack.push(state);
  }

  popState() {
    return this.prevStateStack.pop();
  }

  // Others
  getAll() {
    return [
      ...this.currentGates,
      ...this.currentIOs,
      ...this.currentNodes,
      ...this.currentWires,
      ...this.currentComponents,
    ];
  }

  onMousePressed() {
    pressedActionForElements(this.currentIOs);
    pressedActionForElements(this.currentGates);
    pressedActionForElements(this.currentComponents);

    for (let i = 0; i < this.currentNodes.length; i++) {
      this.currentNodes[i].active();
    }

    for (let i = 0; i < this.currentWires.length; i++) {
      this.currentWires[i].destroy();
    }
  }

  onMouseReleased() {
    releasedActionForElements(this.currentIOs);
    releasedActionForElements(this.currentGates);
    releasedActionForElements(this.currentComponents);
  }

  onDoubleClicked() {
    changeValueActionForElements(this.currentNodes);
  }

  draw() {
    drawForElements(this.currentGates);
    drawForElements(this.currentIOs);
    drawForElements(this.currentWires);
    drawForElements(this.currentComponents);
    drawForElements(this.currentNodes);
  }
}
