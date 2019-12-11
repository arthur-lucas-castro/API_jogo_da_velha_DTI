//server Node.JS
const app = require('express')()//requerindo a biblioteca esxpress.js
const http = require('http').createServer(app)//criando um server local com o express
var api = require('./API.js');//requerindo a API criada
http.listen(3000, function(){//iniciando o server na porta 3000
    console.log("server iniciado na porta 3000");
});
app.get('/', (req, res)=>{//quando abrir o localhost:3000 enviar para a pagina index.html
    res.sendFile(__dirname + '/index.html');
})
app.get('/game', (req, res)=>{//quando tiver uma requisição no localhost:3000/game, faça:
    res.send(api.CriarJogo());// chama a funçao CriaJogo da API e o retorno dessa funçao é enviado para a tela
})
app.get('/game/:id', (req, res)=>{////quando tiver uma requisição no localhost:3000/game/(um id de uma partida), faça:
    var parametros =  Object.keys(req.query);//pega os parametros via URL
    var id =  req.params;// pega o ID da partida
    res.send(api.Movimentar(id.id,parametros.toString()));//chama a funçao Movimentar da API, com o id e os parametros em forma de string, e o retorno dessa funçao é enviado para a tela
})
   