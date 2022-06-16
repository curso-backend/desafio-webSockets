/* const nick = document.getElementById('usuario').value */
const aviso = document.getElementById('error');
const ingreso = document.getElementById('ingreso')

let username = localStorage.getItem('username');

if(username == null) {
    username = prompt('Ingrese su Nick')
    localStorage.setItem('username', username)

}
/* if(username) {
    document.getElementById('username').innerHTML = `Bienvenido ${nombre}`
    
} */
/* const habilitarBtn = () => {
    aviso.innerHTML = "";
    if(nick.value.length > 1){
        aviso.innerHTML;
        ingreso.disabled = false;
    }else{
        aviso.innerHTML = ('<p class="btn btn-danger mt-2 p-1" style="font-size:8px; cursor:default;">*Ingrese nombre</p>');
        return ingreso.disabled = true;
    }
    } */
const btn = document.getElementById('form');
const btnSend = document.getElementById('send');
const socket = io()

const saveProducts = () => {
    
    
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    /* const photo = document.getElementById('photo').value */
    socket.emit('add', {name, price, username})

    /* fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, price})
})
    .then(r => console.log(r))
    .catch(e => alert(e)) */
}

const sendMessages = () => {
    const msn = document.getElementById('msn').value

    socket.emit('chat-in', {msn, username})
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    saveProducts()
})
btnSend.addEventListener('click', (event) => {
    event.preventDefault();
    sendMessages()
})
/* nick.addEventListener("change", habilitarBtn()) */

socket.on('show', () => {
    fetch('/products')
    .then(r => r.text())
    .then(html => {
        const div = document.getElementById('products')
        div.innerHTML = html
    })
    .catch(e => alert(e))
})

socket.on('chat-out', () => {
    fetch('/messages')
    .then(r => r.text())
    .then(html => {
        const div = document.getElementById('chat')
        div.innerHTML = html
    })
    .catch(e => alert(e))
})