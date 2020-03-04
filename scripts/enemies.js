//enemy constructor
function Enemy(Xpos, Ypos, health, attackDelay, movementSpeed, frameDelay, enemyNumber) {
    this.x = Xpos;//enemy X pos
    this.y = Ypos;//enemy Y pos
    this.height = 0; //enemy height starts off at 0, and gets larger to make a cool stretching effect when it spawns
    this.width = 60 * 0.8;//enemy width
    this.health = health;//enemy health
    this.constHealth = health;//keeping a second copy of health that remains constant for later calculations
    this.attackDelay = attackDelay;//enemy delay for attacking
    this.movementSpeed = movementSpeed;
    this.constMovementSpeed = movementSpeed;//keeping a second copy of movement speed that remains constant later calculations
    //facing direction
    this.facingRight = false;
    this.facingLeft = false;

    this.enemySets = [//a 3d array that stores the sets of frames/sections of the spritesheet that hold the images for a certain enemies and their actions
        [
            [0, 1, 2, 3], //alien facing left
            [4, 5, 6, 7] //alien facing right
        ],
        [
            [8, 9, 10, 11], //zombie facing left
            [12, 13, 14, 15] //zombie facing right
        ],
        [
            [16, 17, 18, 19], //soul destroyer facing left
            [20, 21, 22, 23] //soul destroyer facing right
        ],
    ];
    this.updateCount = 0; //counts number of game cycles since last frame
    this.frameDelay = frameDelay; //number of game cylces to wait until next frame chnage
    this.frame = 0; //sprite sheet value
    this.frameIndex = 0; //index in current animation frame set
    this.frameSets = this.enemySets[enemyNumber];//section based on enemy
    this.frameSet = this.frameSets[0];//frane set based on facing direction
    this.number = enemyNumber;//number of enemy 0 = alien, 1 = zombie, 2 = soul destroyer
    this.spawning = true;//a variable that remains true during the short spawning period of each enemy
}
Enemy.prototype.changeSprite = function(newFrameSet) {//enemy prototype function to change the current frame set when the enemies facing direction changes
    if (newFrameSet != this.frameSet) {//making sure the frame set is not already active
        this.frameSet = newFrameSet;
        this.updateCount = 0;
        this.frameIndex = 0;
        this.frame = this.frameSet[this.frameIndex];//changing the frame set

    }
}
Enemy.prototype.updateSprite = function() {//player function to update the current sprite in the sprite set
      this.updateCount += 1;//keeping track of how many frames have passed to update sprte
    if (this.updateCount >= this.frameDelay) {//if enough time has passed, then update sprite
        this.updateCount = 0;
        if (this.frameIndex == this.frameSet.length - 1) {//if the sprite has reached the end in the set, then bring it back to the beginning
            this.frameIndex = 0;
        } else {
            this.frameIndex += 1;
        }
        this.frame = this.frameSet[this.frameIndex];//updating current sprite
    }

}
//called on every update to move enemies, and update sprites
function moveEnemies() {

    for (i = 0; i < enemies.length; i++) {//looping through all enemies
        currentEnemy = enemies[i];

        if (currentEnemy.x + enemyWidth / 2 > player.x + player.width / 2) {//if the enemy is on the right of the player
            currentEnemy.facingLeft = true;
            currentEnemy.facingRight = false;
            currentEnemy.changeSprite(currentEnemy.frameSets[0]);//update to facing right
        }
        if (currentEnemy.x + enemyWidth / 2 < player.x + player.width / 2) {//if the enemy is on left of the player
            currentEnemy.facingLeft = false;
            currentEnemy.facingRight = true;
            currentEnemy.changeSprite(currentEnemy.frameSets[1]);//update to facing left
        }
        currentEnemy.updateSprite();//updating the enemy sprite


        //below is for calculating the movement for enemies
        var negX = 1;//value that can be negative of positive for offset for movement
        var negY = 1;//value that can be negative of positive for offset for movement
        //calculating X and Y distance between the player and the enemy
        enemyDistX = player.x + player.width / 2 - enemyWidth / 2 - currentEnemy.x;
        enemyDistY = player.y + player.height / 2 - enemyHeight / 2 - currentEnemy.y;
        if (enemyDistX < 0) {//if enemy is on right of player
            negX = -1;//adjust the offset value for later calculations to correct movement
            enemyDistX = Math.abs(enemyDistX);//getting an absolute value of the distance
        }
        if (enemyDistY < 0) {//if enemy is below the player
            negY = -1;//adjust the offset value to correct movement since the X and Y position of the enemy is greater than that of the player
            enemyDistY = Math.abs(enemyDistY);//getting absolute value fo the distance

        }
        enemyAngle = Math.atan(enemyDistY / enemyDistX);//getting angle between the player and the enemy
        if (enemyAngle < 0) {//if the angle is negative, add 2 pi radians to it
            enemyAngle += 2 * Math.PI;
        }
        enemyTravelY = Math.sin(enemyAngle);//the Y travel speed is = to the sin of the angle
        enemyTravelX = Math.cos(enemyAngle);//the X travel speed is = to the cos of the angle

        currentEnemy.x += enemyTravelX * currentEnemy.movementSpeed * negX;//updating enemy X position
        currentEnemy.y += enemyTravelY * currentEnemy.movementSpeed * negY;//updating enemy Y position
    }

}

//function to spawn enemies
function spawnEnemies() {
    var enemyX;
    var enemyY;
    var attackDelay = 0;
    var newEnemy;
    if (enemySpawnDelay >= enemySpawnRate) {//when enough time has passed spawn a new enemy
        //generating a random spawn point on canvas
        enemyX = boundaryLeft + 25 + Math.floor(Math.random() * (canvas.width - boundaryRight - 50 - enemyWidth));
        enemyY = boundaryTop + 25 + Math.floor(Math.random() * (canvas.height - boundaryBottom - 50 - enemyHeight));

        //getting distance between player and enemy
        distX = Math.abs(player.x - enemyX);
        distY = Math.abs(player.y - enemyY);

        //if the X distance is less than 50, then find a new X value
        while (distX < 50) {
            enemyX = boundaryLeft + 25 + Math.floor(Math.random() * (canvas.width - boundaryRight - 50 - enemyWidth));
            distX = Math.abs(player.x - enemyX);
        }
        //if the Y distance is less than 50 pixels, then find a new Y value
        while (distY < 50) {
            enemyY = boundaryTop + 25 + Math.floor(Math.random() * (canvas.height - boundaryBottom - 50 - enemyHeight));
            distY = Math.abs(player.y - enemyY);
        }
        //generating difficulty for enemy 0 = alien, 1= zombie, 2= soul destroyer
        enemyNum = Math.floor(Math.random() * 3);

        //making a new enemy based on what the enemy number/difficulty is;
        if (enemyNum == 0) {
            newEnemy = new Enemy(enemyX, enemyY, enemy0Health, attackDelay, enemy0MoveSpeed, 8, 0);
        } else if (enemyNum == 1) {
            newEnemy = new Enemy(enemyX, enemyY, enemy1Health, attackDelay, enemy1MoveSpeed, 8, 1);
        } else if (enemyNum == 2) {
            newEnemy = new Enemy(enemyX, enemyY, enemy2Health, attackDelay, enemy2MoveSpeed, 8, 2);
        }
        enemies.push(newEnemy);//adding it to the enemy array
        enemySpawnDelay = 0;//resetting spawn delay
    }

}



function checkEnemyCollision() {//checking collision between player and enemy
    for (var i = 0; i < enemies.length; i++) {//looping through enemy
        currentEnemy = enemies[i]
        //getting enemy coords
        enemyX = currentEnemy.x + enemyWidth / 2;
        enemyY = currentEnemy.y + enemyHeight / 2;
        //getting distance between player and enemy
        distX = Math.abs(player.x + player.width / 2 - enemyX);
        distY = Math.abs(player.y + player.height / 2 - enemyY);
        distDiagonal = Math.sqrt(distX ** 2 + distY ** 2);

        if (distDiagonal < enemyRange) {//if the enemy is within attacking range
            currentEnemy.movementSpeed = 0;//stop the enemy from moving
            playerDamage(i);//injure the player
        } else {//reset the movement speed so the enemy can move
            currentEnemy.movementSpeed = currentEnemy.constMovementSpeed;
        }
    }
}


//called when an enemy is needed to be killed/destroyed
function killEnemy(enemyNumber, listPosition) {
  //updating kill counters
    if (enemyNumber == 0) {
        enemy0KillCount++;
    } else if (enemyNumber == 1) {
        enemy1KillCount++;
    } else if (enemyNumber == 2) {
        enemy2KillCount++;
    }
    enemies.splice(listPosition, 1);//removing the enemy from the enemies list
}
