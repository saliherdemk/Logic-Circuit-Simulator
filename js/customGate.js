class CustomGate extends Draggable {
  constructor(clones, x, y) {
    super(x, y, true);
    this.x = x;
    this.y = y;
    this.inputs = [];
    this.outputs = [];
    this.clonedInputs = [];
    this.clonedOutputs = [];
    this.wires = [];
    this.width = 100;
    this.height = 50;
    this.clones = clones;
  }

  getInputs() {
    console.log(this.clones);
    return;
    var clones = this.clones;
    for (let i = 0; i < clones.length; i++) {
      const element = clones[i];
      if (element instanceof InputOutput) {
        var el = element.node;
        el.isInput ? this.outputs.push(el) : this.inputs.push(el);
      }
    }
  }

  setIO() {
    var inputs = [];
    var outputs = [];

    for (let i = 0; i < this.clones.length; i++) {
      const element = this.clones[i];
      if (element instanceof InputOutput) {
        var el = element.node;
        el.isInput ? outputs.push(el) : inputs.push(el);
      }
    }

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      let node = new Node(0, this, true);
      currentNodes.push(node);
      this.clonedInputs.push(node);

      let hdWire = new HiddenWire(input, node);
      this.wires.push(hdWire);
    }

    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      let node = new Node(0, this, false);
      currentNodes.push(node);
      this.clonedOutputs.push(node);

      let hdWire = new HiddenWire(node, output);
      this.wires.push(hdWire);
    }

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
