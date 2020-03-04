//player constructor
function Player(Xpos, Ypos, health, width, height, fireDelay, frameDelay) {
    this.x = Xpos;//player x position
    this.y = Ypos;//player y position
    this.previousX = 0;
    this.previousY = 0;
    this.health = health;//player heath
    this.moveX = 0;//player horizontal move value
    this.moveY = 0;//player vertical move value
    this.width = width;//width of player
    this.height = height;//height of player
    this.fireDelay = fireDelay;
    //boolean variables that store true of false depending on which side the dino is facing and in what direction they are moving
    this.isRunningLeft = false;
    this.isRunningRight = false;
    this.isRunningUp = false;
    this.isRunningDown = false;
    this.facingRight = true;
    this.facingLeft = false;
    this.beingAttacked = false;//variable that turns true when the enemies attack the player
    this.attackAnimationCooldown = 0;
    //for sprites
    this.frameSets = [//a 2d array that stores the sets of frames/sections of the spritesheet that hold the images for a certain action
        [0, 1, 2, 3], //idle right
        [4, 5, 6, 7], //idle left
        [8, 9, 10, 11, 12, 13], //running right
        [19, 18, 17, 16, 15, 14], // running left
        [14, 15, 16, 17, 18, 19], //running left back
        [13, 12, 11, 10, 9, 8], //running right back
        [20, 21, 22], //injure right
        [23, 24, 25] //injure left
    ];
    this.updateCount = 0; //counts number of game cycles since last frame
    this.frameDelay = frameDelay; //number of game cylces to wait until next frame chnage
    this.frame = 0; //sprite sheet value
    this.frameIndex = 0; //index in current animation frame set
    this.frameSet = 0;//current active frame set
}
Player.prototype.changeSprite = function(newFrameSet) {//player prototype function to change the current frame set when the dinos motion changes (ex. running right --> idling left)
    if (newFrameSet != this.frameSet) {//making sure the frame set is not already active
        this.frameSet = newFrameSet;
        this.updateCount = 0;
        this.frameIndex = 0;
        this.frame = this.frameSet[this.frameIndex];//changing frame set

    }
}

Player.prototype.updateSprite = function() {//player function to update the current sprite in the sprite set
    this.updateCount += 1;//keeping track of how many frames have passed to update sprte
    if (this.attackAnimationCooldown > 0) {//doesnt allow sprites to change if they are being attacked
        this.beingAttacked = true;
        this.attackAnimationCooldown -= 1;
    } else {
        this.beingAttacked = false;
    }
    //if enough time has passed, then update sprite
    if (this.updateCount >= this.frameDelay) {
        this.updateCount = 0;
        if (this.frameIndex == this.frameSet.length - 1) {//if the sprite has reached the end in the set, then bring it back to the beginning
            this.frameIndex = 0;
        } else {
            this.frameIndex += 1;
        }
        this.frame = this.frameSet[this.frameIndex];//update current sprite
    }
}
var player = new Player(playerStartX, playerStartY, playerHealth, playerWidth, playerHeight, 0, 8);//creating the player

//function called every update to make sure the player cant surpass the boundaries of the canvas
function checkBorders() {
    if (player.y < boundaryTop) {
        player.y = boundaryTop;
        firePointY += playerMoveSpeed;
    }
    if (player.y + player.height > canvas.height - boundaryBottom) {
        player.y = canvas.height - player.height - boundaryBottom;
        firePointY -= playerMoveSpeed;

    }
    if (player.x < boundaryLeft) {
        player.x = boundaryLeft;
        firePointX += playerMoveSpeed;

    }
    if (player.x + player.width > canvas.width - boundaryRight) {
        player.x = canvas.width - player.width - boundaryRight;
        firePointX -= playerMoveSpeed;
    }
}

//function called when the player is damaged
function playerDamage(enemyNum) {
    currentEnemy = enemies[enemyNum]
    currentEnemy.attackDelay += 1;
    if (currentEnemy.attackDelay % enemyAttackTime == 0) {//if the player can attack (enough time has passed)
        player.health -= 1;//decreasing health by one
        player.attackAnimationCooldown = 3 * 8;
    }
    if (player.health == 0) {
        endGame();//end game if the player has lost all health
    }
}
//function called each update to find the motion of the player
function checkPlayerMotion(){
  if (mouseX > player.x + player.width / 2) {//mouse is on the right of the player
      player.facingRight = true;
      player.facingLeft = false;
  } else {//mouse is on left of player
      player.facingLeft = true;
      player.facingRight = false;
  }

  if (player.previousX > player.x) {//moving left
      player.isRunningLeft = true;
      player.isRunningRight = false;
  } else if (player.previousX < player.x) {//moving right
      player.isRunningRight = true;
      player.isRunningLeft = false;
  } else if (player.previousX == player.x) {//not moving on X axis
      player.isRunningLeft = false;
      player.isRunningRight = false;
  }

  if (player.previousY > player.y) {//moving up
      player.isRunningUp = true;
      player.isRunningDown = false;
  } else if (player.previousY < player.y) {//moving down
      player.isRunningDown = true;
      player.isRunningUp = false;
  } else if (player.previousY == player.y) {//not moving on Y axis
      player.isRunningUp = false;
      player.isRunningDown = false;
  }
}
//function called each update to change the sprite values depending on the motion and facing direction of the player
function changePlayerSprite(){
  if (player.facingRight && player.beingAttacked) {
      player.changeSprite(player.frameSets[6]);
      //attacked to the right
  } else if (player.facingRight && player.isRunningLeft) {
      player.changeSprite(player.frameSets[5]);
      //backwards right
  } else if (player.facingRight && (player.isRunningRight || player.isRunningUp || player.isRunningDown)) {
      player.changeSprite(player.frameSets[2]);
      //running right
  } else if (player.facingRight) {
      player.changeSprite(player.frameSets[0]);
      //idle right
  }
  if (player.facingLeft && player.beingAttacked) {
      player.changeSprite(player.frameSets[7]);
      //attacked to the left
  } else if (player.facingLeft && player.isRunningRight) {
      player.changeSprite(player.frameSets[4]);
      //backwards left
  } else if (player.facingLeft && (player.isRunningLeft || player.isRunningUp || player.isRunningDown)) {
      player.changeSprite(player.frameSets[3]);
      //running left
  } else if (player.facingLeft) {
      player.changeSprite(player.frameSets[1]);
      //idle left
  }

}
