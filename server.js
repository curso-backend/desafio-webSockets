const express = require('express');
const Contenedor = require('./container')
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(__dirname + '/public'));

const contenedorProducts = new Contenedor('products.json')
const contenedorMessages = new Contenedor('messages.json')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    console.log(req.body)
    products.push(req.body)
    res.json(req.body)
})

app.get('/products', (req, res) => {
    res.render('products', {
        products: contenedorProducts.getAll2()
    })
})
app.get('/messages', (req, res) => {
    res.render('messages', {
        messages: contenedorMessages.getAll2()
    })
})

io.on('connection', socket => {
    socket.on('add', data => {
        console.log(data)
        contenedorProducts.save(data)
        io.sockets.emit('show', `new data`)
    })

    socket.on('chat-in', data => {
        const dateString = new Date().toLocaleString()
        const dataOut = {
            msn:data.msn,
            username: data.username,
            date: dateString}
        console.log(dataOut)
        contenedorMessages.save(dataOut)
        io.sockets.emit('chat-out', 'ok')
    })
})


server.listen(8080, () => {
    console.log('Running..')
})
