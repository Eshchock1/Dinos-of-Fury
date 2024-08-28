function openHowToPlayMenu(){
  document.getElementById("howToPlayMenu").style.opacity = "1";
  document.getElementById("howToPlayMenu").style.zIndex = "10";
  helpMenuInfoIndex = 0;
  document.getElementById("currentHowToPlayInfo").innerHTML = howToPlayInfo[helpMenuInfoIndex];
  document.getElementById("helpMenuButtonBack").style.backgroundColor = "gray";
  document.getElementById("helpMenuButtonNext").style.backgroundColor = "#232323";
}
function helpMenuGoBack(){

  if(helpMenuInfoIndex > 0) {
  document.getElementById("helpMenuButtonBack").style.backgroundColor = "#232323";
  document.getElementById("helpMenuButtonNext").style.backgroundColor = "#232323";

  helpMenuInfoIndex -= 1;
  document.getElementById("currentHowToPlayInfo").innerHTML = howToPlayInfo[helpMenuInfoIndex];
}
 if (helpMenuInfoIndex == 0){
  document.getElementById("helpMenuButtonBack").style.backgroundColor = "gray";
}
}
function helpMenuNext(){
  if(helpMenuInfoIndex < howToPlayInfo.length - 1){
    document.getElementById("helpMenuButtonNext").style.backgroundColor = "#232323";
    document.getElementById("helpMenuButtonBack").style.backgroundColor = "#232323";

  helpMenuInfoIndex += 1;
  document.getElementById("currentHowToPlayInfo").innerHTML = howToPlayInfo[helpMenuInfoIndex];
}
if(helpMenuInfoIndex == howToPlayInfo.length - 1){
  document.getElementById("helpMenuButtonNext").style.backgroundColor = "gray";
}
}
function closeHowToPlayMenu(){
  document.getElementById("howToPlayMenu").style.opacity = "0";
  document.getElementById("howToPlayMenu").style.zIndex = "-1";
}

function closeMainMenu() {//called to close the home page, and reveal the game
    document.getElementById("welcomePage").style.height = "0px";
    document.getElementById("welcomePage").style.zIndex = "-1";
    document.getElementById("welcomePage").style.opacity = "0";

}

function changeDino(color) {//called when user pics a dino
    dinoSprites = document.getElementById(color + "Dino");//changing the image used for the dino sprites
    gunImage = document.getElementById(color + "Gun");//changing the gun color
    bulletImage = document.getElementById(color + "Bullet");//changing the bullet color
    dinoColor = color;
}
