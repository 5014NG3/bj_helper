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

///*

//localStorage.setItem("shoe_size","null");


localStorage.setItem("2","1");
localStorage.setItem("3","1");
localStorage.setItem("4","1");
localStorage.setItem("5","1");
localStorage.setItem("6","1");
localStorage.setItem("7","0");
localStorage.setItem("8","0");
localStorage.setItem("9","0");
localStorage.setItem("10","-1");
localStorage.setItem("A","-1");
localStorage.setItem("J","-1");
localStorage.setItem("Q","-1");
localStorage.setItem("K","-1");
//*/


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
      
      var tempNum = parseInt(counter.get('A'));
      localStorage.setItem("test",tempNum);
      document.getElementById("fart").innerHTML = tempNum;
      
    }
    
      
  };


  Book.loader =  function(){


    if(localStorage.getItem("shoe_size")){

      document.getElementById("change_shoe").innerHTML = localStorage.getItem("shoe_size");
    
    }

    else{

      document.getElementById("change_shoe").innerHTML = "null";


    }


    if(localStorage.getItem("test")){

      

      var num = parseInt(localStorage.getItem("test"));

      //console.log(num);

      document.getElementById("fart").innerHTML = num;

    }
    else{

      document.getElementById("fart").innerHTML = "this shit is 0";

    }

  };

Book.setShoe = function (x){





    var num = parseInt(x);

    localStorage.setItem("shoe_size",num);


    document.getElementById("change_shoe").innerHTML = num;

    



}; 







