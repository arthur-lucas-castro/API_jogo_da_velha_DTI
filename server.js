const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
var api = require('./API.js');
const url = require('url');
var json;
http.listen(3000, function(){
    console.log("porta 3000");
});
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.get('/game', (req, res)=>{
 json = api.criarJogo();
})
app.get('/game/:id', (req, res)=>{
    let params;
    var parametros =  Object.keys(req.query);

    var id =  req.params;
   
    api.movimentar(id,parametros.toString());
   
   })
   