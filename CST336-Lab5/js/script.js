async function setUpForm() {
    try {
        let statesResponse = await fetch("https://csumb.space/api/allStatesAPI.php");
        try {
            let statesData = await statesResponse.json();
            console.log(statesData);

            let stateSelect = document.querySelector("#stateSelect");

            for (let stateData of statesData) {
                let stateOption = document.createElement("option");
                stateOption.id = stateData.usps;
                stateOption.value = stateData.usps;
                stateOption.textContent = stateData.state;

                stateSelect.appendChild(stateOption);
            }
        } catch (error) {
            console.error("Error parsing data: " + error);
        }
    } catch (error) {
        console.error("Error fetching information: " + error);
    }

    let zipInput = document.querySelector("#zipInput");

    zipInput.addEventListener('input', async function (event) {
        try {

            console.log(zipInput.value);

            const fullUrl = `https://csumb.space/api/cityInfoAPI.php?zip=${zipInput.value}`;

            let longResponse = await fetch(fullUrl);
            console.log(longResponse);
            try {
                let longData = await longResponse.json();
                console.log(longData);

                let cityText = document.querySelector("#city");
                cityText.textContent = longData.city;
                let lonText = document.querySelector("#lon");
                lonText.textContent = longData.longitude;
                let latText = document.querySelector("#lat");
                latText.textContent = longData.latitude;

            } catch (error) {
                console.error("Error parsing data: " + error);
            }
        } catch (error) {
            console.error("Error fetching information: " + error);
        }
    });

    try {
        let passResponse = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
        try {
            let passData = await passResponse.json();
            console.log(passData);

            let passInput = document.querySelector("#passInput");
            passInput.placeholder = passData.password;
        } catch (error) {
            console.error("Error parsing data: " + error);
        }
    } catch (error) {
        console.error("Error fetching information: " + error);
    }

    let userInput = document.querySelector("#userInput");

    userInput.addEventListener('input', async function (event) {
        try {
            let fullUrl = `https://csumb.space/api/usernamesAPI.php?username=${userInput.value}`;

            let userResponse = await fetch(fullUrl);
            console.log(userResponse);

            try {
                let userData = await userResponse.json();
                console.log(userData);

                if (userInput.value != userData.available) {
                    // alert("Username is already taken");
                }
            } catch (error) {
                console.error("Error parsing data: " + error);
            }
        } catch (error) {
            console.error("Error fetching information: " + error);
        }
    });
}

setUpForm();