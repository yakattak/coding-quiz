var questionBoxEl = document.querySelector(".question-container");
var questionPhraseEl = document.querySelector(".question-phrase")


var timerEl = document.getElementById('countdown');
var timeInit = 75;
questionBank = [
  question1 = {
    question: "this is the question 1",
    choices : {
        choice1 : [true, "this is choice 1"],
        choice2 : [false, "this is false choice 1"],
        choice3 : [false, "this is false choice 2"],
        choice4 : [false, "this is false choice 3"],
        }, 
        
   },
   question1 = {
    question: "this is the question 2",
    choices : {
        choice1 : [true, "this is choice 1"],
        choice2 : [false, "this is false choice 1"],
        choice3 : [false, "this is false choice 2"],
        choice4 : [false, "this is false choice 3"],
        }, 
        
   },
];
//Timer Countdown

function readButton(event) {
    event.preventDefault();
    var targetEl = event.target;
    
  //begin quiz if start button clicked ELSE check if true button clicked

    if (targetEl.matches("#start-button")) {
        beginquiz(targetEl);

    
} else {
    if (targetEl.getAttribute("trueOrfalse") === "true") {
        console.log("true");
        questionNum = questionNum + 1;
        choiceListEl = document.querySelector ("ul");
        choiceListEl.remove();
        loadQuestion();
    } else {
        //false chosen: stop timer and create time penalty
        setTimer(mystopFunction());;
        newTime = window.value - 5;
        setTimer(newTime);
        
        
}
}
}

//function to start timer and begin quiz
var beginquiz = function(targetEl) {
    

        setTimer(timeInit);

        targetEl.remove();
        questionNum = 0;
        loadQuestion();
}

///create questions from array
var createQuestionForm = function(questionNum) {
    questionPhraseEl.textContent = questionBank[questionNum].question;
    var choiceListEl = document.createElement("ul");
    questionBoxEl.appendChild(choiceListEl);

    for (i in questionBank[questionNum].choices) {
        truth = questionBank[questionNum].choices[i][0];
        choiceBtn = document.createElement("button");
        choiceBtn.textContent = questionBank[questionNum].choices[i][1];
        choiceBtn.setAttribute("trueORfalse", truth );
        choiceListIt = document.createElement("li");
        choiceListEl.appendChild(choiceListIt);
        choiceListIt.appendChild(choiceBtn);
        
        

    }
    
    
}

//cycle through question array
var loadQuestion = function() {
    createQuestionForm(questionNum)

  
}

var setTimer = function(timeLeft) {
        
        var timeInterval = setInterval(function() {
            if (timeLeft >=0) {
                timerEl.textContent = " Time Left: " + timeLeft;
                timeLeft--;                
                window.value = timeLeft;
                
            } else {
                gameOver();
            }

            
            
        }, 1000);

        mystopFunction = function() {
            clearInterval (timeInterval);
        };

        

    }

//function to start quiz
questionBoxEl.addEventListener("click", readButton);

//gameOver function
gameOver = function() {}


