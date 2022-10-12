class CustomGate extends Draggable {
  constructor(components, x, y) {
    super(x, y, true);
    this.x = x;
    this.y = y;
    this.components = components;
    this.inputs = [];
    this.outputs = [];
    this.wires = [];
  }

  setIO() {
    var inputs = [];
    var outputs = [];
    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i];
      if (element?.input1?.hasWire === false) {
        let node = new Node(0, this, true);
        currentNodes.push(node);
        inputs.push(node);
        let hdWire = new HiddenWire(element.input1, node);
        this.wires.push(hdWire);
      }
      if (element?.input2?.hasWire === false && !(element instanceof NotGate)) {
        let node = new Node(0, this, true);
        currentNodes.push(node);
        inputs.push(node);

        let hdWire = new HiddenWire(element.input2, node);
        this.wires.push(hdWire);
      }
      if (element?.output?.hasWire === false) {
        let node = new Node(0, this, false);
        currentNodes.push(node);
        outputs.push(node);

        let hdWire = new HiddenWire(node, element.output);
        this.wires.push(hdWire);
      }
    }
    this.inputs = inputs;
    this.outputs = outputs;
  }

  renderWires() {
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].connected();
    }
  }

  draw() {
    var inputs = this.inputs;
    var outputs = this.outputs;
    rect(this.x, this.y, 100, inputs.length * 20);
    this.over();
    this.update();
    this.renderWires();
  }
}
