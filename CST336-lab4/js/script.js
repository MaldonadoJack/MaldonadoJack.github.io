let submitButton = document.querySelector("#q1Submit");
let q1Message = document.querySelector("#q1Result");
let q2Message = document.querySelector("#q2Result");
let q3Message = document.querySelector("#q3Result");
let q4Message = document.querySelector("#q4Result");
let q5Message = document.querySelector("#q5Result");

let score = 0;

// generate random order answers
let question4Options = [1 , 2 , 3 , 7 , 8 , 27 , 16];

// Shuffle
let shuffledOptions = _.shuffle(question4Options);

// Where to put it
let q4Div = document.querySelector("#q4Div");

// create option 1
for (let i = 0 ; i < question4Options.length ; i++) {
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = shuffledOptions[i];
    radioInput.name = "q4Answers";
    radioInput.value = shuffledOptions[i];
    q4Div.appendChild(radioInput);

    let radioLabel = document.createElement("label");
    radioLabel.textContent = shuffledOptions[i];
    radioLabel.for = shuffledOptions[i];
    q4Div.appendChild(radioLabel);
}

submitButton.addEventListener("click" , function () {
    let answer1 = document.querySelector("#q1").value.trim().toLowerCase();
    if (answer1 == "pink") {
        q1Message.textContent = "Correct!";
        q1Message.style.color = "green";
        score += 20;
    } else {
        q1Message.textContent = "Wrong!";
        q1Message.style.color = "red";

    }

    let answer2 = document.querySelector("input[name=animals]:checked").value;
    if (answer2 == "fox") {
        q2Message.textContent = "Correct!";
        q2Message.style.color = "green";
        score += 20;
    } else {
        q2Message.textContent = "Wrong!";
        q2Message.style.color = "red";
    }

    let answer3 = document.querySelectorAll("input[name=games]:checked");
    let answer3Array = Array.from(answer3).map(checkbox => checkbox.value);
    if (answer3Array.includes("Destiny 2") && answer3Array.includes("Minecraft")) {
        q3Message.textContent = "Correct!";
        q3Message.style.color = "green";
        score += 20;
    } else {
        q3Message.textContent = "Wrong!";
        q3Message.style.color = "red";
    }

    let answer4 = document.querySelector("input[name=q4Answers]:checked").value;
    if (answer4 == "7") {
        q4Message.textContent = "Correct!";
        q4Message.style.color = "green";
        score += 20;
    } else {
        q4Message.textContent = "Wrong!";
        q4Message.style.color = "red";
    }

    let answer5 = document.getElementById("q5");
    if (answer5.value == "Kia") {
        q5Message.textContent = "Correct!";
        q5Message.style.color = "green";
        score += 20;
    } else {
        q5Message.textContent = "Wrong!";
        q5Message.style.color = "red";
    }

    let scoreResult = document.getElementById("scoreResult");
    scoreResult.textContent = score;
    if (score >= 80) {
        alert("Great job! You scored " + score + " points!");
    }
    score = 0;
});

// for checkbox: let answer2 = document.querySelectorAll("input[name=animals]:checked");