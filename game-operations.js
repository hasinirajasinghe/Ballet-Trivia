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
    // If player clicks on one out of the six levels, prompt the first question from the radomized list of questions.

// 3rd View and onwards 
// Questions and answers view
    // Display one question at a time with four choices for the chosen level
        // If player clicks on a choice
            // If player choice === correct choice
                // Increment score by 1    
            // Move on to the next question 
    
// Last View 
// Contains results from each round 
    // Will display a encouraging message or you won message
    // Will show the final score of the player
    // Will which questions were correctly answered and incorrectly answered 
    // Show a restart button to take the player back to the main page 
    
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// Global variable declarations 

let questionSet;   
let questionIndex = 0; 

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// Selecting, creating and manupulating elements via DOM 

// Selecting elements via DOM 
let mainContainer = document.getElementById('main-container');
let mainHeader = document.getElementById('main-header')
let startButton = document.getElementById('start');
let howToPlayButton = document.getElementById('how-to-play');
let returnButton = document.createElement('button')
let instructions = document.createElement('div');
let levels = document.createElement('h1');
let question = document.createElement('div');
let choicesContainer = document.createElement('div');
let choice1 = document.createElement('div');
let choice2 = document.createElement('div');
let choice3 = document.createElement('div');
let choice4 = document.createElement('div');
let scoreContainer = document.createElement('div')
let scoreSpan = document.createElement('span');
let displayMessage = document.createElement('div')
let results = document.createElement('div')
let resetButton = document.createElement('button')

// Adding IDs and Classes to elements 
instructions.id = "instructions";
returnButton.id = "return-button"
levels.className = "h1"
question.id = "question";
choicesContainer.id = "choices-container";
choice1.className = 'choices';
choice2.className = 'choices';
choice3.className = 'choices';
choice4.className = 'choices';
scoreContainer.id = "score-container"
scoreSpan.id = "score"
displayMessage.id = "display-message";
results.id = "results";
resetButton.id = "reset-button";

// Adding event listeners
startButton.addEventListener('click', startTheGame);
howToPlayButton.addEventListener('click', howToPlay);

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// FIRST VIEW: GAME START OR HOW TO PLAY

// When invoked returns to the main page 
function returnToMainPage(){
    mainContainer.replaceChildren();
    mainContainer.className = "main-container-start-page";
    startButton.id = "start"
    howToPlayButton.id = "how-to-play"
    // scoreSpan.innerHTML = 0;
    mainContainer.append(mainHeader, startButton, howToPlayButton)
}

function startTheGame() {
// When the start button is clicked on 
    // Clears the initial view of the game 
    mainContainer.replaceChildren();
    // Begining of creating the second view of different levels in the game
    mainContainer.className = "main-container-levels-page";
    levels.innerHTML = "Levels"
    // Load the other level page elements after the UI is done transitioning to a bigger view
    setTimeout(function(){
        mainContainer.append(levels)

        const levelNames = [
            'Grade 1',
            'Grade 2',
            'Grade 3',
            'Grade 4',
            'Grade 5',
            'Major Grades'
        ]

        //For each level, creates a new level button and adds it to the main view
        levelNames.forEach((levelName) => {
            let newLevelButton = document.createElement('button');
            newLevelButton.id = "new-level-button";
            newLevelButton.innerHTML = levelName;
            newLevelButton.addEventListener('click', levelSelect);
            mainContainer.append(newLevelButton);
            //TODO: Create a new style class to format the buttons
        }); 
    }, 1000);
};

function howToPlay() {
    mainContainer.replaceChildren();
    mainContainer.className = "main-container-how-to-play-page"
    instructions.innerHTML = messages.gameInstructions
    returnButton.innerHTML = "Return"
    mainContainer.append(instructions, returnButton)
    returnButton.addEventListener('click', returnToMainPage)
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// SECOND VIEW: LEVEL SELECTION

// When one of the level buttons is clicked this fuction is called on
function levelSelect(e) {
    let level = e.target;
    // Load the appropriate question based the button that was clicked and store in the global variable
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
    // Randomize question set
    questionSet.sort(() => (Math.random() > .5) ? 1 : -1);
    setUpQuestionView()
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// THIRD VIEW: DISPLAY QUESTIONS AND CHOICES

function setUpQuestionView() {
    // Clears the levels view of the game
    mainContainer.replaceChildren();

    const checkAnswerAndDisplayQuestion = function(e) {
        // Pass it to check anwer only because we need to know what the user clicked
        checkAnswer(e)
        questionIndex++;
        displayQuestion()
    }

    // Event listners set for each choice to listen for user input click
    choice1.addEventListener('click', checkAnswerAndDisplayQuestion)
    choice2.addEventListener('click', checkAnswerAndDisplayQuestion)
    choice3.addEventListener('click', checkAnswerAndDisplayQuestion)
    choice4.addEventListener('click', checkAnswerAndDisplayQuestion)
    
    // Displays score tag
    scoreContainer.innerHTML = 'Score: ';
    
    // Setting inital score to 0 and storing it inside the span
    scoreSpan.innerHTML = 0;
    scoreContainer.appendChild(scoreSpan)
    
    // Adding the newly created questions and choices to the main container
    mainContainer.append(scoreContainer, question, choicesContainer)
    choicesContainer.append(choice1, choice2, choice3, choice4)

    // Invoke to display the very first question after level selection
    displayQuestion()

    function displayQuestion() {
        if (questionIndex >= questionSet.length) {
            displayResults();
            return;
        }
        let currentQuestion = questionSet[questionIndex]
        question.innerHTML = currentQuestion.question
        // To randomize the choices 
        currentQuestion.choices.sort(() => (Math.random() > .5) ? 1 : -1);
        choice1.innerHTML = currentQuestion.choices[0]
        choice2.innerHTML = currentQuestion.choices[1]
        choice3.innerHTML = currentQuestion.choices[2]
        choice4.innerHTML = currentQuestion.choices[3]
    }
}

function checkAnswer(e) {
    let currentChoice = e.target;
    if (currentChoice.innerHTML === questionSet[questionIndex].correctAnswer) {
        scoreSpan.innerHTML++;
        questionSet[questionIndex].correctlyAnswered = true;
    } else {
        questionSet[questionIndex].correctlyAnswered = false;
    }
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// FOURTH VIEW: DISPLAY SCORE, RESULTS, MESSEGE AND RESET BUTTON 

function displayResults() {
    mainContainer.replaceChildren();
    scoreContainer.innerHTML = "Final Score: "
    scoreContainer.appendChild(scoreSpan);
    if (parseInt(scoreSpan.innerHTML) === 5) {
        displayMessage.innerHTML = messages.winningMessage;
    } else {
        displayMessage.innerHTML = messages.encouragingMessage;
    }
    questionSet.forEach((q) => {
        results.append(q.question)
        results.append(q.correctlyAnswered)
    })
    resetButton.innerHTML = "Reset"
    resetButton.addEventListener('click', returnToMainPage)
    mainContainer.append(scoreContainer, displayMessage, results, resetButton);
}

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~// 

// RESOURCES 

// Randomize questions and choices code 
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#comment91985653_2450954
