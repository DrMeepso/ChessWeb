const jsChessEngine = require('js-chess-engine')
const game = new jsChessEngine.Game()

const Express = require('express');
const app = Express();
const port = 3000;

console.log(game.exportJson())

// HTML File
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webfacing/index.html');
})

// JS File
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/webfacing/script.js');
})
// JS File
app.get('/fen.js', (req, res) => {
    res.sendFile(__dirname + '/webfacing/fen.js');
})

// CSS File
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/webfacing/style.css');
})

// SVG images in the folder called SVGs
app.get('/SVGs/:name', (req, res) => {
    res.sendFile(__dirname + '/webfacing/SVGs/' + req.params.name);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})