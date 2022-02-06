// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.offsetX = 0;
        this.offsetY = 0;
    }
  
    over() {
      let d = dist(mouseX,mouseY,this.x,this.y);
      if (d < 40) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    update() {
      // Adjust location if being dragged

      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }

  
    pressed() {
        let d = dist(mouseX,mouseY,this.x,this.y);
        if(d < 40){
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
        
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
    }
  }



class Input extends Draggable{
    constructor(value,x,y){
        super(x,y)
        this.value = value;
        this.x = x;
        this.y = y
    }

    show(){
        fill(this.value ? "green" : "red")
        stroke(0);
        ellipse(this.x,this.y,80,80);
    }

    changeValue(){
        if(this.rollover){
            this.value = !this.value

        }
    }

}

class Output extends Draggable{
    constructor(value,x,y){
        super(x,y)
        this.value = value;
        this.x = x;
        this.y = y
    }

    show(){
        fill(this.value ? "green" : "red")
        stroke(0);
        ellipse(this.x,this.y,80,80);
    }

}

class AndGate extends Draggable{
    constructor(input1, input2,x,y){
        super(x,y)
        this.x = x;
        this.y = y;
        this.input1 = input1;
        this.input2 = input2;
        this.output = input1 && input2;
    }

    show(){
        fill(255)
        ellipse(this.x,this.y,80,80);
        fill(0);
        text("And", this.x, this.y);
        stroke(0);


    }
}