//Main JS File

//The whole deck of cards for a plain UNO game
var wholeDeck = [
    ["Red", "1"], ["Red", "2"], ["Red", "3"], ["Red", "4"], ["Red", "5"], ["Red", "6"], ["Red", "7"], ["Red", "8"], ["Red", "9"], ["Red", "Skip"], ["Red", "Reverse"], ["Red", "+2"],
    ["Red", "1"], ["Red", "2"], ["Red", "3"], ["Red", "4"], ["Red", "5"], ["Red", "6"], ["Red", "7"], ["Red", "8"], ["Red", "9"], ["Red", "Skip"], ["Red", "Reverse"], ["Red", "+2"],
    ["Blue", "1"], ["Blue", "2"], ["Blue", "3"], ["", "4"], ["Blue", "5"], ["Blue", "6"], ["Blue", "7"], ["Blue", "8"], ["Blue", "9"], ["Blue", "Skip"], ["Blue", "Reverse"], ["Blue", "+2"],
    ["Blue", "1"], ["Blue", "2"], ["Blue", "3"], ["", "4"], ["Blue", "5"], ["Blue", "6"], ["Blue", "7"], ["Blue", "8"], ["Blue", "9"], ["Blue", "Skip"], ["Blue", "Reverse"], ["Blue", "+2"],
    ["Green", "1"], ["Green", "2"], ["Green", "3"], ["Green", "4"], ["Green", "5"], ["Green", "6"], ["Green", "7"], ["Green", "8"], ["Green", "9"], ["Green", "Skip"], ["Green", "Reverse"], ["Green", "+2"],
    ["Green", "1"], ["Green", "2"], ["Green", "3"], ["Green", "4"], ["Green", "5"], ["Green", "6"], ["Green", "7"], ["Green", "8"], ["Green", "9"], ["Green", "Skip"], ["Green", "Reverse"], ["Green", "+2"],
    ["Yellow", "1"], ["Yellow", "2"], ["Yellow", "3"], ["Yellow", "4"], ["Yellow", "5"], ["Yellow", "6"], ["Yellow", "7"], ["Yellow", "8"], ["Yellow", "9"], ["Yellow", "Skip"], ["Yellow", "Reverse"], ["Yellow", "+2"],
    ["Yellow", "1"], ["Yellow", "2"], ["Yellow", "3"], ["Yellow", "4"], ["Yellow", "5"], ["Yellow", "6"], ["Yellow", "7"], ["Yellow", "8"], ["Yellow", "9"], ["Yellow", "Skip"], ["Yellow", "Reverse"], ["Yellow", "+2"],
    ["Red", "0"], ["Blue", "0"], ["Green", "0"], ["Yellow", "0"], ["Black", "+4"], ["Black", "+4"], ["Black", "+4"], ["Black", "+4"], ["Black", "Wild"], ["Black", "Wild"], ["Black", "Wild"], ["Black", "Wild"]
]

//Creating a random stack of cards once it starts
function StartGame() {
    var randomizedDeck = wholeDeck.sort((a, b) => 0.5 - Math.random())
    return randomizedDeck
}
var randomizedDeckTotal = StartGame();

//Return 7 random cards from the deck then remove them
function GetCardsAtStart() {
    var tempList = []
    for (let i= 0; i < 7; i++)
    {
        tempList.push(randomizedDeckTotal[i])
    }
    console.log(tempList)
    return tempList
}
GetCardsAtStart()






const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//  Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Cleat input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


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
