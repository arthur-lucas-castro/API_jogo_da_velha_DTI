var tabuleiro;
var proximoJogador;
var Partidas={};
exports.criarJogo = 
function criarJogo(){
 
    var id = create_UUID();
   
    tabuleiro = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
    ];
        
   
   
    var jogador = ['X','O'];
    let indexSorteado = Math.floor(Math.random() * 2);
    proximoJogador= jogador[indexSorteado];
  var json ={
      'id': id,
      'firstPlayer': proximoJogador

  };
  Partidas[id]= tabuleiro;
 
console.log(Partidas);


  return json;
  
}
exports.movimentar =
function movimentar(id,jogada ){
   /* console.log(id);
    console.log(Partidas.indexOf(id));*/
    var jogo_Tabuleiro;
    var posicao;
    if(Partidas[id.id]){
        jogo_Tabuleiro =Partidas[id.id];
        console.log(jogo_Tabuleiro);
        var jogada =JSON.parse(jogada);
        console.log(tabuleiro[1][2]);
       if(jogada.player==proximoJogador){
          
         console.log("realizar jogada");
         if(proximoJogador=='X'){
            console.log("Jogador X");
             proximoJogador='O';
             console.log( proximoJogador);
         }else{
            console.log("Jogador O");
             proximoJogador='X';
             console.log( proximoJogador);
         }
       }else{
     
      // }/
     }
    }else{
        console.log("jogo nao existe");
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
