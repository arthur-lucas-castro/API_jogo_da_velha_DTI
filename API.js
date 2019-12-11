var tabuleiro;
var proximoJogador;
var Partidas={};

exports.CriarJogo = //exporta a funçao CriarJogo pelo modulo Nodejs 
function CriarJogo(){
    var id = create_UUID();//chama a funçao que cria um id no formato UUID
    tabuleiro = [//Cria um tabuleiro
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    var jogador = ['X','O'];//possibilidade dos jogadores
    let indexSorteado = Math.floor(Math.random() * 2);//sorteia um numero para saber qual jogador começa
    proximoJogador= jogador[indexSorteado];// o numero é passado para o index da variavel jogador, 
    var json ={//cria um Json com o retorno
        'id': id,//retorna o id gerado
        'firstPlayer': proximoJogador// e o primeiro jogador
    };
    Partidas[id]= tabuleiro;//adiciona na variavel Partidas essa partida que acabou de ser criada
    return json;//retorna o Json
}

exports.Movimentar =//exporta a funçao Movimentar pelo modulo Nodejs 
function Movimentar(id,jogada ){
    var resultado;
    if(Partidas[id]){//verifica se existe a partida com o id passado
        var jogada =JSON.parse(jogada);  // transforma o string de jogada em um Json     
        if(jogada.player==proximoJogador){// caso seja a vez do jogador, faça:
            //recebe os movimentos
            var x= jogada.position.x;
            var y=jogada.position.y;
            //inverte o tabuleiro, para que a possiçao 0,0 seja a extrema inferior esquerdo como pedido no enunciado
            if(jogada.position.y==0){
                y=2;
            }else if(jogada.position.y==2){
                y=0;
            }
            //percorre o tabuleiro
            for(var i = 2; i>=y;i--){                
                for(var j=0; j<x;j++){
                }
                if(i==y){//quando encontrar a casa correta do tabuleiro, faça
                  if(Partidas[id][i][j]==""){//verifica se a casa esta vazia, caso estiver, faça
                    Partidas[id][i][j]=proximoJogador//recebe o valor do jogador X ou O
                   resultado=Checar_Vitoria(Partidas[id.id],proximoJogador );// checa se ouve vitoria chamando a funçao Checar_Vitoria, seu retorno vai para a variavel resultado
                  }else{//caso a casa nao esteja disponivel, faça
                    return Enviar_MSG("Invalido");// chama a funçao responsavel por enviar a mensagem para o usuario
                  }
                }   
            } 
            //verifica qual jogador fez o movimento e entao altera para o proximo
         if(proximoJogador=='X'){
             proximoJogador='O';
             return Enviar_MSG(resultado);//envia mensagem para o cliente com o resultado da jogada
         }else{
             proximoJogador='X';
             console.log(resultado)
             return Enviar_MSG(resultado);//envia mensagem para o cliente com o resultado da jogada
         }
        }else{//caso nao seja o turno do usuario, envie para o cliente a mensagem 
            return Enviar_MSG('Turno errado');
        }
    }else{//caso nao exista a partida envia a mensagem para o cliente
        return Enviar_MSG("Partida Inexistente");
    }
}
function Checar_Vitoria(tabuleiro,jogador){//funçao responsavel por verificar se ouve vitoria, recebe por parametro um tabuleiro e o jogador que fez a jogada
    var draw=1;
    //verifica se ouve vencedor na horizontal e retorna o vencedor 
    for(var i=0; i<3; i++){
        if(tabuleiro[i][0]==tabuleiro[i][1] && tabuleiro[i][2] == tabuleiro[i][0] && (tabuleiro[i][0]=='X'||tabuleiro[i][0]=='O')){
            return jogador;
        }
    }
    //verifica se ouve vencedor na vertical e retorna o vencedor 
    for(var i=0; i<3; i++){       
        if(tabuleiro[0][i]==tabuleiro[1][i] && tabuleiro[2][i] == tabuleiro[0][i] && (tabuleiro[0][i]=='X'|| tabuleiro[0][i]=='O')){
            return jogador;
        }
    }
    //verifica se ouve vencedor na diagonal secundaria e retorna o vencedor 
    if(tabuleiro[0][0]==tabuleiro[1][1] && tabuleiro[2][2] == tabuleiro[0][0] && (tabuleiro[0][0]=='X'|| tabuleiro[0][0]=='O')){
        return jogador;
    }
    //verifica se ouve vencedor na diagonal primaria e retorna o vencedor 
    if(tabuleiro[2][0]==tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[1][1] && (tabuleiro[1][1]=='X'|| tabuleiro[1][1]=='O')){
        return jogador;
    }
    //verifica se existe algum quadrado vazio, caso tenha a variavel draw recebera 0
    for(var i=0; i <3; i++){
        for(var j=0; j <3; j++){
            if(tabuleiro[i][j]==""){
            draw=0;
            }
        }
    }
//caso variavel draw tenha o valor 1 quer dizer q ocorreu um empate
    if(draw==1){
        return "Draw";
    }else{//caso nao tenha ocorrido nenhuma dessas condiçoes anteriores, a jogada apenas foi valida
        return 200;
    }

}
function Enviar_MSG(estado_do_Jogo){//funçao para enviar a mensagem
    //retorna um json com as mensagens de acordo com o estado do jogo
    var json={};
    if(estado_do_Jogo=='Turno errado'){
        json={
          "msg": "Não é turno do jogador"
        }
        return json;
    }else if(estado_do_Jogo=="Partida Inexistente"){
        json={
            "msg": "Partida não encontrada"
        }
        return json;
    }else if(estado_do_Jogo=="Invalido"){
        json={
            "msg": "Jogada Invalida"
        }
        return json;
    }else if(estado_do_Jogo=='X'){
        json={
            "msg": "Partida finalizada",
            "winner": "X"
        }
        return json;
    }else if(estado_do_Jogo=='O'){
        json={
            "msg": "Partida finalizada",
            "winner": "O"
        }
        return json;
    }else if(estado_do_Jogo=="Draw"){
        json={
            "status": "Partida finalizada",
            "winner": "Draw"
        }
        return json;   
    }else{
        json={
            "msg": 200
        }
        return json;
    }
}
// funçao para criar um UUID, id unico universal
function create_UUID(){//funçao publica, disponivel no site https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
