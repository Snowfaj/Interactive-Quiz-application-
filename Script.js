const startBtn = document.getElementById('start');
// Question data
const questions = [
  {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: 1
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Jupiter"],
    answer: 2
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Vincent Van Gogh", "Leonardo da Vinci", "Claude Monet"],
    answer: 2
  },
  {
    question: "What gas do plants primarily absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  }
];

// DOM elements
const questionText = document.querySelector(".question-text");
const optionsList = document.querySelector(".options-list");
const feedbackText = document.querySelector(".feedback-text");
const nextBtn = document.querySelector(".next-btn");
const retakeBtn = document.querySelector(".retake-btn");
const scoreText = document.querySelector(".score-text");
const progress = document.querySelector(".progress");

// State variables
let currentQuestion = 0;
let score = 0;

// Load the current question
function loadQuestion() {
  const q = questions[currentQuestion];
  
  questionText.style.opacity = 0;

  setTimeout(() => {
    questionText.textContent = q.question;
    optionsList.innerHTML = '';
    feedbackText.textContent = '';
    feedbackText.classList.remove('show');

    nextBtn.disabled = true;
    nextBtn.classList.remove('show');
    retakeBtn.style.display = 'none';

    progress.style.width = ((currentQuestion) / questions.length) * 100 + '%';

    q.options.forEach((opt, index) => {
      const div = document.createElement('div');
      div.classList.add('option-item');
      div.textContent = opt;
      div.onclick = () => checkAnswer(index);
      optionsList.appendChild(div);
    });

    questionText.style.opacity = 1;
  }, 200);
}

// Check the selected answer
function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    feedbackText.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackText.textContent = "❌ Wrong! Correct answer: " + questions[currentQuestion].options[correct];
  }

  scoreText.textContent = "Score: " + score;
  feedbackText.classList.add('show');

  nextBtn.disabled = false;
  nextBtn.classList.add('show');

  document.querySelectorAll(".option-item").forEach(opt => {
    opt.style.pointerEvents = "none";
  });
}

// Proceed to next question or end quiz
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionText.textContent = "🎉 Quiz Complete!";
    optionsList.innerHTML = '';
    feedbackText.textContent = `Your final score is ${score} out of ${questions.length}.`;
    nextBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
    retakeBtn.classList.add('show');
    progress.style.width = '100%';
  }
});

// Retake the quiz
retakeBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;

  scoreText.textContent = "Score: 0";
  nextBtn.style.display = 'inline-block';
  nextBtn.disabled = true;
  nextBtn.classList.remove('show');
  retakeBtn.style.display = 'none';
  progress.style.width = '0%';

  loadQuestion();
});

// Initialize
loadQuestion();
