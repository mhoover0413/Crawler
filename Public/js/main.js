
//Main JS File

//The whole deck of cards for a plain UNO game
var wholeDeck = [
    "Red1", "Red2", "Red3", "Red4", "Red5", "Red6", "Red7", "Red8", "Red9", "RedSkip", "RedReverse", "Red+2",
    "Red1", "Red2", "Red3", "Red4", "Red5", "Red6", "Red7", "Red8", "Red9", "RedSkip", "RedReverse", "Red+2",
    "Blue1", "Blue2", "Blue3", "Blue4", "Blue5", "Blue6", "Blue7", "Blue8", "Blue9", "BlueSkip", "BlueReverse", "Blue+2",
    "Blue1", "Blue2", "Blue3", "Blue4", "Blue5", "Blue6", "Blue7", "Blue8", "Blue9", "BlueSkip", "BlueReverse", "Blue+2",
    "Green1", "Green2", "Green3", "Green4", "Green5", "Green6", "Green7", "Green8", "Green9", "GreenSkip", "GreenReverse", "Green+2",
    "Green1", "Green2", "Green3", "Green4", "Green5", "Green6", "Green7", "Green8", "Green9", "GreenSkip", "GreenReverse", "Green+2",
    "Yellow1", "Yellow2", "Yellow3", "Yellow4", "Yellow5", "Yellow6", "Yellow7", "Yellow8", "Yellow9", "YellowSkip", "YellowReverse", "Yellow+2",
    "Yellow1", "Yellow2", "Yellow3", "Yellow4", "Yellow5", "Yellow6", "Yellow7", "Yellow8", "Yellow9", "YellowSkip", "YellowReverse", "Yellow+2",
    "Red0", "Blue0", "Green0", "Yellow0", "Black+4", "Black+4", "Black+4", "Black+4", "BlackWild", "BlackWild", "BlackWild", "BlackWild"
]

var check = false;
var complete = false;

//Creating a random stack of cards once it starts
function StartGame() {
    var randomizedDeck = wholeDeck.sort((a, b) => 0.5 - Math.random())
    return randomizedDeck
}
var randomizedDeckTotal = StartGame();

//Return 7 random cards from the deck then remove them
function GetCardsAtStart() {
    var tempList = []
    for (let i = 0; i < 7; i++) {
        tempList.push(randomizedDeckTotal[i])
        var tempArray = randomizedDeckTotal.indexOf(randomizedDeckTotal[i])
        randomizedDeckTotal.splice(tempArray, 1);
        console.log(randomizedDeckTotal)
    }
    console.log(tempList)
    complete = true;
    return tempList
}

function GetDeck() {
    var messages = document.getElementsByClassName("text");
    var length = messages.length;
    if (messages.length != 0) {
        var lastElement = messages[length - 1];
        var text = lastElement.textContent;
        var textAsString = String(text)
        var split = textAsString.replace(/\n/g, '')
        var split2 = split.replace(/\s/g, '')
        var splittin = split2.split(',');
        randomizedDeckTotal = splittin;
        return splittin;
    }
    console.log(randomizedDeckTotal);
    check = true;
}


setInterval(function () {
    GetDeck()
}, 900)

setInterval(function () {
    console.log(check)
    console.log(complete)
    if (check == true && complete == false) {
        console.log("CALLLLLLEEDDD")
        GetCardsAtStart()
    }
}, 1000)
const chatForm = document.getElementById('sendLeDeck');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room: "hi" });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputUsers(users);
    room = "hi"
});

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//  Message submit
function start() {

    // Get message text
    const msg = randomizedDeckTotal;

    // Emit message to server
    socket.emit('chatMessage', msg);
};
start()


// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.style.overflowWrap = 'break-word'
    div.innerHTML = `<p class="meta">${message.username}</p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
