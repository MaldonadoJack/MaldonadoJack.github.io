console.log("Working");


// Make sure to add this for API's
async function pageLoad() {
    let randomQuoteElement = document.querySelector("#randomQuote");

    // Request the data
    let randomQuoteResponse = await fetch("https://csumb.space/api/famousQuotes/getRandomQuote.php");

    // parse the data
    let randomQuoteData = await randomQuoteResponse.json();
    console.log(randomQuoteData);

    // Put quote from API into the paragraph object
    randomQuoteElement.textContent = randomQuoteData.quoteText;

    let randomQuoteAuthor = document.querySelector("#quoteAuthor");

    randomQuoteAuthor.textContent = "- " + randomQuoteData.firstName + " " + randomQuoteData.lastName;



    let displayAuthorBtn = document.querySelector("#displayAuthorBtn");
    let displayAuthorBio = document.querySelector("#displayAuthorBio");
    let displayAuthorImg = document.querySelector("#displayAuthorImg");

    displayAuthorBtn.addEventListener("click", function () {
        displayAuthorBio.textContent = randomQuoteData.bio;
        displayAuthorImg.src = randomQuoteData.picture;
    });



    let input = document.querySelector("#input");
    let displayMoreQuotesBtn = document.querySelector("#displayMoreQuotesBtn");
    let extraQuotesDiv = document.querySelector("#extraQuotesDiv");
    let errorText = document.createElement("p");

    displayMoreQuotesBtn.addEventListener("click", async function () {
        if (input.value > 5 || input.value < 1 || input.value == null) {
            // alert("Enter a valid number");

            errorText.style.color = "red";
            errorText.textContent = "Enter a valid number";

            extraQuotesDiv.appendChild(errorText);
        } else {
            if (errorText.textContent.trim().length > 0) {
                errorText.textContent = "";
            }

            let quoteResponse = await fetch(`https://csumb.space/api/famousQuotes/getQuotes.php?n=${input.value}`);

            let quoteData = await quoteResponse.json();
            console.log(quoteData);

            for (let quotesData of quoteData) {
                let extraQuotesPara = document.createElement("p");
                extraQuotesPara.textContent = quotesData.quoteText + " - " + quotesData.firstName + " " + quotesData.lastName;
                
                extraQuotesDiv.appendChild(extraQuotesPara);
            }
        }
    });
}

// Make sure to call the function
pageLoad();