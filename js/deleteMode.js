class DeleteMode {
  constructor() {
    this.isDeleteModeOn = false;
    this.isActive = false;
  }

  toggleDeleteMode() {
    this.isDeleteModeOn = !this.isDeleteModeOn;
    this.isDeleteModeOn
      ? deleteButton.classList.add("delete-on")
      : deleteButton.classList.remove("delete-on");
  }

  isOn() {
    return this.isDeleteModeOn;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  isActivated() {
    return this.isActive;
  }
}
