let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");
const questionCount = document.getElementById("question-count");

// Fetch questions
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(error => {
    questionText.textContent = "Failed to load questions.";
    console.error("Error loading quiz data:", error);
  });

function showQuestion() {
  clearOptions();
  const current = questions[currentQuestionIndex];
  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = current.question;

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option";
    btn.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].answer;
  const optionButtons = optionsContainer.querySelectorAll("button");

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.style.backgroundColor = "#a4edba";
    else if (i === selectedIndex) btn.style.backgroundColor = "#f5a3a3";
  });

  if (selectedIndex === correctIndex) score++;
  nextBtn.disabled = false;
}

function clearOptions() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-box").innerHTML =
    `<h2>Your score: ${score} / ${questions.length}</h2>`;
}
