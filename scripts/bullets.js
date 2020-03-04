canvas.addEventListener("click", fire, false);//adding event listener to fire on click
//bullet constructor
function bullet(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
}


function moveBullets() {//function called on every update to move all the bullets
    for (i = 0; i < bullets.length; i++) {//looping through all the bullets
        currentBullet = bullets[i];
        //updating x and y positions
        currentBullet.x += currentBullet.speedX;
        currentBullet.y += currentBullet.speedY;
        //checking to see if the bullet has gone off canvas,and if it has, it is removed from the bullets list
        if (currentBullet.x > canvas.width - boundaryRight) {
            bullets.splice(i, 1);
        }
        if (currentBullet.x < 0 + boundaryLeft - 20) {
            bullets.splice(i, 1);
        }
        if (currentBullet.y > canvas.height - boundaryBottom) {
            bullets.splice(i, 1);
        }
        if (currentBullet.y < 0 + boundaryTop) {
            bullets.splice(i, 1);
        }
    }
}
//called every update to check collisions between the enemies and the bullets
function checkBulletCollision() {
    for (var i = 0; i < enemies.length; i++) {//looping through enemies
        currentEnemy = enemies[i];
        for (var n = 0; n < bullets.length; n++) {//looping through bullets
            currentBullet = bullets[n];
            if ((currentBullet.x > currentEnemy.x && currentBullet.x < currentEnemy.x + enemyWidth) || (currentBullet.x + bulletWidth > currentEnemy.x && currentBullet.x + bulletWidth < currentEnemy.x + enemyWidth)) {//if there is a collision on X axis
                if ((currentBullet.y > currentEnemy.y && currentBullet.y < currentEnemy.y + enemyHeight) || (currentBullet.y + bulletHeight > currentEnemy.y && currentBullet.y + bulletHeight < currentEnemy.y + enemyHeight)) {// if there is a collision on Y axis
                    currentEnemy.health -= 1;//remove one health from enemy
                    bullets.splice(n, 1);//remove bullet from bullets list

                }
            }
        }
        if (currentEnemy.health <= 0) {//if the enmy has lost all health
            killEnemy(currentEnemy.number, i);//kill the enemy
            //updating score based on enemy killed
            if (currentEnemy.number == 0) {
                userScore += 2;
            } else if (currentEnemy.number == 1) {
                userScore += 3;
            } else if (currentEnemy.number == 2) {
                userScore += 5;
            }
        }
    }
}

//called when the user hits "spacebar" or the left mouse click
function fire() {
    if (player.fireDelay > 13) {//making sure enough time has passed to shoot
      //getting distance between firepoint and mouse
        deltaX = mouseX - firePointX;
        deltaY = mouseY - firePointY;
        dist = Math.sqrt(deltaY ** 2 + deltaX ** 2);
        //dividing distance by 5 to get a third value that will later be used to make sure all bullets travel at a contant speed
        moveRate = dist / 5;
        //getting speeds for X and Y axes
        speedX = deltaX / moveRate;
        speedY = deltaY / moveRate;
        //making a new bullet, and adding it to the bullets list
        newBullet = new bullet(firePointX, firePointY, speedX, speedY);
        bullets.push(newBullet);
        //resetting the fire delay
        player.fireDelay = 0;
    }

}


function moveGun() {//function called to rotate the gun based on mouse pos
    //getting distance between the player and the mouse
    distX = (player.x + player.width / 2) - mouseX;
    distY = (player.y + player.height / 2) - mouseY;
    mouseDist = Math.sqrt(distX ** 2 + distY ** 2);
    gunOffset = mouseDist / gunWidth;
    //finding two values to calculate fire point
    distX /= gunOffset;
    distY /= gunOffset;
    //calculating firepoint
    firePointX = player.x + player.width / 2 - distX;
    firePointY = player.y + player.height / 2 - distY;

    //getting the angle to rotate the gun
    gunRotate = Math.atan(distY / distX);
    if (distX >= 0) {//adding 180 degrees as offset to stop rotation glitch with tan()
        gunRotate += Math.PI;
    }
}
