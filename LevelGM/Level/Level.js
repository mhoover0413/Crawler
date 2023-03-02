var player = document.getElementById("player");
var enemy = document.getElementById("enemy");

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var allowUp = true;
var allowDown = true;
var allowLeft = true;
var allowRight = true;

var Enemyspeed = .02;

var EnemyActivate = true;

var playerHealth = 50;
var playerMaxHealth = 50;

//Begin Player Movement Section

var speed = .6;

// move player based on user input
function inputs() {
    var playerX = parseFloat(player.style.left.replace("px", ""));
    var playerY = parseFloat(player.style.top.replace("px", ""));
    if (playerHealth >= 0) {
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
        if (playerHealth >= 0) {
            playerHealth -= 2;
        }
        console.log(playerHealth)
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
setInterval(CollideWall, 4)
setInterval(CollideEnemy, 600)
//End Collision Section

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