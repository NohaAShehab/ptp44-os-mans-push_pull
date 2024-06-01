let username = prompt("Please enter your name")
console.log(username)

var title_h = document.getElementById('title');

title_h.innerHTML = `User ${username}`

var chatbox = document.getElementById('chatbox')
var msg_input = document.getElementById('msg')
var send_btn = document.getElementById('send')


mywebsocket = new WebSocket('ws://localhost:8090')

console.log(mywebsocket);
// open the connection
mywebsocket.onopen=function (){
    console.log('connection opened', this);
    // while sending data from client to server
    // send data in form of object
    message_obj = {
        username : username,
        login: true
    }
    // send message
    this.send(JSON.stringify(message_obj))
}


/// what will I do when I receive message
mywebsocket.onmessage= function (event){
    console.log(event.data)
    msg_content = JSON.parse(event.data)
    chatbox.innerHTML +=`<h4 > ${msg_content.message} </h4>`
}

// on error on connecting to server
mywebsocket.onerror=function (){
    chatbox.innerHTML += '<h3 style="color: red">Error connecting to server </h3>'
}


// send message
send_btn.addEventListener('click', function (){
    msg_val = msg_input.value;
    message_obj = {
        body: `${username}:${msg_val}`
    }
    mywebsocket.send(JSON.stringify(message_obj));
    msg_input.value = '';
});
/// on close


