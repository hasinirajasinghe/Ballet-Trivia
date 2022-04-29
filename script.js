//PSEUDOCODE

//1st View 
//Contains Start Button and How to Play 
    //If start button is clicked:
        //The contents of the div container should clear out and the new contents of 2nd view should be added 
    //Else if How to Play is clicked:
        //A pop up of some sort should show the instructions for the game

//2nd View 
//Contains the levels View 
    //If player clicks on one out of the six levels, prompt the first question from the radomized list of questions.

//3rd View and onwards 
//Questions and answers view
    //Display one question at a time with four choices for the chosen level
        //If player clicks on a choice
            //If player choice === correct choice
                //Increment score by 1    
            //Move on to the next question 
    
//Last View 
//Contains results from each round 
    //Will show the final score of the player
    //Will which questions were correctly answered and incorrectly answered 
    //Show a restart button to take the player back to the main page 

let questionSet;    
let startButton = document.getElementById('start');
let mainContainer = document.getElementById('main-container');
startButton.addEventListener('click', () => {
    //Clears the initial view of the game 
    mainContainer.replaceChildren();
    //Begining of creating the second view of different levels in the game
    mainContainer.className = "main-container-levels-page";
    let levels = document.createElement('h1')
    levels.innerHTML = "LEVELS"
    mainContainer.append(levels)

    const levelNames = [
        'Grade 1',
        'Grade 2',
        'Grade 3',
        'Grade 4',
        'Grade 5',
        'Major Grades'
    ]

    levelNames.forEach((levelName) => {
        let newLevelButton = document.createElement('button');
        newLevelButton.innerHTML = levelName;
        newLevelButton.addEventListener('click', levelSelect)
        mainContainer.append(newLevelButton);
        //TODO: Create a new style class to format the buttons
    }) 
})

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

    // Clears the levels view of the game
    mainContainer.replaceChildren();
    // Creates the neccessary divs to store questions and choices
    let question = document.createElement('div');
    question.id = "question"
    let choicesContainer = document.createElement('div');
    choicesContainer.id = "choices-container"
    let choice1 = document.createElement('div');
    choice1.id = 'choice1'
    let choice2 = document.createElement('div');
    choice2.id = 'choice2'
    let choice3 = document.createElement('div');
    choice3.id = 'choice3'
    let choice4 = document.createElement('div');
    choice4.id = 'choice4'
    // Adding the newly created questions and choices to the main container
    mainContainer.append(question, choicesContainer)
    choicesContainer.append(choice1, choice2, choice3, choice4)
}