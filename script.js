const choices = ["rock", "paper", "scissors"];

let mode = "computer";
let playerOneScore = 0;
let playerTwoScore = 0;
let round = 1;
let waitingPick = null;

const modeButtons = document.querySelectorAll(".mode-btn");
const choiceButtons = document.querySelectorAll(".choice");
const resetButton = document.getElementById("reset-btn");

const playerOneLabel = document.getElementById("player-one-label");
const playerTwoLabel = document.getElementById("player-two-label");
const leftPickLabel = document.getElementById("left-pick-label");
const rightPickLabel = document.getElementById("right-pick-label");
const playerOneScoreText = document.getElementById("player-one-score");
const playerTwoScoreText = document.getElementById("player-two-score");
const roundText = document.getElementById("round-number");
const turnText = document.getElementById("turn-text");
const message = document.getElementById("message");
const playerOnePick = document.getElementById("player-one-pick");
const playerTwoPick = document.getElementById("player-two-pick");

function computerPick() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function winner(firstPick, secondPick) {
    if (firstPick === secondPick) {
        return "draw";
    }

    const firstPlayerWins =
        (firstPick === "rock" && secondPick === "scissors") ||
        (firstPick === "paper" && secondPick === "rock") ||
        (firstPick === "scissors" && secondPick === "paper");

    return firstPlayerWins ? "first" : "second";
}

function cleanName(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function setMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type || ""}`.trim();
}

function updateScore() {
    playerOneScoreText.textContent = playerOneScore;
    playerTwoScoreText.textContent = playerTwoScore;
    roundText.textContent = round;
}

function showPicks(firstPick, secondPick) {
    playerOnePick.textContent = cleanName(firstPick);
    playerTwoPick.textContent = cleanName(secondPick);
}

function playRound(firstPick, secondPick) {
    const result = winner(firstPick, secondPick);

    showPicks(firstPick, secondPick);

    if (result === "draw") {
        setMessage("Draw. Nobody gets a point.", "draw");
    } else if (result === "first") {
        playerOneScore++;
        setMessage(`${playerOneLabel.textContent} wins this round.`, "win");
    } else {
        playerTwoScore++;
        const className = mode === "computer" ? "loss" : "win";
        setMessage(`${playerTwoLabel.textContent} wins this round.`, className);
    }

    round++;
    waitingPick = null;
    updateScore();
    turnText.textContent = "Choose a move for the next round.";
}

function playComputerMode(playerPick) {
    playRound(playerPick, computerPick());
}

function playTwoPlayerMode(playerPick) {
    if (!waitingPick) {
        waitingPick = playerPick;
        playerOnePick.textContent = "Hidden";
        playerTwoPick.textContent = "-";
        turnText.textContent = "Player 2, choose your move.";
        setMessage("Player 1 has picked. No peeking.", "");
        return;
    }

    playRound(waitingPick, playerPick);
}

function play(choice) {
    if (mode === "computer") {
        playComputerMode(choice);
    } else {
        playTwoPlayerMode(choice);
    }
}

function setMode(nextMode) {
    mode = nextMode;

    modeButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.mode === mode);
    });

    resetGame();
}

function resetGame() {
    playerOneScore = 0;
    playerTwoScore = 0;
    round = 1;
    waitingPick = null;

    const secondPlayer = mode === "computer" ? "Computer" : "Player 2";
    playerOneLabel.textContent = "Player 1";
    playerTwoLabel.textContent = secondPlayer;
    leftPickLabel.textContent = "Player 1 picked";
    rightPickLabel.textContent = `${secondPlayer} picked`;
    playerOnePick.textContent = "-";
    playerTwoPick.textContent = "-";
    turnText.textContent = "Player 1, choose your move.";

    const intro =
        mode === "computer"
            ? "Pick rock, paper or scissors. The computer will answer."
            : "Player 1 picks first, then Player 2 picks. Player 1's move stays hidden.";

    setMessage(intro, "");
    updateScore();
}

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        play(button.dataset.choice);
    });
});

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setMode(button.dataset.mode);
    });
});

resetButton.addEventListener("click", resetGame);
resetGame();
