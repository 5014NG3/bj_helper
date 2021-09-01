
class Reverse{

}

Reverse.addToStack = function(cardSymbol){
    var operations = localStorage.getItem('undo');
    operations += cardSymbol;
    localStorage.setItem('undo',operations);
    console.log('opsStack '+operations);

    
};

Reverse.undo = function(){
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

};


Reverse.redo = function(){
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
    

    
}
