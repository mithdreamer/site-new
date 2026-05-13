const rollDiceButton = document.getElementById("rollDice");
const resetDiceButton = document.getElementById("resetDiceGame");
const playerDiceText = document.getElementById("playerDice");
const computerDiceText = document.getElementById("computerDice");
const diceResultText = document.getElementById("diceResult");
const playerDiceScoreText = document.getElementById("playerDiceScore");
const computerDiceScoreText = document.getElementById("computerDiceScore");

let playerDiceScore = 0;
let computerDiceScore = 0;

rollDiceButton.addEventListener("click", () => {
  const playerRoll = rollDie();
  const computerRoll = rollDie();
  let message = "Berabere.";

  if (playerRoll > computerRoll) {
    playerDiceScore += 1;
    message = "Bu turu sen kazand\u0131n.";
  } else if (computerRoll > playerRoll) {
    computerDiceScore += 1;
    message = "Bu turu bilgisayar kazand\u0131.";
  }

  playerDiceText.textContent = playerRoll;
  computerDiceText.textContent = computerRoll;
  playerDiceScoreText.textContent = playerDiceScore;
  computerDiceScoreText.textContent = computerDiceScore;
  diceResultText.textContent = message;
});

resetDiceButton.addEventListener("click", () => {
  playerDiceScore = 0;
  computerDiceScore = 0;
  playerDiceText.textContent = "-";
  computerDiceText.textContent = "-";
  playerDiceScoreText.textContent = playerDiceScore;
  computerDiceScoreText.textContent = computerDiceScore;
  diceResultText.textContent = "Zar atmak i\u00e7in butona bas.";
});

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
