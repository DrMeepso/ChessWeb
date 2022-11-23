const jsChessEngine = require('js-chess-engine')
const game = new jsChessEngine.Game()

const Express = require('express');
const app = Express();
const port = 3000;

console.log(game.exportJson())

// JS File
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webfacing/index.html');
})

// JS File
app.get('/:file', (req, res) => {
    res.sendFile(__dirname + '/webfacing/'  + req.params.file);
})

// images File
app.get('/SVGs/:file', (req, res) => {
    res.sendFile(__dirname + '/webfacing/SVGs/'  + req.params.file);
})

// chess Files
app.get('/chesslib/:file', (req, res) => {
    res.sendFile(__dirname + '/webfacing/chesslib/'  + req.params.file);
})
app.get('/chesslib/const/:file', (req, res) => {
    res.sendFile(__dirname + '/webfacing/chesslib/const/'  + req.params.file);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})