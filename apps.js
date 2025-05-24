const quizData = [
            {
                question: "Which of the following is a valid key in a relational database?",
                options: ["Primary Key", "Foreign Key", "Candidate Key", "All of the above"],
                answer: "All of the above"
            },
            {
                question: "Which scheduling algorithm gives minimum average waiting time?",
                options: ["FCFS", "SJF", "Round Robin", "Priority"],
                answer: "SJF"
            },
            {
                question: "Which data structure uses LIFO order?",
                options: ["Queue", "Stack", "Tree", "Graph"],
                answer: "Stack"
            },
            {
                question: "Which SQL command is used to remove a table from a database?",
                options: ["DELETE", "DROP", "REMOVE", "ERASE"],
                answer: "DROP"
            },
            {
                question: "Which of the following is not a Java primitive type?",
                options: ["int", "float", "String", "char"],
                answer: "String"
            },
            {
                question: "In OS, what is a deadlock?",
                options: [
                    "A situation where processes wait indefinitely for resources",
                    "A process terminates abnormally",
                    "A process runs without interruption",
                    "None of the above"
                ],
                answer: "A situation where processes wait indefinitely for resources"
            },
            {
                question: "Which sorting algorithm has the best average case time complexity?",
                options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
                answer: "Merge Sort"
            },
            {
                question: "Which Java keyword is used to inherit a class?",
                options: ["this", "super", "extends", "implements"],
                answer: "extends"
            },
            {
                question: "Which normal form removes partial dependency?",
                options: ["1NF", "2NF", "3NF", "BCNF"],
                answer: "2NF"
            },
            {
                question: "Which of the following is used to prevent race condition?",
                options: ["Semaphore", "Paging", "Thrashing", "Fragmentation"],
                answer: "Semaphore"
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timeLeft = 30;
        let timerInterval;
        const timerEl = document.getElementById('time');
        const questionEl = document.querySelector('.question');
        const optionsEl = document.querySelector('.options');
        const resultEl = document.querySelector('.result');
        const scoreEl = document.getElementById('score');
        const restartBtn = document.querySelector('.restart-btn');

        // Function to load the question
        function loadQuestion() {
            if (currentQuestion >= quizData.length) {
                endQuiz();
                return;
            }
            clearInterval(timerInterval);
            timeLeft = 30;
            timerEl.textContent = timeLeft;
            startTimer();
            const currentQuiz = quizData[currentQuestion];
            questionEl.textContent = `Q.${currentQuestion + 1} ${currentQuiz.question}`; // Added space here
            optionsEl.innerHTML = '';
            currentQuiz.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.onclick = () => checkAnswer(option, button);
                optionsEl.appendChild(button);
            });
        }

        // Check the answer and give feedback
        function checkAnswer(selectedOption, btn) {
            const correct = selectedOption === quizData[currentQuestion].answer;
            if (correct) {
                btn.style.background = "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
                btn.style.color = "#fff";
                score++;
            } else {
                btn.style.background = "linear-gradient(90deg, #ff5858 0%, #f09819 100%)";
                btn.style.color = "#fff";
                // Highlight correct answer
                Array.from(optionsEl.children).forEach(b => {
                    if (b.textContent === quizData[currentQuestion].answer) {
                        b.style.background = "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
                        b.style.color = "#fff";
                    }
                });
            }
            // Disable all buttons after answer
            Array.from(optionsEl.children).forEach(b => b.disabled = true);
            setTimeout(() => {
                currentQuestion++;
                loadQuestion();
            }, 900);
        }

        // Start the timer
        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endQuiz();
                }
            }, 1000);
        }

        // End the quiz and show the results
        function endQuiz() {
            clearInterval(timerInterval);
            questionEl.style.display = 'none';
            optionsEl.style.display = 'none';
            resultEl.style.display = 'block';
            scoreEl.textContent = score;
            restartBtn.style.display = 'inline-block';
        }

        // Restart the quiz
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            timeLeft = 30;
            timerEl.textContent = timeLeft;
            questionEl.style.display = 'block';
            optionsEl.style.display = 'flex';
            resultEl.style.display = 'none';
            restartBtn.style.display = 'none';
            loadQuestion();
        });

        // Initialize the quiz with the first question
        loadQuestion();