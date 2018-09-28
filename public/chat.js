// Server connection
let socket = io.connect('http://localhost:4000');

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    timeout;

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += `

    <p> <strong> ${data.handle}: </strong> ${data.message} </p>
    
    `;
});

function timeoutFunction() {
  socket.emit("typing", false);
}

message.addEventListener('keyup', function(){
 socket.emit('typing', handle.value);
 clearTimeout(timeout);
 timeout = setTimeout(timeoutFunction, 1500);
});

socket.on('typing', function(data){
    if (data) {

        feedback.innerHTML = `

        <p> <em> ${data} is typing a message... </em> </p>
        
        `;
    } else {

      feedback.innerHTML = '';

    }
});