//Gameboard object IIFE module
const board = function(){
    //Private gameboard setup variables
    let arr = [];
    let rows = 3;
    let columns = 3;

    //Creating two-dimensional array for 3x3 board
    //Each point in array is given an empty value
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = '';
        }
    }
    
    return arr;

}();

//Player object factory function
function createPlayer(name, marker){
    //Method to place marker on the board if spot is empty
    function placeMarker(x,y){
        if(board[x][y] == ''){
            board[x][y] = marker;
            //Update board
            screenController.updateBoard();
            //Check win condition
            if(controller.winCheck(x,y,marker) == true){
                alert('Game over, resetting board');
                controller.start();
            }
            //Switch player
            else{
                controller.switchPlayers();
            }
        }
        else alert('Space has already been selected');
    }
    return {name, marker, placeMarker};
}

//Game controller controls the flow of the game
const controller = (function(){
    //Instatiate both player objects and give them the correct markers
    //Then set active player
    let playerOne = createPlayer('Player One', 'X');
    let playerTwo = createPlayer('Player Two', 'O');
    const players = document.querySelector('.players');
    let activePLayer = playerOne;
    //Set player names
    function namePlayers(){
        playerOne.name = prompt('Player One: ');
        playerTwo.name = prompt('Player Two: ');
    }
    //Sets initial conditions and starts the game
    function start(){
        //Reset board
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
        alert('Starting new game');
        activePLayer = playerOne;
        console.log('Player one please take the first turn');
        console.log(board);
        screenController.updateBoard();
        players.innerText = `It is now ${activePLayer.name}'s turn`;
    }

    //Switches player turns
    function switchPlayers(){
        if(activePLayer == playerOne){
            activePLayer = playerTwo
        }
        else activePLayer = playerOne;
        console.log (`It is now ${activePLayer.name}'s turn`);
        players.innerText = `It is now ${activePLayer.name}'s turn`;
        console.log(board);

    }
    //Checks for win condition
    function winCheck(x,y, marker){
        //Variable used to check win condition for any board size
        //Tic tac toe board is 3x3 so n is 3
        const n = 3;
        //Check row
        for(let i = 0; i < n; i++){
            if (board[x][i] != marker){
                break;
            }
            if (i == n - 1){
                alert(`${activePLayer.name} win's`);
                return true;
            } 
        }
        //Check column
        for(let i = 0; i < n; i++){
            if(board[i][y] != marker){
                break;
            }
            if(i == n - 1){
                alert(`${activePLayer.name} win's`);
                return true;
            }
        }
        //Check diagonal
        if(x == y){
            console.log('diagonal');
            for(let i = 0; i < n; i++){
                if(board[i][i] != marker){
                    break;
                }
                if(i == n -1){
                    alert(`${activePLayer.name} win's`);
                    return true;
                }
            }
        }
        //Check other diagonal
        if(x + y == n - 1){
            console.log('other')
            let j = n - 1;
            for(let i = 0; i < n; i++){
                if(board[i][j] != marker){
                    break;
                }
                if(i == n-1){
                    alert(`other style ${activePLayer.name} win's`);
                    return true;
                }
                j = j-1;
            }
        }
        //Check for ties
        //Check row
        let breaker = false;
        for (let i = 0; i < n; i++) {
            //Check column
            for (let j = 0; j < n; j++) {
                if(board[i][j] == ''){
                    console.log('break');
                    breaker = true;
                    break;
                }
            }
            if(breaker == true){
                break;
            }
            if(i == n - 1){
                alert('Game is a tie');
                return true;
            }
        }
        
    }
    const getActivePlayer = () => activePLayer;
    const getBoard = () => board;

    return {start, switchPlayers, winCheck, getActivePlayer, getBoard, namePlayers};
})();

//Object that handles the display logic
const screenController = (function(){
    const gameboard = controller.getBoard();
    console.log(gameboard);
    const body = document.querySelector('body');
    //Matches player choice of space on screen with choice in internal board
    function matchSpace(matchNum){
        let counter = 1;
        let breaker = false;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (counter == matchNum){
                    controller.getActivePlayer().placeMarker(i, j);
                    breaker = true;
                }
                counter++;
            }
            if (breaker == true){
            break;
            }
        }
        return true;
    }
    //Display initial blank board
        let boxNum = 1;
            for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const space = document.createElement('button');
                        space.classList.add('space');
                        space.setAttribute('id', boxNum);
                        //Gives each button the on click event to call the match space function
                        space.addEventListener("click", () => {
                            matchSpace(space.id);
                        });
                        body.appendChild(space);
                        boxNum++;
                    }
                }
    //Update board display with each div getting coresponding mark
    function updateBoard(){
            let spaceNum = 0;
            for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const space = document.querySelectorAll('.space');
                        space[spaceNum].innerText = gameboard[i][j];
                        spaceNum++;
                    }
                }
    }
    return {updateBoard};
})();

//create buttons that start the game and reset the board
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');

start.addEventListener('click', () => {
    controller.namePlayers();
    controller.start();
})
reset.addEventListener('click', () => {
    controller.start();
})