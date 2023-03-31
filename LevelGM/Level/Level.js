//983 lines


var player = document.getElementById("player");
var weapon1 = document.getElementById("weapon1");
var weapon2 = document.getElementById("weapon2");
var weapon1Box = document.getElementById("Slot1");
var weapon2Box = document.getElementById("Slot2");
var enemy = document.getElementsByName("enemy" + window.localStorage.getItem("levelSelected"));
var arrow = document.getElementById("invisMoveTOMouse");
var door = document.getElementById("Door" + window.localStorage.getItem("levelSelected"));
var swordHitBox = document.getElementById("swordHitBox")
var bowDirection = document.getElementById("bowDirection");
var playerShower = document.getElementById("playerStatShower");
var itemShower = document.getElementById("itemShower");
var itemShowerText = document.getElementById("itemShowerText");

var weapon1Dropped = false;
var weapon2Dropped = false;

//This gameBroke is for if you go past the amount of created levels

//Pre generated dungeons with random enemies in them, and exits that go to new dungeons

//If all weapons are dropped, give the player fists weapon

// Setup the weapon name like this name = "bow/sword/other_types item_name damage_amount crit_chance sell_price dropped_boolean"
// Display box will be enabled if it is dropped and collides with playerShower, and will track with its respective weapon
// Display box will use the info from the item name to display

//Inventory button

//Create a list of maps with their id and starting position, then random pick from it and spawn the player in it, add random enemies in the map after it.
var gameBroke = false;

var complete = false;

var weaponSelected = 0;

var timer = 0.00;

var characterL = false;
var characterR = false;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var swordActivated = false;

var allowUp = true;
var allowDown = true;
var allowLeft = true;
var allowRight = true;

var allEnemiesDead = false;

var Enemyspeed = .02;
for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].className == "redLB") {
        Enemyspeed = .03;
    }
}
var EnemyHealth = 25;

var enemyAlive = true;

var EnemyActivate = true;

var playerHealth = 50;
var playerMaxHealth = 50;

var winStatus = false;
var mouseX;
var mouseY;

document.addEventListener("mousemove", onmousemove);

if (window.localStorage.getItem("levelSelected")) {
    var levelCount = window.localStorage.getItem("levelSelected")
    //Disabling old level stuff
    for (let i = 0; i > levelCount; i--) {
        if (document.getElementById(`Level${i}Set`)) {
            var currentTileset = document.getElementById(`Level${i}Set`)
            currentTileset.style.visibility = "hidden";
        }
    }

    //Enabling current level stuff
    if (document.getElementById(`Level${levelCount}Set`)) {
        var currentTileset = document.getElementById(`Level${levelCount}Set`)
        currentTileset.style.visibility = "visible";
    }
    else {
        document.body.innerHTML = "There is no Level: " + levelCount + "..........  yet."
        var bttn = document.createElement("button");
        bttn.onclick = function () {
            window.location.href = "../../MainMenu.html";
        }
        bttn.innerHTML = "Back"
        document.body.appendChild(bttn)
        gameBroke = true;
    }
}
if (gameBroke == false) {
    var onmousemove = function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    //Begin Player Movement Section

    var speed = .6;

    if (weapon1.name.includes("Sword")) {
        weapon1.style.transform = "rotate(-90deg)";
    }
    if (weapon2.name.includes("Sword")) {
        weapon2.style.transform = "scaleX(-1)";
    }

    if (weapon1.name.includes("Bow")) {
        weapon1.style.transform = "scaleX(1)";
    }
    if (weapon2.name.includes("Bow")) {
        weapon2.style.transform = "scaleX(1)";
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

            if (!weapon1.name.includes("dropped")) {
                weapon1.style.top = playerY - 8 + "px";
                weapon1.style.left = playerX - 45 + "px";
            }
            if (!weapon2.name.includes("dropped")) {
                weapon2.style.top = playerY + 15 + "px";
                weapon2.style.left = playerX - 10 + "px";
            }
            swordHitBox.style.top = playerY + 55 + "px";
            swordHitBox.style.left = playerX - 20 + "px";

            playerShower.style.top = playerY - 20 + "px";
            playerShower.style.left = playerX - 20 + "px";

            itemShower.style.top = playerY - 100 + "px";
            itemShower.style.left = playerX + 75 + "px";

            itemShowerText.style.top = playerY - 97 + "px";
            itemShowerText.style.left = playerX + 80 + "px";
        }

        var playerShowerX = parseFloat(playerShower.style.left.replace("px", ""))
        var playerShowerY = parseFloat(playerShower.style.top.replace("px", ""))

        //Fix naming convention, query selectors?
        var allItemsWithDroppedID = document.querySelectorAll('img[name~="dropped"]');

        console.log(allItemsWithDroppedID.length)

        var totalSearched = 0;
        var hit = false;
        for (let i = 0; i < allItemsWithDroppedID.length; i++) {
            var itemX = parseFloat(allItemsWithDroppedID[i].style.left.replace("px", ""))
            var itemY = parseFloat(allItemsWithDroppedID[i].style.top.replace("px", ""))

            totalSearched++;

            if (Math.abs(playerShowerX - itemX) < 50 && Math.abs(playerShowerY - itemY) < 50) {
                console.log("hitting")
                itemShower.style.visibility = "visible";
                itemShowerText.style.visibility = "visible";
                var nameDesc = allItemsWithDroppedID[i].name.split(" ");

                var allItems = [nameDesc[1], nameDesc[2], nameDesc[3], nameDesc[4]]

                var biggestLength = 0;

                for (let item of allItems) {
                    if (biggestLength < item.length) {
                        biggestLength = item.length
                    }
                }

                itemShower.style.width = ((biggestLength + 5) * 8.5) + "px"
                itemShowerText.style.width = ((biggestLength + 5) * 8.5) + "px"

                var name = nameDesc[1];
                var damage = nameDesc[2];
                var critChance = nameDesc[3];
                var sellPrice = nameDesc[4];
                itemShowerText.innerHTML = `Name: ${name}<br>Damage: ${damage}<br>Crit Chance: ${critChance}<br>Sell Price: ${sellPrice}`;

                hit = true;
            }
        }
        if (totalSearched == allItemsWithDroppedID.length && hit == false) {
            console.log("nope")
            itemShower.style.visibility = "hidden";
            itemShowerText.style.visibility = "hidden";
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
            player.style.transform = "scaleX(-1)"
            characterL = true;
            characterR = false;
        }

        //right
        if (event.keyCode == 39) {
            rightPressed = false;
            player.style.transform = "scaleX(1)"
            characterL = false;
            characterR = true;
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
            player.style.transform = "scaleX(-1)"
            characterL = true;
            characterR = false;
        }

        //right
        if (event.keyCode == 68) {
            rightPressed = false;
            player.style.transform = "scaleX(1)"
            characterL = false;
            characterR = true;
        }

        //Drop (q)
        if (event.keyCode == 81) {
            if (weaponSelected == 1 && weapon1Dropped == false || weapon1.style.visibility == "visible" && weapon1Dropped == false) {
                weapon1Dropped = true;
                weapon1.name = weapon1.name + " dropped"
            }
            if (weaponSelected == 2 && weapon2Dropped == false || weapon2.style.visibility == "visible" && weapon2Dropped == false) {
                weapon2Dropped = true
                weapon2.name = weapon2.name + " dropped"
            }
        }
    }

    setInterval(inputs, 2);
    //End Player Movement Section

    //Start Weapon Select Section
    function selectW(e) {
        if (e.keyCode == 49 && !weapon1.name.includes("dropped")) {
            //Weapon1 Selected
            if (!weapon2.name.includes("dropped")) {
                weapon2.style.visibility = "hidden"
                weapon2Box.style.backgroundColor = "#FFFFFF"
            }
            weapon1.style.visibility = "visible";
            weapon1Box.style.backgroundColor = "#68af36"
            bowDirection.style.visibility = "hidden"
        }
        if (e.keyCode == 50 && !weapon2.name.includes("dropped")) {
            //Weapon2 Selected
            if (!weapon1.name.includes("dropped")) {
                weapon1.style.visibility = "hidden"
                weapon1Box.style.backgroundColor = "#FFFFFF"
            }
            weapon2.style.visibility = "visible";
            weapon2Box.style.backgroundColor = "#68af36"
            bowDirection.style.visibility = "visible"
        }
    }
    function selectS(e) {
        if (e.deltaY) {
            if (e.deltaY < 0) {
                //Scroll Up
                weaponSelected++;
                if (weaponSelected >= 3) {
                    weaponSelected = 0
                }
            }
            else if (e.deltaY > 0) {
                //Scroll Down
                weaponSelected--;
                if (weaponSelected <= -1) {
                    weaponSelected = 2;
                }
            }
        }
        if (weaponSelected == 1 && weapon1.style.visibility == "hidden" && !weapon1.name.includes("dropped")) {
            //Weapon1 Selected
            weapon2.style.visibility = "hidden"
            weapon2Box.style.backgroundColor = "#FFFFFF"
            weapon1.style.visibility = "visible";
            weapon1Box.style.backgroundColor = "#68af36"
            bowDirection.style.visibility = "hidden"
        }
        if (weaponSelected == 2 && weapon2.style.visibility == "hidden" && !weapon2.name.includes("dropped")) {
            //Weapon2 Selected
            weapon1.style.visibility = "hidden"
            weapon1Box.style.backgroundColor = "#FFFFFF"
            weapon2.style.visibility = "visible";
            weapon2Box.style.backgroundColor = "#68af36"
            bowDirection.style.visibility = "visible"
        }
    }
    document.body.addEventListener("keydown", selectW);
    document.addEventListener("wheel", selectS)
    //End Weapon Select Section

    //Start Level Timer
    var timer = 0;
    var timerDiv = document.getElementById('timer');
    function increaseTime() {
        timer += .004;
        timer *= 1000;
        timer = Math.round(timer);
        timer /= 1000;
        timerDiv.innerHTML = timer;
    };
    if (!winStatus) {
        setInterval(increaseTime, 1);
    };
    //End Level Timer

    //Start Collision Section
    function CollideWall() {
        //Not a part of wall collision but needs to be somewhere temporarily
        if (!weapon2.name.includes("dropped")) {
            var bowDirectionX = parseFloat(player.style.left.replace("px", ""))
            var bowDirectionY = parseFloat(bowDirection.style.top.replace("px", ""))

            var bowDX = parseFloat(document.getElementById("weapon2").style.left.replace("px", ""))
            var bowDY = parseFloat(document.getElementById("weapon2").style.top.replace("px", ""))

            bowDirection.style.left = bowDX + 20 + 'px';
            bowDirection.style.top = bowDY + 30 + 'px';


            var distanceXbow = Math.abs(bowDX - mouseX)
            var distanceYbow = Math.abs(bowDY - mouseY)

            var stretchX = distanceXbow
            var stretchY = distanceYbow

            if (distanceXbow > distanceYbow) {
                bowDirection.style.width = stretchX + "px";
                var leftAmount = parseFloat(bowDirection.style.left.replace("px", ""))
                var leftDegree = leftAmount - (stretchX / 2)
                bowDirection.style.left = leftDegree + "px"
            }
            else {
                bowDirection.style.width = stretchY + "px";
                var leftAmount = parseFloat(bowDirection.style.left.replace("px", ""))
                var leftDegree = leftAmount - (stretchY / 2)
                bowDirection.style.left = leftDegree + "px"
            }

            var X = "";
            var Y = "";

            if (mouseX > bowDirectionX) {
                X = "scaleX(1)";
            }
            if (mouseX < bowDirectionX) {
                X = "scaleX(-1)"
            }
            if (mouseY > bowDirectionY) {
                Y = "scaleY(1)";
            }
            if (mouseY < bowDirectionY) {
                Y = "scaleY(-1)";
            }

            var angleRad = Math.atan2(distanceYbow, distanceXbow)

            var angleDeg = angleRad * 180 / Math.PI

            bowDirection.style.transform = `${X} ${Y} rotate(${angleDeg}deg)`;
        }
        var wallTopSpecial = "";
        var wallBttmSpecial = "";
        var wallLeftSpecial = "";
        var wallRightSpecial = "";
        var wallTopSpecialX = "";
        var wallBttmSpecialX = "";
        var wallLeftSpecialX = "";
        var wallRightSpecialX = "";
        var wallTopSpecialY = "";
        var wallBttmSpecialY = "";
        var wallLeftSpecialY = "";
        var wallRightSpecialY = "";

        if (document.getElementsByName("WallTop" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallTopSpecial = document.getElementsByName("WallTop" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallBttm" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallBttmSpecial = document.getElementsByName("WallBttm" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallLeft" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallLeftSpecial = document.getElementsByName("WallLeft" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallRight" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallRightSpecial = document.getElementsByName("WallRight" + window.localStorage.getItem("levelSelected") + "S");
        }

        var playerX = parseFloat(player.style.left.replace("px", ""));
        var playerY = parseFloat(player.style.top.replace("px", ""));

        for (let i = 0; i < enemy.length; i++) {
            var enemyX = parseFloat(enemy[i].style.left.replace("px", ""));
            var enemyY = parseFloat(enemy[i].style.top.replace("px", ""));

            var enemyId = enemy[i].id.split(" ");
            var tempEnemyHealth = parseInt(enemyId[0])
            var tempEnemySpeed = parseFloat(enemyId[1])

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

            if (wallTopSpecial != "") {
                for (let o = 0; o < wallTopSpecial.length; o++) {
                    wallTopSpecialX = parseInt(wallTopSpecial[o].style.left.replace("px", ""));
                    wallTopSpecialY = parseInt(wallTopSpecial[o].style.top.replace("px", ""));
                    if (Math.abs(enemyX - wallTopSpecialX) < 70 && Math.abs(enemyY - wallTopSpecialY) < 50) {
                        enemyY += tempEnemySpeed;
                        enemy[i].style.top = enemyY + "px";

                    }
                }
            }
            if (wallBttmSpecial != "") {
                for (let o = 0; o < wallBttmSpecial.length; o++) {
                    wallBttmSpecialX = parseInt(wallBttmSpecial[o].style.left.replace("px", ""));
                    wallBttmSpecialY = parseInt(wallBttmSpecial[o].style.top.replace("px", ""));
                    if (Math.abs(enemyX - wallBttmSpecialX) < 70 && Math.abs(enemyY - wallBttmSpecialY) < 50) {
                        enemyY -= tempEnemySpeed;
                        enemy[i].style.top = enemyY + "px";

                    }
                }
            }
            if (wallLeftSpecial != "") {
                for (let o = 0; o < wallLeftSpecial.length; o++) {
                    wallLeftSpecialX = parseInt(wallLeftSpecial[o].style.left.replace("px", ""));
                    wallLeftSpecialY = parseInt(wallLeftSpecial[o].style.top.replace("px", ""));
                    if (Math.abs(enemyX - wallLeftSpecialX) < 50 && Math.abs(enemyY - wallLeftSpecialY) < 90) {
                        enemyX += tempEnemySpeed;
                        enemy[i].style.left = enemyX + "px";
                    }
                }
            }
            if (wallRightSpecial != "") {
                for (let o = 0; o < wallRightSpecial.length; o++) {
                    wallRightSpecialX = parseInt(wallRightSpecial[o].style.left.replace("px", ""));
                    wallRightSpecialY = parseInt(wallRightSpecial[o].style.top.replace("px", ""));
                    if (Math.abs(enemyX - wallRightSpecialX) < 50 && Math.abs(enemyY - wallRightSpecialY) < 90) {
                        enemyX -= tempEnemySpeed;
                        enemy[i].style.left = enemyX + "px";
                    }
                }
            }
        }
        if (enemy.length == 0) {
            allowRight = true;
            allowLeft = true;
            allowUp = true;
            allowDown = true;
        }

        if (wallTopSpecial != "") {
            for (let i = 0; i < wallTopSpecial.length; i++) {
                wallTopSpecialX = parseInt(wallTopSpecial[i].style.left.replace("px", ""));
                wallTopSpecialY = parseInt(wallTopSpecial[i].style.top.replace("px", ""));
                if (Math.abs(playerX - wallTopSpecialX) < 90 && Math.abs(playerY - wallTopSpecialY) < 50) {
                    playerY += 3;
                    player.style.top = playerY + "px";
                }
            }
        }
        if (wallBttmSpecial != "") {
            for (let i = 0; i < wallBttmSpecial.length; i++) {
                wallBttmSpecialX = parseInt(wallBttmSpecial[i].style.left.replace("px", ""));
                wallBttmSpecialY = parseInt(wallBttmSpecial[i].style.top.replace("px", ""));
                if (Math.abs(playerX - wallBttmSpecialX) < 90 && Math.abs(playerY - wallBttmSpecialY) < 50) {
                    playerY -= 3;
                    player.style.top = playerY + "px";
                }
            }
        }
        if (wallLeftSpecial != "") {
            for (let i = 0; i < wallLeftSpecial.length; i++) {
                wallLeftSpecialX = parseInt(wallLeftSpecial[i].style.left.replace("px", ""));
                wallLeftSpecialY = parseInt(wallLeftSpecial[i].style.top.replace("px", ""));
                if (Math.abs(playerX - wallLeftSpecialX) < 50 && Math.abs(playerY - wallLeftSpecialY) < 100) {
                    playerX += 3;
                    player.style.left = playerX + "px";
                }
            }
        }
        if (wallRightSpecial != "") {
            for (let i = 0; i < wallRightSpecial.length; i++) {
                wallRightSpecialX = parseInt(wallRightSpecial[i].style.left.replace("px", ""));
                wallRightSpecialY = parseInt(wallRightSpecial[i].style.top.replace("px", ""));
                if (Math.abs(playerX - wallRightSpecialX) < 50 && Math.abs(playerY - wallRightSpecialY) < 100) {
                    playerX -= 3;
                    player.style.left = playerX + "px";
                }
            }
        }
    }

    function CollideEnemy() {
        for (let i = 0; i < enemy.length; i++) {
            var enemyX = parseFloat(enemy[i].style.left.replace("px", ""));
            var enemyY = parseFloat(enemy[i].style.top.replace("px", ""));
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
    }

    function CollideArrow() {
        for (let i = 0; i < enemy.length; i++) {
            if (arrow.style.visibility == "visible") {
                var arrowX = parseInt(arrow.style.left.replace("px", ""));
                var arrowY = parseInt(arrow.style.top.replace("px", ""));
                var enemyX = parseFloat(enemy[i].style.left.replace("px", ""));
                var enemyY = parseFloat(enemy[i].style.top.replace("px", ""));

                var enemyId = enemy[i].id.split(" ");
                var tempEnemyHealth = parseInt(enemyId[0])
                var tempEnemySpeed = parseInt(enemyId[1])

                if (Math.abs(arrowX - enemyX) < 50 && Math.abs(arrowY - enemyY) < 50 && tempEnemyHealth > 0) {
                    arrow.style.visibility = "hidden"
                    tempEnemyHealth = tempEnemyHealth - 5;
                    enemy[i].id = tempEnemyHealth + " " + tempEnemySpeed;
                    if (tempEnemyHealth <= 0) {
                        enemy[i].style.visibility = "hidden"
                        enemy[i].remove()
                    }
                }
            }
        }
        var arrowX = parseInt(arrow.style.left.replace("px", ""));
        var arrowY = parseInt(arrow.style.top.replace("px", ""));

        var wallTopSpecial = "";
        var wallBttmSpecial = "";
        var wallLeftSpecial = "";
        var wallRightSpecial = "";
        var wallTopSpecialX = "";
        var wallBttmSpecialX = "";
        var wallLeftSpecialX = "";
        var wallRightSpecialX = "";
        var wallTopSpecialY = "";
        var wallBttmSpecialY = "";
        var wallLeftSpecialY = "";
        var wallRightSpecialY = "";

        if (document.getElementsByName("WallTop" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallTopSpecial = document.getElementsByName("WallTop" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallBttm" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallBttmSpecial = document.getElementsByName("WallBttm" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallLeft" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallLeftSpecial = document.getElementsByName("WallLeft" + window.localStorage.getItem("levelSelected") + "S");
        }
        if (document.getElementsByName("WallRight" + window.localStorage.getItem("levelSelected") + "S").length != 0) {
            wallRightSpecial = document.getElementsByName("WallRight" + window.localStorage.getItem("levelSelected") + "S");
        }

        if (wallTopSpecial != "") {
            for (let i = 0; i < wallTopSpecial.length; i++) {
                wallTopSpecialX = parseInt(wallTopSpecial[i].style.left.replace("px", ""));
                wallTopSpecialY = parseInt(wallTopSpecial[i].style.top.replace("px", ""));
                if (Math.abs(arrowX - wallTopSpecialX) < 90 && Math.abs(arrowY - wallTopSpecialY) < 50) {
                    arrow.style.visibility = "hidden"
                }
            }
        }
        if (wallBttmSpecial != "") {
            for (let i = 0; i < wallBttmSpecial.length; i++) {
                wallBttmSpecialX = parseInt(wallBttmSpecial[i].style.left.replace("px", ""));
                wallBttmSpecialY = parseInt(wallBttmSpecial[i].style.top.replace("px", ""));
                if (Math.abs(arrowX - wallBttmSpecialX) < 90 && Math.abs(arrowY - wallBttmSpecialY) < 50) {
                    arrow.style.visibility = "hidden"
                }
            }
        }
        if (wallLeftSpecial != "") {
            for (let i = 0; i < wallLeftSpecial.length; i++) {
                wallLeftSpecialX = parseInt(wallLeftSpecial[i].style.left.replace("px", ""));
                wallLeftSpecialY = parseInt(wallLeftSpecial[i].style.top.replace("px", ""));
                if (Math.abs(arrowX - wallLeftSpecialX) < 50 && Math.abs(arrowY - wallLeftSpecialY) < 100) {
                    arrow.style.visibility = "hidden"
                }
            }
        }
        if (wallRightSpecial != "") {
            for (let i = 0; i < wallRightSpecial.length; i++) {
                wallRightSpecialX = parseInt(wallRightSpecial[i].style.left.replace("px", ""));
                wallRightSpecialY = parseInt(wallRightSpecial[i].style.top.replace("px", ""));
                if (Math.abs(arrowX - wallRightSpecialX) < 50 && Math.abs(arrowY - wallRightSpecialY) < 100) {
                    arrow.style.visibility = "hidden"
                }
            }
        }

    }
    function CollideSword() {
        var swordHitBoxX = parseFloat(swordHitBox.style.left.replace("px", ""));
        var swordHitBoxY = parseFloat(swordHitBox.style.top.replace("px", ""));
        for (let i = 0; i < enemy.length; i++) {
            var enemyX = parseFloat(enemy[i].style.left.replace("px", ""));
            var enemyY = parseFloat(enemy[i].style.top.replace("px", ""));

            var enemyId = enemy[i].id.split(" ");
            var tempEnemyHealth = parseInt(enemyId[0])
            var tempEnemySpeed = parseInt(enemyId[1])

            if (Math.abs(swordHitBoxX - enemyX) < 90 && Math.abs(swordHitBoxY - enemyY) < 90 && swordActivated == true) {
                enemy[i].id = (tempEnemyHealth - 5) + " " + tempEnemySpeed;
                if (tempEnemyHealth <= 0) {
                    enemy[i].style.visibility = "hidden"
                    enemy[i].remove()
                    enemyAlive = false;
                }
            }
        }
    }
    function CollideDoor() {
        var playerX = parseFloat(player.style.left.replace("px", ""));
        var playerY = parseFloat(player.style.top.replace("px", ""));

        var doorX = parseFloat(door.style.left.replace("px", ""));
        var doorY = parseFloat(door.style.top.replace("px", ""));

        if (Math.abs(playerX - doorX) < 90 && Math.abs(playerY - doorY) < 90 && document.getElementsByName("enemy" + window.localStorage.getItem("levelSelected")).length == 0 && complete == false) {
            winStatus = true;
            allEnemiesDead = true;
            complete = true;
            GameWin();
        }
    }
    setInterval(CollideWall, 5)
    setInterval(CollideEnemy, 300)
    setInterval(CollideArrow, 100)
    setInterval(CollideSword, 900)
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

    document.onmousedown = function () {
        if (!weapon1.name.includes("dropped")) {
            if (document.getElementById("weapon1").name.includes("Bow") && document.getElementById("weapon1").style.visibility == "visible" && document.getElementById("invisMoveTOMouse").style.visibility == "hidden") {
                xLocked = mouseX;
                yLocked = mouseY;

                arrowX = parseFloat(arrow.style.left.replace("px", ""));
                arrowY = parseFloat(arrow.style.top.replace("px", ""));

                var weaponX = parseFloat(document.getElementById("weapon1").style.left.replace("px", ""));
                var weaponY = parseFloat(document.getElementById("weapon1").style.top.replace("px", ""));

                arrowX = weaponX;
                arrowY = weaponY;

                arrow.style.left = arrowX + "px";
                arrow.style.top = arrowY + "px";

                distanceXarrow = Math.abs(arrowX - xLocked)
                distanceYarrow = Math.abs(arrowY - yLocked)

                moveAmountX = ((distanceXarrow + 350) * .015) + .1;
                moveAmountY = ((distanceYarrow - 50) * .05) + .1;

                //arrow.style.transform = `scaleX(-1)`;
                if (xLocked > arrowX) {
                    directionX = "Greater"
                    arrow.style.transform = "scaleX(1)";
                }
                if (xLocked < arrowX) {
                    directionX = "Lesser"
                    arrow.style.transform = "scaleX(-1)";
                }
                if (yLocked > arrowY) {
                    directionY = "Greater"
                    //arrow.style.transform = "scaleY(1)";
                }
                if (yLocked < arrowY) {
                    directionY = "Lesser"
                    //arrow.style.transform = "scaleY(-1)";
                }

                var angleRad = Math.atan2(distanceYarrow, distanceXarrow)

                var angleDeg = angleRad * 180 / Math.PI

                //arrow.style.transform = `rotate(${angleDeg}deg)`;

                document.getElementById("invisMoveTOMouse").style.visibility = "visible"
            }
        }
        if (!weapon2.name.includes("dropped")) {

            if (document.getElementById("weapon2").name.includes("Bow") && document.getElementById("weapon2").style.visibility == "visible" && document.getElementById("invisMoveTOMouse").style.visibility == "hidden") {
                xLocked = mouseX;
                yLocked = mouseY;

                arrowX = parseFloat(arrow.style.left.replace("px", ""));
                arrowY = parseFloat(arrow.style.top.replace("px", ""));

                var weaponX = parseFloat(document.getElementById("weapon2").style.left.replace("px", ""));
                var weaponY = parseFloat(document.getElementById("weapon2").style.top.replace("px", ""));

                arrowX = weaponX;
                arrowY = weaponY;

                arrow.style.left = arrowX + "px";
                arrow.style.top = arrowY + "px";

                distanceXarrow = Math.abs(arrowX - xLocked)
                distanceYarrow = Math.abs(arrowY - yLocked)

                moveAmountX = distanceXarrow * .06;
                moveAmountY = distanceYarrow * .06;

                arrow.style.transform = `rotate(-180deg)`;
                if (xLocked >= arrowX) {
                    directionX = "Greater"
                    arrow.style.transform = `scaleX(1)`;
                }
                if (xLocked <= arrowX) {
                    directionX = "Lesser"
                    arrow.style.transform = `scaleX(-1)`;
                }
                if (yLocked >= arrowY) {
                    directionY = "Greater"
                    arrow.style.transform += "scaleY(1)";
                }
                if (yLocked <= arrowY) {
                    directionY = "Lesser"
                    arrow.style.transform += "scaleY(-1)";
                }

                var angleRad = Math.atan2(distanceYarrow, distanceXarrow)

                var angleDeg = angleRad * 180 / Math.PI

                arrow.style.transform += `rotate(${angleDeg}deg)`;

                document.getElementById("invisMoveTOMouse").style.visibility = "visible"
            }
        }
        if (!weapon1.name.includes("dropped")) {
            if (document.getElementById("weapon1").name.includes("Sword") && document.getElementById("weapon1").style.visibility == "visible" && swordActivated == false) {
                change()
            }
        }
        if (!weapon2.name.includes("dropped")) {
            if (document.getElementById("weapon2").name.includes("Sword") && document.getElementById("weapon2").style.visibility == "visible" && swordActivated == false) {
                change()
            }
        }
    }

    function change() {
        swordActivated = true;
        setTimeout(function () {
            swordActivated = false;
        }, 400)
    }

    function ArrowGoTo() {
        arrowX = parseFloat(arrow.style.left.replace("px", ""));
        arrowY = parseFloat(arrow.style.top.replace("px", ""));

        if (directionX == 'Greater') {
            arrowX += moveAmountX
        }
        if (directionX == 'Lesser') {
            arrowX -= moveAmountX
        }
        if (directionY == 'Greater') {
            arrowY += moveAmountY
        }
        if (directionY == 'Lesser') {
            arrowY -= moveAmountY
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
        for (let i = 0; i < enemy.length; i++) {
            var enemyX = parseFloat(enemy[i].style.left.replace("px", ""));
            var enemyY = parseFloat(enemy[i].style.top.replace("px", ""));
            playerX = parseInt(player.style.left.replace("px", ""));
            playerY = parseInt(player.style.top.replace("px", ""));

            distanceX = Math.abs(playerX - enemyX)
            distanceY = Math.abs(playerY - enemyY)

            var enemyId = enemy[i].id.split(" ");
            var tempEnemyHealth = parseInt(enemyId[0])
            var tempEnemySpeed = parseFloat(enemyId[1])

            if (EnemyActivate == false) {
                enemy[i].id = tempEnemyHealth + " ";
            }

            if (playerX > enemyX) {
                enemyX += tempEnemySpeed
            }
            if (playerX < enemyX) {
                enemyX -= tempEnemySpeed
            }
            if (playerY > enemyY) {
                enemyY += tempEnemySpeed
            }
            if (playerY < enemyY) {
                enemyY -= tempEnemySpeed
            }

            //Rotation
            if (playerX > enemyX && playerY > enemyY) {
                //Left
                enemy[i].style.transform = "scaleX(1) rotate(45deg)";
            }
            if (playerX > enemyX && playerY < enemyY) {
                //Left
                enemy[i].style.transform = "scaleX(1) rotate(-45deg)";
            }
            if (Math.abs(playerX - enemyX) <= 80 && playerY > enemyY) {
                //Left
                enemy[i].style.transform = "scaleX(1) rotate(90deg)";
            }
            if (Math.abs(playerX - enemyX) <= 80 && playerY < enemyY) {
                //Left
                enemy[i].style.transform = "scaleX(1) rotate(-90deg)";
            }
            if (playerX < enemyX && playerY > enemyY) {
                //Right
                enemy[i].style.transform = "scaleX(-1) rotate(45deg)";
            }
            if (playerX < enemyX && playerY < enemyY) {
                //Right
                enemy[i].style.transform = "scaleX(-1) rotate(-45deg)";
            }
            if (playerX < enemyX && Math.abs(playerY - enemyY) <= 100) {
                //Right
                enemy[i].style.transform = "scaleX(-1) rotate(0deg)";
            }
            if (playerX > enemyX && Math.abs(playerY - enemyY) <= 100) {
                //Right
                enemy[i].style.transform = "scaleX(1) rotate(-0deg)";
            }

            enemy[i].style.left = enemyX + "px";
            enemy[i].style.top = enemyY + "px";

            enemy[i].id = enemyId[0] + " " + enemyId[1];
        }
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
        if (winStatus === true) {
            if (window.localStorage.getItem("levelHS") >= 1) {
                var itemAmount = window.localStorage.getItem("levelHS");
                var amount = parseInt(itemAmount) + 1;
                window.localStorage.setItem("levelHS", amount)
            }
            else {
                window.localStorage.setItem("levelHS", 1);
            }
            window.location.href = "./WinScreen.html";
        }
    }
    setInterval(playerWin, 100);
    // End Player Win HTML
}
