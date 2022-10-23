class HiddenWire {
  constructor(startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
  }

  connected() {
    if (this.startNode.parent instanceof InputOutput) {
      this.endNode.name = this.startNode.parent.name;
    }
    if (this.endNode.parent instanceof InputOutput) {
      this.startNode.name = this.endNode.parent.name;
    }
    this.startNode.value = this.endNode.value;
  }
}
