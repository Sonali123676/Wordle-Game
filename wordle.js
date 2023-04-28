const buttonElements = document.querySelectorAll("button");
let row = 1;
let letter = 1;
let gameOver = false;
let gussedCorrectly = false;
let numOfCorrectAlphabets = 0;
const wordForTheDay = "Around";
const wordElements = document.querySelectorAll(".word-row");

buttonElements.forEach((element) => {
  element.addEventListener("click", function () {
    keypress(element.attributes["data-key"].value);
  });
});

function populateWord(key) {
  if (letter < 7) {
    wordElements[row - 1].querySelectorAll(".word")[letter - 1].innerText = key;

    letter += 1;
  }
}

function checkWord() {
  const letterElements = wordElements[row - 1].querySelectorAll(".word");

  letterElements.forEach((element, index) => {
    const indexOfletterInWordOfTheDay = wordForTheDay
      .toLowerCase()
      .indexOf(element.innerText.toLowerCase());

    if (indexOfletterInWordOfTheDay === index) {
      numOfCorrectAlphabets++;
      element.classList.add("word-green");
    } else if (indexOfletterInWordOfTheDay > 0) {
      element.classList.add("word-yellow");
    } else {
      element.classList.add("word-grey");
    }

    if (numOfCorrectAlphabets == 6) {
      gameOver = true;
      gussedCorrectly = true;
      alert("Congratulations! You gussed Correctly.");
    }
    if (row > 6) {
      gameOver = true;
      alert("Better luck Next Time");
    }
  });
}
function enterWord() {
  if (letter < 7) {
    alert("Not enough letters");
  } else {
    checkWord();
    row++;
    letter = 1;
  }
}

function keypress(key) {
  if (gameOver != true) {
    if (key.toLowerCase() === "enter") {
      enterWord();
    } else if (key.toLowerCase() === "del") {
      deleteWord();
    } else {
      populateWord(key);
    }
  } else {
    alert("Game is over. Try Again");
  }
}

function deleteWord() {
  const letterElements = wordElements[row - 1].querySelectorAll(".word");

  for (let index = letterElements.length - 1; index >= 0; index--) {
    const element = letterElements[index];
    if (element.innerText !== "") {
      element.innerText = "";
      letter -= 1;
      break;
    }
  }
}
