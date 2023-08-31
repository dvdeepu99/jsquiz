const qns = [
    {
        question: "Which is the even number among the following?",
        answers: [
            {      text:  "1", correct: false      },
            {      text:  "2", correct: true       },
            {      text:  "3", correct: false      },
            {      text:  "5", correct: false      }
        ]
    },
    {
        question: "When did the first iPhone launch?",
        answers: [
            {      text:  "2010", correct: false      },
            {      text:  "2008", correct: false       },
            {      text:  "2007", correct: true      },
            {      text:  "2011", correct: false      }
        ]
    },
    {
        question: "How many years is a century?",
        answers: [
            {      text:  "100", correct: true      },
            {      text:  "10", correct: false       },
            {      text:  "50", correct: false      },
            {      text:  "1000", correct: false      }
        ]
    },
    {
        question: "A subwoofer is a part of which computer appliance?",
        answers: [
            {      text:  "Speakers", correct: true      },
            {      text:  "Monitors", correct: false       },
            {      text:  "Keyboards", correct: false      },
            {      text:  "Routers", correct: false      }
        ]
    }
];

const qsElem = document.getElementById("question");
const ansElem = document.getElementById("answerbtn");
const nextElem = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { 
    currentQuestionIndex = 0;
    score = 0;
    nextElem.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetQS();
    let currentQuestion = qns[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    qsElem.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        ansElem.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetQS() {
    nextElem.style.display = "none";
    while(ansElem.firstChild){
        ansElem.removeChild(ansElem.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(ansElem.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextElem.style.display = "block";
}
function showScore(){
    resetQS();
    qsElem.innerHTML = `You've scored ${score} out of ${qns.length} questions.`;
    nextElem.innerHTML = "Test again";
    nextElem.style.display = "Block";
}
function handleNextButton(){
     currentQuestionIndex++;
     if(currentQuestionIndex < qns.length){
        showQuestion();
     }
     else{
        showScore();
     }
}
nextElem.addEventListener("click", ()=>{
    if(currentQuestionIndex<qns.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
}
)

startQuiz();
