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
  let all = [
    ...organizer.getGates(),
    ...organizer.getIOs(),
    ...organizer.getComponents(),
  ];
  for (let i = 0; i < all.length; i++) {
    all[i].specifyElement();
  }
}

function toggleDeleteMode() {
  organizer.getActiveWire()?.cancelled(true);
  deleteMode.toggleDeleteMode();
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
  menuOrganizer.getCurrentElementForNameChange().changeName(name);
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
  var connectErr = "Select all connected gates";
  var ioError = "Be sure component has at least one input & output";
  var wireError = "Select all wires which connecting your gates";
  var selected = select.getSelected();
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
      for (let i = 0; i < element.clonedInputs.length; i++) {
        const input = element.clonedInputs[i];
        if (!input.wire) return ioError;
        else if (!select.isIncludes(input.wire)) return wireError;
        if (
          !select.isIncludes(input.wire?.startNode.parent) ||
          !select.isIncludes(input.wire?.endNode.parent)
        ) {
          return connectErr;
        }
      }

      for (let i = 0; i < element.clonedOutputs.length; i++) {
        const output = element.clonedOutputs[i];
        if (!output.wire) return ioError;
        else if (!select.isIncludes(output.wire)) return wireError;

        if (
          !select.isIncludes(output.wire?.startNode.parent) ||
          !select.isIncludes(output.wire?.endNode.parent)
        ) {
          return connectErr;
        }
      }
    } else {
      var inp1W = element.input1?.wire;
      var inp2W = element.input2 ? element.input2.wire : true;
      var outW = element.output?.wire;

      var q = element instanceof NotGate ? false : !select.isIncludes(inp2W);

      if (!inp1W || !inp2W || !outW) return ioError;
      else if (!select.isIncludes(inp1W) || q || !select.isIncludes(outW))
        return wireError;

      var p =
        element instanceof NotGate
          ? false
          : !select.isIncludes(inp2W?.startNode?.parent) ||
            !select.isIncludes(inp2W?.endNode?.parent);

      if (
        !select.isIncludes(inp1W?.startNode?.parent) ||
        !select.isIncludes(inp1W?.endNode?.parent) ||
        p ||
        !select.isIncludes(outW?.startNode?.parent) ||
        !select.isIncludes(outW?.endNode?.parent)
      ) {
        return connectErr;
      }
    }
  }
  return true;
}

function clone(original = select.getSelected()) {
  if (!original.length) {
    closeMenu();
    return;
  }
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
    if (element instanceof CustomGate)
      newSelected.push(cloneCustomGate(element, myHash));

    if (element instanceof Wire) wires.push(element);
  }

  for (let i = 0; i < wires.length; i++) {
    const element = wires[i];
    var cloned = cloneWire(element, myHash, original !== select.getSelected());
    cloned && newSelected.push(cloned);
  }
  select.setSelected(newSelected);
  closeMenu();
  return newSelected;
}

function createCustomGate() {
  var selected = select.getSelected();
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

  let response = checkCanBeComponent();
  if (response !== true) {
    error.innerText = response;
    error.style.display = "flex";
    ccgNameInput.value = "";
    return;
  }

  let cgX = selected[Math.floor(selected.length / 2)].x;
  let cgY = selected[Math.floor(selected.length / 2)].y;

  let cg = new CustomGate(selected, cgX, cgY);
  cg.setIO();
  cg.hideComponents();
  organizer.addComponent(cg);

  cg.changeName(ccgNameInput.value);
  createCustomButton(selected);
  closeMenu();
  select.clearSelected();
}

function closeMenu() {
  popUpContainer.style.display = "none";
  error.innerText = "";
  ccgNameInput.value = "";
  error.style.display = "none";
  menuOrganizer.closeMenu();
}

function openCompShownMode(willShown) {
  menuOrganizer.openComponent();
  compInp.value = menuOrganizer.getCurrentComponentForNameChange().name;
  topSection.style.display = "flex";
  disabledBg.style.display = "block";
  let all = [
    ...organizer.getGates(),
    ...organizer.getIOs(),
    ...organizer.getWires(),
    ...organizer.getComponents(),
  ];

  var prevShown = [];
  var prevHidden = [];

  for (let i = 0; i < all.length; i++) {
    const element = all[i];
    element.isShown ? prevShown.push(element) : prevHidden.push(element);

    element.isShown = willShown.includes(element);
  }

  organizer.addState([
    prevShown,
    prevHidden,
    menuOrganizer.getCurrentComponentForNameChange(),
  ]);
}

function closeCompShownMode() {
  let all = [
    ...organizer.getGates(),
    ...organizer.getIOs(),
    ...organizer.getWires(),
    ...organizer.getComponents(),
  ];

  var state = organizer.popState();
  var willShown = state[0];
  var willHide = state[1];
  var stateStack = organizer.getStates();
  var gate = stateStack.length ? stateStack[stateStack.length - 1][2] : null;

  for (let i = 0; i < all.length; i++) {
    const element = all[i];
    if (willShown.includes(element)) element.isShown = true;
    if (willHide.includes(element)) element.isShown = false;
  }
  menuOrganizer.setComponentForNameChange(gate);
  compInp.value = menuOrganizer.getCurrentComponentForNameChange()?.name;
  if (!stateStack.length) {
    topSection.style.display = "none";
    disabledBg.style.display = "none";
    menuOrganizer.closeComponent();
  }
}

function changeCompName() {
  menuOrganizer.getCurrentComponentForNameChange().changeName(compInp.value);
  compInp.value = "";
  closeCompShownMode();
}

function drawText(name, x, y) {
  fill(111, 143, 175);
  noStroke();
  textSize(15);
  text(name, x, y);
  fill(255);
  stroke(0);
}

function drawLines() {
  paint.drawings.forEach((el) => {
    el.draw();
  });
}
