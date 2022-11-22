const { exec } = require('child_process');

let Parts = ["b", "k", "n", "p", "q", "r"]
let Colors = ["b", "w"]

// download the chess pieces
for (let i = 0; i < Parts.length; i++) {
    for (let j = 0; j < Colors.length; j++) {
        let url = `https://www.chess.com/chess-themes/pieces/neo/150/${Colors[j]+Parts[i]}.png`

        exec(`curl -o ${Colors[j]+Parts[i]}.png ${url}`, (err, stdout, stderr) => {})
    }
}