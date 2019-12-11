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
                
                        console.log(i,j);
                    
                   
                }
                if(i==y){
                  if(Partidas[id.id][i][j]==""){
                    console.log("entrou");
                    Partidas[id.id][i][j]=proximoJogador
                    console.log( Partidas[id.id]);
                    Checar_Vitoria(Partidas[id.id]);
                  }else{
                      console.log("Jogada invalida");
                  }
                }
               
                
            }


            






          
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
function Checar_Vitoria(tabuleiro){
    console.log("checando")
for(var i=0; i<3; i++){
    console.log(tabuleiro[i][0]);
    console.log(tabuleiro[i][1]);
    console.log(tabuleiro[i][2]);
        if(tabuleiro[i][0]==tabuleiro[i][1] && tabuleiro[i][2] == tabuleiro[i][0]){
            console.log("Win");
            return 1;
        }
    
}
for(var i=0; i<3; i++){
    
    if(tabuleiro[0][i]==tabuleiro[1][i] && tabuleiro[2][i] == tabuleiro[0][i]){
        console.log("Win");
        return 1;
    }

}
if(tabuleiro[0][0]==tabuleiro[1][1] && tabuleiro[2][2] == tabuleiro[0][0]){
    console.log("win");
    return 1;
}
if(tabuleiro[2][0]==tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[1][1]){
    console.log("win");
    return 1;
}
var draw=1;
for(var i; i <3; i++){
    for(var j; j <3; j++){
        if(tabuleiro[i][j]==""){
        draw=0;
        }
    }
}
if(draw==1){
    return 0;
}else{
    return 2;
}

}
function Enviar_MSG(estado_do_Jogo){
   /* if(estado_do_Jogo=='Turno errado'){
        
    }else if(){

    }else if(){

    }else(){

    }
*/
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
