
function preload(){
    andGate = loadImage('./img/andGate.png')
    nandGate = loadImage('./img/nandGate.png')
    norGate = loadImage('./img/norGate.png')
    notGate = loadImage('./img/notGate.png')
    orGate = loadImage('./img/orGate.png')
    xnorGate = loadImage('./img/xnorGate.png')
    xorGate = loadImage('./img/xorGate.png')

}

function setup() {
    createCanvas(windowWidth, windowHeight - 100);
    strokeWeight(4)
}

function draw() {
    background(255);
    
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