// generate computer's mobve (S/P/R)
function computerPlay() {
    let decider = Math.floor(Math.random() * 3)
    switch(decider){
        case 0:
            return "Rock"
        case 1:
            return "Scissors"
        case 2:
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
    } else if (checkWin(playerSelection, computerSelection)){
        currWinScore ++
        var result = "win"
    } else {
        currLoseScore ++
        var result = "lose"
    }
    showScore(currWinScore, currLoseScore)
    return result
}

// produce string for the round
function getRoundEnding(result, playerSelection, computerSelection){
    switch(result){
        case "draw":
            return "This is a draw.";
        case "win":
            return `Player +1! ${playerSelection} beats ${computerSelection}`;
        case "lose":
            return `Computer +1! ${computerSelection} beats ${playerSelection}`;
    }
}

// produce string for end of the game
function getGameEnding(){
    if (currWinScore === 5){
        var result = "You managed to get to 5 points first! Winner!"
    } else if (currLoseScore === 5){
        var result = "No! Computer got to 5 points!"
    }
    resultPrint(result, "#gameResult")
}


// play a round
function playRound(playerSelection) {
    playerSelection = processInputPrompt(playerSelection);
    const computerSelection = computerPlay();
    showWeaponChoice(playerSelection,computerSelection)
    const result = playCore(playerSelection, computerSelection);
    const roundEnding = getRoundEnding(result, playerSelection, computerSelection);
    showWinner(result)
    resultPrint(roundEnding, "#roundResult")

}

// game loops until 5 points
function game(playerSelection) {
    // continue to play
    if (currWinScore < 5 && currLoseScore < 5) playRound(playerSelection)
    // game ends
    getGameEnding()
}

//print result of the round 
function resultPrint(result, selector){
    const container = document.querySelector(selector);
    container.textContent = result;
    return
}

//keeping current score
let currWinScore = 0
let currLoseScore = 0

//change the score on scoreboard
function showScore(currWinScore, currLoseScore){
    winScore.textContent = currWinScore;
    loseScore.textContent = currLoseScore;
}

//plays a round when button is pressed
const buttons = document.querySelectorAll('.buttons');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const playerSelection = this.id
        game(playerSelection)
    }
    );
});

function addFlashTransition(div, transition){
    div.classList.add(transition)
    div.addEventListener('transitionend', function(){
        this.classList.remove(transition)
    })
}
function showWeaponChoice(playerSelection, computerSelection){
    const currPlayerWeapon = document.querySelector("#playerChoiceImg");
    const currComputerWeapon = document.querySelector("#computerChoiceImg");
    currPlayerWeapon.src = `images/${playerSelection}.png`
    currPlayerWeapon.classList.add("rotate")
    currComputerWeapon.src = `images/${computerSelection}.png`
    currComputerWeapon.classList.add("rotateflip")
    return
}

//visually show winner
function showWinner(result){
    const playerBorder = document.querySelector("#playerChoiceBox");
    const computerBorder = document.querySelector("#computerChoiceBox");
    switch(result){
        case "win":
            addFlashTransition(playerBorder, "winner")
            break;
        case "draw":
            addFlashTransition(playerBorder, "draw")
            addFlashTransition(computerBorder, "draw")
            break;
        case "lose":
            addFlashTransition(computerBorder, "winner")
            break;
    }
}

// set up the score at 0, 0 
showScore(currWinScore, currLoseScore)

//reset the score
function scoreReset(){
    var currWinScore = 0
    var currLoseScore = 0
    showScore(currWinScore, currLoseScore)
}

