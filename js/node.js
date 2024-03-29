class Node {
  constructor(value, parent, isOutput) {
    this.value = value;
    this.parent = parent;
    this.nodeXDecisive = isOutput ? -50 : 50;
    this.wire = null;
    this.x = this.parent.x + this.nodeXDecisive;
    this.y = this.parent.y;
    this.isOutput = isOutput;
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
    var inputs = this.parent.clonedInputs;
    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element === this) {
          this.y += i * 30 + 10;
          this.x += 20;
        }
      }
    }

    var outputs = this.parent.clonedOutputs;
    if (outputs) {
      for (let i = 0; i < outputs.length; i++) {
        const element = outputs[i];
        if (element === this) {
          this.y += i * 30 + 10;
          this.x += 80;
        }
      }
    }
  }

  draw() {
    if (this.parent.isShown) {
      if (this.name) {
        drawText(
          this.name,
          this.isOutput ? this.x + 12 : this.x - 20,
          this.y - 10
        );
      }

      if (this.parent instanceof CustomGate) {
        line(this.x, this.y, this.isOutput ? this.x + 30 : this.x - 30, this.y);
      }
      fill(this.color);
      ellipse(this.x, this.y, this.isrollover ? 18 : 14);
      this.rollover();

      this.drawLine();
    }
    this.update();

    fill(255);
    this.rePositionForCustomGate();
  }

  changeValue() {
    if (this.isrollover && !this.isOutput && !this.isGateOutput) {
      (this.value = !this.value), (this.parent.value = this.value);
    }
  }

  active() {
    if (this.isrollover && !organizer.getActiveWire()) {
      this.isLineActive = !this.isLineActive;
    }
    this.receive();
  }

  update() {
    this.color = this.value ? color(0, 255, 0) : color(255, 0, 0);
    var element = this.parent;

    if (organizer.getGates().includes(element)) {
      if (!element.input1) {
        this.parent.input1 = this;
        if (!(element instanceof NotGate)) {
          this.y = this.y - 23;
          this.inputY = -23;
        } else {
          this.y = this.y - 10;
          this.inputY = -10;
        }
      } else if (!element.input2 && !(element instanceof NotGate)) {
        element.input2 = this;
        this.y = this.y + 3;
        this.inputY = 3;
      }

      if (!element.output && !this.isOutput) {
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
    if (this.isLineActive && !this.isOutput) {
      let wire = new Wire(this, null);
      organizer.addWire(wire);
      this.isLineActive = false;
    }
  }

  receive(force = false) {
    const element = organizer.getActiveWire();
    this.rollover();
    if ((this.isOutput && element && this.isrollover) || force) {
      if (!this.wire) {
        element.setEndNode(this);
      } else {
        this.isLineActive = false;
      }
    }
  }
}
