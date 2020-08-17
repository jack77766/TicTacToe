const express = require('express'),
      app     = express()


    //IMPORT MODELS
const Game = require('./models/game')

let activeGames = {};


//HOME
app.get('/', (req, res) => {
    res.send("Welcome");
});

//CREATE A GAME
app.post('/game', (req,res) => {
    let name   = req.query.name;
    let player = req.query.player;
    //create the game
    activeGames[name] = new Game(name, player);
    res.send("New game created, name: " + name);
});

//JOIN A GAME
app.post('/game/:name', (req,res) => {

    let name   = req.params.name;
    let player = req.query.player;
    
    //if the game exists 
    if(activeGames[name]) {
        activeGames[name].join(player);
        res.send(player + " joined");
    }
    //if the game doesn't exist
    else {
        res.send("Game does not exist");
    }
})



//MAKE A MOVE
app.post('/game/:name/move', (req,res) => {

    let name   = req.params.name;
    let piece  = req.query.piece;
    let row    = req.query.row;
    let column = req.query.column;

    if(activeGames[name]) {
         res.send(activeGames[name].place(piece,row,column));
    }
    else res.send("Game does not exists");
});



//GET GAME STATUS
app.get('/game/:name/status', (req,res) => {
    let name = req.params.name;
    activeGames[name].printBoard();
    res.send(activeGames[name].getStatus());
})


PORT = process.env.PORT || 3000;
IP   = process.env.IP   || 'localhost';
app.listen(PORT, IP, () =>  {
    console.log("TicTacToe App started!!!");
})