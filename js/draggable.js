// https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
class Draggable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.name = '';
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
            for (let i = 0; i < selected.length; i++) {
                const element = selected[i];
                if(element == this){continue}
                let a = element.x - this.x
                let b = element.y - this.y
                element.x = mouseX + a + this.offsetX
                element.y = mouseY + b + this.offsetY
                
            }
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }

        let united = [...currentGates, ...currentIOs]

        const oversea = united.find(e => e.x > width || e.y < 0 || e.y > height || e.x < 0)

        if (oversea) {
            this.delete("force")
        }
    }


    pressed() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 40) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            selectMode = false

        }

    }

    released() {
        this.dragging = false;
    }

    specifyElement(){
        if(this.rollover){
            elForNameChange = this
            openPopup()


        }
    }

    changeName(name){
        this.name = name
    }

    delete(type = "natural") {
        if ((this.rollover && deleteMode) || type == "force") {
            const index = currentIOs.indexOf(this);
            if (index > -1) {
                currentIOs.splice(index, 1);
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
