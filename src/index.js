import './index.css'

const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let passwordLength = 15;
let tooltipText = document.getElementById("tooltip-text");

function generatePassword() {
    tooltipText.innerText = "Click to copy";

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
      tooltipText.innerText = "Password copied!";
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}


window.generatePassword = generatePassword;
window.copyPassword = copyPassword;