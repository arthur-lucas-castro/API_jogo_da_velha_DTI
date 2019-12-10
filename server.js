const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
var api = require('./API.js');
http.listen(3000, function(){
    console.log("porta 3000");
});
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.get('/game', (req, res)=>{
 api.criarJogo();
})