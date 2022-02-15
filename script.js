var currentInputs = []
var currentOutputs = []
var currentAndGates = []
var currentLines = []

function generateInput() {
    let input = new Input(0, 50, 200);
    currentInputs.push(input)
}

function generateOutput() {
    let output = new Output(0, 50, 200);
    currentOutputs.push(output)

}

function generateAndGate() {
    let andGate = new AndGate(1, 1, 50, 200);
    currentAndGates.push(andGate)

}



