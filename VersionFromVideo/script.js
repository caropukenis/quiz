const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const exitButton = document.getElementById("exitBtn");
const qContainerEl = document.getElementById("questionContainer");
const questionEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answerBtn");
const timeLeftDisplay = document.getElementById("time-left");

let shuffleQuestions, currentQuestionIndex;
timeLeft = 60;

startButton.addEventListener("click", countDown);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startBtn.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  qContainerEl.classList.remove("hide");
  setNextQuestion();
}

function countDown() {
  setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval((timeLeft = 0));
    }
    timeLeftDisplay.innerText = timeLeft;
    timeLeft -= 1;
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startGame();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "What is 8 + 2?",
    answers: [
      { text: "10", correct: true },
      { text: "82", correct: false },
    ],
  },
];
