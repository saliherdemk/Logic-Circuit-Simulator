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
    drawForElements(selects)

    drawForElements(currentGates)
    drawForElements(currentIOs)
    drawForElements(currentWires)
    drawForElements(currentNodes)

}

function mousePressed() {
    selectMode = true

    selected.find(el => el.rollover) ? null : selected = []
    
    pressedActionForElements(currentIOs)
    pressedActionForElements(currentGates)

    for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i].active()

    }

    for (let i = 0; i < currentWires.length; i++) {
        currentWires[i].destroy()

    }
    let sel = new Select(mouseX,mouseY,0,0,true)
    selects.push(sel)

}

function mouseReleased() {
    releasedActionForElements(currentIOs)
    releasedActionForElements(currentGates)
    releasedActionForElements(selects)

}

function doubleClicked() {
    changeValueActionForElements(currentNodes)
    changeNameActionForElements()
    
}