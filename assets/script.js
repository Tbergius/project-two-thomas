document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { 
            question: "What is your favorite color?", 
            answers: [
                { text: "Blue", value: "ravenclaw" },
                { text: "Green", value: "slytherin" },
                { text: "Yellow", value: "hufflepuff" },
                { text: "Red", value: "gryffindor" }
            ] 
        },
        { 
            question: "Which pet would you prefer?", 
            answers: [
                { text: "Owl", value: "ravenclaw" },
                { text: "Cat", value: "slytherin" },
                { text: "Toad", value: "hufflepuff" },
                { text: "Phoenix", value: "gryffindor" }
            ] 
        },
        { 
            question: "Which motto do you agree with the most?", 
            answers: [
                { text: "Do what is wise", value: "ravenclaw" },
                { text: "Do what is necessary", value: "slytherin" },
                { text: "Do what is kind", value: "hufflepuff" },
                { text: "Do what is right", value: "gryffindor" }
            ] 
        },
        { 
            question: "What is your favorite school subject?", 
            answers: [
                { text: "History", value: "ravenclaw" },
                { text: "Science", value: "slytherin" },
                { text: "Gardening", value: "hufflepuff" },
                { text: "P.E.", value: "gryffindor" }
            ] 
        },
        { 
            question: "What kind of people do you want to be with?", 
            answers: [
                { text: "Smart people", value: "ravenclaw" },
                { text: "Similar to me", value: "slytherin" },
                { text: "Kind people", value: "hufflepuff" },
                { text: "Different and creative", value: "gryffindor" }
            ] 
        },
        { 
            question: "When I make a decision, I...", 
            answers: [
                { text: "Consider every option carefully", value: "ravenclaw" },
                { text: "Make sure it works out for me", value: "slytherin" },
                { text: "Think about how it affects others", value: "hufflepuff" },
                { text: "Take chances and just go", value: "gryffindor" }
            ] 
        },
        { 
            question: "Your classmate is attacked by a Harpy, what would you do?", 
            answers: [
                { text: "Trick the Harpy in attacking the tree", value: "ravenclaw" },
                { text: "Walk away", value: "slytherin" },
                { text: "Get help", value: "hufflepuff" },
                { text: "Attack the harpy", value: "gryffindor" }
            ] 
        },
        { 
            question: "What would you like to do after graduating?", 
            answers: [
                { text: "Teaching others", value: "ravenclaw" },
                { text: "Become wealthy", value: "slytherin" },
                { text: "Being outside as much as possible", value: "hufflepuff" },
                { text: "Catching bad people", value: "gryffindor" }
            ] 
        },
        { 
            question: "What is your favorite place to do homework?", 
            answers: [
                { text: "The library", value: "ravenclaw" },
                { text: "I let others do my homework", value: "slytherin" },
                { text: "With classmates in a cozy place", value: "hufflepuff" },
                { text: "In bed, I have others things to do", value: "gryffindor" }
            ] 
        }
    ];

    let currentQuestionIndex = 0;
    const answers = [];

    const startButton = document.getElementById('start-btn');
    const quizContainer = document.querySelector('.quiz');
    const questionElement = document.getElementById('question');
    const questionNumberElement = document.getElementById('question-number');
    const answerButtons = document.querySelectorAll('.btn');
    const nextButton = document.getElementById('next-btn');
    const resultsContainer = document.querySelector('.results');
    const resultHouseElement = document.getElementById('result-house');
    const resultDescriptionElement = document.getElementById('result-description');
    const restartButton = document.getElementById('restart-btn');
    const quitButton = document.getElementById('quit-btn');
    const pageIntro = document.querySelector('.page-intro');
    const timerElement = document.getElementById('timer');
    const countdownElement = document.getElementById('countdown');

    let timer; 
    let timerDuration = 25; 

    function startQuiz() {
        startButton.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        currentQuestionIndex = 0;
        answers.length = 0;
        showQuestion();
        hidePageIntro();
    }

    function showQuestion() {
        resetTimer(); 
        startTimer(); 
        timerElement.classList.remove('hidden'); 
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

        currentQuestion.answers.forEach((answer, index) => {
            const button = answerButtons[index];
            button.textContent = answer.text;
            button.classList.remove('selected');
            button.onclick = () => selectAnswer(button, answer.value);
        });

        nextButton.classList.add('hidden');
    }

    function selectAnswer(button, answer) {
        answerButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        answers[currentQuestionIndex] = answer;
        nextButton.classList.remove('hidden');
        resetTimer();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        stopTimer();
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

        const houseCounts = answers.reduce((acc, answer) => {
            acc[answer] = (acc[answer] || 0) + 1;
            return acc;
        }, {});

        const sortedHouses = Object.entries(houseCounts).sort((a, b) => b[1] - a[1]);
        const resultHouse = sortedHouses[0][0];
        const resultDescription = getResultDescription(resultHouse);

        resultHouseElement.textContent = resultHouse.charAt(0).toUpperCase() + resultHouse.slice(1);
        resultDescriptionElement.textContent = resultDescription;
    }

    function getResultDescription(house) {
        switch (house) {
            case 'ravenclaw':
                return "Ravenclaw values intelligence, creativity, learning, and wit. Congratulations on being sorted into Ravenclaw!";
            case 'slytherin':
                return "Slytherin values ambition, cunning, leadership, and resourcefulness. Congratulations on being sorted into Slytherin!";
            case 'hufflepuff':
                return "Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Congratulations on being sorted into Hufflepuff!";
            case 'gryffindor':
                return "Gryffindor values bravery, daring, nerve, and chivalry. Congratulations on being sorted into Gryffindor!";
            default:
                return "You have been sorted into a house! Congratulations!";
        }
    }

    function restartQuiz() {
        resultsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        startQuiz();
    }

    function quitQuiz() {
        quizContainer.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        startButton.classList.remove('hidden');
        stopTimer();
    }

    function hidePageIntro() {
        pageIntro.classList.add('hidden');
    }

    function startTimer() {
        countdownElement.textContent = timerDuration;
        timerElement.style.display = 'block';
        timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timerDuration--;
        countdownElement.textContent = timerDuration;
        if (timerDuration <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }

    function stopTimer() {
        clearInterval(timer);
        timerElement.classList.add('hidden');
    }

    function resetTimer() {
        clearInterval(timer);
        timerDuration = 25;
    }

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
    quitButton.addEventListener('click', quitQuiz);
});
