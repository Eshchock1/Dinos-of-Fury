function updateGame() {
    if (!paused && !gameOver) {//ony updating the game if not paused or over
        canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);//drawing background

        for (i = 0; i < bullets.length; i++) {//looping through all bullets and drawing them
            currentBullet = bullets[i];
            canvasContext.drawImage(bulletImage, currentBullet.x, currentBullet.y, bulletWidth, bulletHeight);
        }

        for (i = 0; i < enemies.length; i++) {//looping through all enemies
            currentEnemy = enemies[i];
            if (currentEnemy.height < 60 * 0.8) { //making the spawn animation where they stretch into view, by increasing height gradually
                currentEnemy.movementSpeed = 0;
                currentEnemy.height += 4;
            }
            //drawing each enemy
            canvasContext.drawImage(enemySprites, currentEnemy.frame * 32, 0, 32, 32, currentEnemy.x - 4, currentEnemy.y, currentEnemy.width, currentEnemy.height);

            //drawing health bar for enemies
            canvasContext.fillStyle = "red";
            if (currentEnemy.health <= currentEnemy.constHealth / 2) {//changing health bar color to a darker shade when there is 50% or less health
                canvasContext.fillStyle = "#b2030d";
            }
            if (currentEnemy.health <= currentEnemy.constHealth / 4) {//changing health bar color even darker when there is 25% or less health
                canvasContext.fillStyle = "#7f0108";
            }
            //getting bar position and dimensions
            var barX = currentEnemy.x + enemyWidth / 2 - enemyHealthBarWidth * currentEnemy.constHealth / 2;
            var barY = currentEnemy.y - (enemyHealthBarHeight * 2);
            var barWidth = enemyHealthBarWidth * currentEnemy.constHealth * currentEnemy.health / currentEnemy.constHealth;
            //drawing enemy health bar
            canvasContext.fillRect(barX, barY, barWidth, enemyHealthBarHeight);
        }
        //drawing player
        canvasContext.drawImage(dinoSprites, player.frame * 24, 0, 24, 24, player.x - dinoOffsetX, player.y - dinoOffsetY, playerDrawSize, playerDrawSize);

        //drawing gun
        canvasContext.save(); // save current state of canvas
        canvasContext.translate(player.x + player.width / 2 - 5, player.y + player.height / 2 + 5);
        canvasContext.rotate(gunRotate);//rotating canvas based on mouse position
        canvasContext.drawImage(gunImage, 0, -5, gunWidth, gunHeight);//drawing rotated gun
        canvasContext.restore();// restoring previous state of canvas

        stats();//updating stats boards
        fireWall();//red dino super power
        lightningBlast();//yellow dino super power
        freezeEnemies();//blue dino super power

        player.fireDelay += 1;
        player.previousX = player.x;//keeping track of previous player X and Y values
        player.previousY = player.y;
        player.x += player.moveX;//moving player in X axis
        player.y += player.moveY;//moving player in Y axis
        firePointX += player.moveX; //moving firepoint X coorinate along with player
        firePointY += player.moveY;//moving firepoint Y coorinate along with player
        enemySpawnDelay += 1;
        enemySpawnRateDecreaseDelay += 1;
        //every second (when enemySpawnRateDecreaseDelay reaches 60), the enemy spawn rate is decreased to make the game faster
        if (enemySpawnRateDecreaseDelay >= 60) {
            enemySpawnRateDecreaseDelay = 0;//reseting value
            enemySpawnRate -= 1;//decreasing enemy spawn rate
        }

        if (powerTimer < 1200) {//increasing delay for using the dino special power, if it hasnt already reached its max
            powerTimer++;
        }
        else if (powerTimer == 1200) {//making the dino special power bar green, when the power recharge is complete, and the power can be used
            document.getElementById("powerBar").style.backgroundColor = "green";
        }

        changePlayerSprite();//changing the players sprite sets based on what action the player is doing (running, being injured, idling etc.)
        moveGun();//calculating the degree value for the rotaion of the gun
        spawnEnemies();//spawning in new enemies
        moveEnemies();//moving all enemies on the screen
        checkBulletCollision();//checking to see if any bullets have collided with any enemies
        checkEnemyCollision();//check to see if any enemies are within close attacking range of the player, so that they can attack the dino
        checkBorders();//making sure the player can not cross off the edges of the canvas
        moveBullets();//moving all bullets
        player.updateSprite();//updating the dino's sprites
        checkPlayerMotion();//checking for any player movement including:(facing left, facing right, running up, running down, running right, running left, etc.)
    }
}
