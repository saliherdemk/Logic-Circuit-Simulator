class Select {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.selectMode = false;
    this.selected = [];
  }

  setInitialCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  clearSelected() {
    this.selected = [];
  }

  draw() {
    if (this.selectMode && !isMenuOpen) {
      let w = mouseX - this.x;
      let h = mouseY - this.y;

      fill(173, 216, 239, 50);
      stroke(173, 216, 230);
      strokeWeight(1);
      rect(this.x, this.y, w, h);
      stroke(0);
      fill(255, 255, 255, 0);
      this.addSelectedGates(w, h);
      strokeWeight(4);
    }
  }
  released() {
    this.selects = [];
    this.selectMode = false;
  }

  addSelectedGates(w, h) {
    let all = [
      ...currentGates,
      ...currentIOs,
      ...currentNodes,
      ...currentWires,
      ...currentComponents,
    ];
    let absX = mouseX > this.x ? this.x : mouseX;
    let absY = mouseY > this.y ? this.y : mouseY;

    w = Math.abs(w);
    h = Math.abs(h);
    for (let i = 0; i < all.length; i++) {
      const element = all[i];
      if (!element.isShown) {
        continue;
      }
      //https://editor.p5js.org/eric/sketches/HkW2DRKnl
      if (
        element.x < absX + w &&
        element.x + element.width > absX &&
        element.y < absY + h &&
        element.height + element.y > absY
      ) {
        this.selected.includes(element) ? null : this.selected.push(element);
        element.rollover = true;
      } else {
        const index = this.selected.indexOf(element);
        if (index > -1) {
          this.selected.splice(index, 1);
        }
      }
    }
  }
}
