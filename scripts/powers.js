//red dino special power
function fireWall() {
    if (ableToFireWall) {//this variable is set true when q is pressed, and the power regeneration time has passed
      powerTimer = 0;//reseting power regeration bar time
      document.getElementById("powerBar").style.backgroundColor = "red";//changing the bar color back to red
        if (fireCounter > fireTime) {//if the fire is done burning, then stop displaying the fire background, and set ableToFire to false
            fireCounter = 0;
            ableToFireWall = false;
            fireXpos = 0;
        }
        else {
            fireXpos -= 1.5;//moving the fire image on the bottom of the page
            canvasContext.fillStyle = "rgb(243, 114, 10,0.3)";
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);//drawing translucent red background
            canvasContext.drawImage(fireImage, fireXpos, 0);//drawing the fire image on the bottom of the screen
            fireCounter++;//keeping track of how much time the fire has been burning
            if (fireCounter % (fps / 2) == 0) {//every 0.5 of a second remove one health from all the enemies on the burn
                for (i = 0; i < enemies.length; i++) {
                    currentEnemy = enemies[i];
                    currentEnemy.health -= 1;
                    if (currentEnemy.health <= 0) {//if an enemy dies, call the kill function to remove it
                        killEnemy(currentEnemy.number, i);
                    }
                }
            }

        }
    }
}
//yellow dino special power
function lightningBlast() {
    if (blastLightning) {//this variable is set true when q is pressed, and the power regeneration time has passed
      powerTimer = 0;//reseting power regeration bar time
      document.getElementById("powerBar").style.backgroundColor = "red";//changing power bar color back to red
        if (lightningTimeCounter > lightningTime) {//if the lightning flash is done, then stop displaying the white background, and set blastLightning to false
            lightningTimeCounter = 0;
            blastLightning = false;
        } else {
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);//drawing a white "flash" for the lightning
            lightningTimeCounter++;//keeping track of time for the flash
            for (i = 0; i < enemies.length; i++) {
                currentEnemy = enemies[i];
                currentEnemy.health = 0;//killing all the enemies
            }
        }
    }

}
//blue dino special power
function freezeEnemies() {
  if (canFreeze) {//this variable is set true when q is pressed, and the power regeneration time has passed
    powerTimer = 0;//reseting power regeration bar time
    document.getElementById("powerBar").style.backgroundColor = "red";//changing power bar color back to red
      if (freezeTimeCounter > freezeTime) {//if the freee is done, then stop displaying the blue background, and set canFreeze to false
          freezeTimeCounter = 0;
          canFreeze = false;
          enemyRange = 60;//reseting the enemy range so that they can attack the player again
          for (i = 0; i < enemies.length; i++) {//reseting movement speed for all the enemies so that they can move again
              currentEnemy = enemies[i];
              currentEnemy.movementSpeed = currentEnemy.constMovementSpeed;
          }
      } else {
          canvasContext.fillStyle = "rgb(54, 116, 216,0.2)";
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);//drawing blue background
          freezeTimeCounter++;//keeping track of time
          enemySpawnDelay -= 1;//countering the spawn delay by subtracting 1, so that no enemies can spawn in the freeze period

          for (i = 0; i < enemies.length; i++) {
              currentEnemy = enemies[i];
              currentEnemy.movementSpeed = 0;//setting the movement speed for all enemies to 0 so that they cannot move
              enemyRange = -1;//changing the enemy attack range to -1, so that they cannot attack the player
          }
      }
  }
}
//green dino special power
function increaseHealth() {
    if (player.health < playerHealth) {//making sure they can only use this power when they have less than full health
        player.health += 1;//adding 1 to the player's health
        powerTimer = 0;//reseting power regeration bar time
        document.getElementById("powerBar").style.backgroundColor = "red";//changing power bar color back to red


    }
}
