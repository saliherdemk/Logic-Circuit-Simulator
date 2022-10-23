const selectDiv = document.querySelector(".popup-click");
var currentIOs = [];
var currentGates = [];
var currentWires = [];
var currentNodes = [];
var currentComponents = [];
var selects = [];
var selected = [];

var prevStateStack = [];

var deleteMode = false;
var selectMode = false;
var isMenuOpen = false;
var isComponentOpen = false;

var elForNameChange = null;
var compForNameChange = null;

var components = [];

const deleteButton = document.querySelector(".delete-btn");
const ccgNameInput = document.querySelector("#ccg-inp");
const ccgSection = document.querySelector(".custom-gates");
const error = document.querySelector("#error");

const inp = document.getElementById("inp");

const topSection = document.querySelector(".top-section");
const compInp = document.getElementById("comp-inp");
const disabledBg = document.querySelector(".disabled-background");
