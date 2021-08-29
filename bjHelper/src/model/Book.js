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

    this.posCards = 0;
    this.neuCards = 0;
    this.negCards = 0;

    this.posOdds = 38.46;
    this.neuOdds = 23.08;
    this.negOdds = 38.46;

  }


  createShoe(){


    var cardKeys = '23456789TJQKA';

    localStorage.setItem('cardKeys',cardKeys);


    localStorage.setItem(2,JSON.stringify(new card(2,2*this.size,2*this.size,4*this.size,1,7.69)));
    this.graphOddsHelper(2,7.69);
    localStorage.setItem(3,JSON.stringify(new card(3,2*this.size,2*this.size,4*this.size,1,7.69)));
    this.graphOddsHelper(3,7.69);
    localStorage.setItem(4,JSON.stringify(new card(4,2*this.size,2*this.size,4*this.size,1,7.69)));
    this.graphOddsHelper(4,7.69);
    localStorage.setItem(5,JSON.stringify(new card(5,2*this.size,2*this.size,4*this.size,1,7.69)));
    this.graphOddsHelper(5,7.69);
    localStorage.setItem(6,JSON.stringify(new card(6,2*this.size,2*this.size,4*this.size,1,7.69)));
    this.graphOddsHelper(6,7.69);
    
    localStorage.setItem(7,JSON.stringify(new card(7,2*this.size,2*this.size,4*this.size,0,7.69)));
    this.graphOddsHelper(7,7.69);
    localStorage.setItem(8,JSON.stringify(new card(8,2*this.size,2*this.size,4*this.size,0,7.69)));
    this.graphOddsHelper(8,7.69);
    localStorage.setItem(9,JSON.stringify(new card(9,2*this.size,2*this.size,4*this.size,0,7.69)));
    this.graphOddsHelper(9,7.69);
    
    localStorage.setItem('T',JSON.stringify(new card('T',2*this.size,2*this.size,4*this.size,-1,7.69)));
    this.graphOddsHelper('T',7.69);
    localStorage.setItem('J',JSON.stringify(new card('J',2*this.size,2*this.size,4*this.size,-1,7.69)));
    this.graphOddsHelper('J',7.69);
    localStorage.setItem('Q',JSON.stringify(new card('Q',2*this.size,2*this.size,4*this.size,-1,7.69)));
    this.graphOddsHelper('Q',7.69);
    localStorage.setItem('K',JSON.stringify(new card('K',2*this.size,2*this.size,4*this.size,-1,7.69)));
    this.graphOddsHelper('K',7.69);
    localStorage.setItem('A',JSON.stringify(new card('A',2*this.size,2*this.size,4*this.size,-1,7.69)));
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

  getCardTotal(symb){
    //console.log(this.cards.get(symb).total);
    //console.dir(localStorage.getItem(symb));

    return JSON.parse(localStorage.getItem(symb)).total;

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
    var card = JSON.parse(localStorage.getItem(symbol));
    if(card.total >= 1){
    this.runningCount += card.value;
    this.totalCards-=1;
    card.total-=1;
    localStorage.setItem(symbol,JSON.stringify(card));
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


  updateCardOdds(){//can be used in loader

    if(this.totalCards){
    let x = 2;
    console.log("here");
    let cardKeys = localStorage.getItem('cardKeys');
    this.posCards = 0;
    this.neuCards = 0;
    this.negCards = 0;

    for (let i = 0; i < cardKeys.length; i++) {

      var value = JSON.parse(localStorage.getItem(cardKeys[i]));//card object
      var currentOdds = ((value.total/this.totalCards)*100).toFixed(2);//new odds as totalcards has changed

      value.odds = currentOdds;//update odds in shoe object

      localStorage.setItem(cardKeys[i],JSON.stringify(value));//update shoe object in ls
      this.graphOddsHelper(cardKeys[i],currentOdds);//update graph

      if(x>=2 && x<=6){

        this.posCards+=value.total;

      }

      if(x>=7 && x<=9){

        this.neuCards+=value.total;
        
      }

      if(x>=10 && x<=14){

        this.negCards+=value.total;

      }

      x++;
      
    }

    this.posOdds = ((this.posCards/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("pos",this.posOdds);
    this.divUpdate("pos_odds",this.posOdds);

    this.neuOdds = ((this.neuCards/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neu",this.neuOdds);
    this.divUpdate("neu_odds",this.neuOdds);
    
    this.negOdds = ((this.negCards/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neg",this.negOdds);
    this.divUpdate("neg_odds",this.negOdds);

  }
  
  else{
    var zero = 0;
    var zeroFix = zero.toFixed(2);

    let cardKeys = localStorage.getItem('cardKeys');

    for (let i = 0; i < cardKeys.length; i++) {

      JSON.parse(localStorage.getItem(cardKeys[i])).odds = zeroFix;
      this.graphOddsHelper(cardKeys[i],zeroFix);

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


  loadShoe(){

    let cardKeys = localStorage.getItem('cardKeys');
    for (let i = 0; i < cardKeys.length; i++) {

      this.graphOddsHelper(cardKeys[i],JSON.parse(localStorage.getItem(cardKeys[i])).odds);
      
    }

    this.divUpdate("pos_odds",this.posOdds);
    this.updateBarGraph("pos",this.posOdds);

    this.divUpdate("neu_odds",this.neuOdds);
    this.updateBarGraph("neu",this.neuOdds);

    this.divUpdate("neg_odds",this.negOdds);
    this.updateBarGraph("neg",this.negOdds);

    this.divUpdate("true_count",this.trueCount);
    this.divUpdate("shoe_size",this.size);
 


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
  localStorage.setItem('shoe',JSON.stringify(mainShoe));


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

  message += symbol;
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
    currentShoe.loadShoe();

  }
    



};



