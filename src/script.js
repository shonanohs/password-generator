import './style.css'

const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let passwordLength = 15;
const MIN_LENGTH = 5;
const MAX_LENGTH = 20;

const tooltipTextCopy = document.getElementById("tooltip-text-copy");
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");
const passwordEl = document.getElementById("password");
const passwordLengthText = document.getElementById("password-length");
const tooltipTextPlus = document.getElementById("tooltip-text-plus");
const tooltipTextMinus = document.getElementById("tooltip-text-minus");

document.getElementById("plus-btn").addEventListener("click", () => adjustLength(+1));
document.getElementById("minus-btn").addEventListener("click", () => adjustLength(-1));
document.getElementById("copy-password").addEventListener("click", () => copyPassword());
document.getElementById("generate-btn").addEventListener("click", () => generatePassword());
document.getElementById('mode-toggle').addEventListener('change', () => toggleLightMode());

// Generate random password according to checkboxes selected
function generatePassword() {
    
    // Reset character pool & tooltip text
    let characters = [];
    tooltipTextCopy.innerText = "Click to copy";

    let lowerChecked = document.getElementById("lower").checked;
    let upperChecked = document.getElementById("upper").checked;
    let numberChecked = document.getElementById("numbers").checked;
    let symbolsChecked = document.getElementById("symbols").checked;

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

// Display randomly generated password
function displayPassword(password) {
    passwordEl.innerText = password;
}

// Copy generated password to clipboard
function copyPassword() {
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

// Increase or decrease password length based on user input
function adjustLength(direction) {
    // Direction should be +1 (increase) or -1 (decrease)
    const newLength = passwordLength + direction;

    if (newLength < MIN_LENGTH || newLength > MAX_LENGTH) return;

    passwordLength = newLength;
    passwordLengthText.innerText = passwordLength;

    // Update tooltip + disable state for minus button
    if (passwordLength <= MIN_LENGTH) {
        minusButton.disabled = true;
        tooltipTextMinus.innerText = "Password must have at least 5 characters";
    } else {
        minusButton.disabled = false;
        tooltipTextMinus.innerText = "";
    }

    // Update tooltip + disable state for plus button
    if (passwordLength >= MAX_LENGTH) {
        plusButton.disabled = true;
        tooltipTextPlus.innerText = "Password must not exceed 20 characters";
    } else {
        plusButton.disabled = false;
        tooltipTextPlus.innerText = "";
    }

}

// Toggle between light and dark mode
function toggleLightMode() {
    document.body.classList.toggle('light-mode');
}