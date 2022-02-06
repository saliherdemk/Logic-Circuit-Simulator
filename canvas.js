function setup() {
    createCanvas(windowWidth, windowHeight - 100);
}
  
function draw() {
    background(220);
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].show()
        currentInputs[i].over()
        currentInputs[i].update()
        
    }

    for (let i = 0; i < currentAndGates.length; i++) {
        currentAndGates[i].show()
        currentAndGates[i].over()
        currentAndGates[i].update()

    }

    for (let i = 0; i < currentOutputs.length; i++) {
        currentOutputs[i].show()
        currentOutputs[i].over()
        currentOutputs[i].update()

    }
}

function mousePressed(){
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].pressed()
    }

    for (let i = 0; i < currentAndGates.length; i++) {
        currentAndGates[i].pressed()
    }

    for (let i = 0; i < currentOutputs.length; i++) {
        currentOutputs[i].pressed()
    }
}

function mouseReleased() {
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].released()
    }
    for (let i = 0; i < currentAndGates.length; i++) {
        currentAndGates[i].released()
    }

    for (let i = 0; i < currentOutputs.length; i++) {
        currentOutputs[i].released()
    }
  }



function doubleClicked(){
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].changeValue()
    }
}

function dist(x1,y1,x2,y2){
    return ((x2 -x1) ** 2) + ((y2 - y1) ** 2)

}