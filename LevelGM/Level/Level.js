var player = document.getElementById("player");
var weapon1 = document.getElementById("weapon1");
var weapon2 = document.getElementById("weapon2");
var weapon1Box = document.getElementById("Slot1");
var weapon2Box = document.getElementById("Slot2");
var enemy = document.getElementById("enemy");
var arrow = document.getElementById("invisMoveTOMouse");
var door = document.getElementById("Door");

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var allowUp = true;
var allowDown = true;
var allowLeft = true;
var allowRight = true;

var allEnemiesDead = false;

var Enemyspeed = .02;
var EnemyHealth = 25;

var EnemyActivate = true;

var playerHealth = 50;
var playerMaxHealth = 50;

var winStatus = false;
var mouseX;
var mouseY;

document.addEventListener("mousemove", onmousemove);

var onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//Begin Player Movement Section

var speed = .6;

if (weapon1.name == "Sword")
{
    weapon1.style.transform = "scaleX(-1)";
}
if (weapon2.name == "Sword")
{
    weapon2.style.transform = "scaleX(-1)";
}

if (weapon1.name == "Bow")
{
    weapon1.style.transform = "scaleX(-1)";
}
if (weapon2.name == "Bow")
{
    weapon2.style.transform = "scaleX(-1)";
}

// move player based on user input
function inputs() {
    var playerX = parseFloat(player.style.left.replace("px", ""));
    var playerY = parseFloat(player.style.top.replace("px", ""));
    if (playerHealth > 0) {
        if (upPressed == true && allowUp == true) {
            playerY -= speed;
        }
        if (downPressed == true && allowDown == true) {
            playerY += speed;
        }
        if (leftPressed == true && allowLeft == true) {
            playerX -= speed;
        }
        if (rightPressed == true && allowRight == true) {
            playerX += speed;
        }

        player.style.left = playerX + "px";
        player.style.top = playerY + "px";

        weapon1.style.top = playerY + 15 + "px";
        weapon2.style.top = playerY + 15 + "px";
        weapon1.style.left = playerX + "px";
        weapon2.style.left = playerX + "px";
    }
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        upPressed = true;
    }

    //down
    if (event.keyCode == 40) {
        downPressed = true;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = true;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = true;
    }

    //up
    if (event.keyCode == 87) {
        upPressed = true;
    }

    //down
    if (event.keyCode == 83) {
        downPressed = true;
    }
    //left
    if (event.keyCode == 65) {
        leftPressed = true;
    }

    //right
    if (event.keyCode == 68) {
        rightPressed = true;
    }
}

function keyUp(event) {
    //up
    if (event.keyCode == 38) {
        upPressed = false;
    }

    //down
    if (event.keyCode == 40) {
        downPressed = false;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = false;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = false;
    }

    //up
    if (event.keyCode == 87) {
        upPressed = false;
    }

    //down
    if (event.keyCode == 83) {
        downPressed = false;
    }
    //left
    if (event.keyCode == 65) {
        leftPressed = false;
    }

    //right
    if (event.keyCode == 68) {
        rightPressed = false;
    }
}

setInterval(inputs, 2);
//End Player Movement Section

//Start Weapon Select Section
function selectW(e)
{
    if (e.keyCode == 49)
    {
        //Weapon1 Selected
        weapon2.style.visibility = "hidden"
        weapon2Box.style.backgroundColor = "#FFFFFF"
        weapon1.style.visibility = "visible";
        weapon1Box.style.backgroundColor = "#68af36"
    }
    if (e.keyCode == 50)
    {
        //Weapon2 Selected
        weapon1.style.visibility = "hidden"
        weapon1Box.style.backgroundColor = "#FFFFFF"
        weapon2.style.visibility = "visible";
        weapon2Box.style.backgroundColor = "#68af36"
    }
}
document.body.addEventListener("keydown", selectW);
//End Weapon Select Section

//Start Game Win
function GameWin()
{
    document.getElementById("Door").style.visibility = "visible";
}
//End Game Win

//Start Collision Section
function CollideWall() {
    var enemyX = parseInt(enemy.style.left.replace("px", ""));
    var enemyY = parseInt(enemy.style.top.replace("px", ""));
    var playerX = parseInt(player.style.left.replace("px", ""));
    var playerY = parseInt(player.style.top.replace("px", ""));

    var wallTop = document.getElementById("WallTop")
    var wallBttm = document.getElementById("WallBottom")
    var wallLeft = document.getElementById("WallLeft")
    var wallRight = document.getElementById("WallRight")

    var wallTopY = parseInt(wallTop.style.top.replace("px", ""));
    var wallBottomY = parseInt(wallBttm.style.top.replace("px", ""));
    var wallLeftX = parseInt(wallLeft.style.left.replace("px", ""));
    var wallRightX = parseInt(wallRight.style.left.replace("px", ""));

    //Disable collision over enemy
    if (Math.abs(playerX - enemyX) < 50 && Math.abs(playerY - enemyY) < 80) {
        if (playerX > enemyX) {
            allowLeft = false;
        }
        if (playerX < enemyX) {
            allowRight = false;
        }
        if (playerY > enemyY) {
            allowUp = false;
        }
        if (playerY < enemyY) {
            allowDown = false;
        }
    }
    else {
        allowRight = true;
        allowLeft = true;
        allowUp = true;
        allowDown = true;
    }

    //Wall Collisions
    if (Math.abs(playerY - wallTopY) < 50) {
        playerY += 3;
        player.style.top = playerY + "px";
    }

    if (Math.abs(playerY - wallBottomY) < 50) {
        playerY -= 3;
        player.style.top = playerY + "px";
    }

    if (Math.abs(playerX - wallLeftX) < 50) {
        playerX += 3;
        player.style.left = playerX + "px";
    }

    if (Math.abs(playerX - wallRightX) < 50) {
        playerX -= 3;
        player.style.left = playerX + "px";
    }
}

function CollideEnemy() {
    var enemyX = parseInt(enemy.style.left.replace("px", ""));
    var enemyY = parseInt(enemy.style.top.replace("px", ""));
    var playerX = parseInt(player.style.left.replace("px", ""));
    var playerY = parseInt(player.style.top.replace("px", ""));

    //Collide with player
    if (Math.abs(playerX - enemyX) < 50 && Math.abs(playerY - enemyY) < 80) {
        EnemyActivate = false;
        if (playerHealth > 0) {
            playerHealth -= 2;
        }
        //Decrease Player Health

        var bar = document.getElementById('HealthAmount')
        var barAmount = parseInt(player.style.width.replace("px", ""));

        barAmount = playerHealth * 4;
        bar.style.width = barAmount + "px";
    }
    else {
        EnemyActivate = true;
    }
}

function CollideArrow() {
    var enemyX = parseInt(enemy.style.left.replace("px", ""));
    var enemyY = parseInt(enemy.style.top.replace("px", ""));
    var arrowX = parseInt(arrow.style.left.replace("px", ""));
    var arrowY = parseInt(arrow.style.top.replace("px", ""));

    var wallTop = document.getElementById("WallTop")
    var wallBttm = document.getElementById("WallBottom")
    var wallLeft = document.getElementById("WallLeft")
    var wallRight = document.getElementById("WallRight")

    var wallTopY = parseInt(wallTop.style.top.replace("px", ""));
    var wallBottomY = parseInt(wallBttm.style.top.replace("px", ""));
    var wallLeftX = parseInt(wallLeft.style.left.replace("px", ""));
    var wallRightX = parseInt(wallRight.style.left.replace("px", ""));

    if (Math.abs(arrowX - enemyX) < 50 && Math.abs(arrowY - enemyY) < 50 && EnemyHealth > 0) {
        arrow.style.visibility = "hidden"
        EnemyHealth -= 5
        allEnemiesDead = true;
        GameWin()
        console.log(EnemyHealth)
    }
    //Hit
    if (Math.abs(arrowY - wallTopY) < 50) {
        console.log("Hit1")
        arrow.style.visibility = "hidden"
    }

    if (Math.abs(arrowY - wallBottomY) < 50) {
        console.log("Hit2")
        arrow.style.visibility = "hidden"
    }

    if (Math.abs(arrowX - wallLeftX) < 50) {
        console.log("Hit3")
        arrow.style.visibility = "hidden"
    }

    if (Math.abs(arrowX - wallRightX) < 50) {
        console.log("Hit4")
        arrow.style.visibility = "hidden"
    }
}
function CollideDoor()
{
    var playerX = parseFloat(player.style.left.replace("px", ""));
    var playerY = parseFloat(player.style.top.replace("px", ""));

    var doorX = parseFloat(door.style.left.replace("px", ""));
    var doorY = parseFloat(door.style.top.replace("px", ""));

    if (Math.abs(playerX - doorX) < 50 && Math.abs(playerY - doorY) < 50 && EnemyHealth <= 0) {
        console.log("hee")
        winStatus = true;
    }
}
setInterval(CollideWall, 4)
setInterval(CollideEnemy, 600)
setInterval(CollideArrow, 600)
setInterval(CollideDoor, 10)
//End Collision Section

//Start Arrow Movement Section
var arrowX;
var arrowY;

var distanceXarrow;
var distanceYarrow;

var xLocked;
var yLocked;

var moveAmountX;
var moveAmountY;

var directionX;
var directionY;

document.onmousedown = function()
{
    if (document.getElementById("weapon1").name == "Bow" && document.getElementById("weapon1").style.visibility == "visible" && document.getElementById("invisMoveTOMouse").style.visibility == "hidden")
    {
        console.log('ehheshe')
        xLocked = mouseX;
        yLocked = mouseY;

        arrowX = parseInt(arrow.style.left.replace("px", ""));
        arrowY = parseInt(arrow.style.top.replace("px", ""));

        var weaponX = parseInt(document.getElementById("weapon1").style.left.replace("px", ""));
        var weaponY = parseInt(document.getElementById("weapon1").style.top.replace("px", ""));

        arrowX = weaponX;
        arrowY = weaponY;

        arrow.style.left = arrowX + "px";
        arrow.style.top = arrowY + "px";  

        distanceXarrow = Math.abs(arrowX - xLocked)
        distanceYarrow = Math.abs(arrowY - yLocked)

        moveAmountX = ((distanceXarrow + 350) * .015) + .1;
        moveAmountY = ((distanceYarrow - 50) * .05) + .1;

        if (xLocked > arrowX) {
            directionX = "Greater"
        }
        if (xLocked < arrowX) {
            directionX = "Lesser"
        }
        if (yLocked > arrowY) {
            directionY = "Greater"
        }
        if (yLocked < arrowY) {
            directionY = "lesser" 
        }

        document.getElementById("invisMoveTOMouse").style.visibility = "visible"
    }
    if (document.getElementById("weapon2").name == "Bow" && document.getElementById("weapon2").style.visibility == "visible" && document.getElementById("invisMoveTOMouse").style.visibility == "hidden")
    {
        console.log("jdsldlskl")
        xLocked = mouseX;
        yLocked = mouseY;

        xLocked = mouseX;
        yLocked = mouseY;

        arrowX = parseInt(arrow.style.left.replace("px", ""));
        arrowY = parseInt(arrow.style.top.replace("px", ""));

        var weaponX = parseInt(document.getElementById("weapon2").style.left.replace("px", ""));
        var weaponY = parseInt(document.getElementById("weapon2").style.top.replace("px", ""));

        arrowX = weaponX;
        arrowY = weaponY;

        arrow.style.left = arrowX + "px";
        arrow.style.top = arrowY + "px"; 

        distanceXarrow = Math.abs(arrowX - xLocked)
        distanceYarrow = Math.abs(arrowY - yLocked)

        moveAmountX = (distanceXarrow + 350) * .015;
        moveAmountY = (distanceYarrow - 50) * .05;

        if (xLocked > arrowX) {
            directionX = "Greater"
        }
        if (xLocked < arrowX) {
            directionX = "Lesser"
        }
        if (yLocked > arrowY) {
            directionY = "Greater"
        }
        if (yLocked < arrowY) {
            directionY = "Lesser"
        }

        document.getElementById("invisMoveTOMouse").style.visibility = "visible"
    }
}

function ArrowGoTo()
{
    arrowX = parseInt(arrow.style.left.replace("px", ""));
    arrowY = parseInt(arrow.style.top.replace("px", ""));

    if (directionX == 'Greater') {
        arrowX = arrowX + moveAmountX
    }
    if (directionX == 'Lesser') {
        arrowX = arrowX - moveAmountX
    }
    if (directionY == 'Greater') {
        arrowY = arrowY + moveAmountY
    }
    if (directionY == 'Lesser') {
        arrowY = arrowY - moveAmountY
    }

    arrow.style.left = arrowX + "px";
    arrow.style.top = arrowY + "px";
}
setInterval(ArrowGoTo, 90)
//End Arrow Movement Section

//Begin Enemy Movement Section
var enemyX;
var enemyY;
var playerX;
var playerY;

var distanceX;
var distanceY;


function MoveEnemy() {
    enemyX = parseInt(enemy.style.left.replace("px", ""));
    enemyY = parseInt(enemy.style.top.replace("px", ""));
    playerX = parseInt(player.style.left.replace("px", ""));
    playerY = parseInt(player.style.top.replace("px", ""));

    distanceX = Math.abs(playerX - enemyX)
    distanceY = Math.abs(playerY - enemyY)

    if (distanceX < 275) //Mid Range Speed Correction
    {
        Enemyspeed = .04;
    }
    else {
        Enemyspeed = .02;
    }

    if (distanceX < 150) //Close Range Speed Correction
    {
        Enemyspeedeed = .05;
    }
    else {
        Enemyspeed = .02;
    }

    if (distanceY < 275) //Mid Range Speed Correction
    {
        Enemyspeed = .04;
    }
    else {
        Enemyspeed = .02;
    }

    if (distanceY < 150) //Close Range Speed Correction
    {
        Enemyspeed = .05;
    }
    else {
        Enemyspeed = .02;
    }

    if (EnemyActivate == false) {
        Enemyspeed = 0;
    }

    var moveAmountX = distanceX * Enemyspeed;
    var moveAmountY = distanceY * Enemyspeed;

    if (playerX > enemyX) {
        enemyX = enemyX + moveAmountX
    }
    if (playerX < enemyX) {
        enemyX = enemyX - moveAmountX
    }
    if (playerY > enemyY) {
        enemyY = enemyY + moveAmountY
    }
    if (playerY < enemyY) {
        enemyY = enemyY - moveAmountY
    }

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";
}
setInterval(MoveEnemy, 100);
//End Enemy Movement Section

// Begin Player Death HTML
function playerDeath() {
    if (playerHealth <= 0) {
        window.location.href = "./DeathScreen.html";
    }
}
setInterval(playerDeath, 100);
// End Player Death HTML

// Begin Player Win HTML
function playerWin() {
    if(winStatus === true) {
        window.location.href = "./WinScreen.html";
    }
}
setInterval(playerWin, 100);
// End Player Win HTML