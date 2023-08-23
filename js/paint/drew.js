class Drew {
  constructor(x1, y1, x2, y2, clr, size) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    (this.color = clr), (this.size = size);
    this.rollover = false;
    this.toBeDeleted = false;
  }

  update() {
    let size = paint.size;
    let d1 = dist(mouseX, mouseY, this.x1, this.y1);
    let d2 = dist(mouseX, mouseY, this.x2, this.y2);
    let length = dist(this.x1, this.y1, this.x2, this.y2);

    if (d1 + d2 <= length + size / 2) {
      paint.erase(this);
    }
  }

  draw() {
    paint.isEraserActive && this.update();
    stroke(this.color);
    strokeWeight(this.size);
    line(this.x1, this.y1, this.x2, this.y2);
    strokeWeight(4);
    stroke(0);
  }
}
