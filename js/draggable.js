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
    this.isSelected = false;
  }

  selectedControl() {
    this.isSelected = select.isIncludes(this);
  }

  over() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    let diffX = mouseX - this.x;
    let diffY = mouseY - this.y;
    if (this.isCustom) {
      this.rollover =
        diffX >= -40 &&
        diffX <= 140 &&
        diffY >= -10 &&
        diffY <= this.inputs.length * 30 + 30;
      return;
    }

    this.rollover = d < 40 && d > 0;
  }

  update() {
    var yLimit = isComponentOpen ? 100 : 30;
    this.x = this.x > width ? width : this.x < 20 ? 20 : this.x;
    this.y = this.y > height ? height - 40 : this.y < yLimit ? yLimit : this.y;
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
      let selected = select.getSelected();
      for (let i = 0; i < selected.length; i++) {
        const element = selected[i];
        if (element == this) {
          continue;
        }
        let a = element.x - this.x;
        let b = element.y - this.y;
        element.x = mouseX + a + this.offsetX;
        element.y = mouseY + b + this.offsetY;
      }
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  pressed() {
    if (!this.isShown) {
      return;
    }
    if (this.rollover) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      select.deActivateSelectMode();
    }
  }

  released() {
    this.dragging = false;
  }

  specifyElement() {
    if (this.rollover && this.isShown) {
      if (this instanceof CustomGate) {
        compForNameChange = this;
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
