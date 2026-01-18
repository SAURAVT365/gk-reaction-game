const questions = [
    {
        question: "Capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        correct: 1
    },
    {
        question: "Father of Computer?",
        options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
        correct: 1
    },
    {
        question: "Largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2
    },
    {
        question: "Fastest land animal?",
        options: ["Lion", "Tiger", "Cheetah", "Leopard"],
        correct: 2
    },
    {
        question: "Chemical symbol of Gold?",
        options: ["Ag", "Au", "Gd", "Go"],
        correct: 1
    },
    {
        question: "National animal of India?",
        options: ["Lion", "Elephant", "Tiger", "Leopard"],
        correct: 2
    },
    {
        question: "How many continents?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Which planet is red?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who invented electricity?",
        options: ["Newton", "Tesla", "Edison", "Faraday"],
        correct: 3
    },
    {
        question: "Largest ocean?",
        options: ["Indian", "Atlantic", "Pacific", "Arctic"],
        correct: 2
    }
];

let current = 0;
let score = 0;
let time = 10;
let timerInterval;
let answered = false;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

function startGame() {
    current = 0;
    score = 0;
    scoreEl.innerText = "Score: 0";
    startBtn.style.display = "none";
    optionBtns.forEach(btn => btn.style.display = "block");
    loadQuestion();
}

function loadQuestion() {
    if (current >= questions.length) {
        questionEl.innerText = `Game Finished!\nYour Score: ${score} / 10`;
        optionBtns.forEach(btn => btn.style.display = "none");
        timerEl.innerText = "0";
        return;
    }

    answered = false;
    time = 10;
    timerEl.innerText = time;

    const q = questions[current];
    questionEl.innerText = q.question;

    optionBtns.forEach((btn, i) => {
        btn.innerText = q.options[i];
        btn.className = "option";
        btn.disabled = false;
    });

    clearInterval(timerInterval);
    timerInterval = setInterval(countdown, 1000);
}

function countdown() {
    time--;
    timerEl.innerText = time;

    if (time === 0) {
        clearInterval(timerInterval);

        if (!answered) {
            // No answer selected
            optionBtns[questions[current].correct].classList.add("correct");
        }

        disableOptions();

        // Wait at 0 before next question
        setTimeout(nextQuestion, 2000);
    }
}

function selectOption(index) {
    if (answered) return;
    answered = true;

    clearInterval(timerInterval);

    const correctIndex = questions[current].correct;

    if (index === correctIndex) {
        score++;
        scoreEl.innerText = "Score: " + score;
    }

    optionBtns.forEach((btn, i) => {
        if (i === correctIndex) btn.classList.add("correct");
        if (i === index && i !== correctIndex) btn.classList.add("wrong");
    });

    disableOptions();

    // Give time to see result
    setTimeout(nextQuestion, 2000);
}

function disableOptions() {
    optionBtns.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    current++;
    loadQuestion();
}
