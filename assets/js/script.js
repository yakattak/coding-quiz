var questionBoxEl = document.querySelector(".question-container");

var timerEl = document.getElementById('countdown');
var setTimer = 75;

//Timer Countdown

function readButton(event) {
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
        loadQuestions();
}

var loadQuestions = function() {
    
}


//function to start quiz
questionBoxEl.addEventListener("click", readButton);