class card{
  constructor(symbol,black,red,total,value,odds) {
    this.symbol = symbol;
    this.black = black;
    this.red = red;
    this.total = total;
    this.value = value;
    this.odds = odds;
  }
}

class Shoe {
  constructor(size,system) {
    this.size = size;
    this.system = system;
    this.totalCards = 52*size;
    this.trueCount = 0;
    this.runningCount = 0;

    this.posOdds = 38.46;
    this.neuOdds = 23.08;
    this.negOdds = 38.46;

  }


  createShoe(){

    localStorage.setItem('cardIndices',JSON.stringify([2,3,4,5,6,7,8,9,10,'J','Q','K','A']));



    //console.dir(JSON.parse(localStorage.getItem('cardIndices'))[8]);



    localStorage.setItem(2,new card(2,2*this.size,2*this.size,4*this.size,1,7.69));
    this.graphOddsHelper(2,7.69);
    localStorage.setItem(3,new card(3,2*this.size,2*this.size,4*this.size,1,7.69));
    this.graphOddsHelper(3,7.69);
    localStorage.setItem(4,new card(4,2*this.size,2*this.size,4*this.size,1,7.69));
    this.graphOddsHelper(4,7.69);
    localStorage.setItem(5,new card(5,2*this.size,2*this.size,4*this.size,1,7.69));
    this.graphOddsHelper(5,7.69);
    localStorage.setItem(6,new card(6,2*this.size,2*this.size,4*this.size,1,7.69));
    this.graphOddsHelper(6,7.69);
    
    localStorage.setItem(7,new card(7,2*this.size,2*this.size,4*this.size,0,7.69));
    this.graphOddsHelper(7,7.69);
    localStorage.setItem(8,new card(8,2*this.size,2*this.size,4*this.size,0,7.69));
    this.graphOddsHelper(8,7.69);
    localStorage.setItem(9,new card(9,2*this.size,2*this.size,4*this.size,0,7.69));
    this.graphOddsHelper(9,7.69);
    
    localStorage.setItem(10,new card(10,2*this.size,2*this.size,4*this.size,-1,7.69));
    this.graphOddsHelper(10,7.69);
    localStorage.setItem('J',new card('J',2*this.size,2*this.size,4*this.size,-1,7.69));
    this.graphOddsHelper('J',7.69);
    localStorage.setItem('Q',new card('Q',2*this.size,2*this.size,4*this.size,-1,7.69));
    this.graphOddsHelper('Q',7.69);
    localStorage.setItem('K',new card('K',2*this.size,2*this.size,4*this.size,-1,7.69));
    this.graphOddsHelper('K',7.69);
    localStorage.setItem('A',new card('A',2*this.size,2*this.size,4*this.size,-1,7.69));
    this.graphOddsHelper('A',7.69);

    //console.dir(localStorage);

    this.divUpdate("pos_odds",this.posOdds);
    this.updateBarGraph("pos",this.posOdds);

    this.divUpdate("neu_odds",this.neuOdds);
    this.updateBarGraph("neu",this.neuOdds);
    
    this.divUpdate("neg_odds",this.negOdds);
    this.updateBarGraph("neg",this.negOdds);

    this.divUpdate("true_count",this.trueCount);
    this.divUpdate("shoe_size",this.size);

  }

  getCards(){
    return this.cards;
  }

  getCardTotal(symb){
    //console.log(this.cards.get(symb).total);

    return parseInt(this.cards[symb].total);

  }

  getCardSymbol(symb){

    console.log(symb);

    return this.cards.get(symb).symbol;

  }

  divUpdate(id,value){
    document.getElementById(id).innerHTML = value;
  }

  graphOddsHelper(key,currentOdds){

    this.divUpdate("your_"+key+"_odds",currentOdds);
    this.divUpdate("other_"+key+"_odds",currentOdds);
    this.updateBarGraph(key,currentOdds);

  }

  updateCard(symbol){
    var card = this.cards.get(symbol);
    if(card.total >= 1){
    this.runningCount += card.value;
    this.totalCards-=1;
    card.total-=1;
    }
    
  }

  updateTrueCount(){

    var decksLeft = this.totalCards/52;

    if(decksLeft > 1){

      this.trueCount = (this.runningCount/decksLeft).toFixed(2);
      this.divUpdate("true_count",this.trueCount);

    }
    else{
      this.trueCount = this.runningCount;
      this.divUpdate("true_count",this.trueCount);
    }

    
  }

  loadTrueCount(){

    this.divUpdate("true_count",this.trueCount);
  }

  updateCardOdds(){//can be used in loader

    if(this.totalCards){
    var i = 2;
    console.log("here");
    for (let [key,value] of this.cards) {

      this.cards.get(key).odds = ((value.total/this.totalCards)*100).toFixed(2);
      var currentOdds = this.cards.get(key).odds;
      this.graphOddsHelper(key,currentOdds);

      if(i>=2 && i<=6){

        this.posOdds+=value.total;

      }

      if(i>=7 && i<=9){

        this.neuOdds+=value.total;
        
      }

      if(i>=10 && i<=14){

        this.negOdds+=value.total;

      }

      i++;
      
    }
    this.posOdds = ((this.posOdds/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("pos",this.posOdds);
    this.divUpdate("pos_odds",currentOdds);

    this.neuOdds = ((this.neuOdds/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neu",this.neuOdds);
    this.divUpdate("neu_odds",currentOdds);
    
    this.negOdds = ((this.negOdds/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neg",this.negOdds);
    this.divUpdate("neg_odds",currentOdds);

  }
  
  else{
    var zero = 0;
    var zeroFix = zero.toFixed(2);

    for (let [key,value] of this.cards) {

      this.cards.get(key).odds = zeroFix;
      this.graphOddsHelper(key,zeroFix);

    }
    this.posOdds = zeroFix;
    this.divUpdate("pos_odds",zeroFix);
    this.updateBarGraph("pos",zeroFix);

    this.neuOdds = zeroFix;
    this.divUpdate("neu_odds",zeroFix);
    this.updateBarGraph("neu",zeroFix);


    this.negOdds = zeroFix;
    this.divUpdate("neg_odds",zeroFix);
    this.updateBarGraph("neg",zeroFix);

  }


  }


  loadCardOdds(){


    for (let [key,value] of this.cards) {

      var currentOdds = this.cards.get(key).odds;

      this.graphOddsHelper(key,currentOdds);
      
    }

    this.divUpdate("pos_odds",this.posOdds);
    this.updateBarGraph("pos",this.posOdds);

    this.divUpdate("neu_odds",this.neuOdds);
    this.updateBarGraph("neu",this.neuOdds);

    this.divUpdate("neg_odds",this.negOdds);
    this.updateBarGraph("neg",this.negOdds);
 


  }
  


  updateBarGraph(symbol,odds){

    var canvas_id = symbol;//change canvas name convention to J_canvas
    canvas_id += "_graph" 
    var barCardFactor = odds/100;
  
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0,0,45,275);
    ctx.clearRect(0,0,45,275-(275*barCardFactor));//this is what makes the bar go up or down


  }

  updateShoe(symbol){

    this.updateCard(symbol);
    this.updateCardOdds();
    this.updateTrueCount();

  }

  loadShoe(){

    this.loadCardOdds();
    this.loadTrueCount();
  }

}

  class Book{


  }

  Book.cls = function(){

  localStorage.clear();
  window.location.reload();
  //Book.loader();

  };





Book.setShoe = function (num){


  if (confirm("Clicking this will reset the shoe")) {

  //localStorage.clear();
  var mainShoe = new Shoe(num,"Hi-lo");
  mainShoe.createShoe();


  

  

  }

  else{

  }

  



}; 



Book.isValidCard = function(symbol){

if(!localStorage.getItem('shoe')){

if(confirm("Please select shoe size to start using other operations")){

}

}

else {

var currentShoe = Object.assign( new Shoe, JSON.parse(localStorage.getItem('shoe')) );

console.log(currentShoe.getCardTotal(symbol));


if(currentShoe.getCardTotal(symbol) >= 1){

  currentShoe.updateShoe(symbol);

  localStorage.setItem('shoe',JSON.stringify(currentShoe));

}

else{
  var message = "There are no ";

  message += currentShoe.getCardSymbol(symbol);
  message += "'s left"

  if (confirm(message)) {
  }

}

}




};






Book.buttonCreateTest = function (){

  var optionText = ["erstst 1", "erasetest 2", "ersaetst 3", "rersetst 4"];


  for(var i = 0; i < optionText.length; i++){
    var option = document.createElement("button");
    option.setAttribute("onclick","Book.cls();");
    document.body.appendChild(option);
    option.innerHTML = optionText[i];
  }




};





Book.loader =  function(){


  if(localStorage.getItem('shoe')){

    var currentShoe = Object.assign( new Shoe, JSON.parse(localStorage.getItem('shoe')) );
    currentShoe.loadCardOdds();

  }
    



};



