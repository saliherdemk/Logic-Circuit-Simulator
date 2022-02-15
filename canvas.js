function setup() {
    createCanvas(windowWidth, windowHeight - 100);
}

function draw() {
    background(220);
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].draw()

    }

    for (let i = 0; i < currentAndGates.length; i++) {
        currentAndGates[i].draw()

    }

    for (let i = 0; i < currentOutputs.length; i++) {
        currentOutputs[i].draw()


    }
}

function mousePressed() {
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].pressed()
        currentInputs[i].active()

    }

    for (let i = 0; i < currentAndGates.length; i++) {
        currentAndGates[i].pressed()
    }

    for (let i = 0; i < currentOutputs.length; i++) {
        currentOutputs[i].pressed()
        currentOutputs[i].active()

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


function doubleClicked() {
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].changeValue()
    }
}

function dist(x1, y1, x2, y2) {
    return ((x2 - x1) ** 2) + ((y2 - y1) ** 2)

}
