
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
    
    drawForElements(currentGates)
    drawForElements(currentIOs)
    drawForElements(currentWires)
    drawForElements(currentNodes)

}

function mousePressed() {
    pressedActionForElements(currentIOs)
    pressedActionForElements(currentGates)

    for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i].active()

    }

    for (let i = 0; i < currentWires.length; i++) {
        currentWires[i].destroy()

    }
}

function mouseReleased() {
    releasedActionForElements(currentIOs)
    releasedActionForElements(currentGates)

}

function doubleClicked() {
    changeValueActionForElements(currentNodes)
    
}