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
      if (element instanceof CustomGate) {
        for (let i = 0; i < element.inputs.length; i++) {
          const input = element.inputs[i];
          if (input.wire === null) {
            let node = new Node(0, this, true);
            currentNodes.push(node);
            inputs.push(node);
            let hdWire = new HiddenWire(input, node);
            this.wires.push(hdWire);
          }
        }

        for (let i = 0; i < element.outputs.length; i++) {
          const output = element.outputs[i];
          if (output.wire === null) {
            let node = new Node(0, this, false);
            currentNodes.push(node);
            outputs.push(node);
            let hdWire = new HiddenWire(output, node);
            this.wires.push(hdWire);
          }
        }
      }

      if (element?.input1?.wire === null) {
        let node = new Node(0, this, true);
        currentNodes.push(node);
        inputs.push(node);
        let hdWire = new HiddenWire(element.input1, node);
        this.wires.push(hdWire);
      }

      if (element?.input2?.wire === null) {
        let node = new Node(0, this, true);
        currentNodes.push(node);
        inputs.push(node);

        let hdWire = new HiddenWire(element.input2, node);
        this.wires.push(hdWire);
      }
      if (element?.output?.wire === null) {
        let node = new Node(0, this, false);
        currentNodes.push(node);
        outputs.push(node);

        let hdWire = new HiddenWire(node, element.output);
        this.wires.push(hdWire);
      }
    }
    this.inputs = inputs;
    this.outputs = outputs;
    this.height = Math.max(this.inputs.length, this.outputs.length) * 20 + 20;
    this.height = this.height < 10 ? 10 : this.height;
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
    if (this.isShown) {
      rect(this.x, this.y, 100, this.height);
      this.show();
      this.over();
      this.update();
      this.selectedControl();
    }

    this.renderWires();
  }
}
