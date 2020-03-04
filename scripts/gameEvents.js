//function called when the user clicks the pause button, or clicks "p"
function pauseGame() {
    if (!gameOver) {//making sure the game is not over yet
        paused = !paused;//toggling the pause value
        canvasContext.fillStyle = "rgb(160, 159, 159,0.5)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);//drawing translucent gray background
        canvasContext.fillStyle = "white";
        canvasContext.font = "80px minecraft";
        canvasContext.fillText("PAUSED", canvas.width / 2 - 160, canvas.height / 2);//writing "paused"
    }
}


//function called when the user picks a dino to play with
function startGame() {
    //resetting the players coords
    playerStartX = canvas.width / 2 - playerWidth / 2;
    playerStartY = canvas.height / 2 - playerHeight / 2;
    player.x = playerStartX;
    player.y = playerStartY;
    //resetting the firepoint coords
    firePointX = playerStartX + playerWidth / 2;
    firePointY = playerStartY - gunHeight / 2;
    bullets = [];//reseting bullets array
    enemySpawnDelay = 0;//resetting spawn delay
    gunRotate = 0;//resetting the gun rotate angle
    fireDelay = 0;//resetting fire delay
    enemies = [];//resetting enemies array
    paused = false;//resetting pause game value
    enemySpawnRate = 260;//resetting spawn rate
    //resetting kill counters
    enemy0KillCount = 0;
    enemy1KillCount = 0;
    enemy2KillCount = 0;
    //resetting special power variables
    lightningTimeCounter = 0;
    blastLightning = false;
    freezeTimeCounter = 0;
    canFreeze = false;
    ableToFire = false;
    fireTime = fps * 5;
    fireCounter = 0;
    powerTimer = 0;

    enemySpawnRateDecreaseDelay = 0;//resetting spawn decrease delay
    gameOver = false;//turning game over back to false
    userScore = 0;//resetting score
    player.health = playerHealth;//resetting health
    playGame = window.setInterval(updateGame, 1000 / fps);//creating a set interval to update game 60 times per second
    document.getElementById("powerBar").style.backgroundColor = "red";//setting power bar colour to red
}


function endGame() {//called when player dies
    //setting all hearts to empty in stats box
    playerLifeDiv.innerHTML = "";
    for (i = 0; i < playerHealth; i++) {
        playerLifeDiv.innerHTML += "<img src='images/emptyHeart.png' width='45' height='45'>" + " ";
    }
    //setting game over to true
    gameOver = true;
    //bringing in game over menu to dislay score and high score
    document.getElementById("gameOverMenuContainer").style.marginTop = "125px";
    document.getElementById("playerScore").innerHTML = userScore;
    if (userScore > userHighScore) {//if the user got a new high score
        userHighScore = userScore;
        document.getElementById("userHighScore").innerHTML = "Score: " + userHighScore;
    }
    document.getElementById("playerHighScore").innerHTML = userHighScore;
    clearInterval(playGame);//stopping the game from updating

}

function returnToHomePage() {//called when the player clicks the "ok" button when the game ends to return to menu
    document.getElementById("gameOverMenuContainer").style.marginTop = "-500px";
    document.getElementById("welcomePage").style.height = "100%";
    document.getElementById("welcomePage").style.zIndex = "10";
    document.getElementById("welcomePage").style.opacity = "1";

}

function quitGame() {//called when the user clicks the "menu" button mid game and exits
    gameOver = true;
    clearInterval(playGame);
    document.getElementById("gameOverMenuContainer").style.marginTop = "-500px";
    document.getElementById("welcomePage").style.height = "100%";
    document.getElementById("welcomePage").style.zIndex = "10";
    document.getElementById("welcomePage").style.opacity = "1";

}
