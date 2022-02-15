class Draggable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    over() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 40) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }

    update() {

        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }


    pressed() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 40) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }

    }

    released() {
        this.dragging = false;
    }
}



class Input extends Draggable {
    constructor(value, x, y) {
        super(x, y)
        this.value = value;
        this.x = x;
        this.y = y;
        this.isLineActive = false

    }

    show() {
        fill(this.value ? "green" : "red")
        ellipse(this.x, this.y, 80, 80);
        fill(255)
        ellipse(this.x + 50, this.y, 50, 50);

    }

    changeValue() {
        if (this.rollover) {
            this.value = !this.value

        }
    }

    active() {
        let d = dist(mouseX, mouseY, this.x + 50, this.y);
        if (d < 25) {
            this.isLineActive = !this.isLineActive;

        }


    }

    drawLine() {
        if (this.isLineActive) {
            fill(255, 255, 255, 1)
            bezier(this.x + 50, this.y, this.x + 100, this.y, mouseX - 50, mouseY, mouseX, mouseY)
        }
    }

    draw() {
        this.show();
        this.over();
        this.update();
        this.drawLine()

    }

}

class Output extends Draggable {
    constructor(value, x, y) {
        super(x, y)
        this.value = value;
        this.x = x;
        this.y = y;
        this.isLineActive = false

    }

    active() {
        let d = dist(mouseX, mouseY, this.x - 50, this.y);
        if (d < 25) {
            this.isLineActive = !this.isLineActive;

        }


    }

    drawLine() {
        if (this.isLineActive) {
            fill(255, 255, 255, 1)
            bezier(this.x - 50, this.y, this.x - 100, this.y, mouseX + 50, mouseY, mouseX, mouseY)
        }
    }

    show() {
        fill(this.value ? "green" : "red")
        stroke(0);
        ellipse(this.x, this.y, 80, 80);
        fill(255)
        ellipse(this.x - 50, this.y, 50, 50);
    }

    draw() {
        this.show();
        this.over();
        this.update();
        this.drawLine()


    }

}

class AndGate extends Draggable {
    constructor(input1, input2, x, y) {
        super(x, y)
        this.x = x;
        this.y = y;
        this.input1 = input1;
        this.input2 = input2;
        this.output = input1 && input2;
    }

    show() {
        fill(255)
        ellipse(this.x, this.y, 80, 80);
        fill(0);
        text("And", this.x, this.y);
        stroke(0);

    }

    draw() {
        this.show();
        this.over();
        this.update();

    }
}