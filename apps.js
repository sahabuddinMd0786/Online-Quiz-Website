// Helper: Get users from localStorage or default
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper: Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Computer Science Questions (add more if you want)
const questions = [
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Programming Unit"], answer: 0 },
    { question: "Which language is primarily used for web development?", options: ["Python", "JavaScript", "C++"], answer: 1 },
    { question: "What is the value of binary 1010?", options: ["10", "12", "8"], answer: 0 },
    { question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates"], answer: 0 },
    { question: "Which data structure uses FIFO order?", options: ["Stack", "Queue", "Tree"], answer: 1 },
    { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run Accept Memory"], answer: 1 },
    { question: "Which is NOT an operating system?", options: ["Linux", "Windows", "Oracle"], answer: 2 },
    { question: "HTML is used to?", options: ["Structure web pages", "Style web pages", "Program web servers"], answer: 0 },
    { question: "Which is a backend language?", options: ["CSS", "Java", "HTML"], answer: 1 },
    { question: "What does 'www' stand for?", options: ["World Wide Web", "Web World Wide", "Wide Web World"], answer: 0 },
    { question: "Which protocol is used for web?", options: ["HTTP", "FTP", "SMTP"], answer: 0 },
    { question: "Which is a NoSQL database?", options: ["MySQL", "MongoDB", "Oracle"], answer: 1 },
    { question: "Which company developed Java?", options: ["Sun Microsystems", "Microsoft", "Apple"], answer: 0 },
    { question: "What is the extension for JavaScript files?", options: [".js", ".java", ".py"], answer: 0 },
    { question: "Which is a version control system?", options: ["Git", "Gimp", "Gmail"], answer: 0 }
];

// Shuffle helper
function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
const QUESTIONS_PER_QUIZ = 10;

// Toggle between Login and Signup forms
document.getElementById('showLogin').onclick = function() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
    this.classList.add('active');
    document.getElementById('showSignup').classList.remove('active');
};
document.getElementById('showSignup').onclick = function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
    this.classList.add('active');
    document.getElementById('showLogin').classList.remove('active');
};

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const role = document.getElementById('signupRole').value;
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errorMessage = document.getElementById('signup-error-message');

    let users = getUsers();
    if (users.find(u => u.username === username && u.role === role)) {
        errorMessage.textContent = 'User already exists with this role.';
        return;
    }
    users.push({ username, password, role });
    saveUsers(users);
    errorMessage.textContent = 'Sign up successful! Please login.';
    setTimeout(() => {
        document.getElementById('showLogin').click();
        document.getElementById('signupForm').reset();
        errorMessage.textContent = '';
    }, 1000);
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const role = document.getElementById('loginRole').value;
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorMessage = document.getElementById('login-error-message');

    let users = getUsers();
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        document.querySelector('.auth-container').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';
        startQuiz();
    } else {
        errorMessage.textContent = 'Invalid credentials or role. Please try again.';
    }
});

// Start or restart the quiz
function startQuiz() {
    quizQuestions = shuffle(questions).slice(0, QUESTIONS_PER_QUIZ);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    loadQuestion();
}

// Load current question
function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        document.querySelector('.question').textContent = "Quiz finished!";
        document.querySelector('.options').innerHTML = "";
        document.querySelector('.result').textContent = "Your final score: " + score + " / " + quizQuestions.length;
        document.querySelector('.result').style.display = 'block';
        return;
    }
    const q = quizQuestions[currentQuestionIndex];
    document.querySelector('.question').textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
    document.querySelector('.options').innerHTML = q.options.map((opt, idx) =>
        `<button onclick="checkAnswer(${idx})">${opt}</button>`
    ).join('');
    document.querySelector('.result').style.display = 'none';
}

// Check answer
window.checkAnswer = function(selected) {
    const q = quizQuestions[currentQuestionIndex];
    if (selected === q.answer) {
        score++;
        document.getElementById('score').textContent = score;
        document.querySelector('.result').textContent = "Correct!";
        document.querySelector('.result').style.color = "#388e3c";
    } else {
        document.querySelector('.result').textContent = "Wrong! Correct answer: " + q.options[q.answer];
        document.querySelector('.result').style.color = "red";
    }
    document.querySelector('.result').style.display = 'block';
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1200);
};

// Restart quiz button
document.querySelector('.restart-btn').onclick = function() {
    startQuiz();
};
