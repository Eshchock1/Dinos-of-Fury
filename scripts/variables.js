//defining all global variables, so that they can be accessed easily

var userName;

var howToPlayInfo = [
  "<b>Objective</b><br> Survive as long as you can in the dungeon by shooting the monsters before they can reach you.",
  "<b>Dinos</b><br> You can select one of four dinos to play with. The dinos are as follows: <ul class='smallText'> <li>Fire Dino</li><li>Earth Dino</li><li>Ice Dino</li><li>Lightning Dino</li></ul>",
  "<b>Monsters</b><br>As a dino, you have to fend off the monsters who are trying to attack you. There are the three types of monsters in order of difficulty: aliens (easy), zombies (medium), and soul destroyers (hard). As the difficulty of a monster increases, its speed and health also increase, making it harder to eliminate. More points are awarded for eliminating harder enemies.",
  "<b>Powers</b><br>As a dino, you have a special power based on your element. This special power can be used every 15 seconds. The Fire Dino can summon a fire wall which burns all monsters for 5 seconds, the Earth Dino can regenerate one health, the Ice Dino can freeze all monsters for 6 seconds, and the lightning dino can summon a storm, which vaporizes all monsters on the screen in a flash.",
  "<b>Moving</b><br> To move your dino, the WASD keys must be used. <ul class='smallText'> <li>W - move up</li> <li>A - move left</li> <li>S - move down</li> <li>D - move right</li> </ul>",
  "<b>Shooting</b><br> Each dino has a special staff that can shoot energy balls which can injure monsters. Aim before shooting by moving the cursor to where you want to fire. Shoot by left clicking with the mouse, or by pressing the spacebar. Use the \"Q\" key to use your power up.",
  "<b>Game Stats</b><br> You can see your remaining lives, and kill counters for each enemy on the left side of the interface. You can also see how much time is remaining before you can use your special power again by looking at the power regeneration bar which turns green when 15 seconds have passed. Press the \"P\" key or click \"Pause\" if you wish to pause the game, and \"Menu\" if you wish to quit the game."
]
var helpMenuInfoIndex = 0;
var int = "";
var mouseX;//mouse X position
var mouseY;//mouse Y position

var enemy0Health = 3;//setting the health value for the alien
var enemy1Health = 4;//setting health value for zombie
var enemy2Health = 6;//setting health value for soul destroyer
var enemy0MoveSpeed = 2.6;//setting the movement speed for the alien
var enemy1MoveSpeed = 2.8;//setting the movement speed for the zombie
var enemy2MoveSpeed = 3.2;//setting the movement speed for the soul destroyer



var dinoOffsetX = 15;//offset value used for drawing the dino sprites
var dinoOffsetY = 15;//offset value used for drawing the dino sprites
var previousX;//variable to keep track of all previous dino X positions before each game update
var previousY;//variable to keep track of all previous dino Y positions before each game update

//yellow dino power variables
var lightningTime = 15; //amount of frames the lightning flash takes 15 frames = 0.25 seconds
var lightningTimeCounter = 0; //variable to keep track of frames and time when the dino special power is used
var blastLightning = false; //boolean variable that turns true, and executes a function when the player uses their special power

var freezeTime = 360; //amount of frames the ice freeze takes 360 frames = 6 seconds
var freezeTimeCounter = 0;//variable to keep track of frames and time when the dino special power is used
var canFreeze = false;//boolean variable that turns true, and executes a function when the player uses their special power

var fireTime = 300;//amount of frames the fire wall takes 300 frames = 5 seconds
var fireCounter = 0;//variable to keep track of frames and time when the dino special power is used
var ableToFireWall = false;//boolean variable that turns true, and executes a function when the player uses their special power
var fireXpos = 0;//stores the x position which moves the fire image that displays when the fire wall is active

var enemySpawnRateDecreaseDelay = 0;//a counter variable that increases every game update, and when it reaches a certain value, the enemy spawn rate is decreased to make the game a progressively harder
var powerTimer = 0;//the counter that keeps track of the time passed for power regeneration, and holds the value for the power timer bar

//adding boundaries for the canvas, so that the player cannot go off screen
var boundaryTop = 80;
var boundaryBottom = 50;
var boundaryLeft = 50;
var boundaryRight = 40;

var enemyAttackTime = 60;//a variable that stores a delay value in frames for the enemy to attack the player when it is within range
var gameOver = false;//a boolean variable that turns true when the player dies

var dinoColor = "green"; //keeps track of what dino the user is using red,green,blue,yellow

var userScore = 0;
var userHighScore = 0;

//getting images
var dinoSprites = document.getElementById("greenDino");
var gunImage = document.getElementById("greenGun");
var backgroundImage = document.getElementById("backgroundImage");
var fireImage = document.getElementById("fireImage");
var enemySprites = document.getElementById("enemySprites");
var bulletImage = document.getElementById("greenBullet");
var playerLifeDiv = document.getElementById("playerLife");

//getting canvas and 2d canvas context
var canvas = document.getElementById("mainCanvas");
var canvasContext = canvas.getContext('2d');

//getting the offset values created by the canvas' padding and margin which will be added to the mouse position values
var canvasRect = canvas.getBoundingClientRect();
var canvasTop = canvasRect.top;
var canvasLeft = canvasRect.left;


var playerWidth = 45 * 0.8;//width of player
var playerHeight = 45 * 0.8;//height of player
var gunWidth = 40 * 0.8;//width of gun
var gunHeight = 15 * 0.8;//height of gun
var playerDrawSize = 75 * 0.8;//size of player dino image

//setting the starting player position
var playerStartX = canvas.width / 2 - playerWidth / 2;
var playerStartY = canvas.height / 2 - playerHeight / 2;

//setting the fire point (on the tip of the gun)
var firePointX = playerStartX + playerWidth / 2;
var firePointY = playerStartY - gunHeight / 2;

var playerMoveSpeed = 2;//setting the player's movement speed
var playerMoveX = 0;//a variable that stores horizontal movement (can be negative or positive)
var playerMoveY = 0;//a variable that stores vertical movement (can be negative or positive)
var bullets = [];//and array that holds all the bullet objects
var enemySpawnDelay = 0;//a delay variable...an enemy is spawned everytime this variable reaches a certain value

var fps = 60;//setting game fps
var gunRotate = 0;//gun rotate angle
var fireDelay = 0;//a delay variable to make sure the user cant just spam bullets
var enemies = [];//an array that holds all the enemy objects

//width and height of enemies
var enemyWidth = 50 * 0.8;
var enemyHeight = 50 * 0.8;
//width and height of the health bars for enemies
var enemyHealthBarWidth = 10 * 0.8;
var enemyHealthBarHeight = 5 * 0.8;

var paused = false;//a boolean variable that turns true when the user pauses the game

//bullet height and width
var bulletWidth = 15 * 0.8;
var bulletHeight = 15 * 0.8;


var enemySpawnRate = 260;//enemies are spawned when enemySpawnDelay reaches this value
var playerHealth = 5;//player health
var enemyRange = 60;//the pixel distance that enemies have to be from the dino to attack the player

//player health bar width and height
var playerHealthBarWidth = 50;
var playerHealthBarHeight = 8;

//kill counters for the alien, zombie, and soul destroyer
var enemy0KillCount = 0;
var enemy1KillCount = 0;
var enemy2KillCount = 0;
