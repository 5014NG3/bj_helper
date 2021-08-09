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

  //localStorage.removeItem("rc");
  //localStorage.removeItem("cardCount")
  localStorage.clear();

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
  console.log("num " + num);

  var decksLeft = parseInt(localStorage.getItem("shoe_total"))/52;
  console.log("deeall " + decksLeft);

  if(decksLeft > 1 ){

    console.log("here");


    var tc = num / decksLeft;

  }

  else{

    console.log("here2");

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


  
  var num = ((localStorage.getItem("2")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("2_odds",num);
  document.getElementById("2").innerHTML = num;

  num = ((localStorage.getItem("3")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("3_odds",num);
  document.getElementById("3").innerHTML = num;

  num = ((localStorage.getItem("4")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("4_odds",num);
  document.getElementById("4").innerHTML = num;

  num = ((localStorage.getItem("5")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("5_odds",num);
  document.getElementById("5").innerHTML = num;

  num = ((localStorage.getItem("6")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("6_odds",num);
  document.getElementById("6").innerHTML = num;

  num = ((localStorage.getItem("7")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("7_odds",num);
  document.getElementById("7").innerHTML = num;

  num = ((localStorage.getItem("8")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("8_odds",num);
  document.getElementById("8").innerHTML = num;

  num = ((localStorage.getItem("9")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("9_odds",num);
  document.getElementById("9").innerHTML = num;

  num = ((localStorage.getItem("10")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("10_odds",num);
  document.getElementById("10").innerHTML = num;

  num = ((localStorage.getItem("11")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("11_odds",num);
  document.getElementById("11").innerHTML = num;

  num = ((localStorage.getItem("12")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("12_odds",num);
  document.getElementById("12").innerHTML = num;

  num = ((localStorage.getItem("13")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("13_odds",num);
  document.getElementById("13").innerHTML = num;

  num = ((localStorage.getItem("14")/localStorage.getItem("shoe_total"))*(100)).toFixed(2);
  localStorage.setItem("14_odds",num);
  document.getElementById("14").innerHTML = num;



  }

  else{


    var num = 0;

    num = num.toFixed(2);
    localStorage.setItem("2_odds",num);
    document.getElementById("2").innerHTML = num;

    localStorage.setItem("3_odds",num);
    document.getElementById("3").innerHTML = num;

    localStorage.setItem("4_odds",num);
    document.getElementById("4").innerHTML = num;

    localStorage.setItem("5_odds",num);
    document.getElementById("5").innerHTML = num;

    localStorage.setItem("6_odds",num);
    document.getElementById("6").innerHTML = num;

    localStorage.setItem("7_odds",num);
    document.getElementById("7").innerHTML = num;

    localStorage.setItem("8_odds",num);
    document.getElementById("8").innerHTML = num;

    localStorage.setItem("9_odds",num);
    document.getElementById("9").innerHTML = num;

    localStorage.setItem("10_odds",num);
    document.getElementById("10").innerHTML = num;

    localStorage.setItem("11_odds",num);
    document.getElementById("11").innerHTML = num;

    localStorage.setItem("12_odds",num);
    document.getElementById("12").innerHTML = num;

    localStorage.setItem("13_odds",num);
    document.getElementById("13").innerHTML = num;

    localStorage.setItem("14_odds",num);
    document.getElementById("14").innerHTML = num;

  }






};

Book.setShoe = function (x){

  if (confirm("Clicking this will reset everything")) {

  Book.cls();

  var num = parseInt(x);


  var cards = 4*num;

  localStorage.setItem("shoe_total",52*num);

  localStorage.setItem("2",cards);
  localStorage.setItem("3",cards);
  localStorage.setItem("4",cards);
  localStorage.setItem("5",cards);
  localStorage.setItem("6",cards);
  localStorage.setItem("7",cards);
  localStorage.setItem("8",cards);
  localStorage.setItem("9",cards);
  localStorage.setItem("10",cards);
  localStorage.setItem("11",cards);
  localStorage.setItem("12",cards);
  localStorage.setItem("13",cards);
  localStorage.setItem("14",cards);




  var odd = 7.69;


//console.log(odd);

  document.getElementById("2").innerHTML = odd;
  document.getElementById("3").innerHTML = odd;
  document.getElementById("4").innerHTML = odd;
  document.getElementById("5").innerHTML = odd;
  document.getElementById("6").innerHTML = odd;
  document.getElementById("7").innerHTML = odd;
  document.getElementById("8").innerHTML = odd;
  document.getElementById("9").innerHTML = odd;
  document.getElementById("10").innerHTML = odd;
  document.getElementById("11").innerHTML = odd;
  document.getElementById("12").innerHTML = odd;
  document.getElementById("13").innerHTML = odd;
  document.getElementById("14").innerHTML = odd;



  localStorage.setItem("shoe_size",num);




  document.getElementById("change_shoe").innerHTML = num;

  document.onload = Book.loader();
  document.onload = Book.loadOdds();


  }

  else{

  }

  



}; 



Book.isValidCard = function(x){

//console.log(x);

var num = parseInt(x);

//console.log("num" + num);

//console.log(localStorage.getItem(num));


if(localStorage.getItem(num) >= 1){

  Book.runningCount(num);
  Book.cardCounter(num);
  //Book.trueCount();
  //Book.cardOdds(num);


}

else{

  var message = "There are no ";

  message += convertToCard.get(x);
  message += "'s left"

  if (confirm(message)) {
  }



}




};






Book.loader =  function(){

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


  if(localStorage.getItem("2_odds") !== null){

    document.getElementById("2").innerHTML = localStorage.getItem("2_odds");


  }

  if(localStorage.getItem("3_odds") !== null){

    document.getElementById("3").innerHTML = localStorage.getItem("3_odds");


  }

  if(localStorage.getItem("4_odds") !== null){

    document.getElementById("4").innerHTML = localStorage.getItem("4_odds");


  }

  if(localStorage.getItem("5_odds") !== null){

    document.getElementById("5").innerHTML = localStorage.getItem("5_odds");


  }

  if(localStorage.getItem("6_odds") !== null){

    document.getElementById("6").innerHTML = localStorage.getItem("6_odds");


  }

  if(localStorage.getItem("7_odds") !== null){

    document.getElementById("7").innerHTML = localStorage.getItem("7_odds");


  }

  if(localStorage.getItem("8_odds") !== null){

    document.getElementById("8").innerHTML = localStorage.getItem("8_odds");


  }

  if(localStorage.getItem("9_odds") !== null){

    document.getElementById("9").innerHTML = localStorage.getItem("9_odds");


  }

  if(localStorage.getItem("10_odds") !== null){

    document.getElementById("10").innerHTML = localStorage.getItem("10_odds");


  }

  if(localStorage.getItem("11_odds") !== null){

    document.getElementById("11").innerHTML = localStorage.getItem("2_odds");


  }

  if(localStorage.getItem("12_odds") !== null){

    document.getElementById("12").innerHTML = localStorage.getItem("12_odds");


  }

  if(localStorage.getItem("13_odds") !== null){

    document.getElementById("13").innerHTML = localStorage.getItem("13_odds");


  }

  if(localStorage.getItem("14_odds") !== null){

    document.getElementById("14").innerHTML = localStorage.getItem("14_odds");


  }




};


