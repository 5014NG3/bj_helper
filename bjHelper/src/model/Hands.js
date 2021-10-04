class Hand{
  constructor() {
    this.length = 0;
    this.rawTotal = 0;
    this.softTotal = 0;
    this.hardTotal = 0;
    this.split = null;
    this.bj = null;
    this.currentHand = "";
  }

  totalHelper(card){

    if(card >= 2 && card <= 10){

      this.rawTotal += parseInt(card);
    }

    else{

      this.rawTotal += 10;  
    }
  }


  addCard(card){

    this.totalHelper(card);

    console.log(this.rawTotal);

    this.currentHand += card;
  }

}

class Hands{
  constructor(){

    this.q = [];
  }
}

Hands.choosing = function(choice){
  localStorage.setItem("isChoosing",choice);
};

Hands.createHands = function(){
  localStorage.setItem("currentHands",[]);
};

Hands.addHand = function(){

  if(localStorage.getItem("isChoosing")){


  }


};


