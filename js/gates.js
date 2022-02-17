class Input extends Draggable {
    constructor(value, x, y) {
        super(x, y)
        this.value = value;
        this.x = x;
        this.y = y;

    }

    show() {
        fill(this.value ? "green" : "red")
        ellipse(this.x, this.y, 0, 0);
        fill(255)

    }

    changeValue() {
        if (this.rollover) {
            this.value = !this.value

        }
    }

    draw() {
        this.show();
        this.over();
        this.update();

    }

    

}

class Output extends Draggable {
    constructor(value, x, y) {
        super(x, y)
        this.value = value;
        this.x = x;
        this.y = y;

    }


    show() {
        fill(this.value ? "green" : "red")
        stroke(0);
        ellipse(this.x, this.y, 0, 0);
        fill(255)
    }

    draw() {
        this.show();
        this.over();
        this.update();


    }

}

class NotGate extends Draggable{
    constructor(x,y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.input1 = null;
        this.output = null;
    }

    show() {
        ellipse(this.x, this.y, 80, 80);
        stroke(0)
        text("Not", this.x - 20, this.y);


    }

    updateOutput(){
        if(this.input1 && this.output){
            this.output.value = !this.input1.value

        }
        
    }

    draw() {
        this.show();
        this.over();
        this.update();
        this.updateOutput()

    }
}

class Gates extends Draggable {
    constructor(x, y,type) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.input1 = null;
        this.input2 = null;
        this.output = null;
        this.type = type
    }

    show() {
        ellipse(this.x, this.y, 80, 80);
        stroke(0)
        text(this.type, this.x - 20, this.y);

    }

    updateOutput(){
        
        if(this.input1 && this.input2){
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
                    result = (this.input1.value ^ this.input2.value);
                    break;
                case "xnorGate":
                    result = !(this.input1.value ^ this.input2.value);
                    break;
            
                default:
                    break;
            }
            this.output.value = result
        }
    }

    draw() {
        this.show();
        this.over();
        this.update();
        this.updateOutput()

    }
}

