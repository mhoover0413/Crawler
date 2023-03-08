var levelHighScore = window.localStorage.getItem("levelHS")
console.log(window.localStorage.getItem("levelHS"))

if (window.localStorage.getItem("levelHS") == 0)
{
    Restart()
}

for (let i = 0; i <= levelHighScore; i++) {
    if (currentBttn = document.getElementById("Bttn" + i)) {
        var currentBttn = document.getElementById("Bttn" + i)
        currentBttn.style.visibility = "visible";
    }
}

var levelSelected = function (lS) {
    window.localStorage.setItem("levelSelected", lS);
    window.location.href = './Level/Level.html';
}

var Restart = function () {
    window.localStorage.setItem('levelHS', 1)
    window.location.href = "./LevelSelection.html";
}
