var deleteMode = false;
var isMenuOpen = false;
var isComponentOpen = false;

var elForNameChange = null;
var compForNameChange = null;

const popUpContainer = document.querySelector(".popup-click");
const deleteButton = document.querySelector(".delete-btn");
const ccgNameInput = document.querySelector("#ccg-inp");
const ccgSection = document.querySelector(".custom-gates");
const error = document.querySelector("#error");
const inp = document.getElementById("inp");
const topSection = document.querySelector(".top-section");
const compInp = document.getElementById("comp-inp");
const disabledBg = document.querySelector(".disabled-background");
const brushMenu = document.querySelector(".toggle-paint-menu");

var paint;
var select;
var organizer;
