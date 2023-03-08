// Begin Next Level Button
function nextLevel() {
    var currentLevel = window.localStorage.getItem("levelSelected");
    var nextLevelInt = parseInt(currentLevel) + 1;
    window.localStorage.setItem("levelSelected", nextLevelInt);

    window.location.href = "./Level.html";
}
// End Next Level Button

// Begin Level Selection Button
function levelSelect() {
    window.location.href = "../LevelSelection.html";
}
// End Level Selection Button