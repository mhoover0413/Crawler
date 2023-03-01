var player = document.getElementById("player");
var enemy = document.getElementById("enemy");

//Begin Player Movement Section
document.addEventListener('keydown', function (event) {
    var playerX = parseInt(player.style.left.replace("px", ""));
    var playerY = parseInt(player.style.top.replace("px", ""));

    var speed = 5;

    if (event.keyCode == 37) {//Arrow Left
        //if (playerX >= speed) {
            playerX -= speed;
        //}
    }
    if (event.keyCode == 38) { //Arrow Up
        //if (playerY >= speed) {
            playerY -= speed;
        //}
    }
    if (event.keyCode == 39) { //Arrow Right
        //if (playerX <= speed78) {
                playerX+=speed;
        //    }
    }
    if (event.keyCode == 40) { //Arrow Down
        //if (playerY <= 1speed8) {
            playerY += speed;
        //}
    }

    //Keyboard Keys
    if (event.keyCode == 87) { //Key W / Up
        //if (playerY >= speed)
        //{
            playerY -= speed;
        //}
    }
    if (event.keyCode == 83) { //Key S / Down
        //if (playerX <= 1speed8)
        //{
            playerY += speed;
        //}
    }
    if (event.keyCode == 65) {//Key A / Left
        //if (playerX >= speed) {
            playerX -= speed;
        //}
    }
    if (event.keyCode == 68) { //Key D / Right
        //if (playerX <= speed78) {
                playerX+=speed;
        //    }
    }

    player.style.left = playerX + "px";
    player.style.top = playerY + "px"
})
//End Player Movement Section

//Collision Code For Later
// if (Math.abs(playerX - coinX) < 50 && Math.abs(playerY - coinY) < 50) {
//     score += 1;
//     scoreDisplay.innerHTML = 'Score: ' + score;
//     moveCoin();
// }

//Begin Enemy Movement Section
function MoveEnemy()
{
    var speed = .02;

    var enemyX = parseInt(enemy.style.left.replace("px", ""));
    var enemyY = parseInt(enemy.style.top.replace("px", ""));
    var playerX = parseInt(player.style.left.replace("px", ""));
    var playerY = parseInt(player.style.top.replace("px", ""));

    var distanceX = Math.abs(playerX - enemyX)
    var distanceY = Math.abs(playerY - enemyY)

    console.log(distanceX)

    if (distanceX < 275) //Mid Range Speed Correction
    {
        speed = .04;
    }
    else
    {
        speed = .02;
    }

    if (distanceX < 150) //Close Range Speed Correction
    {
        speed = .05;
    }
    else
    {
        speed = .02;
    }

    if (distanceY < 275) //Mid Range Speed Correction
    {
        speed = .04;
    }
    else
    {
        speed = .02;
    }

    if (distanceY < 150) //Close Range Speed Correction
    {
        speed = .05;
    }
    else
    {
        speed = .02;
    }

    var moveAmountX = distanceX * speed;
    var moveAmountY = distanceY * speed;

    if (playerX > enemyX)
    {
        enemyX = enemyX + moveAmountX
    }
    if (playerX < enemyX)
    {
        enemyX = enemyX - moveAmountX
    }
    if (playerY > enemyY)
    {
        enemyY = enemyY + moveAmountY
    }
    if (playerY < enemyY)
    {
        enemyY = enemyY - moveAmountY
    }

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";
}
setInterval(MoveEnemy, 100);
//End Enemy Movement Section