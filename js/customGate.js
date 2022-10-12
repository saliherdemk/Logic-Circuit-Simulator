class CustomGate extends Draggable {
  constructor(components, x, y) {
    super(x, y, true);
    this.x = x;
    this.y = y;
    this.components = components;
    this.inputs = [];
    this.outputs = [];
    this.wires = [];
    this.width = 100;
    this.height = 50;
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
    this.height = this.inputs.length * 20;
  }

  renderWires() {
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].connected();
    }
  }

  show() {
    this.rollover || this.selected ? stroke(173, 216, 230) : noStroke();

    fill(255, 255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
    strokeWeight(4);
    stroke(0);

    fill(111, 143, 175);
    noStroke();
    textSize(15);
    text(this.name, this.x + 35, this.y + this.height / 2);
    fill(255);
    stroke(0);
  }

  draw() {
    var inputs = this.inputs;
    var outputs = this.outputs;
    rect(this.x, this.y, 100, this.height);
    this.show();
    this.over();
    this.update();
    this.selectedControl();
    this.renderWires();
  }
}
