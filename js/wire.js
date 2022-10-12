class Wire {
  constructor(startNode, endNode) {
    (this.startNode = startNode),
      (this.endNode = endNode),
      (this.isLineActive = true),
      (this.x = this.startNode.x),
      (this.y = this.startNode.y),
      (this.nodeXDecisive = this.startNode.nodeXDecisive),
      (this.isLineDone = false),
      (this.width = 8),
      (this.color = 0);
  }

  setEndNode(node) {
    this.endNode = node;
    this.isLineActive = false;
    this.isLineDone = true;
  }

  commited() {
    this.endNode.value = this.startNode.value;
    this.endNode.hasWire = true;
    this.startNode.hasWire = true;
  }

  cancelled() {
    let d = dist(this.startNode.x, this.startNode.y, mouseX, mouseY);

    if (d < 25 && this.isLineActive) {
      const index = currentWires.indexOf(this);
      if (index > -1) {
        currentWires.splice(index, 1);
      }
      this.startNode.isLineActive = false;
      this.startNode.hasWire = false;
      if (this.endNode) {
        this.endNode.isLineActive = false;
        this.endNode.hasWire = false;
      }
      this.isLineActive = false;
    }
  }

  isMouseOver() {
    //https://github.com/drendog/Logic-Circuit-Simulator

    let distance = [];
    if (!this.startNode || !this.endNode) return;

    distance.push(dist(this.startNode.x, this.startNode.y, mouseX, mouseY));
    distance.push(dist(this.endNode.x, this.endNode.y, mouseX, mouseY));

    const wireLength = dist(
      this.startNode.x,
      this.startNode.y,
      this.endNode.x,
      this.endNode.y
    );

    if (
      distance[0] + distance[1] >= wireLength - this.width / (10 * 2) &&
      distance[0] + distance[1] <= wireLength + this.width / (10 * 2)
    ) {
      this.color = color(100, 100, 255);

      return true;
    } else {
      this.color = 0;
    }
  }

  destroy(type = "natural") {
    if ((this.isMouseOver() && deleteMode) || type === "force") {
      const index = currentWires.indexOf(this);
      if (index > -1) {
        currentWires.splice(index, 1);
      }

      this.startNode.isLineActive = false;
      this.startNode.hasWire = false;
      this.endNode.isLineActive = false;
      this.endNode.hasWire = false;
      this.endNode.value = false;
      this.isLineActive = false;
    }
    this.cancelled();
  }

  draw() {
    if (!this.startNode.parent.isShown) {
      return;
    }
    if (this.isLineActive || this.isLineDone) {
      let startX = this.startNode.x;
      let startY = this.startNode.y;
      let targetX = this.isLineDone ? this.endNode.x : mouseX;
      let targetY = this.isLineDone ? this.endNode.y : mouseY;
      fill(255, 255, 255, 1);
      stroke(this.color, this.color, this.color);
      bezier(
        startX,
        startY,
        startX + this.nodeXDecisive,
        startY,
        targetX - this.nodeXDecisive,
        targetY,
        targetX,
        targetY
      );
      stroke(0);
    }
    this.isLineDone && this.commited();
    this.update();
    this.isMouseOver();
  }

  update() {
    if (this.startNode.parent.dragging) {
      this.x =
        (this.endNode ? this.endNode.x : mouseX) +
        this.nodeXDecisive +
        this.startNode.parent.offsetX;
      this.y =
        (this.endNode ? this.endNode.y : mouseY) +
        this.startNode.parent.offsetY;
    }
  }
}
