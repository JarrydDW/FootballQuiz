// selecting all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


// creating our questions
let questions = [
    {
       question : "Who is the Premier Leagues All-Time Top Goal Scorers?",
       imgSrc : "",
       choiceA : "Jermaine Defoe",
       choiceB : "Sergio Aguero",
       choiceC : "Alan Shearer",
       choiceD : "Wayne Rooney",
       correct : "C",

    },{
        question : "Who has made the most All-Time Appearances in the Premier Leagues?",
        imgSrc : "",
        choiceA : "Gareth Barry",
        choiceB : "David James",
        choiceC : "Emile Heskey",
        choiceD : "Frank Lampard",
        correct : "A",
    },{
        question : "Which team recorded the Fewest PL home wins in a season in the 2005/06 season?",
        imgSrc : "",
        choiceA : "Charlton",
        choiceB : "Aston Villa",
        choiceC : "West Brom",
        choiceD : "Sunderland",
        correct : "D",
    },{
        question : " Arsenal have recorded 0 PL away defeats in a season, in 2003/04 and which other season? ",
        imgSrc : "",
        choiceA : "1999/2000",
        choiceB : "2001/02",
        choiceC : "2004/05",
        choiceD : "2002/03",
        correct : "B",
    },{
        question : " Manchester Utd have recorded the Biggest PL home win in 1995 against Ipswich Town, what was the score?",
        imgSrc : "",
        choiceA : "8-2",
        choiceB : "6-0",
        choiceC : "7-1",
        choiceD : "9-0",
        correct : "D",
    },{
        question : " Which Liverpool player has the most All-Time wins for the club with 264? ",
        imgSrc : "",
        choiceA : "Jamie Carragher",
        choiceB : "Steven Gerrard",
        choiceC : "Jordan Henderson",
        choiceD : "Pepe Reina",
        correct : "A",
    },{
        question : " In the 2005/2006 season hwo many home wins did Chelsea record in the PL? ",
        imgSrc : "",
        choiceA : "20",
        choiceB : "19",
        choiceC : "18",
        choiceD : "17",
        correct : "C",

    }

];

// create variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }

}

// counter render

function renderCounter() {
    if (count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
                clearInterval(TIMER);
                scoreRender();
            }
        }
}

function checkAnswer(answer) {
    if (answer === questions[runningQuestion].correct) {
        score++
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";

}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";

}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100*score/questions.length);

    let img = (scorePerCent >= 80) ? "image/5.png" :
        (scorePerCent >= 60) ? "image/4.png" :
            (scorePerCent >= 40) ? "image/3.png" :
                (scorePerCent >= 20) ? "image/2.png" :
                    "image/1.png";

    scoreDiv.innerHTML = "<img src= "+ img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p> ";

}

