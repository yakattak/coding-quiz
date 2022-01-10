var questionBoxEl = document.querySelector(".question-container");
var questionPhraseEl = document.querySelector(".question-phrase")
var choiceListEl = document.querySelector(".choice-list");

var timerEl = document.getElementById('countdown');
var setTimer = 75;
questionBank = [
  question1 = {
    question: "this is the question",
    choices : {
    correct: "this is choice 1",
    false1: "this is false choice 1",
    false2: "this is false choice 2",
    false3: "this is false choice 3",
        }, 
    },
];
//Timer Countdown

function readButton(event) {
    event.preventDefault();
    var targetEl = event.target;
    
  //begin quiz if start button clicked

    if (targetEl.matches("#start-button")) {
        beginquiz(targetEl);
}
}

//function to start timer and begin quiz
var beginquiz = function(targetEl) {
    

        var timeLeft = setTimer;
        var timeInterval = setInterval(function() {
            if (timeLeft >0) {
                timerEl.textContent = " Time Left: " + timeLeft;
                timeLeft--;
            } 
            
        }, 1000);
        targetEl.remove();
        questionNum = 0;
        loadQuestion();
}

var createQuestionForm = function(questionNum) {
    for (i in questionBank[questionNum].choices) {
        console.log("yeet");

    }
    
}

var loadQuestion = function() {
    
    createQuestionForm(questionNum)

  
}


//function to start quiz
questionBoxEl.addEventListener("click", readButton);