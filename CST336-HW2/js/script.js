const suits = [String.fromCharCode(0x2660), String.fromCharCode(0x2665), String.fromCharCode(0x2666), String.fromCharCode(0x2663)];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

console.log(suits);
console.log(values);

let deck = [];
let playerCards = [];
let dealerCards = [];

let dealerDiv = document.querySelector("#dealer-cards");
let playerDiv = document.querySelector("#player-cards");
let statusText = document.querySelector("#status");

let startBtn = document.querySelector("#start");
let hitBtn = document.querySelector("#hit");
let standBtn = document.querySelector("#stand");

let winImage = document.querySelector("#win-img");

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (["J", "Q", "K"].includes(card.value)) {
        return 10;
    }
    if (card.value === "A") {
        return 11;
    }
    return parseInt(card.value);
}

function calculateScore(cards) {
    let score = 0;
    let aces = 0;
    for (let card of cards) {
        score += getCardValue(card);
        if (card.value === "A") {
            aces++;
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function renderCards (container , cards , hideFirst = false) {
    container.innerHTML = "";
    cards.forEach((card , index) => {
        if (index === 0 && hideFirst) {
            container.innerHTML += "[Hidden] ";
        } else {
            container.innerHTML += `${card.value}${card.suit} `;
        }
    });
}

function endGame (message) {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    renderCards(dealerDiv , dealerCards , false);
    statusText.textContent = message;

    if (message === "You win!") {
        winImage.style.display = "block";
    }
}

startBtn.addEventListener("click" , function () {
    createDeck();
    playerCards = [deck.pop() , deck.pop()];
    dealerCards = [deck.pop() , deck.pop()];

    renderCards(playerDiv , playerCards);
    renderCards(dealerDiv , dealerCards , true);

    statusText.textContent = "Game started! Hit or Stand?";
    hitBtn.disabled = false;
    standBtn.disabled = false;
});

hitBtn.addEventListener("click" , function () {
    playerCards.push(deck.pop());
    renderCards(playerDiv , playerCards);

    let score = calculateScore(playerCards);
    if (score > 21) {
        endGame("You busted! Dealer wins.");
    }
});

standBtn.addEventListener("click" , function () {
    let dealerScore = calculateScore(dealerCards);
    let playerScore = calculateScore(playerCards);

    while (dealerScore < 17) {
        dealerCards.push(deck.pop());
        dealerScore = calculateScore(dealerCards);
    }

    renderCards(dealerDiv , dealerCards , false);

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame("You win!");
    } else if (dealerScore === playerScore) {
        endGame("It's a tie!");
    } else {
        endGame("Dealer wins!");
    }
});