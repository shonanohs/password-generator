import './index.css'

const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let passwordLength = 15;
const tooltipTextCopy = document.getElementById("tooltip-text-copy");
const plusButton = document.getElementById("plusButton");
const minusButton = document.getElementById("minusButton");
const passwordLengthText = document.getElementById("password-length");
const tooltipTextPlus = document.getElementById("tooltip-text-plus");
const tooltipTextMinus = document.getElementById("tooltip-text-minus");

function generatePassword() {
    tooltipTextCopy.innerText = "Click to copy";

    let lowerChecked = document.getElementById("lower").checked;
    let upperChecked = document.getElementById("upper").checked;
    let numberChecked = document.getElementById("numbers").checked;
    let symbolsChecked = document.getElementById("symbols").checked;

    // Reset character pool
    let characters = [];

    if (lowerChecked) {
        characters = characters.concat(lowerChars);
    }
    if (upperChecked) {
        characters = characters.concat(upperChars);
    }
    if (numberChecked) {
        characters = characters.concat(numbers);
    }
    if (symbolsChecked) {
        characters = characters.concat(symbols);
    }

    // If no options selected
    if (characters.length === 0) {
        displayPassword("⚠️ No options selected!");
        return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randIdx = Math.floor(Math.random() * characters.length);
        password += characters[randIdx];
    }

    displayPassword(password);
}


function displayPassword(password) {
    let passwordElement = document.getElementById("password");
    passwordElement.innerText = password;
}

function copyPassword() {
  const passwordEl = document.getElementById("password");
  const passwordText = passwordEl.textContent;

  if (!passwordText) return;

  navigator.clipboard.writeText(passwordText)
    .then(() => {
      tooltipTextCopy.innerText = "Password copied!";
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function increaseLength() {
    if (passwordLength < 20) {
        passwordLength += 1;
        passwordLengthText.innerText = passwordLength;
    }

    if (passwordLength >= 20) {
        plusButton.disabled = true;
        tooltipTextPlus.innerText = "Passwords must not exceed 20 characters";
    } else {
        plusButton.disabled = false;
        tooltipTextPlus.innerText = "";
    }

    if (passwordLength > 5) {
        minusButton.disabled = false;
        tooltipTextMinus.innerText = "";
    }
}


function decreaseLength() {
    if (passwordLength > 5) {
        passwordLength -= 1;
        passwordLengthText.innerText = passwordLength;
    }

    if (passwordLength <= 5) {
        minusButton.disabled = true;
        tooltipTextMinus.innerText = "Passwords must be at least 5 characters";
    } else {
        minusButton.disabled = false;
        tooltipTextMinus.innerText = "";
    }

    if (passwordLength < 20) {
        plusButton.disabled = false;
        tooltipTextPlus.innerText = "";
    }
}



window.generatePassword = generatePassword;
window.copyPassword = copyPassword;
window.increaseLength = increaseLength;
window.decreaseLength = decreaseLength;