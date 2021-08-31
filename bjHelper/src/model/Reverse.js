class Reverse{

    addToStack(cardSymbol){
        var operations = localStorage.getItem('undo');
        operations += cardSymbol;
        localStorage.setItem('undo',operations);
        console.log(operations);

        
    }

    undo(){
        var operations = localStorage.getItem('undo');
        var currentUndo = operations.slice(-1);
        //undo stuff with currentUndo charcter
        operations = operations.slice(0,-1);//remove currentUndo character

        var redoOperations = localStorage.getItem('redo');
        redoOperations += currentUndo;
        localStorage.setItem('redo',redoOperations);

    }


    redo(){
        var operations = localStorage.getItem('redo');
        var currentRedo = operations.slice(-1);
        //redo stuff with currentRedo character
        operations = operations.slice(0,-1);//remove currentRedo character

        var undoOperations = localStorage.getItem('undo');
        undoOperations += currentRedo;
        localStorage.setItem('redo',undoOperations);

        
    }

  };