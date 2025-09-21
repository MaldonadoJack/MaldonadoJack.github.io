let randomNumber;
let attempts = 0;
let roundsWon = 0;
let roundsLost = 0;

document.querySelector("#guessBtn").addEventListener("click" , checkGuess);
document.querySelector("#resetBtn").addEventListener("click" , initializeGame);

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    attempts = 0;

    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    document.querySelector("#guesses").textContent = "";

    let roundsPlayed = document.querySelector("#roundsPlayed");
    roundsPlayed.textContent = "Rounds won: " + roundsWon + " Rounds lost: " + roundsLost;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("playerGuess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("attempts: " + attempts);

    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Win!";
        feedback.style.color = "darkgreen";
        roundsWon++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was: " + randomNumber;
            feedback.style.color = "red";
            roundsLost++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    let roundsPlayed = document.querySelector("#roundsPlayed");

    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";


}