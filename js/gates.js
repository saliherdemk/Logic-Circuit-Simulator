class InputOutput extends Draggable {
  constructor(x, y, type) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.type = type;
    this.node = null;
    this.width = type ? 50 : 40;
    this.lineX1 = type ? 10 : -10;
    this.lineX2 = type ? 50 : -50;
    this.height = 20;
  }

  setNode(node) {
    this.node = node;
  }

  show() {
    const isFilled = currentIOs.find(
      (e) => dist(e.x, e.y, this.x, this.y) < 5 && e !== this && e.isShown
    );
    if (isFilled) {
      this.y = this.y - 50;
    }

    let hitboxX = this.type ? this.x + 10 : this.x - 50;

    let textX = this.type ? this.x : this.x - 50;

    fill(255);
    strokeWeight(2);

    this.rollover || this.selected ? stroke(173, 216, 230) : noStroke();

    fill(255, 255, 255, 0);
    rect(hitboxX, this.y - 10, this.width, 20);
    stroke(0);
    strokeWeight(1);
    fill(0);
    text(this.node.value ? 1 : 0, this.x, this.y);
    strokeWeight(2);
    fill(255);
    strokeWeight(4);
    line(this.x + this.lineX1, this.y, this.x + this.lineX2, this.y);

    drawText(this.name, textX + this.width / 2, this.y - this.height / 2);
  }

  draw() {
    if (this.isShown) {
      this.show();
      this.over();
      this.update();
      this.selectedControl();
    }
  }
}

class NotGate extends Draggable {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.input1 = null;
    this.output = null;
    this.width = 110;
    this.height = 50;
  }

  show() {
    strokeWeight(2);
    this.rollover || this.selected ? stroke(173, 216, 230) : noStroke();

    fill(255, 255, 255, 0);
    rect(this.x - 55, this.y - 35, this.width, this.height);
    strokeWeight(4);
    stroke(0);

    notGate.resize(110, 50);
    image(notGate, this.x - 55, this.y - 35);

    drawText(this.name, this.x - 18, this.y - 5);
  }

  updateOutput() {
    if (this.input1 && this.output) {
      this.output.value = !this.input1.value;
    }
  }

  draw() {
    if (this.isShown) {
      this.show();
      this.over();
      this.update();
      this.selectedControl();
    }
    this.updateOutput();
  }
}

class Gates extends Draggable {
  constructor(x, y, type) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.input1 = null;
    this.input2 = null;
    this.output = null;
    this.type = type;
    this.width = 110;
    this.height = 50;
    this.imgX = this.x - 55;
    this.imgY = this.y - 35;
    this.IsOverlapping = false;
  }

  show() {
    this.imgX = this.x - 55;
    this.imgY = this.y - 35;

    strokeWeight(2);

    this.rollover || this.selected ? stroke(173, 216, 230) : noStroke();

    fill(255, 255, 255, 0);
    rect(this.imgX, this.imgY, this.width, this.height);
    strokeWeight(4);
    stroke(0);

    switch (this.type) {
      case "andGate":
        andGate.resize(this.width, this.height);
        image(andGate, this.imgX, this.imgY);

        break;
      case "orGate":
        orGate.resize(this.width, this.height);
        image(orGate, this.imgX, this.imgY);

        break;
      case "nandGate":
        nandGate.resize(this.width, this.height);
        image(nandGate, this.imgX, this.imgY);
        break;
      case "norGate":
        norGate.resize(this.width, this.height);
        image(norGate, this.imgX, this.imgY);
        break;
      case "xorGate":
        xorGate.resize(this.width, this.height);
        image(xorGate, this.imgX, this.imgY);
        break;
      case "xnorGate":
        xnorGate.resize(this.width, this.height);
        image(xnorGate, this.imgX, this.imgY);
        break;

      default:
        break;
    }

    drawText(this.name, this.x - 10, this.y - 5);
  }

  updateOutput() {
    if (this.input1 && this.input2) {
      var result = 0;
      switch (this.type) {
        case "andGate":
          result = this.input1.value && this.input2.value;
          break;
        case "orGate":
          result = this.input1.value || this.input2.value;
          break;
        case "nandGate":
          result = !(this.input1.value && this.input2.value);
          break;
        case "norGate":
          result = !(this.input1.value || this.input2.value);
          break;
        case "xorGate":
          result = this.input1.value ^ this.input2.value;
          break;
        case "xnorGate":
          result = !(this.input1.value ^ this.input2.value);
          break;

        default:
          break;
      }
      this.output.value = result;
    }
  }

  draw() {
    if (this.isShown) {
      this.show();
      this.over();
      this.update();
      this.selectedControl();
    }
    this.updateOutput();
  }
}
