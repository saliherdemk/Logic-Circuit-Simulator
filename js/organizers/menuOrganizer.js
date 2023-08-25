class MenuOrganizer {
  constructor() {
    this.menuIsOpen = false;
    this.componentIsOpen = false;
    this.elementForNameChange = null;
    this.compForNameChange = null;
  }

  // Right Click Menu
  isMenuOpen() {
    return this.menuIsOpen;
  }

  openMenu() {
    this.menuIsOpen = true;
  }

  closeMenu() {
    this.menuIsOpen = false;
  }

  // Looking inside of the component
  isComponentOpen() {
    return this.componentIsOpen;
  }

  openComponent() {
    this.componentIsOpen = true;
  }

  closeComponent() {
    this.componentIsOpen = false;
  }
  // Element for changing name
  getCurrentElementForNameChange() {
    return this.elementForNameChange;
  }

  setElementForNameChange(element) {
    this.elementForNameChange = element;
  }

  // Component for changing name
  getCurrentComponentForNameChange() {
    return this.compForNameChange;
  }

  setComponentForNameChange(component) {
    this.compForNameChange = component;
  }
}
