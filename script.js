const questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            {text:"HighText Machine Language", correct: false},
            {text:"HyperText Markup Language.", correct: true},
            {text:"HyperText and links Markup Language", correct: false},
            {text:"None of these", correct: false}
            
        ]
    },
    {
        question: "Which of the following attribute is used to provide a unique name to an element?",
        answers: [
            {text:"id", correct: true},
            {text:"class", correct: false},
            {text:"type", correct: false},
            {text:"None of these", correct: false}
            
        ] 
    },
    {
        question: "A program in HTML can be rendered and read by -",
        answers: [
            {text:"Interpreter", correct: false},
            {text:"Server", correct: false},
            {text:"Web browser", correct: true},
            {text:"None of these", correct: false}
            
        ]
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is -",
        answers: [
            { text: "HTML, Body, Title, Head", correct: false },
            { text: " HTML, Head, Title, Body", correct: true },
            { text: "HTML, Head, Title, Body", correct: false },
            { text: "Head, Title, HTML, body", correct: false }
        ]
    },
    {
        question: "The hr tag in HTML is used for -",
        answers: [
            { text: "new line", correct: false },
            { text: "new paragraph", correct: false },
            { text: "new paragraph", correct: false },
            { text: "horizontal ruler", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();