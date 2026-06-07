let userScore = 0;
let compScore = 0;

const userScorePara = document.getElementById("user-score");
const compScorePara = document.getElementById("comp-score");
const msgPara = document.getElementById("msg");
const resetBtn = document.getElementById("reset-btn");
const yourMoveIcon = document.getElementById("your-move-icon");
const compMoveIcon = document.getElementById("comp-move-icon");

const choices = document.querySelectorAll(".choice");

// Emoji mapping for moves
const moveEmojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

// Generate computer's choice
const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

// Update move display
const updateMoveDisplay = (userChoice, compChoice) => {
    yourMoveIcon.textContent = moveEmojis[userChoice];
    compMoveIcon.textContent = moveEmojis[compChoice];
    yourMoveIcon.style.transform = "scale(1.2)";
    compMoveIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
        yourMoveIcon.style.transform = "scale(1)";
        compMoveIcon.style.transform = "scale(1)";
    }, 300);
};

// Handle draw game
const drawGame = () => {
    msgPara.textContent = "🤝 It's a DRAW! Play again 🤝";
    msgPara.style.backgroundColor = "#5a5a7a";
    msgPara.style.boxShadow = "0 0 10px #5a5a7a";
};

// Handle winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.textContent = userScore;
        msgPara.textContent = `🎉 You WIN! ${userChoice.toUpperCase()} beats ${compChoice.toUpperCase()} 🎉`;
        msgPara.style.backgroundColor = "green";
        msgPara.style.boxShadow = "0 0 20px green";
        
        // Add win animation to user score
        userScorePara.parentElement.parentElement.classList.add("win-animation");
        setTimeout(() => {
            userScorePara.parentElement.parentElement.classList.remove("win-animation");
        }, 500);
    } else {
        compScore++;
        compScorePara.textContent = compScore;
        msgPara.textContent = `💀 You LOSE! ${compChoice.toUpperCase()} beats ${userChoice.toUpperCase()} 💀`;
        msgPara.style.backgroundColor = "red";
        msgPara.style.boxShadow = "0 0 20px red";
        
        // Add win animation to comp score
        compScorePara.parentElement.parentElement.classList.add("win-animation");
        setTimeout(() => {
            compScorePara.parentElement.parentElement.classList.remove("win-animation");
        }, 500);
    }
};

// Determine winner
const determineWinner = (userChoice, compChoice) => {
    if (userChoice === compChoice) {
        drawGame();
        return;
    }

    let userWin = false;
    
    switch (userChoice) {
        case "rock":
            userWin = compChoice === "scissors";
            break;
        case "paper":
            userWin = compChoice === "rock";
            break;
        case "scissors":
            userWin = compChoice === "paper";
            break;
        default:
            userWin = false;
    }
    
    showWinner(userWin, userChoice, compChoice);
};

// Main game function
const playGame = (userChoice) => {
    const compChoice = getCompChoice();
    
    // Update move display
    updateMoveDisplay(userChoice, compChoice);
    
    // Determine and show winner
    determineWinner(userChoice, compChoice);
};

// Reset game
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.textContent = "0";
    compScorePara.textContent = "0";
    yourMoveIcon.textContent = "❓";
    compMoveIcon.textContent = "❓";
    msgPara.textContent = "Game Reset! Make your move!";
    msgPara.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    msgPara.style.boxShadow = "none";
    
    // Add reset animation
    msgPara.style.transform = "scale(1.05)";
    setTimeout(() => {
        msgPara.style.transform = "scale(1)";
    }, 200);
};

// Add event listeners to choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Add reset button event listener
resetBtn.addEventListener("click", resetGame);
