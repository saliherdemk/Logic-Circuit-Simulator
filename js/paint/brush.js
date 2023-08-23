class Brush {
  constructor() {
    this.size = 5;
    this.color = color(0, 0, 0);
    this.active = false;
    this.isDrawing = false;
    this.isEraserActive = false;
    this.drawings = [];
  }

  setColor(clr) {
    this.color = clr;
    console.log(this.drawings);
  }

  setSize(size) {
    this.size = size;
  }

  openEraser() {
    this.isEraserActive = true;
  }

  closeEraser() {
    this.isEraserActive = false;
  }

  toggleActive() {
    this.active = !this.active;
    return this.active;
  }

  openIsDrawing() {
    this.isDrawing = true;
  }

  closeIsDrawing() {
    this.isDrawing = false;
  }

  clear() {
    this.drawings = [];
  }

  erase(line) {
    this.drawings = this.drawings.filter((drawing) => drawing !== line);
  }

  update() {
    this.drawings.push(
      new Drew(pmouseX, pmouseY, mouseX, mouseY, this.color, this.size)
    );
  }
}
