const selectDiv = document.querySelector(".popup-click");
var currentIOs = [];
var currentGates = [];
var currentWires = [];
var currentNodes = [];
var currentComponents = [];
var selects = [];
var selected = [];

var deleteMode = false;
var selectMode = false;
var isMenuOpen = false;

var elForNameChange = null;

var components = [];

const deleteButton = document.querySelector(".delete-btn");
const ccgNameInput = document.querySelector("#ccg-inp");
const ccgSection = document.querySelector(".custom-gates");
const error = document.querySelector("#error");

const inp = document.getElementById("inp");
