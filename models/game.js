module.exports = class Game {


    constructor(name, player) {
        this.name = name;
        this.board = Array.from({length:3}, () => new Array(3).fill('e'));
        this.status = "Waiting for player";
        this.player1 = player;
        this.moves = 0;
    }


    join(player2) {
        this.player2 = player2;
        this.status = "Playing";

    }

    place(piece,row,column) {
        //Must check if the status is playing
        //Must check if it is a valid piece & position
        //if there is no piece there place it
        if(this.board[row][column] === 'e') {
            this.board[row][column] = piece;
            this.moves++;
            console.log(`placed ${piece} at (${row},${column})`);
            return (`placed ${piece} at (${row},${column})
            ${this.checkStatus(piece)}`);
        }
        //else throw error
        else {
            console.log("That space is already taken");
            return ("That space is already taken");
            
        }
    }

    checkStatus(piece) {
        if( (this.checkMidWin(piece)) || (this.checkCornerWin(piece)) ) {
            this.status = `${piece} won`;
        } 
        else if(this.moves === 9) {
            this.status = 'Tie'
        }
        return this.status;
    }

    checkMidWin(piece) {
        if(this.board[1][1] != piece) {
            return false;
        }
        else {
            //check diagonal wins
            if((this.board[0][0] === piece) && (this.board[2][2] === piece))
                return true;
            else if ((this.board[0][2] === piece) && (this.board[2][0] === piece))
                return true;
                //check straight wins
            else if ((this.board[1][0] === piece) && (this.board[1][2] === piece))
                return true;
            else if ((this.board[0][1] === piece) && (this.board[2][1] === piece))
                return true;

            else return false;
        }
    }

    checkCornerWin(piece) {
        if((this.board[0][0] === piece) && 
            (this.board[0][1] === piece) && (this.board[0][2] === piece))
            return true;
        else if((this.board[0][0] === piece) && 
            (this.board[1][0] === piece) && (this.board[2][0] === piece))
            return true;
        else if((this.board[2][0] === piece) && 
            (this.board[2][1] === piece) && (this.board[2][2] === piece))
            return true;
        else if((this.board[0][2] === piece) && 
            (this.board[1][2] === piece) && (this.board[2][2] === piece))
            return true;
        else return false;
    }



    getStatus() {
        return this.status;
    }
    
    printBoard() {
        console.table(this.board);
    }



}