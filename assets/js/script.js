var questionBoxEl = document.querySelector(".question-container");
var questionPhraseEl = document.querySelector(".question-phrase")
var highScores = [];

var timerEl = document.getElementById('countdown');
var timeInit = 15;

//create a quesiton bank
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
   question1 = {
    question: "this is the question 3",
    choices : {
        choice1 : [true, "this is choice 1"],
        choice2 : [false, "this is false choice 1"],
        choice3 : [false, "this is false choice 2"],
        choice4 : [false, "this is false choice 3"],
        }, 
        
   },
   question1 = {
    question: "this is the question 4",
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
    console.log(event.target);
    event.preventDefault();
    var targetEl = event.target;
    
  //begin quiz if start button clicked ELSE check if true button clicked

    if (targetEl.matches("#start-button")) {
        beginquiz(targetEl);

    
} else if (targetEl.matches(".submit-score")) {
    submitScore();
}else {
    if (targetEl.getAttribute("trueOrfalse") === "true") {
        console.log("true");
        questionNum = questionNum + 1;
        choiceListEl = document.querySelector ("ul");
        //remove old question
        choiceListEl.remove();
        //load new question
        loadQuestion();
    } else if (targetEl.getAttribute("trueOrfalse") === "false")  {
        //false chosen: stop timer and create time penalty
        setTimer(mystopFunction());;
        newTime = window.value - 5;
        if (newTime <1) {
            newTime = 1;
        }
        setTimer(newTime);
    }
        

}
}

//function to start timer and begin quiz
var beginquiz = function(targetEl) {
    

        setTimer(timeInit);
// clear element for questions
        targetEl.remove();
        questionNum = 0;
        loadQuestion();
}

///create questions from array
var createQuestionForm = function(questionNum) {
    questionPhraseEl.textContent = questionBank[questionNum].question;
    var choiceListEl = document.createElement("ul");
    questionBoxEl.appendChild(choiceListEl);

    //loop through question bank to create buttons for choices
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
    //check if there are questions left
    if (questionNum < questionBank.length) {
    createQuestionForm(questionNum)
    //if no questions game over increase window value to match timer on page
    } else {
        window.value = window.value + 1;
        setTimer(mystopFunction());
        console.log("no more questions");
        console.log("time left is " + window.value);
        gameOver();
    }

  
}

//timer function
var setTimer = function(timeLeft) {
        
        var timeInterval = setInterval(function() {
            if (timeLeft >0) {
                timerEl.textContent = " Time Left: " + timeLeft;
                timeLeft--;
                //to match window value with timeLeft displayed                
                window.value = timeLeft;
                //if run out of time gameover
            } 
            if (timeLeft === 0) {
                timerEl.textContent = "Time Left: 0";
                //stop window.value
                timeLeft = -1;
                choiceList = document.querySelector("ul");
                choiceList.remove();
                gameOver();
                      
            }
            
            
        }, 1000);
        // function to stop the timer from running
        mystopFunction = function() {
            clearInterval (timeInterval);
        };

        

    }



//gameOver function
gameOver = function() {
    console.log("game over");
    highScoreList();
}

highScoreList = function() {
    //create container for name
    questionPhraseEl.textContent = "Challenge over, your score is " + window.value;
    inputDiv = document.createElement("div");
    inputEl = document.createElement ("input");
    inputEl.setAttribute("placeholder", "Enter Your Name");
    inputDiv.appendChild(inputEl);
    submitBtn = document.createElement("button")
    submitBtn.textContent = "Submit Score";
    submitBtn.setAttribute("class", "submit-score");
    inputDiv.appendChild(submitBtn);
    questionPhraseEl.appendChild(inputDiv);

    
}
//player submit score
submitScore = function() {
    console.log("you hit the thing");
    playerName = document.querySelector("input").value;
    
    if (playerName === "" || playerName === null) {
        console.log("comeon");
    }
    else {
        console.log(playerName);
        highScores.push(playerName);
        highScores.push(window.value);
        saveHighScore(highScores);
        console.log(highScores);
       
    }
    

}

//show list with high scores
var showHighScores = function() {
    console.log(highScores);

}


///save and get highscores



  
var saveHighScore = function(highScores) {
    localStorage.setItem("highScores", JSON.stringify(highScores));
};

var loadHighScore = function() {
  var Scores = localStorage.getItem("highScores");
  // if there are no scoresn
  if (!Scores) {
    return false;
  }
  console.log("high scores found!");
  
  Scores = JSON.parse(Scores);
  console.log(Scores);
  highScores = Scores;


};

//function to start quiz
questionBoxEl.addEventListener("click", readButton);

loadHighScore();
console.log(highScores);