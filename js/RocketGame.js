var isPlaying = false;

var rocket = {x: winW / 2, y: 0.9 * winH, speed: 0, rotationspeed: 0, health: 1};
var rocketimage;
var darkbackground;
var backgroundcolor;
var text;
var flyheight = 0;
var background_r = 30;
var background_g = 144;
var background_b = 255;
var clouds = new Array();
var jets = new Array();
var birds = new Array();
var hs1 = new Audio('audio/hit1.mp3');
var hs2 = new Audio('audio/hit2.mp3');
var hs3 = new Audio('audio/hit3.mp3');

function play() {
    isPlaying = true;
    clearScreen();
    initBackground();
    drawRocket();
    document.addEventListener( "keydown", keyboardEvent, true);
    flyRocket();
    drawText();
    window.ondevicemotion = function(event) {
        accelerationX = event.accelerationIncludingGravity.x;
        if (accelerationX > 0) {
            if(rocketimage.rotation + 5 <= 45 && rocketimage.rotation +5 >= -45){
                rocketimage.rotation += accelerationX;
            }
        }
        else if (accelerationX < 0) {
            if(rocketimage.rotation -5 <= 45 && rocketimage.rotation -5 >= -45){
                rocketimage.rotation += accelerationX;
            }
        }

    }    
    createjs.Ticker.addEventListener('tick', handleTick);
    createjs.Ticker.setFPS(60);
}

function drawRocket() {
    rocketimage = new createjs.Bitmap("images/fullrocket.png");
    rocketimage.scaleX = winW/1600;
    rocketimage.scaleY = winH/1162,5;
    rocket = {x: winW / 2 - (171*rocketimage.scaleX)/2, y: 1.2 * winH - (300*rocketimage.scaleY)/2, speed: 100, rotationspeed: 0, health: 100};
    rocketimage.x = rocket.x;
    rocketimage.y = rocket.y;
    rocketimage.regX = (171*rocketimage.scaleX)/2;
    rocketimage.regY = (300*rocketimage.scaleY)/2;
    stage.addChild(rocketimage);
}


function handleTick(event) {
    if (isPlaying && rocket.health > 0) {
        flyheight ++;
        if(rocketimage.y > (0.85 * winH - (300*rocketimage.scaleY)/2)){
            rocketimage.y--
        }
        if(rocketimage.rotation > 0 &&  rocketimage.x < 0.85*winW){
            rocketimage.x = rocketimage.x + rocketimage.rotation/10;
        }else if(rocketimage.rotation < 0 &&  rocketimage.x > 0.15*winW){
            rocketimage.x = rocketimage.x + rocketimage.rotation/10;
        }
        if((flyheight % 50) == 0){
            background_r--;
            background_g--;
            background_b--;
            backgroundcolor.graphics.clear().beginFill(createjs.Graphics.getRGB(background_r,background_g,background_b)).drawRect(0, 0, winW, winH);
        }
        for (var i = 0; i < clouds.length; i++) {
            if(clouds[i].y > winH){
                clouds.splice(i,1);
            }else{
                clouds[i].y = clouds[i].y + 7;
                clouds[i].x = clouds[i].x - rocketimage.rotation/10 + 1;

            }
        }
        for (var i = 0; i < jets.length; i++) {
            if(jets[i].x < rocketimage.x && jets[i].x + 600 > rocketimage.x && jets[i].y + 252 > rocketimage.y && jets[i].y+252 < rocketimage.y+10){
                rocket.health = rocket.health-10;
            }            
            if(jets[i].y > winH){
                jets.splice(i,1);
            }else{
                jets[i].y = jets[i].y + 9;
                jets[i].x = jets[i].x - rocketimage.rotation/10 + 2;
            }
        }
        for (var i = 0; i < birds.length; i++) {
            if(birds[i].x < rocketimage.x && birds[i].x + 156.4 > rocketimage.x && birds[i].y + 204.8 > rocketimage.y && birds[i].y+ 204.8< rocketimage.y+10){
                var randomsound = Math.random();
                var hitsound;
                if(randomsound < 0.33){
                    hitsound = hs1;
                }else if(randomsound < 0.66){
                    hitsound = hs2;
                }else{
                    hitsound = hs3;
                }
                rocket.health = rocket.health-10;
                hitsound.play();
            }  
            if(birds[i].y > winH){
                birds.splice(i,1);
            }else{
                birds[i].y = birds[i].y + 9;
                birds[i].x = birds[i].x - rocketimage.rotation/10 - 1;
            }
        }
        text.text = "ALTITUDE: " + flyheight + "m" + "\n" + "HEALTH: " + rocket.health + "\n" + "FPS: " + Math.round(createjs.Ticker.getFPS());
        stage.update();
    }
    if(rocket.health <= 0){
        var request = gapi.client.games.scores.submit(
            {leaderboardId: "abcdegfghijkl",
            score: flyheight        }
        );
        request.execute(function(response) {
          // Check to see if this is a new high score
        })
        isPlaying = false;
        createjs.Ticker.removeAllEventListeners();
        clearScreen();
        stage.update();
        drawGameOverScreen();
        flyheight = 0;
        background_r = 30;
        background_g = 144;
        background_b = 255;
        clouds = new Array();
        jets = new Array();
        birds = new Array();
    }
}

function keyboardEvent(e) {
    e = e || window.event;

    if (e.keyCode == '39') {
        if(rocketimage.rotation + 5 <= 45 && rocketimage.rotation +5 >= -45){
            rocketimage.rotation += 2.5;
        }
    }
    else if (e.keyCode == '37') {
        if(rocketimage.rotation -5 <= 45 && rocketimage.rotation -5 >= -45){
            rocketimage.rotation -= 2.5;
        }
    }
}

function drawText(){    
    text = new createjs.Text(flyheight, winH *0.05 + "px Arial", "#FFFFFF"); 
    text.x = winW*0.01;
    text.y = winH*0.05;
    text.textBaseline = "alphabetic";
    stage.addChild(text);
}

function initBackground(){
    backgroundcolor = new createjs.Shape();
    backgroundcolor.graphics.beginFill(createjs.Graphics.getRGB(background_r,background_g,background_b)).drawRect(0, 0, winW, winH);
    stage.addChild(backgroundcolor);
}

function flyRocket(){
    var cloudrandom = Math.random();
    if(cloudrandom < 0.2 && flyheight < 17000){
        var cloudrandom2 = Math.random();
        var cloudimage;
        if(cloudrandom2 < 0.25){
            cloudimage = new createjs.Bitmap("images/cloud1.png");
        }else if (cloudrandom2 < 0.50){
            cloudimage = new createjs.Bitmap("images/cloud2.png");
        }else if (cloudrandom2 < 0.75){
            cloudimage = new createjs.Bitmap("images/cloud3.png");   
        }else{
            cloudimage = new createjs.Bitmap("images/cloud4.png");
        }
        cloudimage.scaleX = winW/2400;
        cloudimage.scaleY = winH/1600,5;
        var randomx = (-1*winW) + (Math.random()*winW*2);
        cloudimage.x = randomx;
        cloudimage.y = -200;
        stage.addChild(cloudimage);
        clouds.push(cloudimage);
    }

    var obstaclerandom = Math.random();
    if(obstaclerandom < 0.01 && jets.length < 1 && flyheight > 7500 && flyheight < 12000){
        var obstacleimage = new createjs.Bitmap("images/plane.png");
        obstacleimage.scaleX = winW/1600;
        obstacleimage.scaleY = winH/1000;
        var randomx = (-1*winW) + (Math.random()*winW*2);
        obstacleimage.x = randomx;
        obstacleimage.y = -200;
        stage.addChild(obstacleimage);
        jets.push(obstacleimage);
    }else if(obstaclerandom > 0.90 && birds.length < 5){
        var data = {
            images: ["images/birdspritesheet.png"],
            frames: {width:156.4, height:204.8},
            animations: {fly:[0,21]}
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var bird = new createjs.Sprite(spriteSheet, "fly");
        bird.scaleX = winW/1600;
        bird.scaleY = winH/1000;
        var randomx = (-1*winW) + (Math.random()*winW*2);
        bird.x = randomx;
        bird.y = -200;
        stage.addChild(bird);
        birds.push(bird);
    }

    if(isPlaying){
        setTimeout(flyRocket,100);
    }
}

