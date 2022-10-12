const deleteButton = document.querySelector(".delete-btn");

const inp = document.getElementById("inp");

document.addEventListener("contextmenu", (event) => event.preventDefault());

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
  let all = [...currentGates, ...currentIOs, ...customGates];
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

function createCustomGate() {
  var clones = [];
  for (let i = 0; i < selected.length; i++) {
    var clone = _.clone(selected[i]);
    clones.push(clone);
  }
  let cg = new CustomGate(clones, 10, 10);

  cg.setIO();
  customGates.push(cg);

  for (let i = 0; i < currentGates.length; i++) {
    const element = currentGates[i];
    element.isShown = false;
  }

  for (let i = 0; i < currentIOs.length; i++) {
    const element = currentIOs[i];
    element.isShown = false;
  }
  closeCcg();
  elForNameChange = cg;
  openPopup();
}

function closeCcg() {
  selectDiv.style.display = "none";
}
