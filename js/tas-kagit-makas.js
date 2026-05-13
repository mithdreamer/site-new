const choiceButtons = document.querySelectorAll("[data-choice]");
const resultBox = document.getElementById("result");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const resetButton = document.getElementById("resetGame");

const labels = {
  tas: "Ta\u015f",
  kagit: "Ka\u011f\u0131t",
  makas: "Makas"
};

const winningMoves = {
  tas: "makas",
  kagit: "tas",
  makas: "kagit"
};

let playerScore = 0;
let computerScore = 0;

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  resultBox.textContent = "Bir se\u00e7im yap.";
});

function playRound(playerChoice) {
  const choices = Object.keys(labels);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let message = "Berabere.";

  if (winningMoves[playerChoice] === computerChoice) {
    playerScore += 1;
    message = "Kazand\u0131n.";
  } else if (winningMoves[computerChoice] === playerChoice) {
    computerScore += 1;
    message = "Bilgisayar kazand\u0131.";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  resultBox.innerHTML = `
    Sen: <strong>${labels[playerChoice]}</strong><br>
    Bilgisayar: <strong>${labels[computerChoice]}</strong>
    <p>${message}</p>
  `;
}
