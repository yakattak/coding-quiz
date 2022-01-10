var questionBoxEl = document.querySelector(".question-container");
var questionPhraseEl = document.querySelector(".question-phrase")
var highScores = [];

var timerEl = document.getElementById('countdown');
var timeInit = 75;

//create a quesiton bank
questionBank = [
  question1 = {
    question: "What is the command we use to create a new file?",
    choices : {
        choice1 : [false, "mkdir"],
        choice2 : [false, "pwd"],
        choice3 : [true, "touch"],
        choice4 : [false, "cd"],
        }, 
        
   },
   question2 = {
    question: "What are the steps to create a new remote repository and then connect it to our local machine?",
    choices : {
        choice1 : [false, "First, we create a new repository with a new README file on GitHub. Then, we select the SSH option to clone the repository. Last, we use the git command 'git pull' followed by the SSH key we copied."],
        choice2 : [false, "First, we create a new repository on GitHub. Next, we copy the URL of the repository from the address bar. Last, we use the git command 'git pull' to pull down the remote repository on to our local machine."],
        choice3 : [false, "First, we create a new repository on GitHub. Next, we copy the URL of the repository. Last, we use the git command 'git clone' followed by the URL we copied."],
        choice4 : [true, "First, we create a new repository with a new README file on GitHub. Then, we select the HTTPS or SSH option to copy the URL to clone the repository. Last, we use the git command 'git clone' followed by the URL we copied on our local machine."],
        }, 
        
   },
   question3 = {
    question: "Given the following CSS selector, which HTML element would be the outermost/parent element? header nav ul li { color: white;",
    choices : {
        choice1 : [false, "<ul>"],
        choice2 : [true, "<header>"],
        choice3 : [false, "<nav>"],
        choice4 : [false, "<li>"],
        }, 
        
   },
   question4 = {
    question: "What are HTML semantic elements? ",
    choices : {
        choice1 : [false, "Semantic elements are outdated and are no longer used in HTML."],
        choice2 : [false, "Semantic elements, like `<div>`, hold the important content together so it's easy to understand."],
        choice3 : [true, "A semantic element clearly describes its meaning to both the browser and the developer."],
        choice4 : [false, "A semantic element reveals nothing about its content to the browser or the developer."],
        }, 
        
   },
   question5 = {
    question: "What CSS declaration could you add to `<div style='width: 50%;'>` to center it? ",
    choices : {
        choice1 : [true, "margin: 0 auto"],
        choice2 : [false, "float: center"],
        choice3 : [false, "align: center"],
        choice4 : [false, "text-align: center"],
        }, 
        
   },
   question6 = {
    question: "What is a pseudo-class?    ",
    choices : {
        choice1 : [false, "A CSS rule that contains no declarations."],
        choice2 : [false, "A CSS declaration that hides the element."],
        choice3 : [false, "An element that has more than one class."],
        choice4 : [true, "A CSS keyword to target an element's state."],
        }, 
        
   },
   question7 = {
    question: "What is an example of a pseudo-element?",
    choices : {
        choice1 : [false, "::before"],
        choice2 : [false, "::after"],
        choice3 : [false, "::first-letter"],
        choice4 : [true, "All of the above."],
        }, 
        
   },
];
//Timer Countdown

function readButton(event) {
    console.log(event.target);
    event.preventDefault();
    var targetEl = event.target;
    
  //begin quiz if start button clicked 

    if (targetEl.matches("#start-button")) {
        beginquiz(targetEl);

    
        }
        //submit score if submit score button is clicked
     if (targetEl.matches(".submit-score")) {
    submitScore();
        }
        //clear scores if clear score is picked
    if (targetEl.matches(".clear-scores")) {
        localStorage.setItem("highScores", JSON.stringify([]));
    }
        //reload page if retry quiz is picked
    if(targetEl.matches(".restart")) {
        location.reload();
    }


// if button click is related to a question
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

            //endgame if time left is 0
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

//create option to add name to high score list
highScoreList = function() {
    //create container for name
    questionPhraseEl.textContent = "Challenge over, your score is " + window.value;
    inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "submit-score");
    inputEl = document.createElement ("input");
    inputEl.setAttribute("placeholder", "Enter Your Name");
    inputDiv.appendChild(inputEl);
    submitBtn = document.createElement("button")
    submitBtn.textContent = "Submit Score";
    submitBtn.setAttribute("class", "submit-score");
    inputDiv.appendChild(submitBtn);
    questionPhraseEl.appendChild(inputDiv);

    
}
//what to do if submit score button is clicked
submitScore = function() {
    console.log("you hit the thing");
    playerName = document.querySelector("input").value;
    
    if (playerName === "" || playerName === null) {
        console.log("comeon");
    }
    else {
        console.log(playerName);
        playerScore = [];
        playerScore.push(window.value);
        playerScore.push(playerName);
        highScores.push(playerScore);
        saveHighScore(highScores);
        showHighScores();
       
    }
    

}

//show list with high scores
var showHighScores = function() {
    deleteContent = document.querySelector(".submit-score");
    console.log(deleteContent);
    deleteContent.remove();
    questionPhraseEl.textContent = "High Score List";
    scoreListEl = scoreListEl = document.createElement("ul")
    
// loop high score list and add to page
    for (i in highScores) {
        scoreListItem = document.createElement("li");
        scoreListItem.textContent = highScores[i][1] + " " + highScores[i][0];
        scoreListEl.appendChild(scoreListItem);
        questionPhraseEl.appendChild(scoreListEl);
        
    }
    // create buttons to restart quiz OR clear high scores
    var restartBtn = document.createElement("button");
    var clearHighscores = document.createElement("button");

    var buttonsDiv = document.createElement("div");
    restartBtn.textContent = "Retry Quiz";
    clearHighscores.textContent = "Clear High Scores";
    clearHighscores.setAttribute("class", "clear-scores")
    restartBtn.setAttribute("class", "restart");
    buttonsDiv.appendChild (restartBtn);
    buttonsDiv.appendChild(clearHighscores);
    questionPhraseEl.appendChild(buttonsDiv);



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
//load old scores
loadHighScore();
