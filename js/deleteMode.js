class DeleteMode {
  constructor() {
    this.isOn = false;
    this.isActive = false;
  }

  toggleDeleteMode() {
    this.isOn = !this.isOn;
    return this.isOn;
  }

  getDeleteMode() {
    return this.isOn;
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
