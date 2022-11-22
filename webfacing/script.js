const ChessNumbers = ["A", "B", "C", "D", "E", "F", "G", "H"]

// Create Cells for the chess board
for (let x = 0; x < 8; x++) {

	for (let y = 1; y < 9; y++) {

		let cell = document.createElement("div")
		cell.classList.add("cell")
		cell.setAttribute("id", `${ChessNumbers[x]}${y}`)
		cell.setAttribute("type", "cell")
		//cell.innerText = `${ChessNumbers[x]}${y}`

		// create canvas to create an image that contains the current place of the cell on the chess board
		let canvas = document.createElement("canvas")
		canvas.setAttribute("width", "150")
		canvas.setAttribute("height", "150")
		let ctx = canvas.getContext("2d")
		ctx.font = "14px Arial"

		if (x % 2 == 0) {
			if (y % 2 == 0) {
				cell.classList.add("white")
				ctx.fillStyle = "#769656"
			} else {
				cell.classList.add("black")
				ctx.fillStyle = "#EEEED2"
			}
		} else {
			if (y % 2 == 0) {
				cell.classList.add("black")
				ctx.fillStyle = "#EEEED2"
			} else {
				cell.classList.add("white")
				ctx.fillStyle = "#769656"
			}
		}

		ctx.fillText(`${ChessNumbers[x]}${y}`, 1, 13)

		// set the image as the background of the cell
		cell.style.backgroundImage = `url(${canvas.toDataURL()})`

		setTimeout(() => {
			document.getElementById("ChessHolder").append(cell)
		}, 10)

	}

}



setTimeout(() => {

	// load the chess pieces from fen string
	let fen = fen2json("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	
	// loop through the fen object and add the pieces to the board
	for (let key in fen) {


		let pieceName = fen[key].split("")[1] + fen[key].split("")[0]
		let cellCords = key.split("")[0].toUpperCase() + key.split("")[1]

		let piece = document.createElement("img")
		piece.classList.add("piece")
		piece.setAttribute("id", cellCords)
		piece.setAttribute("src", `SVGs/${pieceName}.png`)
		piece.setAttribute("draggable", "true")
		piece.setAttribute("ondragstart", "drag(event)")
		if (fen[key].split("")[1] == "w") {
			piece.setAttribute("team", "white")
		} else {
			piece.setAttribute("team", "black")
		}

		document.getElementById(cellCords).append(piece)

	}

}, 20)

// create a function that allows a user to drag a piece and drop it 
function drag(ev) {
	document.body.append(ev.target)
	ev.preventDefault()

	document.onmousemove = function(e) {
		ev.target.style.position = "absolute"
		ev.target.style.left = e.pageX - (70 / 2) + "px"
		ev.target.style.top = e.pageY - (70 / 2) + "px"
	}

	document.onmouseup = function(e) {
		document.onmousemove = null
		document.onmouseup = null

		let cells = Object.values(document.getElementsByClassName("cell"))
		let ClosestCell = cells[0]
		let ClosestCellDist = 99999999
		let Capture = false
		
		cells.forEach(cell => {

			let Two = ev.target.getBoundingClientRect();
			let One = cell.getBoundingClientRect();

			let a = One.x - Two.x;
			let b = One.y - Two.y;

			let c = Math.sqrt(a * a + b * b);
			if (cell.childElementCount > 0) {

				if (ev.target.getAttribute("team") != cell.childNodes[0].getAttribute("team")){
					Capture = true
				} else {
					c = 999999999
				}
				
			}
			if (c < ClosestCellDist) {

				ClosestCell = cell
				ClosestCellDist = c

			}

		})
		
		ClosestCell.append(ev.target)

		if (ClosestCell.childElementCount > 1) {
			document.querySelector(`.CaptureBox[team=${ev.target.getAttribute("team")}]`).append(ClosestCell.childNodes[0])
		}
		
		ev.target.style.position = "relative"
		ev.target.style.left = "0px"
		ev.target.style.top = "0px"
		ev.target.setAttribute("id", ClosestCell.id)

		CalculateScore()		

	}
}

function CalculateScore(){

	let WhiteBox = document.querySelector(`.CaptureBox[team="white"]`).childNodes
	let BlackBox = document.querySelector(`.CaptureBox[team="black"]`).childNodes

	let WhiteScore = 0
	let BlackScore = 0

	Object.values(WhiteBox).forEach( e => {

		let ImgSRC = e.src.replace(window.location.href + "SVGs", "")
		let PieceType = ImgSRC.split("")[2]

		switch(PieceType){

			case "p": WhiteScore += 1; break
			case "n": WhiteScore += 3; break
			case "b": WhiteScore += 3; break
			case "r": WhiteScore += 5; break
			case "q": WhiteScore += 9; break
				
		}
		
	})

	Object.values(BlackBox).forEach( e => {

		let ImgSRC = e.src.replace(window.location.href + "SVGs", "")
		let PieceType = ImgSRC.split("")[2]

		switch(PieceType){

			case "p": BlackScore += 1; break
			case "n": BlackScore += 3; break
			case "b": BlackScore += 3; break
			case "r": BlackScore += 5; break
			case "q": BlackScore += 9; break
				
		}
		
	})

	document.getElementById("ScoreText").innerText = `Score, White: ${WhiteScore} | Black: ${BlackScore}`
	
}