var existingScoresEl;   
var submitScoreEl = document.getElementById('submitScore')
var scoreEl = document.getElementById('score')
var formDivEl = document.getElementById("form")
var highScoresEl = document.getElementById("highscores")

var scoreIdCounter = 0;
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var hsBtn = document.getElementById('hsbtn');
var homeEl = document.getElementById('home');
var quizEl = document.getElementById('quiz')
var highScores = [];

//Timer variabeles
var timeInterval;
var timerEl = document.getElementById('countdown');
var timeLeft;
//Question variable
var questionEl = document.getElementById('question');
var answersEl = document.getElementById("answerContainer");
var score;
var currentQuestion = 0;
var resultEl = document.getElementById('result');

var scoreListEl = document.getElementById('score-list')

//Array of objects for Q & As for my quiz
var questions = [
    {
        Q: "Commonly used data types DO Not Include:", 
        answers: [
            'strings',
            'booleans',
            'alerts',
            'numbers'
        ], 
        correctAnswer: 2
            
    },
    {
        Q: "The condtion in an if/else statement is enclosed with ______.", 
        answers: [
            'quotes',
            'curly brackets',
            'parenthesis',
            'square brackets'
        ], 
        correctAnswer: 2
            
    },
    {
        Q: "Arrays in JavaScript can be sued to store 3.", 
        answers: [
            'numbers and strings',
            'other arrays',
            'booleans',
            'all of the above'
        ], 
        correctAnswer: 3
            
    },
    {
        Q: "String values must be enclosed within___ when being assigned to varables.", 
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ],
        correctAnswer: 2
            
    },
    {
        Q: "A very useful tool used durinig development adn debugging for printing content to the debugger is:", 
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correctAnswer: 3
    },
];
    
function main(){
    homeEl.setAttribute("class","hidden")
    quizEl.removeAttribute("class") 
    highScoresEl.setAttribute("class","hidden")
    quiz();
    countdown();
}
// Timer that counts down from 10 minutes
function countdown() {
    // console.log("TIMER IS STARTING NOW")
    timeLeft = 60;
    timerEl.textContent = timeLeft;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    clearInterval(timeInterval);
    timeInterval = setInterval(function() { 
        if (timeLeft > 0){
            timerEl.textContent = --timeLeft;
            score = timeLeft;
            return score;
        }else{
            clearInterval(timeInterval);
            timerEl.textContent = "";
            endQuiz();
        }
        //
    }, 1000);
    
}

//get question
function quiz (){
    questionEl.textContent = questions[currentQuestion].Q;
    questions[currentQuestion].answers.forEach(function (answers,i)
            {
                var answerButton = document.createElement("button");
                answerButton.setAttribute("class","btn");
                answerButton.setAttribute("id", [i]);
                answerButton.textContent = answers;
                answerButton.onclick = function(){
                    result.innerHTML=""
                    checkAnswer();
                }
                // console.log(answersEl);
                answersEl.appendChild (answerButton);
                // console.log();
            }
        )
}

function checkAnswer(){
    // console.log(questions[currentQuestion].correctAnswer, event.target.id)
    if(
        (questions[currentQuestion].correctAnswer == event.target.id)
    ){
        var result = document.createElement("p")
        result.textContent = "Correct!";
        resultEl.appendChild (result)
    }else {
        result = document.createElement("p")
        result.textContent = "Wrong!";
        resultEl.appendChild (result)
        timeLeft -= 10;
    }
    userAnswer()
}

function userAnswer(){
    if(currentQuestion < questions.length-1){
        currentQuestion++
        answersEl.innerHTML=""
        quiz()
    }else{
        endQuiz();
    }
}

function endQuiz(){
    clearInterval(timeInterval);
    quizEl.setAttribute("class","hidden");
    scoreEl.removeAttribute("class");
    formDivEl.removeAttribute("class");
    scoreEl.append(score);
    console.log(score);
}

function formSubmit(){
    var scoreInitials = document.getElementById('initials').value.trim();

    if(!scoreInitials){
        window.confirm("You must enter your initals to store your score.");

        }else{
        enterScore(scoreInitials);
    }
}

function enterScore(scoreInitials){
    highScoresEl.removeAttribute('class');
    highScoresEl.setAttribute('class','highscores');
    mainEl.removeAttribute('class');
    scoreEl.setAttribute('class', 'hidden');
    formDivEl.setAttribute('class', 'hidden');

    var scoreDataObj={
        initials: scoreInitials,
        quizScore: score
    }
    scoreDataObj.id = scoreIdCounter;

    highScores.push(scoreDataObj);
    localStorage.setItem("highScores",JSON.stringify(highScores))
    scoreIdCounter++;    

    createScoreEl(scoreDataObj);
}

var loadScores = function(){

    existingScoresEl = JSON.parse(localStorage.getItem("highScores")||'[]');

    //display the scores on the page
    console.log(existingScoresEl);

    //run a for loop to populate the scores by running the enterScore function.
    for (var i = 0; i < existingScoresEl.length; i++) {
        highScores.push(existingScoresEl[i]);
        scoreIdCounter++;
    } 
}

var createScoreEl = function(scoreDataObj){
    console.log("this is calling the createScoreEl");
    var listItemEl = document.createElement("li");
    //this applies the CSS to the element that gets added to the DOM
    listItemEl.className = "score-item"; 
    // add task id as a custom attribute
    listItemEl.setAttribute("data-score-id", scoreIdCounter);
    
    var scoreInfoEl = document.createElement("div");
    // give it a class name
    scoreInfoEl.className = "score-info";
    // add HTML content to div
    scoreInfoEl.innerHTML = "<h3 class='score-name'>" + scoreDataObj.initials + "</h3><span class='score-type'>" + scoreDataObj.quizScore + "</span>";

    listItemEl.appendChild(scoreInfoEl);
    scoreListEl.appendChild(listItemEl);    

    scoreDataObj.id = scoreIdCounter;

    highScores.push(scoreDataObj);

    loadScores();
}

// var hsPage = function(){
//     existingScoresEl = JSON.parse(localStorage.getItem("highScores")||'[]');
//     //display the scores on the page
//     console.log(existingScoresEl);

//     //run a for loop to populate the scores by running the enterScore function.
//     for (var i = 0; i < existingScoresEl.length; i++) {
//         highScores.push(existingScoresEl[i]);
//         scoreIdCounter++;
//     } 
//     mainEl.setAttribute('class','hidden');
//     highScoresEl.removeAttribute('class');
//     highScoresEl.removeAttribute('class','highscores');
//     scoreEl.setAttribute('class', 'hidden');
//     formDivEl.setAttribute('class', 'hidden');
//     // var localStorageData = JSON.parse(localStorage.getItem("highScores"));

//     var scoreInitials = document.getElementById('initials').value.trim();
//     var scoreDataObj={
//         initials: scoreInitials,
//         quizScore: score
//     }
//     scoreDataObj.id = scoreIdCounter;

//     highScores.push(scoreDataObj);
//     localStorage.setItem("highScores",JSON.stringify(highScores))
//     scoreIdCounter++;    

//     createScoreEl(scoreDataObj);
// }

startBtn.onclick = main;
hsBtn.onclick = enterScore;
submitScoreEl.onclick = formSubmit;
loadScores()