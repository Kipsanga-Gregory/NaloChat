const socket = io();

let chatForm = document.getElementById('chat-form')
let chatMessages = document.querySelector('.chat-messages')


socket.on('message', (message)=>{
    console.log(message)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let message = e.target.elements.msg.value

    socket.emit('chatMessage', message)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()

})

socket.on('newChat', (chat) => {
    outPutMessage(chat)

    chatMessages.scrollTop = chatMessages.scrollHeight
})

function outPutMessage(chat){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${chat}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div)
}