class card{
  constructor(symbol,black,red,left,value,odds) {
    this.symbol = symbol;
    this.black = black;
    this.red = red;
    this.left = left;
    this.value = value;
    this.odds = odds;
  }

  updateLeft(){
    this.left-=1;
  }

  updateOdds(x){
    this.odds = ((left/x)*100).toFixed(2);
  }

  get cardValue(){
    return this.value;
  }


}


class Shoe {
  constructor(size) {
    this.size = size;
    this.totalCards = 52*size;
    this.cards = new Map();
    this.trueCount = 0;
    
    this.cards.set(2,new card(2,2*size,2*size,4*size,1,7.69));
    this.cards.set(3,new card(3,2*size,2*size,4*size,1,7.69));
    this.cards.set(4,new card(4,2*size,2*size,4*size,1,7.69));
    this.cards.set(5,new card(5,2*size,2*size,4*size,1,7.69));
    this.cards.set(6,new card(6,2*size,2*size,4*size,1,7.69));

    this.cards.set(7,new card(7,2*size,2*size,4*size,0,7.69));
    this.cards.set(8,new card(8,2*size,2*size,4*size,0,7.69));
    this.cards.set(9,new card(9,2*size,2*size,4*size,0,7.69));

    this.cards.set(10,new card(10,2*size,2*size,4*size,-1,7.69));
    this.cards.set('J',new card('J',2*size,2*size,4*size,-1,7.69));
    this.cards.set('Q',new card('Q',2*size,2*size,4*size,-1,7.69));
    this.cards.set('K',new card('K',2*size,2*size,4*size,-1,7.69));
    this.cards.set('A',new card('A',2*size,2*size,4*size,-1,7.69));

    var jsonText = JSON.stringify(Array.from(this.cards.entries()));//map cant be strigified

    console.log(JSON.stringify(jsonText));

  }

  updateTrueCount(symbol){


  }



}


const counter = new Map();

counter.set('2', 1);
counter.set('3', 1);
counter.set('4', 1);
counter.set('5', 1);
counter.set('6', 1);
counter.set('7', 0);
counter.set('8', 0);
counter.set('9', 0);
counter.set('10', -1);
counter.set('11', -1);
counter.set('12', -1);
counter.set('13', -1);
counter.set('14', -1);


const convertToCard = new Map();

convertToCard.set(2,2);
convertToCard.set(3,3);
convertToCard.set(4,4);
convertToCard.set(5,5);
convertToCard.set(6,6);
convertToCard.set(7,7);
convertToCard.set(8,8);
convertToCard.set(9,9);
convertToCard.set(10,10);
convertToCard.set(11,'J');
convertToCard.set(12,'Q');
convertToCard.set(13,'K');
convertToCard.set(14,'A');






function Book( slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
    
    
  };


  Book.instances = {}; 

  Book.convertRow2Obj = function (bookRow) {
    var book = new Book( bookRow);
    return book;
  };

  Book.loadAll = function () {
    var i=0, key="", keys=[], bookTableString="", bookTable={};  
    try {
      if (localStorage["bookTable"]) {
        bookTableString = localStorage["bookTable"];
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (bookTableString) {
      bookTable = JSON.parse( bookTableString);
      keys = Object.keys( bookTable);
      //console.log( keys.length +" books loaded.");
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        Book.instances[key] = Book.convertRow2Obj( bookTable[key]);
      }
    }
  };

  Book.saveAll = function () {
    var bookTableString="", error=false,
        nmrOfBooks = Object.keys( Book.instances).length;  
    try {
      bookTableString = JSON.stringify( Book.instances);
      localStorage["bookTable"] = bookTableString;
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
      error = true;
    }
    if (!error) console.log( nmrOfBooks + " books saved.");
  };

  Book.add = function (slots) {
    var book = new Book( slots);
    Book.instances[slots.isbn] = book;
    //console.log("Book " + slots.isbn + " created!");
  };

  Book.update = function (slots) {
    var book = Book.instances[slots.isbn];
    var year = parseInt( slots.year);
    if (book.title !== slots.title) { book.title = slots.title;}
    if (book.year !== year) { book.year = year;}
    //console.log("Book " + slots.isbn + " modified!");
  };

  Book.destroy = function (isbn) {
    if (Book.instances[isbn]) {
      //console.log("Book " + isbn + " deleted");
      delete Book.instances[isbn];
    } else {
      //console.log("There is no book with ISBN " + isbn + " in the database!");
    }
  };


  Book.createTestData = function () {
    Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
    Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
    Book.saveAll();
  };

  Book.clearData = function () {
    //if (confirm("Do you really want to delete all book data?")) {
      localStorage["bookTable"] = "{}";
   // }
  };



  Book.cls = function(){

  localStorage.clear();
  window.location.reload();
  Book.loader();

  };




  Book.reload = function(){



    if (localStorage.getItem("test")){
      var num = parseInt(localStorage.getItem("test"));

      num = num + 1;
      localStorage.setItem("test",num);
      //console.log(num);
      document.getElementById("fart").innerHTML = num;

    }

    else{
      
      var tempNum = parseInt(counter.get('14'));
      localStorage.setItem("test",tempNum);
      document.getElementById("fart").innerHTML = tempNum;
      
    }
    
      
  };


  

Book.runningCount = function(x){


  var num = parseInt(x);

  if(!localStorage.getItem("rc")){

    if(num >= 2 && num <= 6){

      localStorage.setItem("rc",1);
      document.getElementById("rct").innerHTML = 1;
      Book.trueCount();

    }
    else if(num >= 10 && num <= 14){

      localStorage.setItem("rc",-1);
      document.getElementById("rct").innerHTML = -1;
      Book.trueCount();

    }
    else{

      localStorage.setItem("rc",0);
      document.getElementById("rct").innerHTML = 0;
      Book.trueCount();
    }
    
  }

  else{

    var count = parseInt( localStorage.getItem("rc") ); 

    if(num >= 2 && num <= 6){

      localStorage.setItem("rc",count + 1); 
      document.getElementById("rct").innerHTML = parseInt( localStorage.getItem("rc") );
      Book.trueCount();

    }

    else if(num >= 10 && num <= 14){

      localStorage.setItem("rc",count - 1); 
      document.getElementById("rct").innerHTML = parseInt( localStorage.getItem("rc") );
      Book.trueCount();
    }

    else{

      Book.trueCount();
    }

  }

};

Book.trueCount = function(){

  var num = parseInt(localStorage.getItem("rc"));
  //console.log("num " + num);

  var decksLeft = parseInt(localStorage.getItem("shoe_total"))/52;
  //console.log("deeall " + decksLeft);

  if(decksLeft > 1 ){

    //console.log("here");


    var tc = num / decksLeft;

  }

  else{

   // console.log("here2");

    var tc = num;

  }

  document.getElementById("true_count").innerHTML = tc.toFixed(2);

  localStorage.setItem("true_count",tc);


};

Book.cardCounter = function(x){


  //console.log(x);


  

  var currentCard = parseInt(x);

  //console.log(localStorage.getItem(currentCard));

  var cardsLeft = parseInt(localStorage.getItem("shoe_total"));


  localStorage.setItem("shoe_total",cardsLeft-1);

  var ccc = parseInt(localStorage.getItem(currentCard)); //current card count

  localStorage.setItem(currentCard,ccc-1);

  //console.log(localStorage.getItem(currentCard));

  Book.cardOdds();

  if(!localStorage.getItem("cardCount")){

    localStorage.setItem("cardCount",1);
    document.getElementById("cardsCount").innerHTML = 1;
  }
  else{
    var num = parseInt (localStorage.getItem("cardCount"));

    num+=1;

    localStorage.setItem("cardCount",num);

    document.getElementById("cardsCount").innerHTML = num;

  }

};


Book.cardOdds = function(){

  var num = parseInt(localStorage.getItem("shoe_total"));

  if(num){


  var card_odd; 
  for(let i = 2; i<= 14; i++){

    card_odd = ((localStorage.getItem(i)/localStorage.getItem("shoe_total"))*(100)).toFixed(2);

    var txt = i;
    txt += "_odds";
    localStorage.setItem(txt,card_odd);
    var alt = i;
    alt += "_";
    document.getElementById(i).innerHTML = card_odd;
    document.getElementById(alt).innerHTML = card_odd;//alt is the odds underneath graph


  }

  }

  else{


    var num = 0;

    num = num.toFixed(2);


    for(let i = 2; i<=14;i++){

      var txt = i;
      txt += "_odds";

      localStorage.setItem(txt,num);
      document.getElementById(i).innerHTML = num;
      var alt = i;
      alt += "_";
      document.getElementById(alt).innerHTML = num;//alt is odds underneath graph

    }

  }






};



Book.setShoe = function (x){


  if (confirm("Clicking this will reset everything")) {




  Book.cls();

  var num = parseInt(x);

  var test = new Shoe(num);

  console.log(JSON.stringify(test));


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


var num = parseInt(x);

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



Book.drawHiloGraph = function(){

 
  var hilo = 0;

  var counter = 3;

  for(let i = 2; i<=14; i++){

    hilo += parseInt(localStorage.getItem(i));
    //console.log(i + " along with " + hilo);

    


    if(i==6){

      var barCardFactor = (hilo/localStorage.getItem("shoe_total"));

      var canvasText = "hilo_";
      canvasText+=counter;
    
      var canvas = document.getElementById(canvasText);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#228B22";
      ctx.fillRect(0,0,45,275);
      ctx.clearRect(0,0,45,275-(275*barCardFactor));//this is what makes the bar go up or down

      var divid = "sum";
      divid += counter--;

      var hiloOdds = (barCardFactor*100).toFixed(2);

      document.getElementById(divid).innerHTML = hiloOdds;

      hilo = 0;




      
    }

    if(i==9){

      var barCardFactor = (hilo/localStorage.getItem("shoe_total"));

      var canvasText = "hilo_";
      canvasText+=counter;
    
      var canvas = document.getElementById(canvasText);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#228B22";
      ctx.fillRect(0,0,45,275);
      ctx.clearRect(0,0,45,275-(275*barCardFactor));//this is what makes the bar go up or down

      var divid = "sum";
      divid += counter--;

      var hiloOdds = (barCardFactor*100).toFixed(2);

      document.getElementById(divid).innerHTML = hiloOdds;

      hilo = 0;

      
    }

    if(i==14){

      var barCardFactor = (hilo/localStorage.getItem("shoe_total"));

      var canvasText = "hilo_";
      canvasText+=counter;
    
      var canvas = document.getElementById(canvasText);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#228B22";
      ctx.fillRect(0,0,45,275);
      ctx.clearRect(0,0,45,275-(275*barCardFactor));//this is what makes the bar go up or down

      var divid = "sum";
      divid += counter--;

      var hiloOdds = (barCardFactor*100).toFixed(2);

      document.getElementById(divid).innerHTML = hiloOdds;

      hilo = 0;

      
    }


  }



}


Book.drawCardBar = function(x){


  var num = parseInt(x);

  var canvasText = "myCanvas";

  canvasText+=(14-num);// 14 is the amount of bars + 1, so 13 + 1 for indexing

  var oddsText = num;
  oddsText += "_odds"

  var barCardFactor = localStorage.getItem(oddsText);

  barCardFactor = barCardFactor/100;

  var canvas = document.getElementById(canvasText);
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0,0,45,275);
  ctx.clearRect(0,0,45,275-(275*barCardFactor));//this is what makes the bar go up or down




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


