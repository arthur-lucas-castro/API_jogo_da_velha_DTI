var tabuleiro;
var proximoJogador;
var Partidas={};

exports.criarJogo = 
function criarJogo(){
    var id = create_UUID();
    tabuleiro = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    var jogador = ['X','O'];
    let indexSorteado = Math.floor(Math.random() * 2);
    proximoJogador= jogador[indexSorteado];
    var json ={
        'id': id,
        'firstPlayer': proximoJogador
    };
    console.log(id);
    Partidas[id]= tabuleiro;
    return json;
}

exports.movimentar =
function movimentar(id,jogada ){
    var resultado;
    if(Partidas[id.id]){
        var jogada =JSON.parse(jogada);       
        if(jogada.player==proximoJogador){
            var x= jogada.position.x;
            var y=jogada.position.y;
            if(jogada.position.y==0){
                y=2;
            }else if(jogada.position.y==2){
                y=0;
            }
            for(var i = 2; i>=y;i--){                
                for(var j=0; j<x;j++){
                }
                if(i==y){
                  if(Partidas[id.id][i][j]==""){
                    Partidas[id.id][i][j]=proximoJogador
                   resultado=Checar_Vitoria(Partidas[id.id],proximoJogador );
                  }else{
                    return Enviar_MSG("Invalido");
                  }
                }   
            }
         if(proximoJogador=='X'){
             proximoJogador='O';
             console.log(resultado)
             return Enviar_MSG(resultado);
         }else{
             proximoJogador='X';
             console.log(resultado)
             return Enviar_MSG(resultado);
         }
        }else{
            return Enviar_MSG('Turno errado');
        }
    }else{
        return Enviar_MSG("Partida Inexistente");
    }
}
function Checar_Vitoria(tabuleiro,jogador){
    var draw=1;
    for(var i=0; i<3; i++){
        if(tabuleiro[i][0]==tabuleiro[i][1] && tabuleiro[i][2] == tabuleiro[i][0] && (tabuleiro[i][0]=='X'||tabuleiro[i][0]=='O')){
            return jogador;
        }
    }
    for(var i=0; i<3; i++){       
        if(tabuleiro[0][i]==tabuleiro[1][i] && tabuleiro[2][i] == tabuleiro[0][i] && (tabuleiro[0][i]=='X'|| tabuleiro[0][i]=='O')){
            return jogador;
        }
    }
    if(tabuleiro[0][0]==tabuleiro[1][1] && tabuleiro[2][2] == tabuleiro[0][0] && (tabuleiro[0][0]=='X'|| tabuleiro[0][0]=='O')){
        return jogador;
    }
    if(tabuleiro[2][0]==tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[1][1] && (tabuleiro[1][1]=='X'|| tabuleiro[1][1]=='O')){
        return jogador;
    }
    for(var i=0; i <3; i++){
        for(var j=0; j <3; j++){
            if(tabuleiro[i][j]==""){
            draw=0;
            }
        }
    }
    if(draw==1){
        return "Draw";
    }else{
        return 200;
    }

}
function Enviar_MSG(estado_do_Jogo){
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
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
