class CustomGate extends Draggable  {
    constructor(components,x,y){
        super(x,y,true)
        this.x = x;
        this.y = y;
        this.components = components
        this.inputs = []
        this.outputs = []
    }

    setIO(){
        var inputs = []
        var outputs = []
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            if(element?.input1?.hasWire === false){
                inputs.push(element.input1)
            }
            if(element?.input2?.hasWire === false && !(element instanceof NotGate)){
                inputs.push(element.input2)
            }
            if(element?.output?.hasWire === false){
                outputs.push(element.output)
            }
        }
        this.inputs = inputs
        this.outputs = outputs
        this.pg = createGraphics(100,inputs.length * 20 + 20)


    }

    show(){
        for (let i = 0; i < this.inputs.length; i++) {
            const element = this.inputs[i];
            element.setPosition(this.x, this.y + (i * 20 + 20))
            element.draw()
        }
        for (let i = 0; i < this.outputs.length; i++) {
            const element = this.outputs[i];
            element.setPosition(this.x + 100, this.y + (i * 20 + 20))
            element.draw()
        }

    }

    draw(){
        this.pg.background(100);
        image(this.pg, this.x, this.y);
        var inputs = this.inputs
        var outputs = this. outputs
        // rect(this.x, this.y, 55, inputs.length * 20);
        this.show()
        this.over();
        this.update();


    }

}