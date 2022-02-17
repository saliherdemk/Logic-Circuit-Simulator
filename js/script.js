var currentInputs = []
var currentOutputs = []
var currentGates = []
var currentWires = []
var currentNodes = []

var deleteMode = false

function generateInput() {
    let input = new Input(0, 50, 200);
    currentInputs.push(input);

    let node = new Node(0,input,false)
    currentNodes.push(node)
}

function generateOutput() {
    let output = new Output(0, 50, 200);
    currentOutputs.push(output)

    let node = new Node(0,output,true)
    currentNodes.push(node)

}

function generateANDGate() {
    let andGate = new Gates(50, 200,"andGate");
    currentGates.push(andGate)

    let input1 = new Node(0,andGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,andGate,true)
    currentNodes.push(input2)

    let output = new Node(0,andGate,false)
    currentNodes.push(output)
    
}

function generateNOTGate() {
    let notGate = new NotGate(50,200);
    currentGates.push(notGate)

    let input = new Node(0,notGate,true)
    currentNodes.push(input)

    let output = new Node(0,notGate,false)
    currentNodes.push(output)
    
}

function generateORGate() {
    let orGate = new Gates(50, 200,"orGate");
    currentGates.push(orGate)

    let input1 = new Node(0,orGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,orGate,true)
    currentNodes.push(input2)

    let output = new Node(0,orGate,false)
    currentNodes.push(output)
    
}

function generateNANDGate(){
    let nandGate = new Gates(50, 200,"nandGate");
    currentGates.push(nandGate)

    let input1 = new Node(0,nandGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,nandGate,true)
    currentNodes.push(input2)

    let output = new Node(0,nandGate,false)
    currentNodes.push(output)

}

function generateNORGate(){
    let norGate = new Gates(50, 200,"norGate");
    currentGates.push(norGate)

    let input1 = new Node(0,norGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,norGate,true)
    currentNodes.push(input2)

    let output = new Node(0,norGate,false)
    currentNodes.push(output)

}

function generateXORGate(){
    let xorGate = new Gates(50, 200,"xorGate");
    currentGates.push(xorGate)

    let input1 = new Node(0,xorGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,xorGate,true)
    currentNodes.push(input2)

    let output = new Node(0,xorGate,false)
    currentNodes.push(output)

}

function generateXNORGate(){
    let xnorGate = new Gates(50, 200,"xnorGate");
    currentGates.push(xnorGate)

    let input1 = new Node(0,xnorGate,true)
    currentNodes.push(input1)

    let input2 = new Node(0,xnorGate,true)
    currentNodes.push(input2)
    
    let output = new Node(0,xnorGate,false)
    currentNodes.push(output)

}
