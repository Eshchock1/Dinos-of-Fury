
function pauseGame() {
    if (!gameOver) {
        paused = !paused;
        canvasContext.fillStyle = "rgb(160, 159, 159,0.5)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "white";
        canvasContext.font = "80px minecraft";
        canvasContext.fillText("PAUSED", canvas.width / 2 - 160, canvas.height / 2);
    }
}



function startGame() {
    playerStartX = canvas.width / 2 - playerWidth / 2;
    playerStartY = canvas.height / 2 - playerHeight / 2;
    player.x = playerStartX;
    player.y = playerStartY;
    firePointX = playerStartX + playerWidth / 2;
    firePointY = playerStartY - gunHeight / 2;
    bullets = [];
    enemySpawnDelay = 0;
    gunRotate = 0;
    fireDelay = 0;
    enemies = [];
    paused = false;
    enemySpawnRate = 260;
    enemy0KillCount = 0;
    enemy1KillCount = 0;
    enemy2KillCount = 0;
    lightningTimeCounter = 0;
    blastLightning = false;
    freezeTimeCounter = 0;
    canFreeze = false;
    ableToFire = false;
    fireTime = fps * 5;
    fireCounter = 0;
    enemySpawnRateDecreaseDelay = 0;
    powerTimer = 0;
    gameOver = false;
    userScore = 0;
    player.health = playerHealth;
    gameOver = false;
    playGame = window.setInterval(updateGame, 1000 / fps);
}


function endGame() {
    playerLifeDiv.innerHTML = "";
    for (i = 0; i < playerHealth; i++) {

        playerLifeDiv.innerHTML += "<img src='images/emptyHeart.png' width='45' height='45'>" + " ";
    }
    gameOver = true;
    document.getElementById("gameOverMenuContainer").style.marginTop = "125px";
    document.getElementById("playerScore").innerHTML = userScore;
    if (userScore > userHighScore) {
        userHighScore = userScore;
        document.getElementById("userHighScore").innerHTML = "Score: " + userHighScore;
    }
    document.getElementById("playerHighScore").innerHTML = userHighScore;
    clearInterval(playGame);

}

function returnToMenu() {
    document.getElementById("gameOverMenuContainer").style.marginTop = "-500px";
    document.getElementById("welcomePage").style.height = "100%";
}

function quitGame() {
    gameOver = true;
    clearInterval(playGame);
    document.getElementById("gameOverMenuContainer").style.marginTop = "-500px";
    document.getElementById("welcomePage").style.height = "100%";
}
