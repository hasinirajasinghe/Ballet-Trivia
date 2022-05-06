// FUNCTIONALITY OF THE GAME 

// PSEUDOCODE

// 1st View 
// Contains Start Button and How to Play 
    // If start button is clicked:
        // The contents of the div container should clear out and the new contents of 2nd view should be added 
    // Else if How to Play is clicked:
        // A pop up of some sort should show the instructions for the game

// 2nd View 
// Contains the levels View 
    // If player clicks on one out of the six levels, prompt the first question from the randomize list of questions.

// 3rd View and onwards 
// Questions and answers view
    // Display one question at a time with four choices for the chosen level
        // If player clicks on a choice
            // If player choice === correct choice
                // Increment score by 1    
            // Move on to the next question 
    
// 4th View 
// Contains results from each round 
    // Show the final score of the player
    // Display a encouraging message
    // Show which questions were correctly answered and incorrectly answered 
    // Show a restart button to take the player back to the main page 

// 5th View
// Contains the score history from each game
    // Will show the score of every game
    // If the player wants to clear the scores history (insert button)
    // Show 'play again' to take the player back to the main view
    
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// Global variable declarations 

let questionSet = [];   
let questionIndex = 0; 
let scoreHistory = []
let gameNumber = 1;

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// Selecting, creating and manupulating elements via DOM 

// Selecting elements via DOM 
let mainContainer = document.getElementById('main-container');
let mainHeader = document.getElementById('main-header');
let startButton = document.getElementById('start');
let howToPlayButton = document.getElementById('how-to-play');
let returnButton = document.createElement('button')
let instructions = document.createElement('div');
let levelsHeader = document.createElement('h1');
let question = document.createElement('div');
let choicesContainer = document.createElement('div');
let choice1 = document.createElement('div');
let choice2 = document.createElement('div');
let choice3 = document.createElement('div');
let choice4 = document.createElement('div');
let scoreContainer = document.createElement('div');
let scoreSpan = document.createElement('span');
let displayMessage = document.createElement('div');
let results = document.createElement('div');
let resetButton = document.createElement('button');
let scoreHistoryHeader = document.createElement('h1');
let scoreHistoryButton = document.createElement('button');
let scoreHistoryContainer = document.createElement('div');
let clearScoreHistoryButton = document.createElement('button');

// Adding IDs and Classes to elements 
instructions.id = 'instructions';
returnButton.id = 'return-button';
levelsHeader.className = 'h1';
question.id = 'question';
choicesContainer.id = 'choices-container';
choice1.className = 'choices';
choice2.className = 'choices';
choice3.className = 'choices';
choice4.className = 'choices';
scoreContainer.id = 'score-container';
scoreSpan.id = 'score';
displayMessage.id = 'display-message';
results.id = 'results';
resetButton.id = 'reset-button';
scoreHistoryHeader.id = 'score-history-header';
scoreHistoryButton.id = 'score-history';
scoreHistoryContainer.id = 'score-history-container';
clearScoreHistoryButton.id = 'clear-score-history-button';

// Adding event listeners
startButton.addEventListener('click', startTheGame);
howToPlayButton.addEventListener('click', howToPlay);
returnButton.addEventListener('click', returnToMainPage);
resetButton.addEventListener('click', reset);
scoreHistoryButton.addEventListener('click', showScoreHistory);
clearScoreHistoryButton.addEventListener('click', clearScoreHistory);
choice1.addEventListener('click', checkAnswerAndDisplayQuestion);
choice2.addEventListener('click', checkAnswerAndDisplayQuestion);
choice3.addEventListener('click', checkAnswerAndDisplayQuestion);
choice4.addEventListener('click', checkAnswerAndDisplayQuestion);

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// FIRST VIEW: GAME START AND HOW TO PLAY

// When invoked will return the user to the main page 
function returnToMainPage(){
    mainContainer.replaceChildren();
    mainContainer.className = 'main-container-start-page';
    setTimeout(function(){
        startButton.id = "start";
        howToPlayButton.id = "how-to-play";
        mainContainer.append(mainHeader, startButton, howToPlayButton);
    }, 750);
}

// When the start button is clicked on, content of the first view is cleared and content of the second view is built on 
function startTheGame() {
    mainContainer.replaceChildren();
    // Begining of creating the second view: Showing the user the different levels of difficulty
    mainContainer.className = 'main-container-levels-page';
    levelsHeader.innerHTML = "Levels"
    // Load the levels page elements after the UI is done transitioning to a bigger view
    setTimeout(function(){
        mainContainer.append(levelsHeader);

        // List of level names 
        const levelNames = [
            'Grade 1',
            'Grade 2',
            'Grade 3',
            'Grade 4',
            'Grade 5',
            'Major Grades'
        ]

        //For each level, creates a new level button and add it to the main view
        levelNames.forEach((levelName) => {
            let newLevelButton = document.createElement('button');
            newLevelButton.id = "new-level-button";
            newLevelButton.innerHTML = levelName;
            newLevelButton.addEventListener('click', levelSelect);
            mainContainer.append(newLevelButton);
            // Adding a return button in case the user would like to refer back to instructions 
            returnButton.innerHTML = "RETURN";
            mainContainer.append(returnButton);
        }); 
    }, 1000);
};

// Instructions view 
function howToPlay() {
    mainContainer.replaceChildren();
    mainContainer.className = 'main-container-how-to-play-page';
    setTimeout(function(){
        // Importing the message from the instructions-and-display-messages file 
        instructions.innerHTML = messages.gameInstructions;
        returnButton.innerHTML = "RETURN";
        mainContainer.append(instructions, returnButton);
    }, 1000);
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// SECOND VIEW: LEVEL SELECTION

// When one of the level buttons is clicked this fuction is called on
function levelSelect(e) {
    let level = e.target;
    // Load the appropriate question based the button that was clicked and store in the global variable
    // Content for the question set is imported from the questions-and-answers file
    switch (level.innerHTML) {
        case 'Grade 1':
            questionSet = grade1;
            break;
        case 'Grade 2':
            questionSet = grade2;
            break;
        case 'Grade 3':
            questionSet = grade3;
            break;
        case 'Grade 4':
            questionSet = grade4;
            break;
        case 'Grade 5':
            questionSet = grade5;
            break;
        case 'Major Grades':
            questionSet = majorGrades;
            break;        
    }
    // Randomize question set before question view is set up
    questionSet.sort(() => (Math.random() > .5) ? 1 : -1);
    setUpQuestionView();
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// THIRD VIEW: DISPLAY QUESTIONS AND CHOICES

function setUpQuestionView() {
    // Clears the levels view of the game
    mainContainer.replaceChildren();
    // Displays score header
    scoreContainer.innerHTML = 'Score: ';
    
    // Setting inital score to 0 and storing it inside the span
    scoreSpan.innerHTML = 0;
    scoreContainer.appendChild(scoreSpan);
    // Adding the newly created containers, questions and choices to the main container
    mainContainer.append(scoreContainer, question, choicesContainer);
    choicesContainer.append(choice1, choice2, choice3, choice4);

    // Invoke to display the very first question after level selection
    displayQuestion();
}

// Invoked upon user input of an answer to a question
function checkAnswerAndDisplayQuestion(e) {
    // Pass it to check anwer only because we need to know what the user clicked before moving on the next question
    checkAnswer(e);
    // Displays the next questiog
    displayQuestion();
}

// Check correct answer against the provided correct answet in the questions set object
function checkAnswer(e) {
    let currentChoice = e.target;
    if (currentChoice.innerHTML === questionSet[questionIndex].correctAnswer) {
        scoreSpan.innerHTML++;
        // Adding a new property to the question-set object, to keep track of correct and incorrect questions in the order the user is answering them
        questionSet[questionIndex].correctlyAnswered = true;
    } else {
        questionSet[questionIndex].correctlyAnswered = false;
    }
    // Increments to display the next questions after answer has been checked
    questionIndex++;
}

// Displays questions and choices when invoked
function displayQuestion() {
        if (questionIndex >= questionSet.length) {
            displayResults();
            return;
        }
        let currentQuestion = questionSet[questionIndex]
        question.innerHTML = currentQuestion.question;
        // To randomize the choices 
        currentQuestion.choices.sort(() => (Math.random() > .5) ? 1 : -1);
        choice1.innerHTML = currentQuestion.choices[0];
        choice2.innerHTML = currentQuestion.choices[1];
        choice3.innerHTML = currentQuestion.choices[2];
        choice4.innerHTML = currentQuestion.choices[3];
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// FOURTH VIEW: DISPLAY FINAL SCORE, MESSAGE, RESULTS, SCORE HISTORY AND RESET BUTTON 

// When invoked clears content of the current view diaplys the final score, a message, results and reset button.
function displayResults() {
    updateScoreHistory();
    mainContainer.replaceChildren();
    scoreContainer.innerHTML = "Final Score: ";
    scoreContainer.appendChild(scoreSpan)
    // Importing the messages from the instructions-and-display-messages file 
    if (parseInt(scoreSpan.innerHTML) === 5) {
        displayMessage.innerHTML = messages.winningMessage;
    } else {
        displayMessage.innerHTML = messages.encouragingMessage;
    }
    // Matching questions with users answers before appending to the display
    questionSet.forEach((q) => {
        let eachAnswer = document.createElement('div');
        eachAnswer.className = 'each-answer';
        eachAnswer.append(q.question);
        // Check whether the answer is correct or incorrect and create an element with the correct icon (check-mark or cross-mark)
        if (q.correctlyAnswered) {
            let checkMark = document.createElement('img');
            checkMark.src = './assets/images/check-mark.png';
            eachAnswer.append(checkMark);
            checkMark.id = 'check-mark';
        } else {
            let crossMark = document.createElement('img');
            crossMark.src = './assets/images/cross-mark.png';
            eachAnswer.append(crossMark);
            crossMark.id = 'cross-mark';
        }
        results.append(eachAnswer);
    })
    resetButton.innerHTML = "PLAY AGAIN";
    scoreHistoryButton.innerHTML = "SHOW SCORE HISTORY";
    mainContainer.append(scoreContainer, displayMessage, results, resetButton, scoreHistoryButton);
}

// Resets the game 
function reset() {
    questionSet = [];
    questionIndex = 0;
    scoreSpan.innerHTML = 0;
    gameNumber++;
    results.replaceChildren();
    returnToMainPage();
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// FIFTH VIEW: SCORE HISTORY

// Update score history by creating a new object to store game round number and the final score
function updateScoreHistory() {
    let score = {
        game: gameNumber,
        scoreValue: parseInt(scoreSpan.innerHTML)
    }
    scoreHistory.push(score);
}

// Clears the whole score history when invoked 
function clearScoreHistory() {
    scoreHistory = [];
    // To refresh the view otherwise it'll keep showing the current view
    showScoreHistory();
}

// Displays score histoy and choices to reset the game or clear the history
function showScoreHistory() {
    mainContainer.replaceChildren();
    // Because the score history container is repopulated every round, the previous history needs to be cleared 
    scoreHistoryContainer.replaceChildren();
    mainContainer.className = 'main-container-score-history-page';
    setTimeout(function(){
        scoreHistoryHeader.className = 'h1';
        scoreHistoryHeader.innerHTML = "Score History";
        clearScoreHistoryButton.innerHTML = "CLEAR SCORES"
        scoreHistory.forEach((score) => {
            let scoreDiv = document.createElement('div');
            scoreDiv.innerHTML = `Game ${score.game} - ${score.scoreValue} Point(s)`;
            scoreHistoryContainer.append(scoreDiv);
        })
        mainContainer.append(scoreHistoryHeader, scoreHistoryContainer, resetButton, clearScoreHistoryButton)
    }, 750);
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// RESOURCES 

// Randomize questions and choices code block
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#comment91985653_2450954