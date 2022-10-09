let height = 6
let width = 5

let row = 0
let col = 0

let content = document.getElementById("content")

let gameOver = false

let wordList = ["rocky", "paper", "horse", "crash"]
let guessList = ["rocky", "paper", "horse", "crash"]
guessList = guessList.concat(wordList)
console.log(guessList)

let word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase()



function NewGame() {
    location.reload()
}

window.onload = function() {
    start()
    let newGamebtn = document.createElement("button")
    newGamebtn.className = "newGameBtn"
    newGamebtn.addEventListener('click', NewGame)
    newGamebtn.innerHTML = "New Word"
    document.body.appendChild(newGamebtn)

    
}

function start() {
   

    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile")
            tile.innerText = ""
            document.getElementById("board").appendChild(tile)
        }
    }


    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("KeyboardRow");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; 
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-btn");
            } else {
                keyTile.classList.add("KeyboardKey");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })

    

}

function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        updateGame();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function updateGame() {


    let guess = ""
    document.getElementById("answer").innerText = ""

    for (let c=0; c<width; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currentTile.innerText
        guess += letter

    }

    guess = guess.toLowerCase()
    if (!guessList.includes(guess)){
        document.getElementById("answer").innerText = "Not in the Word List!"
        return;
    }

    let letterCount = {}
    let correct = 0
    for (let i = 0; i <word.length; i++){
        letter = word[i]
        if (letterCount[letter]) {
            letterCount[letter] += 1
        } else {
            letterCount[letter] = 1
        }
    }


    for (let c = 0; c < width; c++){ 
        let currentTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currentTile.innerText

        if (word[c] == letter){
            currentTile.classList.add("correct")

            let keyboardKey = document.getElementById("Key" + letter)
            keyboardKey.classList.add("correct")
            correct += 1
            letterCount[letter] -=1
        }

        if (correct == width) {
            gameOver == true
        }
    }


    for (let c = 0; c < width; c++){ 
        let currentTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currentTile.innerText
        let keyboardKey = document.getElementById("Key" + letter)

        if (!currentTile.classList.contains("correct")) {
            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add("present")
                if (!keyboardKey.classList.contains("correct")) {
                    keyboardKey.classList.add("present")
                }
                letterCount[letter] -= 1
            } else {
                currentTile.classList.add("absent")
                keyboardKey.classList.add("absent")
            }
        }
            
    }

    gameOver = gameOver

    

    row += 1
    col = 0
}






