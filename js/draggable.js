// https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
class Draggable {
  constructor(x, y, custom = false) {
    this.x = x;
    this.y = y;
    this.dragging = false;
    this.rollover = false;
    this.isCustom = custom;
    this.offsetX = 0;
    this.offsetY = 0;
    this.name = "";
    this.isShown = true;
    this.selected = false;
  }

  selectedControl() {
    this.selected = selected.includes(this);
  }

  over() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    let diffX = mouseX - this.x;
    let diffY = mouseY - this.y;
    if (this.isCustom) {
      this.rollover =
        diffX >= 0 &&
        diffX <= 100 &&
        diffY >= 0 &&
        diffY <= this.inputs.length * 20 + 20;
      return;
    }

    this.rollover = d < 40 && d > 0;
  }

  update() {
    if (this.isCustom) {
      const isFilled = currentComponents.find(
        (e) => dist(e.x, e.y, this.x, this.y) < 5 && e !== this && e.isShown
      );
      if (isFilled) {
        this.x = this.x + 120;
      }
    } else {
      const isFilled = currentGates.find(
        (e) => dist(e.x, e.y, this.x, this.y) < 5 && e !== this && e.isShown
      );
      if (isFilled) {
        this.y = this.y - 50;
      }
    }

    if (this.dragging) {
      for (let i = 0; i < selected.length; i++) {
        const element = selected[i];
        if (element == this) {
          continue;
        }
        let a = element.x - this.x;
        let b = element.y - this.y;
        if (mouseX > 20 && mouseX < windowWidth - 300) {
          element.x = mouseX + a + this.offsetX;
        }
        if (mouseY < windowHeight - 100 && mouseY > 70) {
          element.y = mouseY + b + this.offsetY;
        }
      }
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

    this.x =
      this.x > windowWidth - 300
        ? windowWidth - 300
        : this.x < 20
        ? 20
        : this.x;
    this.y =
      this.y > windowHeight - 100
        ? windowHeight - 100
        : this.y < 70
        ? 70
        : this.y;
  }

  pressed() {
    if (!this.isShown) {
      return;
    }
    if (this.rollover) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      selectMode = false;
    }
  }

  released() {
    this.dragging = false;
  }

  specifyElement() {
    if (this.rollover && this.isShown) {
      if (this instanceof CustomGate) {
        gateForNameChange = this;
        openCompShownMode(this.clones, this.name);
      } else {
        elForNameChange = this;
        openPopup();
      }
    }
  }

  changeName(name) {
    this.name = name;
  }

  delete(type = "natural") {
    if ((this.rollover && deleteMode) || type == "force") {
      const index = currentIOs.indexOf(this);
      if (index > -1) {
        currentIOs.splice(index, 1);
      }

      const index1 = currentGates.indexOf(this);
      if (index1 > -1) {
        currentGates.splice(index1, 1);
      }

      const index2 = currentComponents.indexOf(this);
      if (index2 > -1) {
        currentComponents.splice(index2, 1);
      }

      const wires = currentWires.filter(
        (e) => e.startNode.parent === this || e.endNode.parent === this
      );
      for (let i = 0; i < wires.length; i++) {
        const index = currentWires.indexOf(wires[i]);
        if (index > -1) {
          wires[i].destroy("force");
        }
      }

      const nodes = currentNodes.filter((e) => e.parent == this);
      for (let i = 0; i < nodes.length; i++) {
        const index = currentNodes.indexOf(nodes[i]);
        if (index > -1) {
          currentNodes.splice(index, 1);
        }
      }
    }
  }
}
