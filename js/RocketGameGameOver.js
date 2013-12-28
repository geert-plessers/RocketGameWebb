function drawGameOverScreen(){
    var gameovertext = new createjs.Text("GAME OVER", winH / 15 + "px Arial", "#000000");
    gameovertext.x = winW / 2 - (gameovertext.getMeasuredWidth() / 2);
    gameovertext.y = winH *0.33 ;
    gameovertext.textBaseline = "alphabetic";
    stage.addChild(gameovertext);

	var menubutton = new createjs.Shape();
    menubutton.graphics.beginFill("#cccccc").drawRect(winW * 0.1, winH / 2, 0.8 * winW, winH / 10);
    stage.addChild(menubutton);
    var menutext = new createjs.Text("Back To Main Menu", winH / 15 + "px Arial", "#000000");
    menutext.x = winW / 2 - (menutext.getMeasuredWidth() / 2);
    menutext.y = winH / 2 + (menutext.getMeasuredHeight());
    menutext.textBaseline = "alphabetic";
    menubutton.addEventListener('click', drawMenu);
    menutext.addEventListener('click', drawMenu);
    stage.addChild(menutext);

    stage.update();
}