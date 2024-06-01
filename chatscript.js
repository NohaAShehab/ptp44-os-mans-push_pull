let username = prompt("Please enter your name")
console.log(username)

var title_h = document.getElementById('title');

title_h.innerHTML = `User ${username}`

var chatbox = document.getElementById('chatbox')
var msg_input = document.getElementById('msg')
var send_btn = document.getElementById('send')


mywebsocket = new WebSocket('ws://localhost:8080')

console.log(mywebsocket);
// open the connection
mywebsocket.onopen=function (){
    console.log('connection opened', this);
    // while sending data from client to server
    // send data in form of object
    message_obj = {
        username : username
    }
    // send message
    this.send(JSON.stringify(message_obj))
}


// on error on connecting to server
mywebsocket.onerror=function (){
    chatbox.innerHTML += '<h3 style="color: red">Error connecting to server </h3>'
}

/// on close


