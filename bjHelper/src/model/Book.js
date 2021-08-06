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
counter.set('J', -1);
counter.set('Q', -1);
counter.set('K', -1);
counter.set('A', -1);




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
      console.log( keys.length +" books loaded.");
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
    console.log("Book " + slots.isbn + " created!");
  };

  Book.update = function (slots) {
    var book = Book.instances[slots.isbn];
    var year = parseInt( slots.year);
    if (book.title !== slots.title) { book.title = slots.title;}
    if (book.year !== year) { book.year = year;}
    console.log("Book " + slots.isbn + " modified!");
  };

  Book.destroy = function (isbn) {
    if (Book.instances[isbn]) {
      console.log("Book " + isbn + " deleted");
      delete Book.instances[isbn];
    } else {
      console.log("There is no book with ISBN " + isbn + " in the database!");
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

  localStorage.removeItem("rc");
  localStorage.removeItem("cardCount")

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
      
      var tempNum = parseInt(counter.get('A'));
      localStorage.setItem("test",tempNum);
      document.getElementById("fart").innerHTML = tempNum;
      
    }
    
      
  };


  

Book.runningCount = function(x){


  var num = parseInt(x);

  if(!localStorage.getItem("rc")){

    if(num >= 2 && num <= 6){
      var temp = 1;

    }
    if(num >= 10 && num <= 14){
      var temp = -1;

    }

    localStorage.setItem("rc",temp);
    document.getElementById("rct").innerHTML = temp;


  }

  else{

    var count = parseInt( localStorage.getItem("rc") ); 
    if(num >= 2 && num <= 6){

      localStorage.setItem("rc",count + 1); 
      document.getElementById("rct").innerHTML = parseInt( localStorage.getItem("rc") );

    }

    if(num >= 10 && num <= 14){

      localStorage.setItem("rc",count - 1); 
      document.getElementById("rct").innerHTML = parseInt( localStorage.getItem("rc") );
    }



  }


};

//Book.check

Book.cardCount = function(){


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


Book.setShoe = function (x){

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




var odd = ((cards/(52*num))*(100)).toPrecision(4);


console.log(odd);





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






  //console.log(localStorage.getItem("2"));

  localStorage.setItem("shoe_size",num);




  document.getElementById("change_shoe").innerHTML = num;

  



}; 


Book.cardOdds = function(x){

  //need to check if localstorage holds correct amount of 
  //card needed for division, ie nonnegative digit

  var num = parseInt(x);


  num = num/localStorage.getItem()





};





Book.loader =  function(){

  if(localStorage.getItem("cardCount")){

    document.getElementById("cardsCount").innerHTML = localStorage.getItem("cardCount");
  }

  else{

    document.getElementById("cardsCount").innerHTML = 0;
  }



  if(localStorage.getItem("rc")){

    document.getElementById("rct").innerHTML = localStorage.getItem("rc");

  }

  else{
    document.getElementById("change_shoe").innerHTML = 0;

  }


  if(localStorage.getItem("shoe_size")){

    document.getElementById("change_shoe").innerHTML = localStorage.getItem("shoe_size");
    console.log(localStorage.getItem("shoe_size"));
  
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


