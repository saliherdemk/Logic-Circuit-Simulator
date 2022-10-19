document.addEventListener("contextmenu", (event) => event.preventDefault());

function HashTable() {
  (this.hashes = {}), (this.id = 0);
}

HashTable.prototype = {
  constructor: HashTable,

  put: function (obj, value) {
    obj.id = this.id;
    this.hashes[this.id] = value;
    this.id++;
  },

  get: function (obj) {
    return this.hashes[obj.id];
  },
};

function drawForElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].draw();
  }
}

function pressedActionForElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].pressed();
    arr[i].delete();
  }
}

function releasedActionForElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].released();
  }
}

function changeValueActionForElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].changeValue();
  }
}

function changeNameActionForElements() {
  let all = [...currentGates, ...currentIOs, ...currentComponents];
  for (let i = 0; i < all.length; i++) {
    all[i].specifyElement();
  }
}

function toggleDeleteMode() {
  deleteMode = !deleteMode;
  deleteMode
    ? deleteButton.classList.add("delete-on")
    : deleteButton.classList.remove("delete-on");
}

function openPopup() {
  document.querySelector(".popup-container").style.display = "flex";
}

function closePopup() {
  inp.value = "";
  document.querySelector(".popup-container").style.display = "none";
}

function closeInformation() {
  document.querySelector(".info-container").style.display = "none";
}

function handlePopupInput() {
  var name = inp.value;
  elForNameChange.changeName(name);
  closePopup();
}

function dist(x1, y1, x2, y2) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}

function createCustomButton(clones) {
  var name = ccgNameInput.value;
  button = createButton(name);
  button.style("border", "2px solid black");
  button.style("position", "relative");
  button.style("height", "50px");
  button.style("width", "100%");
  button.style("margin-bottom", "30px");
  button.mousePressed(() => {
    generateCustomGate(clones, name);
  });
  button.parent(ccgSection);
  ccgNameInput.value = "";
}

function checkCanBeComponent() {
  var inputs = 0;
  var outputs = 0;
  var errMsg = "Select all connected gates";

  for (let i = 0; i < selected.length; i++) {
    const element = selected[i];

    if (element instanceof InputOutput) {
      element.type ? inputs++ : outputs++;
      continue;
    }

    if (element instanceof Wire) {
      continue;
    }

    if (element instanceof CustomGate) {
      for (let i = 0; i < element.inputs.length; i++) {
        const input = element.inputs[i];
        if (
          input.wire !== null &&
          (!selected.includes(input.wire?.startNode.parent) ||
            !selected.includes(input.wire?.endNode.parent))
        ) {
          return errMsg;
        }
      }

      for (let i = 0; i < element.outputs.length; i++) {
        const output = element.outputs[i];
        if (
          output.wire !== null &&
          (!selected.includes(output.wire?.startNode.parent) ||
            !selected.includes(output.wire?.endNode.parent))
        ) {
          return errMsg;
        }
      }
    } else {
      if (
        element.input1?.wire === null ||
        !selected.includes(element?.input1?.wire?.startNode?.parent) ||
        !selected.includes(element?.input1?.wire?.endNode?.parent) ||
        (element.input2
          ? element.input2?.wire === null ||
            !selected.includes(element?.input2?.wire?.startNode?.parent) ||
            !selected.includes(element?.input2?.wire?.endNode?.parent)
          : false) ||
        element.output?.wire === null ||
        !selected.includes(element?.output?.wire?.startNode?.parent) ||
        !selected.includes(element?.output?.wire?.endNode?.parent)
      ) {
        return errMsg;
      }
    }
  }
  return inputs && outputs
    ? true
    : "Be sure component has at least one input & output";
}

function clone(original = selected) {
  var myHash = new WeakMap();
  var wires = [];
  var newSelected = [];

  for (let i = 0; i < original.length; i++) {
    const element = original[i];
    if (element instanceof InputOutput) {
      newSelected.push(cloneIO(element, myHash));
    }
    if (element instanceof Gates || element instanceof NotGate) {
      newSelected.push(cloneGates(element, myHash));
    }
    if (element instanceof Wire) wires.push(element);
  }

  for (let i = 0; i < wires.length; i++) {
    const element = wires[i];
    var cloned = cloneWire(element, myHash, original !== selected);
    cloned && newSelected.push(cloned);
  }
  selected = newSelected;

  closeCcg();
  return newSelected;
}

function createCustomGate() {
  let response = checkCanBeComponent();
  if (response !== true) {
    error.innerText = response;
  }

  if (!selected.length) {
    error.innerText = "There is no any selected gates";
  }

  if (!ccgNameInput.value) {
    error.innerText = "Name your gate";
  }

  if (error.innerText) {
    error.style.display = "flex";
    ccgNameInput.value = "";
    return;
  }

  var clones = [];
  for (let i = 0; i < selected.length; i++) {
    var clone = _.clone(selected[i]);
    clones.push(clone);
    selected[i].isShown = false;
  }
  let cgX = selected[Math.floor(selected.length / 2)].x;
  let cgY = selected[Math.floor(selected.length / 2)].y;

  let cg = new CustomGate(clones, cgX, cgY);
  cg.setIO();
  currentComponents.push(cg);

  cg.changeName(ccgNameInput.value);
  createCustomButton(clones);
  closeCcg();
}

function closeCcg() {
  selectDiv.style.display = "none";
  error.innerText = "";
  ccgNameInput.value = "";
  error.style.display = "none";
  isMenuOpen = false;
}
