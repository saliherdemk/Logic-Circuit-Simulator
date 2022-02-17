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

    delete(){
        if(this.rollover && deleteMode){
            const index = currentInputs.indexOf(this);
            if (index > -1) {
                currentInputs.splice(index, 1);
            }
            const index0 = currentOutputs.indexOf(this);
            if (index0 > -1) {
                currentOutputs.splice(index0, 1);
            }
            const index1 = currentGates.indexOf(this);
            if (index1 > -1) {
                currentGates.splice(index1, 1);
            }

            const wires = currentWires.filter(e => e.startNode.parent === this || e.endNode.parent === this)
            for (let i = 0; i < wires.length; i++) {
                const index = currentWires.indexOf(wires[i]);
                if (index > -1) {
                    wires[i].destroy("force")
                }
                
                
            }




            const nodes = currentNodes.filter(e => e.parent == this)
            for (let i = 0; i < nodes.length; i++) {
                const index = currentNodes.indexOf(nodes[i]);
                if (index > -1) {
                    currentNodes.splice(index, 1);
                }
                
                
            }
        }
    }
}
