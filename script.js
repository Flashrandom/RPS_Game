let userScore= 0;
let compScore= 0;
const msg= document.querySelector("#msg");
const choices= document.querySelectorAll(".choice");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");


const genCompChoice= ()=>{
    const options =["rock","paper","scissors"];
    const randIdx= Math.floor(Math.random() *3);
    return options[randIdx];
};

const drawGame=()=>{
    console.log("Game Draw!!");
    msg.innerText="Game was draw, Play Again";
};

const showWinner=(userWin,userChoice,compChoice)=>{
    if (userWin){
        console.log("You won")
        msg.innerText=`You won, ${userChoice} beats ${compChoice}`;
        msg.backgroundColor="green";
        userScore++;
        userScorePara.innerText=userScore;
        

    }else{
        console.log("Computer bhaisaab aap jeet gaye");
        msg.innerText=`You loose, ${compChoice} beats ${userChoice}`;
        msg.backgroundColor="red";
        compScore++;
        compScorePara.innerText=compScore;
    };
};
const playGame= (userChoice)=>{
    console.log("user choice is: ", userChoice);
    const compChoice= genCompChoice();
    console.log("comp choice is : ",compChoice);

    if (userChoice===compChoice){
        drawGame()
        return;

    }else{
        let userWin= true;
        if(userChoice==="rock"){
            userWin= compChoice==="paper" ? false : true;

        }else if(userChoice==="paper"){
            userWin= compChoice==="scissors" ? false:true;
        }else{
            userWin=compChoice==="rock"? false:true;
        }
    
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click",()=>{
        const userChoice= choice.getAttribute("id")
        playGame(userChoice)
    });
    
});

