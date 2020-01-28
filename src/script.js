var clicks = 0;
var COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var COOKIES;
(function (COOKIES) {
    COOKIES["PLAYER_X"] = "player_x";
    COOKIES["POINTS_X"] = "points_x";
    COOKIES["PLAYER_O"] = "player_o";
    COOKIES["POINTS_O"] = "points_o";
})(COOKIES || (COOKIES = {}));
var scoreLabel = document.getElementById("scoreLabel");
var squareButtons = document.querySelectorAll("main div button");
var userDialog = document.getElementById("userDialog");
var playerX_TextField = document.getElementById("playerX_TextField");
var playerO_TextField = document.getElementById("playerO_TextField");
var infoDialog = document.getElementById("infoDialog");
var infoLabel = document.getElementById("infoLabel");
function init() {
    if (checkCookies()) {
        displayScore();
    }
    else {
        showUserDialog();
    }
}
function showUserDialog() {
    userDialog.style.visibility = "visible";
}
function saveUserData() {
    var countEmptyFields = 0;
    countEmptyFields += textFieldIsEmpty(playerX_TextField);
    countEmptyFields += textFieldIsEmpty(playerO_TextField);
    if (countEmptyFields > 0) {
        return;
    }
    setCookie(COOKIES.PLAYER_X, playerX_TextField.value);
    setCookie(COOKIES.POINTS_X, "0");
    setCookie(COOKIES.PLAYER_O, playerO_TextField.value);
    setCookie(COOKIES.POINTS_O, "0");
    userDialog.style.visibility = "hidden";
    displayScore();
}
function selectField(index) {
    if (!isEmpty(squareButtons[index].innerHTML)) {
        return;
    }
    if (clicks % 2 === 0) {
        squareButtons[index].innerHTML = "X";
    }
    else {
        squareButtons[index].innerHTML = "O";
    }
    for (var _i = 0, COMBINATIONS_1 = COMBINATIONS; _i < COMBINATIONS_1.length; _i++) {
        var item = COMBINATIONS_1[_i];
        if (!isEmpty(squareButtons[item[0]].innerHTML) && squareButtons[item[0]].innerHTML === squareButtons[item[1]].innerHTML && squareButtons[item[1]].innerHTML === squareButtons[item[2]].innerHTML) {
            if (clicks % 2 === 0) {
                incrementCookieValue(COOKIES.POINTS_X);
                displayWinner(COOKIES.PLAYER_X);
            }
            else {
                incrementCookieValue(COOKIES.POINTS_O);
                displayWinner(COOKIES.PLAYER_O);
            }
            displayScore();
            return;
        }
    }
    if (checkIfEven()) {
        displayMessage("Unentschieden!");
    }
    clicks++;
}
function displayScore() {
    scoreLabel.innerText = getCookie(COOKIES.PLAYER_X) + " " + getCookie(COOKIES.POINTS_X) + ":" + getCookie(COOKIES.POINTS_O) + " " + getCookie(COOKIES.PLAYER_O);
}
function displayWinner(key) {
    displayMessage(getCookie(key) + " hat gewonnen!");
}
function displayMessage(text) {
    infoLabel.innerText = text;
    infoDialog.style.visibility = "visible";
}
function checkCookies() {
    var cookiesAreValid = true;
    Object.keys(COOKIES).forEach(function (key) {
        if (isEmpty(getCookie(COOKIES[key]))) {
            cookiesAreValid = false;
        }
    });
    return cookiesAreValid;
}
function checkIfEven() {
    var noEmptyFields = true;
    squareButtons.forEach(function (item) {
        if (isEmpty(item.innerHTML)) {
            noEmptyFields = false;
        }
    });
    return noEmptyFields;
}
function reset() {
    Object.keys(COOKIES).forEach(function (key) {
        deleteCookie(COOKIES[key]);
    });
    window.location.reload();
}
function setCookie(key, value) {
    document.cookie = key + "=" + value;
}
function getCookie(key) {
    var cookies = document.cookie.split("; ");
    return cookies.filter(function (item) {
        var cookieKey = item.substr(0, 8);
        if (cookieKey === key) {
            return item;
        }
    }).toString().substr(9);
}
function deleteCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
function incrementCookieValue(key) {
    setCookie(key, (parseInt(getCookie(key)) + 1).toString());
}
function isEmpty(item) {
    return item.trim() === "";
}
function textFieldIsEmpty(textField) {
    if (isEmpty(textField.value)) {
        textField.classList.add("empty");
        return 1;
    }
    else {
        textField.classList.remove("empty");
        return 0;
    }
}
init();
