window.onload = init;
var stage;
var winW, winH;
var accelerationX;

function init() {
    window.addEventListener('resize', doLayout, false);
    doLayout(document);
    stage = new createjs.Stage("canvas");
    drawMenu();
}

function doLayout(event) {
    var windowHeight = window.innerHeight;
    document.body.style.height = windowHeight + "px";
    winW = window.innerWidth;
    winH = window.innerHeight;
    var canvas = document.getElementById('canvas');
    canvas.width = winW;
    canvas.height = winH;
}

function clearScreen(){
    stage.removeAllChildren();
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#FFFFFF").drawRect(0, 0, winW, winH);
    stage.addChild(shape);
}