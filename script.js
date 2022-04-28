//PSEUDOCODE

//1st View 
//Contains Start Button and How to Play 
    //If start button is clicked:
        //The contents of the div container should clear out and the new contents of 2nd view should be added 
    //Else if How to Play is clicked:
        //A pop up of some sort should show the instructions for the game

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    let mainContainer = document.getElementById('main-container');
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
        mainContainer.append(newLevelButton);
        //Create a new style class to format the buttons 
    })
})