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
    this.system = system;
    this.size = size;
    this.totalCards = 52*size;
    this.cards = new Map();
    this.trueCount = 0;
    this.runningCount = 0;

    this.posOdds = 38.46;
    this.neuOdds = 23.08;
    this.negOdds = 38.46;

    this.cards.set(2,new card(2,2*size,2*size,4*size,1,7.69));
    this.divUpdate("your_2_odds",7.69);
    this.cards.set(3,new card(3,2*size,2*size,4*size,1,7.69));
    this.divUpdate("your_3_odds",7.69);
    this.cards.set(4,new card(4,2*size,2*size,4*size,1,7.69));
    this.divUpdate("your_4_odds",7.69);
    this.cards.set(5,new card(5,2*size,2*size,4*size,1,7.69));
    this.divUpdate("your_5_odds",7.69);
    this.cards.set(6,new card(6,2*size,2*size,4*size,1,7.69));
    this.divUpdate("your_6_odds",7.69);

    this.cards.set(7,new card(7,2*size,2*size,4*size,0,7.69));
    this.divUpdate("your_7_odds",7.69);
    this.cards.set(8,new card(8,2*size,2*size,4*size,0,7.69));
    this.divUpdate("your_8_odds",7.69);
    this.cards.set(9,new card(9,2*size,2*size,4*size,0,7.69));
    this.divUpdate("your_9_odds",7.69);

    this.cards.set(10,new card(10,2*size,2*size,4*size,-1,7.69));
    this.divUpdate("your_10_odds",7.69);
    this.cards.set('J',new card('J',2*size,2*size,4*size,-1,7.69));
    this.divUpdate("your_J_odds",7.69);
    this.cards.set('Q',new card('Q',2*size,2*size,4*size,-1,7.69));
    this.divUpdate("your_Q_odds",7.69);
    this.cards.set('K',new card('K',2*size,2*size,4*size,-1,7.69));
    this.divUpdate("your_K_odds",7.69);
    this.cards.set('A',new card('A',2*size,2*size,4*size,-1,7.69));
    this.divUpdate("your_A_odds",7.69);

    this.divUpdate("pos_odds",this.posOdds);
    this.divUpdate("neut_odds",this.neuOdds);
    this.divUpdate("neg_odds",this.negOdds);

    //console.log("value   " + this.cards.get('J').value);
    var jsonText = JSON.stringify(Array.from(this.cards.entries()));//map cant be strigified
    console.log(JSON.stringify(jsonText));
    

  }

  divUpdate(id,value){
    document.getElementById(id).innerHTML = value;
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
      this.divUpdate("your_"+key+"_odds",currentOdds);
      this.divUpdate("other_"+key+"_odds",currentOdds);
      this.updateBarGraph(key,currentOdds);

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
    this.neuOdds = ((this.neuOdds/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neu",this.neuOdds);
    this.negOdds = ((this.negOdds/this.totalCards)*100).toFixed(2);
    this.updateBarGraph("neg",this.negOdds);

  }
  
  else{
    var zero = 0;
    var zeroFix = zero.toFixed(2);

    for (let [key,value] of this.cards) {

      this.cards.get(key).odds = zeroFix;
      this.divUpdate("your_"+key+"_odds",zeroFix);
      this.divUpdate("other_"+key+"_odds",currentOdds);
      this.updateBarGraph(key,zeroFix);

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

      this.divUpdate("your_"+key+"_odds",currentOdds);
      this.divUpdate("other_"+key+"_odds",currentOdds);
      
      this.updateBarGraph(key,currentOdds)
      
    }

    this.divUpdate("pos_odds",this.posOdds);
    this.updateBarGraph("pos",this.posOdds);

    this.divUpdate("neu_odds",this.neuOdds);
    this.updateBarGraph("neu",this.negOdds);

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
  Book.loader();

  };





Book.setShoe = function (x){


  if (confirm("Clicking this will reset everything")) {

  var num = parseInt(x);

  var test = new Shoe(num,"Hi-lo");
  test.updateShoe("J");
  test.updateCardOdds();

  console.log(JSON.stringify(test));

  //Book.cls();

  var cards = 4*num;

  localStorage.setItem("shoe_total",52*num);

  var odd = 7.69;

  for(let i = 2; i <= 14; i++){
    var txt = i;
    txt += "_odds";

    localStorage.setItem(txt,odd);

    localStorage.setItem(i,cards);

    document.getElementById(i).innerHTML = odd;

  }


  localStorage.setItem("shoe_size",num);

  document.getElementById("change_shoe").innerHTML = num;

  document.onload = Book.loader();


  }

  else{

  }

  



}; 



Book.isValidCard = function(x){

if(localStorage.getItem(num) >= 1){

  Book.runningCount(num);
  Book.cardCounter(num);
  Book.drawHiloGraph();
  for(let i = 2; i <= 14 ; i++){

    var temp = parseInt(i);

    Book.drawCardBar(temp);

  }


}

else{

  var message = "There are no ";

  message += convertToCard.get(x);
  message += "'s left"

  if (confirm(message)) {
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

  Book.loadOdds();
  Book.loadGraphs();


  if(localStorage.getItem("cardCount")){

    document.getElementById("cardsCount").innerHTML = localStorage.getItem("cardCount");
  }

  else{

    document.getElementById("cardsCount").innerHTML = 0;
  }



  if(localStorage.getItem("rc")){
    //console.log(localStorage.getItem("rc"));

    document.getElementById("rct").innerHTML = localStorage.getItem("rc");

  }

  else{
    //console.log("here");
    document.getElementById("rct").innerHTML = 0;

  }


  if(localStorage.getItem("shoe_size")){

    document.getElementById("change_shoe").innerHTML = localStorage.getItem("shoe_size");
    //console.log(localStorage.getItem("shoe_size"));
  
  }

  else{

    document.getElementById("change_shoe").innerHTML = "null";


  }


  if(localStorage.getItem("test")){

    

    var num = parseInt(localStorage.getItem("test"));


    document.getElementById("fart").innerHTML = num;

  }
  else{

    document.getElementById("fart").innerHTML = "this shit is 0";

  }





};

Book.loadOdds = function(){


  for(let i = 2; i<=14; i++){

    var txt = i;
    txt += "_odds";

    if(localStorage.getItem(txt) !== null){

      var codds = localStorage.getItem(txt);

      document.getElementById(i).innerHTML = codds;

      var alt = i;
      alt += "_";
      document.getElementById(alt).innerHTML = codds;
  
  
    }


  }


};

Book.loadGraphs = function(){

  if(localStorage.getItem("shoe_size")){

    for(let i = 2; i <= 14 ; i++){

      var temp = parseInt(i);
  
      Book.drawCardBar(temp);
  
    }

    Book.drawHiloGraph();


  }

  else{

    console.log("no odds available")
  }



}


