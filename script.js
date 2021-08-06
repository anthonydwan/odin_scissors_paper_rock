// pulling variables (for clarity)
const playerChoiceImg = document.querySelector("#playerChoiceImg");
const computerChoiceImg = document.querySelector("#computerChoiceImg");
const playerChoiceCaption = document.querySelector("#playerChoiceCaption");
const computerChoiceCaption = document.querySelector("#computerChoiceCaption");
const playerScore = document.querySelector("#playerScore")
const computerScore = document.querySelector("#computerScore")
const restart = document.querySelector("#restart")
const buttons = document.querySelectorAll('.gameButtons');
const playerBorder = document.querySelector("#playerChoiceBox");
const computerBorder = document.querySelector("#computerChoiceBox");

//keeping current score
let currWinScore = 0
let currLoseScore = 0
let roundNum = 1

// generate computer's mobve (S/P/R)
function computerPlay() {
    let decider = Math.floor(Math.random() * 3)
    switch (decider) {
        case 0:
            return "Rock";
        case 1:
            return "Scissors";
        case 2:
            return "Paper";
    }
};

// check if gameUntil5 is a draw
function checkDraw(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return true;
    }
};

// check if gameUntil5 is a player-win
function checkWin(playerSelection, computerSelection) {
    if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Rock")) {
        return true;
    }
};

// processing the player's input string
function processInputPrompt(playerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()
    return playerSelection
};

// compute core mechanics of S/P/R gameUntil5
function playCore(playerSelection, computerSelection) {
    playerSelection = processInputPrompt(playerSelection)
    if (checkDraw(playerSelection, computerSelection)) {
        return "draw";
    } else if (checkWin(playerSelection, computerSelection)) {
        currWinScore++;
        var result = "win";
        updateScore(playerScore, currWinScore)
    } else {
        currLoseScore++;
        var result = "lose";
        updateScore(computerScore, currLoseScore)
    }
    return result;
};

// produce string for the round
function getRoundEnding(result, playerSelection, computerSelection) {
    switch (result) {
        case "draw":
            return `Round ${roundNum}: This is a draw.`;
        case "win":
            return `Round ${roundNum}: ${playerSelection} beats ${computerSelection}!`;
        case "lose":
            return `Round ${roundNum}: ${playerSelection} loses to ${computerSelection}!`;
    };
};

// produce string for end of the gameUntil5
function getGameEnding() {
    if (currWinScore === 5) {
        playerBorder.classList.add("winningBorder")
        playerScore.classList.add("winningScore")
    } else if (currLoseScore === 5) {
        computerBorder.classList.add("winningBorder")
        computerScore.classList.add("winningScore")
    }
    makeRestartButton();
};

//variable creation
const restartButton = document.createElement("button")
const resultText = document.createElement("span")
resultText.classList.add("resultText")
const againText = document.createElement("span")
againText.classList.add("againText")
againText.textContent = "PLAY AGAIN"

function makeRestartButton(){
    if (currWinScore === 5) {
        resultText.textContent = "YOU WON"
    } else if (currLoseScore === 5) {
        resultText.textContent = "YOU LOSE"
    }

    restartButton.classList.add("restartButton")
    restartButton.appendChild(resultText)
    restartButton.appendChild(againText)
    restartButton.addEventListener('click', restartGame);
    restart.appendChild(restartButton)
}

function playRound(playerSelection) {
    playerSelection = processInputPrompt(playerSelection);
    const computerSelection = computerPlay();
    showWeaponChoice(playerSelection, computerSelection);
    const result = playCore(playerSelection, computerSelection);
    const roundEnding = getRoundEnding(result, playerSelection, computerSelection);
    showWinner(result);
    resultPrint(roundEnding, "#roundResult");
    roundNum ++
};


function gameUntil5(playerSelection) {
    // continue to play
    if (currWinScore < 5 && currLoseScore < 5) playRound(playerSelection)
    // gameUntil5 ends
    if (currWinScore === 5 || currLoseScore === 5) {
        getGameEnding();
    }
};

//print result of the round 
function resultPrint(result, selector) {
    const container = document.querySelector(selector);
    container.textContent = result;
    return
};

function showScore(currWinScore, currLoseScore) {
    playerScore.textContent = currWinScore;
    computerScore.textContent = currLoseScore;
};

function updateScore(winSide, currScore) {
    winSide.textContent = currScore
    addFlashTransition(winSide, "winScore")
}

function removePlayRoundButton() {
    if (currWinScore === 5 || currLoseScore === 5) {
        buttons.forEach(button => {
            button.removeEventListener('click', playRoundButton)
        });
    };
}

function playRoundButton() {
    const playerSelection = this.id
    gameUntil5(playerSelection)
    removePlayRoundButton()
};

function activateGameButtons(){
    buttons.forEach(button => {
        button.addEventListener('click', playRoundButton)
    });
}

function addFlashTransition(div, transition) {
    div.classList.add(transition)
    div.addEventListener('transitionend', function () {
        this.classList.remove(transition)
    })
};

function showWeaponChoice(playerSelection, computerSelection) {
    playerChoiceCaption.textContent = `${playerSelection}`
    playerChoiceImg.src = `images/${playerSelection}.png`
    playerChoiceImg.classList.add("flip")
    computerChoiceImg.src = `images/${computerSelection}.png`
    computerChoiceCaption.textContent = `${computerSelection}`
    return
};

//visually show winner in the border
function showWinner(result) {
    switch (result) {
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
    };
};

// set up the game
showScore(currWinScore, currLoseScore)
activateGameButtons()

function restartGame() {
    restart.removeChild(restartButton)
    if (currWinScore === 5){
        playerBorder.classList.remove("winningBorder")
        playerScore.classList.remove("winningScore")
        playerScore.classList.remove("winScore")
        playerBorder.classList.remove("winner")
    } else{
        computerBorder.classList.remove("winningBorder")
        computerScore.classList.remove("winningScore")
        computerScore.classList.remove("winScore")
        computerBorder.classList.remove("winner")
    }
    playerChoiceImg.src = ""
    computerChoiceImg.src = ""
    playerChoiceCaption.textContent = ""
    computerChoiceCaption.textContent = ""
    currWinScore = 0
    currLoseScore = 0
    roundNum = 1
    activateGameButtons()

    roundResult.textContent = "Are you ready?"
    showScore(currWinScore, currLoseScore)
};



