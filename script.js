const timeRemain = document.getElementById("timeRemaining");
const flipsText = document.getElementById("flipsDone");
const cards = document.getElementsByClassName("card");
const overlayText = document.getElementById("overlayText");
let timerInterval;
let timerStart = 100;
let timer = timerStart;
let totalFlips = 0;
let flipCount = 0;
let clickOne = [];
let gameWon = false;

function startGame() {
  overlayText.classList.remove("visible");
  countdown();
}
function resetGame() {
  resetFlipText();
  resetTimer();
  gameWon = false;
  overlayText.classList.add("visible");
  overlayText.innerText = "Click To Start";
  Array.from(cards).forEach(function(item) {
    item.classList.remove("matched");
    item.classList.remove("clicked");
  });
}
function countdown() {
  timerInterval = setInterval(function() {
    timeRemain.innerText = timer - 1;
    timer -= 1;
    if (timer <= 0) {
      clearInterval();
      timeRemain.innerText = "Finished";
      resetGame();
    }
  }, 1000);
}
function resetTimer() {
  clearInterval(timerInterval);
  timer = timerStart;
  timeRemain.innerText = timerStart;
}
function changeFlipText() {
  totalFlips += 1;
  flipsText.innerText = totalFlips;
}
function resetFlipText() {
  totalFlips = 0;
  flipsText.innerText = 0;
}
function assignNames(arr) {
  if (arr.innerHTML.includes("chicken")) {
    clickOne.push("cat");
    console.log(clickOne);
  } else if (arr.innerHTML.includes("dog")) {
    clickOne.push("dog");
    console.log(clickOne);
  } else if (arr.innerHTML.includes("pig")) {
    clickOne.push("pig");
    console.log(clickOne);
  } else if (arr.innerHTML.includes("frog")) {
    clickOne.push("frog");
    console.log(clickOne);
  }
}
function noMatch() {
  setTimeout(function() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("clicked");
    }
    flipCount = 0;
  }, 500);
  clickOne = [];
  console.log("clickone array and flipcount reset");
}
function yesMatch(arr) {
  setTimeout(function() {
    Array.from(arr).forEach(function(item) {
      if (item.className.includes("clicked")) {
        item.classList.add("matched");
        item.classList.remove("clicked");
      }
    });
    flipCount = 0;
  }, 500);
  clickOne = [];
  console.log("success reset");
}
function allMatched(arr) {
  let isMatched = 0;
  Array.from(arr).forEach(function(item) {
    if (item.className.includes("matched")) {
      isMatched += 1;
    }
    console.log(isMatched);
  });
  if (isMatched === arr.length - 2) {
    winGame();
  }
}
function winGame() {
  console.log("YOU MATCHED THEM ALL");
  overlayText.classList.add("visible");
  overlayText.innerText = "YOU WIN!!";
  gameWon = true;
  clearInterval(timerInterval);
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    if (cards[i].className.includes("matched")) {
      // do nothing
    } else {
      flipCount += 1;
      console.log(`card ${i + 1} clicked`);
      console.log(`flipcount is ${flipCount}`);
      changeFlipText();
      cards[i].classList.add("clicked");
      assignNames(cards[i]);
    }
    if (flipCount >= 2) {
      if (clickOne[0] === clickOne[1]) {
        console.log("It's a match");
        yesMatch(cards);
        allMatched(cards);
      } else {
        console.log("Not a match");
        noMatch();
      }
    }
  });
}
overlayText.addEventListener("click", function() {
  if (gameWon === false) {
    startGame();
  } else if (gameWon === true) {
    resetGame();
  }
});
document.querySelector("button").addEventListener("click", function() {
  resetGame();
});
