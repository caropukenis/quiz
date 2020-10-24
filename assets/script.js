const startButton = document.getElementById("startBtn");
const restartButton = document.getElementById("restartBtn");
const timeLeftDisplay = document.getElementById("time-left");
const timeDisplay = document.getElementById("timeDisplay");
const questionContainer = document.getElementById("qContainer");
const questionEl = document.getElementById("question");
const leaderboard = document.getElementById("highscoreBoard");
const initals = document.getElementById("initalsEntered");
const hideInitals = document.getElementById("enterInitals");
const score = document.getElementById("scoreRead");
const revealLeaders = document.getElementById("leaderBoard");
const leader = document.getElementById("first");
const submitScore = document.getElementById("submit");
const choiceA = document.getElementById("a");
const choiceB = document.getElementById("b");
const choiceC = document.getElementById("c");
const choiceD = document.getElementById("d");

let timeLeft = 60;

var questions = [
  {
    question: "Commonly used data types do NOT include",
    optionA: "Strings",
    optionB: "Booleans",
    optionC: "Alerts",
    optionD: "Numbers",
    correct: "B",
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    optionA: "Quotes",
    optionB: "Curly Brackets",
    optionC: "Parenthesis",
    optionD: "Square Brackets",
    correct: "B",
  },
  {
    question: "Arrays in Javascript can be used to store ________.",
    optionA: "Numbers and Strings",
    optionB: "Other Arrays",
    optionC: "Booleans",
    optionD: "All of the Above",
    correct: "D",
  },
  {
    question:
      "Sring values must be enclosed within ______ when being assigned to a variable.",
    optionA: "Commas",
    optionB: "Curly Brackets",
    optionC: "Quotes",
    optionD: "Parenthesis",
    correct: "C",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger",
    optionA: "Javascript",
    optionB: "Terminal/Bash",
    optionC: "For Loops",
    optionD: "Console.log();",
    correct: "D",
  },
];

startButton.addEventListener("click", startGame);
choiceA.addEventListener("click", checkAnswer);
choiceB.addEventListener("click", checkAnswer);
choiceC.addEventListener("click", checkAnswer);
choiceD.addEventListener("click", checkAnswer);
submitScore.addEventListener("click", submit);
restartButton.addEventListener("click", reStart);

function startGame() {
  questionContainer.classList.remove("hide");
  startButton.classList.add("hide");
  renderQuestion();
  countDown();
}

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

function renderQuestion() {
  let q = questions[runningQuestion];
  questionEl.innerText = q.question;
  choiceA.innerText = q.optionA;
  choiceB.innerText = q.optionB;
  choiceC.innerText = q.optionC;
  choiceD.innerText = q.optionD;
  console.log(q.correct);
}

function countDown() {
  setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timeLeft);
    }
    if (timeLeft == 0) {
      quizEnd();
    }
    timeLeftDisplay.innerText = timeLeft;
    timeLeft -= 1;
  }, 1000);
}

function checkAnswer() {
  console.log(this.id.toUpperCase());
  if (this.id.toUpperCase() == questions[runningQuestion].correct) {
    console.log("checked correct value");
  } else {
    console.log("checked wrong value");
    timeLeft -= 10;
  }
  if (runningQuestion < lastQuestion) {
    console.log("fired");
    runningQuestion++;
    renderQuestion();
  } else {
    quizEnd();
    console.log("finished");
  }
}

function quizEnd() {
  questionContainer.classList.add("hide");
  leaderboard.classList.remove("hide");
  timeDisplay.classList.add("hide");
  score.innerText = timeLeft;
}

function submit() {
  console.log("initals entered");
  const key = initals.value;
  localStorage.setItem("highscore", key);
  console.log(localStorage);
  hideInitals.classList.add("hide");
  revealLeaders.classList.remove("hide");
  leader.innerText = key;
}

function reStart() {
  location.reload();
}
