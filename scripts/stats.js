//this script updates the stats board on the left in game
function stats(){
      playerLifeDiv.innerHTML = "";//reseting the hearts
      for (i = 0; i < playerHealth; i++) {//looping through player life
          if (i < player.health) {//inserting full heart if the user still has life
              playerLifeDiv.innerHTML += "<img src='images/fullHeart.png' width='45' height='45'>" + " ";
          } else {//inserting an empty heart if that life has been lost
              playerLifeDiv.innerHTML += "<img src='images/emptyHeart.png' width='45' height='45'>" + " ";
          }
      }

      //updating kill counters for aliens, zombies, and soul destroyers
      document.getElementById("enemy0KillCount").innerHTML = "Alien: " + enemy0KillCount;//alien kill counter
      document.getElementById("enemy1KillCount").innerHTML = "Zombie: " + enemy1KillCount;//zombie kill counter
      document.getElementById("enemy2KillCount").innerHTML = "Soul Destroyer: " + enemy2KillCount;//soul destroyer kill counter

      document.getElementById("userScore").innerHTML = "Score: " + userScore;//updating current user score
      document.getElementById("userHighScore").innerHTML = "Score: " + userHighScore; // updating the user's high score

      document.getElementById("powerBar").style.width = powerTimer / 4.8;//updating the width of the dino special power regeration bar, to show how much longer they need to wait to use the power
}
