function drawMenu() {
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#277edf").drawRect(0, 0, winW, winH);
    stage.addChild(shape);

    var titletext1 = new createjs.Text("SUPER", winH / 12 + "px Arial", "#FFFFFF");
    titletext1.lineWidth = 0.5*winW;
    titletext1.x = winW / 2 - (titletext1.getMeasuredWidth() / 2);
    titletext1.y = winH / 20 + (titletext1.getMeasuredHeight());
    titletext1.textBaseline = "alphabetic";
    stage.addChild(titletext1);

    var titletext2 = new createjs.Text("ROCKET", winH / 10 + "px Arial", "#000000");
    titletext2.lineWidth = 0.5*winW;
    titletext2.x = winW / 2 - (titletext2.getMeasuredWidth() / 2);
    titletext2.y = winH / 20 + titletext1.getMeasuredHeight() + titletext2.getMeasuredHeight();
    titletext2.textBaseline = "alphabetic";
    stage.addChild(titletext2);


    var titletext3 = new createjs.Text("RAMPAGE", winH / 10 + "px Arial", "#FF0000");
    titletext3.lineWidth = 0.5*winW;
    titletext3.x = winW / 2 - (titletext3.getMeasuredWidth() / 2);
    titletext3.y = winH / 20 + titletext1.getMeasuredHeight() + titletext2.getMeasuredHeight() + titletext3.getMeasuredHeight();
    titletext3.textBaseline = "alphabetic";
    stage.addChild(titletext3);

    var playbutton = new createjs.Shape();
    playbutton.graphics.beginFill("#cccccc").drawRect(winW * 0.1, winH / 2, 0.8 * winW, winH / 10);
    stage.addChild(playbutton);
    var playtext = new createjs.Text("Play", winH / 15 + "px Arial", "#000000");
    playtext.x = winW / 2 - (playtext.getMeasuredWidth() / 2);
    playtext.y = winH / 2 + (playtext.getMeasuredHeight());
    playtext.textBaseline = "alphabetic";
    playbutton.addEventListener('click', startGameClick);
    playtext.addEventListener('click', startGameClick);
    stage.addChild(playtext);
/*
    var achievementbutton = new createjs.Shape();
    achievementbutton.graphics.beginFill("#cccccc").drawRect(winW * 0.1, winH / 2 + winH / 10 + 20, 0.8 * winW, winH / 10);
    stage.addChild(achievementbutton);
    var achievementstext = new createjs.Text("Achievements", winH / 15 + "px Arial", "#000000");
    achievementstext.x = winW / 2 - (achievementstext.getMeasuredWidth() / 2);
    achievementstext.y = winH / 2 + winH / 10 + 20 + (achievementstext.getMeasuredHeight());
    achievementstext.textBaseline = "alphabetic";
    stage.addChild(achievementstext);


    var highscoresbutton = new createjs.Shape();
    highscoresbutton.graphics.beginFill("#cccccc").drawRect(winW * 0.1, winH / 2 + winH / 10 * 2 + 40, 0.8 * winW, winH / 10);
    stage.addChild(highscoresbutton);
    var highscorestext = new createjs.Text("Highscores", winH / 15 + "px Arial", "#000000");
    highscorestext.x = winW / 2 - (highscorestext.getMeasuredWidth() / 2);
    highscorestext.y = winH / 2 + winH / 10 * 2 + 40 + (highscorestext.getMeasuredHeight());
    highscorestext.textBaseline = "alphabetic";
    stage.addChild(highscorestext);
*/
    stage.update();
}

function startGameClick(){
    play();
}