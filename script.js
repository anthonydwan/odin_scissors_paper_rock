// generate computer's mobve (S/P/R)
function computerPlay() {
    let decider = Math.floor(Math.random() * 3)
    if (decider === 0) {
        return "Rock"
    } else if (decider === 1) {
        return "Scissors"
    } else {
        return "Paper"
    }
}

// check if game is a draw
function checkDraw(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return true
    }
}

// check if game is a player-win
function checkWin(playerSelection, computerSelection) {
    if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Rock")) {
        return true
    }
}

// processing the player's input string
function processInputPrompt(playerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()
    return playerSelection
}

// compute core mechanics of S/P/R game
function playCore(playerSelection, computerSelection) {
    playerSelection = processInputPrompt(playerSelection)
    if (checkDraw(playerSelection, computerSelection)) {
        return "draw"
    } else if (checkWin(playerSelection, computerSelection)) {
        return "win"
    } else {
        return "lose"
    }
}
// play a round with output strings in the end
function playRound(playerSelection) {
    playerSelection = processInputPrompt(playerSelection)
    const computerSelection = computerPlay();
    const result = playCore(playerSelection, computerSelection)
    if (result === "draw") {
        return "This is a draw."
    } else if (result === "win") {
        return `You win! ${playerSelection} beats ${computerSelection}`
    } else {
        return `You lose! ${computerSelection} beats ${playerSelection}`
    }
}

// game loops for 5 times and saves the score
function game(playerSelection) {
    let scoreCount = { "win": 0, "draw": 0, "lose": 0 }
    while (scoreCount["win"] < 5 || scoreCount["lose"] < 5) {
        const computerSelection = computerPlay();
        const result = playCore(playerSelection, computerSelection)
        scoreCount[result]++
    }
    console.log(scoreCount)
}


//print result 
function resultPrint(result){
    const container = document.querySelector("#result")
    container.textContent = result
}

//plays a round when button is pressed
const buttons = document.querySelectorAll('.buttons');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const playerSelection = this.id
        resultPrint(playRound(playerSelection))
    }
    );
});


