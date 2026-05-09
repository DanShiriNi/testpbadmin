// Инициализация констант

const canvasContainer = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");
const colorPalletBtn = document.getElementById("palette-button");
const colorPalletDropdown = document.getElementsByClassName("color_palette_dropdown")[0];
const colorPallet = document.getElementById("color-pallete");
const backBtn = document.getElementById("back-button");
const forwardBtn = document.getElementById("forward-button");
const saveBtn = document.getElementById("save-button");
const toolContainer = document.querySelector(".tool_container");

let selectedColor = "#ffffff";
let scale = 8;
let translateX = 0;
let translateY = 0;

let history = [[]];
let historyIndex = 0;
let currentPixels = [];

let baseImageData = null;

let imgWidth = 0;
let imgHeight = 0;
const ctx = canvas.getContext("2d");
let baseImage = null;

let isDragging = false;
let isClick = true;
let startX = 0;
let startY = 0;
let clientX = 0;
let clientY = 0;
let startTransX = 0;
let startTransY = 0;

const TAP_THRESHOLD = 10;

const colors = [
    "#ffffff", "#000000", "#ff0000", "#ff6a00",
    "#ffd800", "#00ff21", "#00ffff", "#0026ff",
    "#b200ff", "#00137f", "#007f0e", "#7f6a00",
    "#7f3300", "#7f0000", "#808080", "#404040",
    "#ff00dc", "#0094ff", "#5b7f00", "#7f0037",
    "#57007f", "#21007f", "#7f006e", "#ff006e",
    "#b6ff00", "#edbfa5", "#004a7f", "#267f00",
    "#007f46", "#00ff90", "#4cff00", "#007f7f",
    "#4800FF"
];

let tg = window.Telegram.WebApp;