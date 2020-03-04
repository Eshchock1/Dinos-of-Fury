
document.addEventListener('keydown', checkKeyPress, false);
document.addEventListener('keyup', checkKeyRelease, false);
document.addEventListener("mousemove", calculateMousePosition, false);

function checkKeyPress(event) {//called when a key is pressed
    var key = event.keyCode;
    switch (key) {//switch to see which key was pressed
        case 65://left arrow
            //update speed for direction
            player.moveX = -playerMoveSpeed;//move left
            break;
        case 87://down arrow
            player.moveY = -playerMoveSpeed//move down
            break;
        case 68://right arrow
            player.moveX = playerMoveSpeed;//moving right
            break;
        case 83://up arrow
            player.moveY = playerMoveSpeed;//moving up
            break;
        case 32://space bar
            fire();//calling fire function to fire a bullet
            break;
        case 80://"p" key
            pauseGame();//calling a function to pause the game
            break;
    }
}

//check when keys are released
function checkKeyRelease(event) {
    var key = event.keyCode;
    switch (key) {
        case 81://"Q" key to use special dino powers
          //conditional statement to check which colored dino is being used to activte the coresponding power
            if (dinoColor == "red" && powerTimer == 1200) {//checking to see if the regeration time is completed for using the power up, and if the dino is red
                ableToFireWall = true;//setting a boolean value to true, which will in turn execute the special power
            }
            else if (dinoColor == "yellow" && powerTimer == 1200) {
                  blastLightning = true;
            }
            else if (dinoColor == "blue" && powerTimer == 1200) {
              canFreeze= true;
            }
            else if (dinoColor == "green" && powerTimer == 1200) {
                increaseHealth();//since there is nothing needed to draw, the special power is immedietly executed, and increases the green dino's health by 1
            }
            break;
        case 65://left arrow
            player.moveX = 0;//setting movement speed in the axis to 0, when the user releases the key
            break;
        case 87://down arrow
            player.moveY = 0;
            break;
          case 68://right arrow
            player.moveX = 0;
            break;
        case 83://up arrow
            player.moveY = 0;
            break;
    }
}
function calculateMousePosition(event) {//called on mouse move
    mouseY = event.clientY - canvasTop;//finding mouse X position, and adding an extra value to compensate for the shift caused by padding, and margin
    mouseX = event.clientX - canvasLeft//for Y position
    //canvasTop and canvasLeft, are assigned values by using getBoundingClientRect()
}
