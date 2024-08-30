//Gameboard object IIFE module
const board = (function(){
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

})();

//Player object factory function
function createPlayer(name, marker){
    //Method to place marker on the board if spot is empty
    function placeMarker(x,y){
        if(board[x][y] == ''){
            board[x][y] = marker;
        }
    }
    return {name, marker, placeMarker};
}