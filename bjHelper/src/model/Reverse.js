
class Reverse{

}

Reverse.addToStack = function(cardSymbol){

    
    var operations = localStorage.getItem('undo');
    operations += cardSymbol;
    localStorage.setItem('undo',operations);
    console.log('undo '+operations);

    if(localStorage.getItem('redo').length >= 1){
        localStorage.setItem('redo','');
        console.log("google docs redo");
    }

    
};


Reverse.undo = function(){

    if(!localStorage.getItem('shoe')){
        if(confirm("Please select shoe size to use this operation.")){

        }
    }

    else{

    if(localStorage.getItem('undo').length){


    var operations = localStorage.getItem('undo');
    var currentUndo = operations.slice(-1);
    //undo stuff with currentUndo charcter
    operations = operations.slice(0,-1);//remove currentUndo character
    localStorage.setItem('undo',operations);
    console.log('undoOps ' + operations);

    var redoOperations = localStorage.getItem('redo');
    redoOperations += currentUndo;
    console.log('redoOps ' + redoOperations);
    localStorage.setItem('redo',redoOperations);


    var currentShoe = Object.assign( new Shoe, JSON.parse(localStorage.getItem('shoe')) );
    currentShoe.undoShoe(currentUndo);
    localStorage.setItem('shoe',JSON.stringify(currentShoe));

    }

}

};


Reverse.redo = function(){
    if(!localStorage.getItem('shoe')){
        if(confirm("Please select shoe size to use this operation.")){

        }
    }
    else{


    if(localStorage.getItem('redo').length){
    
    var operations = localStorage.getItem('redo');
    var currentRedo = operations.slice(-1);
    //redo stuff with currentRedo character
    operations = operations.slice(0,-1);//remove currentRedo character
    localStorage.setItem('redo',operations);
    console.log('redoOps ' + operations);

    
    var undoOperations = localStorage.getItem('undo');
    undoOperations += currentRedo;
    console.log('undoOps '+undoOperations);
    localStorage.setItem('undo',undoOperations);

    var currentShoe = Object.assign( new Shoe, JSON.parse(localStorage.getItem('shoe')) );
    currentShoe.updateShoe(currentRedo);
    localStorage.setItem('shoe',JSON.stringify(currentShoe));
    }

}
    
    

    
}
