var tabuleiro;
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
    var firstPlayer= jogador[indexSorteado];
  var json ={
      'id': id,
      'firstPlayer': firstPlayer

  };
  return json;


}
exports.movimentar =
function movimentar(id,gameJSON ){
   console.log(JSON.parse(gameJSON).position.x);
  


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
