const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
http.listen(3000, function(){
    console.log("porta 3000");
})