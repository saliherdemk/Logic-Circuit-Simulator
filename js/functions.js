const deleteButton = document.querySelector(".delete-btn");
const ccgNameInput = document.querySelector("#ccg-inp");
const ccgSection = document.querySelector(".custom-gates");
const error = document.querySelector("#error");

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

function createCustomButton(props) {
  button = createButton(ccgNameInput.value);
  button.style("border", "2px solid black");
  button.style("position", "relative");
  button.style("height", "50px");
  button.style("width", "100%");
  button.style("margin-bottom", "30px");
  button.mousePressed(() => {
    generateCustomGate(props);
  });
  button.parent(ccgSection);
  ccgNameInput.value = "";
}

function createCustomGate() {
  if (!selected.length) {
    error.style.display = "block";
    ccgNameInput.value = "";
    setTimeout(() => {
      error.style.display = "none";
    }, 2000);
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
  customGates.push(cg);

  cg.changeName(ccgNameInput.value);
  closeCcg();
  createCustomButton(clones);
}

function closeCcg() {
  selectDiv.style.display = "none";
  isMenuOpen = false;
}
