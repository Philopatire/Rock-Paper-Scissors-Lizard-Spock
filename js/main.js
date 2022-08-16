/* !!!CONSTANTS!!! */
const plays = ["rock", "paper", "scissors", "lizard", "spock"];
const rulesEl = document.querySelector(".rules");
const playBtns = [...document.querySelectorAll(".game .play-btn")];
const gameContainer = document.querySelector(".game");
const resultContainer = document.querySelector(".result");
const choosedRes = document.getElementById("choosed_res");
const houseChoose = document.getElementById("house_choose");
const resultResContainer = document.querySelector(".result .res");
const resultResTitle = document.querySelector(".result .res h2");
const playAgain = document.querySelector(".result .res button");
const score = document.getElementById("score");
/* !!!CONSTANTS!!! */

let storedScore = parseInt(localStorage.getItem("score"));
if (storedScore) {
  score.textContent = storedScore;
} else {
  localStorage.setItem("score", "0");
  score.textContent = "0";
}

function minusScore() {
  isNaN(storedScore) ? (storedScore = -1) : (storedScore -= 1);
  localStorage.setItem("score", storedScore);
  score.textContent = storedScore;
}
function plusScore() {
  isNaN(storedScore) ? (storedScore = 2) : (storedScore += 2);
  localStorage.setItem("score", storedScore);
  score.textContent = storedScore;
}
function openRules() {
  document.body.classList.add("overlay");
  rulesEl.classList.add("active");
}
function closeRules() {
  document.body.classList.remove("overlay");
  rulesEl.classList.remove("active");
}
function chooseRandom() {
  return plays[Math.floor(Math.random() * plays.length)];
}
function calcRes(player, house) {
  if (player == "scissors" && (house == "paper" || house == "lizard")) {
    return "player";
  } else if (player == "paper" && (house == "rock" || house == "spock")) {
    return "player";
  } else if (player == "rock" && (house == "lizard" || house == "scissors")) {
    return "player";
  } else if (player == "lizard" && (house == "spock" || house == "paper")) {
    return "player";
  } else if (player == "spock" && (house == "paper" || house == "rock")) {
    return "player";
  } else if (player == house) {
    return "tie";
  } else {
    return "house";
  }
}
function onChoose(playerChoose) {
  let choosedRandom = chooseRandom();
  gameContainer.style.display = "none";
  resultContainer.style.display = "flex";
  choosedRes.classList.add(playerChoose);
  choosedRes.classList.remove("animate");
  setTimeout(() => {
    houseChoose.classList.add(choosedRandom);
    houseChoose.classList.remove("animate");
    let winner = calcRes(playerChoose, choosedRandom);
    resultResContainer.style.display = "block";
    if (winner == "player") {
      resultResTitle.textContent = "You Win";
      playAgain.style.color = "green";
      plusScore();
    } else if (winner == "house") {
      resultResTitle.textContent = "You Lose";
      playAgain.style.color = "red";
      minusScore();
    } else if (winner == "tie") {
      resultResTitle.textContent = "It's a tie";
      playAgain.style.color = "";
    }
  }, 1000);
}

document.getElementById("op-rules").onclick = openRules;
document.getElementById("cls-rules").onclick = closeRules;
playBtns.forEach((btn) => {
  btn.onclick = (event) => {
    if (event.target.nodeName == "DIV") {
      onChoose(event.target.getAttribute("data-name"));
    } else {
      onChoose(event.target.parentElement.getAttribute("data-name"));
    }
  };
});
playAgain.onclick = () => {
  resultResTitle.textContent = "";
  resultResContainer.style.display = "none";
  houseChoose.setAttribute("class", "play-btn animate");
  choosedRes.setAttribute("class", "play-btn animate");
  resultContainer.style.display = "none";
  gameContainer.style.display = "block";
};
