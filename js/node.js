class Node {
  constructor(value, parent, isInput) {
    this.value = value;
    this.parent = parent;
    this.nodeXDecisive = isInput ? -50 : 50;
    this.wire = null;
    this.x = this.parent.x + this.nodeXDecisive;
    this.y = this.parent.y;
    this.isInput = isInput;
    this.isLineActive = false;
    this.inputY = 0;
    this.color = this.value ? color(0, 255, 0) : color(255, 0, 0);
    (this.isGateOutput = false), (this.isrollover = false);
  }

  rollover() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 6) {
      this.isrollover = true;
    } else {
      this.isrollover = false;
    }
  }

  rePositionForCustomGate() {
    var inputs = this.parent.inputs;
    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element === this) {
          this.y += i * 20 + 10;
          this.x += 50;
        }
      }
    }

    var outputs = this.parent.outputs;
    if (outputs) {
      for (let i = 0; i < outputs.length; i++) {
        const element = outputs[i];
        if (element === this) {
          this.y += i * 20 + 10;
          this.x += 50;
        }
      }
    }
  }

  draw() {
    if (this.parent.isShown) {
      fill(this.color);
      ellipse(this.x, this.y, this.isrollover ? 18 : 14);
      this.rollover();

      this.drawLine();
      this.update();

      fill(255);
      this.updateOutputValue();
      this.rePositionForCustomGate();
    }
  }

  updateOutputValue() {
    if (this.isInput) {
      this.parent.value = this.value;
    }
  }

  changeValue() {
    if (this.isrollover && !this.isInput && !this.isGateOutput) {
      (this.value = !this.value), (this.parent.value = this.value);
    }
  }

  active() {
    const control = currentWires.find((el) => el.isLineActive == true);

    if (this.isrollover && !control) {
      this.isLineActive = !this.isLineActive;
    }
    this.receive();
  }

  update() {
    this.color = this.value ? color(0, 255, 0) : color(255, 0, 0);
    var element = this.parent;

    if (currentGates.includes(element)) {
      if (!element.input1) {
        this.parent.input1 = this;
        if (!(element instanceof NotGate)) {
          this.y = this.y - 23;
          this.inputY = -23;
        } else {
          this.y = this.y - 10;
          this.inputY = -10;
        }
      } else if (!element.input2) {
        element.input2 = this;
        if (!(element instanceof NotGate)) {
          this.y = this.y + 3;
          this.inputY = 3;
        }
      }

      if (!element.output && !this.isInput) {
        this.parent.output = this;
        this.y = this.y - 9;
        this.inputY = -9;
      }
      this.isGateOutput = true;
    }

    this.x = this.parent.x + this.nodeXDecisive;
    this.y = this.parent.y + this.inputY;
  }

  drawLine() {
    if (this.isLineActive && !this.isInput) {
      let wire = new Wire(this, null);
      currentWires.push(wire);
      this.isLineActive = false;
    }
  }

  receive() {
    const element = currentWires.find((el) => el.isLineActive == true);
    this.rollover();
    if (this.isInput && element && this.isrollover) {
      if (!this.wire) {
        element.setEndNode(this);
      } else {
        this.isLineActive = false;
      }
    }
  }
}
