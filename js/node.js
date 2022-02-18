class Node{
    constructor(value,parent,isInput){
        this.value = value,
        this.parent = parent,
        this.nodeXDecisive = isInput? -50 : 50,
        this.hasWire = false,
        this.x = this.parent.x + this.nodeXDecisive,
        this.y = this.parent.y,
        this.isInput = isInput,
        this.isLineActive = false,
        this.inputY = 0,
        this.color = this.value? color(0,255,0) : color(255,0,0)
        this.isOutput = false
    }

    draw() {
        fill(this.color)
        ellipse(this.x,this.y, 15);
        this.drawLine()
        this.update()
        fill(255)
    }

    changeValue() {
        let d = dist(mouseX, mouseY, this.x, this.y);

        if (d < 7 && !this.isInput && !this.isOutput) {
            this.value = !this.value

        }
    }

    active() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        const control = currentWires.find(el => el.isLineActive == true)

        if (d < 7 && !control) {
            
            this.isLineActive = !this.isLineActive;

        }
        this.receive()
    }

    update() {
        this.color = this.value? color(0,255,0) : color(255,0,0)


        if(currentGates.includes(this.parent)){
            if(!this.parent.input1){
                this.parent.input1 = this
                if(!(this.parent instanceof NotGate)){
                    this.y = this.y -27
                    this.inputY = - 27
                } else{
                    this.y = this.y -10
                    this.inputY = -10
                }
                
            } else if(!this.parent.input2){
                this.parent.input2 = this
                if(!(this.parent instanceof NotGate)){
                    this.y = this.y + 5
                    this.inputY = 5
                }

            }

            if(!this.parent.output && !this.isInput){
                this.parent.output = this
                this.y = this.y - 9
                this.inputY =  - 9

            }
            this.isOutput = true

        }

        if (this.parent.dragging) {
            this.x = mouseX + this.nodeXDecisive + this.parent.offsetX;
            this.y = mouseY + this.inputY + this.parent.offsetY;
        }
    }

    drawLine() {
        if (this.isLineActive && !this.isInput) {
            let wire = new Wire(this,null)
            currentWires.push(wire)
            this.isLineActive = false
        }
    }

    receive(){
        const element = currentWires.find(el => el.isLineActive == true)
        let d = dist(mouseX, mouseY, this.x, this.y);
       

        if(this.isInput && element && d < 25){
            if(!this.hasWire){
                element.setEndNode(this)
                this.hasWire = true
            } else{
                this.isLineActive = false
            }
            
        }
    }
}

