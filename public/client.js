window.addEventListener('load', main);

function main () {

const chatForm = document.getElementById('chatForm');
const chatMessages = document.querySelector('.messages');

const socket = io();

//Message from server
socket.on('message', message => {
    console.log('message');
    outputMesssage(message);

    //Scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;

    //clear input 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

//Message submit
chatForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg);
});

}

//Output message to dom
function outputMesssage(message) {
    const div = document.createElement('div');
    div.innerHTML = `${message}`;
    document.querySelector('.messages').appendChild(div);
}