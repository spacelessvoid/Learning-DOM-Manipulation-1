"use strict";

const h1El = document.querySelector("h1");
const numberEl = document.querySelectorAll(".number");
const numbersRowEl = document.querySelector(".numbers-row");
const greetEl = document.querySelector(".greeting");
const gameActiveEl = document.querySelector(".game-active");
const hintEl = document.querySelector(".hint");
const btnStartEl = document.querySelector(".btn-start");
const btnEndEl = document.querySelector(".btn-end");
const imgEndEl = document.querySelectorAll(".the-end-img");
const textEndEl = document.querySelector(".the-end-text");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

let stateActive = false;
let i, attempts; // i == the secret number

btnStartEl.addEventListener("click", initFunc);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    initFunc();
  }
});
btnEndEl.addEventListener("click", escapeFunc);

// pressing the keys to guess
document.addEventListener("keydown", function (e) {
  if (stateActive) {
    if (attempts >= 1 && e.key == i) {
      // guessed the number
      guessFunc_correct(e.key);
    } else if (attempts == 1 && e.key != i) {
      // out of attempts and lost
      guessFunc_lost(e.key);
    } else if (attempts > 1 && e.key != i) {
      //trying to guess
      guessFunc_incorrect(e.key);
    }
    console.log(e.key);
    console.log("attempts left:", attempts);
  }
});
// clicking the number to guess
for (let c = 1; c <= numberEl.length; c++) {
  numberEl[c - 1].addEventListener("click", function () {
    if (stateActive) {
      if (attempts >= 1 && c == i) {
        // guessed the number
        guessFunc_correct(c);
      } else if (attempts == 1 && c != i) {
        // out of attempts and lost
        guessFunc_lost(c);
      } else if (attempts > 1 && c != i) {
        //trying to guess
        guessFunc_incorrect(c);
      }
      console.log(c, numberEl.length);
      console.log(attempts, "try");
    }
  });
}

// // initiating the game
// function initFunc() {
//   stateActive = true;
//   i = Math.trunc(Math.random() * 9) + 1; // the secret number
//   console.log(i);
//   attempts = 3;
//   console.log(attempts, "start");
//   h1El.classList.add("hidden");
//   greetEl.classList.add("hidden");
//   btnStartEl.classList.add("hidden");
//   gameActiveEl.classList.remove("hidden");
//   numbersRowEl.classList.remove("hidden");
//   btnEndEl.classList.remove("hidden");
// }
// // defaults for non-active game state / restart
// function restartFunc() {
//   h1El.classList.remove("hidden");
//   greetEl.classList.remove("hidden");
//   btnStartEl.classList.remove("hidden");
//   gameActiveEl.classList.add("hidden");
//   numbersRowEl.classList.add("hidden");
//   btnEndEl.classList.add("hidden");
//   textEndEl.textContent = "";
//   textEndEl.textContent = "";
//   for (let i = 0; i < numberEl.length; i++) {
//     numberEl[i].classList.remove("number-wrong");
//     numberEl[i].classList.remove("number-correct");
//   }
//   for (let i = 0; i < imgEndEl.length; i++) {
//     imgEndEl[i].classList.add("hidden");
//   }
// }

// function for guessing + win/lose conditions & text
// guessed the number
function guessFunc_correct(g) {
  document.getElementById(`num-${g}`).classList.add("number-correct");
  document.getElementById("img-3").classList.remove("hidden");
  textEndEl.textContent = `Hah, that's the right one! The stranger smiles at you with a disappointment, and gently steps back fading into the darkness`;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  attempts = 0;
  guessHint(g);
}
//trying to guess
function guessFunc_incorrect(g) {
  document.getElementById(`num-${g}`).classList.add("number-wrong");
  attempts--;
  guessHint(g);
}
// out of attempts and lost
function guessFunc_lost(g) {
  document.getElementById(`num-${g}`).classList.add("number-wrong");
  document.getElementById("img-2").classList.remove("hidden");
  textEndEl.textContent = `You failed... You see a predaceous glint in the stranger's eyes and feel as if your very soul is being sucked out of your body... then – darkness`;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  attempts--;
  guessHint(g);
}

function guessHint(g) {
  if (g != i && attempts < 1) {
    hintEl.textContent = `“MUAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA”`;
  } else if (g > i && attempts < 2) {
    hintEl.textContent = `“That's too much. You've got a last chance.”`;
  } else if (g < i && attempts < 2) {
    hintEl.textContent = `“Alas, this is too small of a number. You still have one attempt, though...”`;
  } else if (g > i) {
    hintEl.textContent = `“Nope, that's too much... Try again.”`;
  } else if (g < i) {
    hintEl.textContent = `“Hah, wrong – too little. Have another go.”`;
  } else if (g == i) {
    hintEl.textContent = `“That's a pity...”`;
  }
}

// toggling the game initial state
function initFunc() {
  if (!stateActive) {
    stateActive = true;
  } else {
    stateActive = false;
  }
  i = Math.trunc(Math.random() * 9) + 1; // the secret number
  console.log(i, "is the secret number");
  attempts = 3;
  console.log(attempts, "start");
  h1El.classList.toggle("hidden");
  greetEl.classList.toggle("hidden");
  btnStartEl.classList.toggle("hidden");
  gameActiveEl.classList.toggle("hidden");
  numbersRowEl.classList.toggle("hidden");
  btnEndEl.classList.toggle("hidden");
  textEndEl.textContent = "";
  textEndEl.textContent = "";
  hintEl.textContent = `“You have three attempts. Give it a shot.”`;
  for (let i = 0; i < numberEl.length; i++) {
    numberEl[i].classList.remove("number-wrong");
    numberEl[i].classList.remove("number-correct");
  }
  for (let i = 0; i < imgEndEl.length; i++) {
    imgEndEl[i].classList.add("hidden");
  }
}

// trying to escape
function escapeFunc() {
  let saveRoll = Math.trunc(Math.random() * 8) + 1;
  console.log(saveRoll);
  if (saveRoll > i) {
    // success
    document.getElementById("img-1").classList.remove("hidden");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    textEndEl.textContent = `You barely managed to escape. You feel like you saved more than just your life...`;
  } else if (saveRoll < i) {
    // failure
    document.getElementById("img-2").classList.remove("hidden");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    textEndEl.textContent = `You're trying to run but feel as if some invisible claws grab you... at your very soul... and you start fading away...`;
  }
  // for (let i = 0; i < imgEndEl.length; i++) {
  //   imgEndEl[i].addEventListener("click", initFunc);
  // }
}

function closeModalFunc() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  initFunc();
}
// closing modal with X button
btnCloseModal.addEventListener("click", closeModalFunc);
//closing modal by clicking outside it
overlay.addEventListener("click", closeModalFunc);
// closing modal with Esc key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalFunc();
  }
});
