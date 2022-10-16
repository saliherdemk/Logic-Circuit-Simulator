class HiddenWire {
  constructor(startedNode, endNode) {
    this.startedNode = startedNode;
    this.endNode = endNode;
  }

  connected() {
    this.startedNode.value = this.endNode.value;
    this.endNode.parent.value = this.endNode.value;
    this.startedNode.parent.value = this.endNode.parent.value;
  }
}
