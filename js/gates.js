class Input extends Draggable {
    constructor(value, x, y) {
        super(x, y)
        this.value = value;
        this.x = x;
        this.y = y;

    }

    show() {
        fill(255)
        strokeWeight(2)
        this.rollover ? stroke(173, 216, 230) :  noStroke()
        rect(this.x + 10, this.y - 10, 50, 20);
        stroke(0)
        fill(255)
        strokeWeight(4)
        line(this.x + 10,this.y,this.x + 50,this.y)

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
        fill(255)
        strokeWeight(2)
        this.rollover ? stroke(173, 216, 230) :  noStroke()
        rect(this.x - 50, this.y - 10, 40, 20);
        stroke(0)
        fill(255)
        strokeWeight(4)
        line(this.x - 10,this.y,this.x - 50,this.y)
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
        strokeWeight(2)
        this.rollover ? stroke(173, 216, 230) :  noStroke()
        rect(this.x - 55,this.y - 35,110,50)
        strokeWeight(4)
        stroke(0)
        notGate.resize(110,50)
        image(notGate,this.x - 55,this.y - 35)


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
        this.type = type,
        this.width = 110,
        this.height = 50,
        this.imgX = this.x - 55,
        this.imgY = this.y - 35 
    }

    show() {
        this.imgX = this.x - 55
        this.imgY = this.y - 35 
        switch (this.type) {
            case "andGate":
                strokeWeight(2)
                this.rollover ? stroke(173, 216, 230) :  noStroke()
                rect(this.imgX,this.imgY,this.width,this.height)
                strokeWeight(4)
                stroke(0)
                andGate.resize(this.width,this.height)
                image(andGate,this.imgX,this.imgY)

                break;
            case "orGate":
                orGate.resize(this.width,this.height)
                image(orGate,this.imgX,this.imgY)

                break;
            case "nandGate":
                nandGate.resize(this.width,this.height)
                image(nandGate,this.imgX,this.imgY)
                break;
            case "norGate":
                norGate.resize(this.width,this.height)
                image(norGate,this.imgX,this.imgY)
                break;
            case "xorGate":
                xorGate.resize(this.width,this.height)
                image(xorGate,this.imgX,this.imgY)
                break;
            case "xnorGate":
                xnorGate.resize(this.width,this.height)
                image(xnorGate,this.imgX,this.imgY)
                break;
        
            default:
                break;
        }
      
        

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

