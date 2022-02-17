function setup() {
    createCanvas(windowWidth, windowHeight - 100);
    strokeWeight(4)
}

function draw() {
    background(220);
    
    drawForElements(currentInputs)
    drawForElements(currentGates)
    drawForElements(currentOutputs)
    drawForElements(currentWires)
    drawForElements(currentNodes)

}

function mousePressed() {
    pressedActionForElements(currentInputs)
    pressedActionForElements(currentGates)
    pressedActionForElements(currentOutputs)

    for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i].active()

    }

    for (let i = 0; i < currentWires.length; i++) {
        currentWires[i].destroy()

    }
}

function mouseReleased() {
    releasedActionForElements(currentInputs)
    releasedActionForElements(currentGates)
    releasedActionForElements(currentOutputs)

}

function doubleClicked() {
    changeValueActionForElements(currentInputs)
    changeValueActionForElements(currentNodes)
    
}