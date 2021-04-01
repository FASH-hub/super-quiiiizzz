/**
 * Checks the answers.
 * It first gets the quizz via URL and puts the answers to the questions in array
 * Selected answers are by after inserted in in main array 
 * 
 */
function checkedAnswer() {
    let tabReponses = [];
    let selectedQuizz = new URL(location.href).searchParams.get("quizz");
    let array = quizzes[selectedQuizz].data;
    if (selectedQuizz == "mer" || selectedQuizz == "jeux") {
        for (let i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            let rep = new URL(location.href).searchParams.get("answer" + array[i].id);
            tabRepQuestion.push(rep);
            tabReponses.push(tabRepQuestion);
            tabReponses = convertionTabRadio(tabReponses);
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            for (let j = 0; j < array[i].reponses.length; j++) {
                let rep = new URL(location.href).searchParams.get("answer" + array[i].id + ',' + j);
                tabRepQuestion.push(rep);
            }
            tabReponses.push(tabRepQuestion);
            tabReponses = conversionTabCheckbox(tabReponses);
        }
    }
    compare(array, tabReponses, array);
}

/**
 * Converts strings values to int values
 * @param {array} tab string values 
 * @returns array containing int values
 */
function convertionTabRadio(tab) {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            switch (tab[i][j]) {
                case "0":
                    tab[i][j] = 0;
                    break;
                case "1":
                    tab[i][j] = 1;
                    break;
                case "2":
                    tab[i][j] = 2;
                    break;
            }
        }
    }
    return tab;
}

/**
 * Removes the null values from the array 2D of int values.
 * @param {array} tab of int values 
 * @returns array of int values without null values
 */
function conversionTabCheckbox(tab) {
    var newTab = [];
    for (let i = 0; i < tab.length; i++) {
        let miniTab = [];
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] != null) {
                miniTab.push(j);
            }
        }
        newTab.push(miniTab);
    }
    return newTab;
}

/**
 * Checks the answers and displays them on result's page
 * @param {[]} array quizz
 * @param {array} tabReponse selected answers by the player 
 */
function compare(array, tabReponse) {
    var result = document.createElement('h1');
    result.textContent = "Results :"
    document.getElementById('resultats').append(result);
    for (let i = 0; i < array.length; i++) {
        var question = document.createElement('p')
        question.textContent = i + 1 + " : " + array[i].question;
        document.getElementById('resultats').append(question);
        document.getElementById('resultats').append
        if (compareTableau(array[i].bonneReponses, tabReponse[i]) == true) {
            let balise = document.createElement('p');
            balise.textContent = "Well done!! The correct answer is "
            for (let j = 0; j < array[i].bonneReponses.length; j++) {
                balise.textContent = balise.textContent + array[i].reponses[array[i].bonneReponses[j]] + ' , ';
            }
            afficherBonneReponse(balise, true);
        } else {
            let fausseRep = compareTableau(array[i].bonneReponses, tabReponse[i]);

            afficherMauvaiseReponse(array[i].reponses[fausseRep]);
            let balise = document.createElement('p');
            balise.textContent = "Expected answer was "
            for (let j = 0; j < array[i].bonneReponses.length; j++) {
                balise.textContent = balise.textContent + array[i].reponses[array[i].bonneReponses[j]] + ' , ';
            }
            afficherBonneReponse(balise, false);
        }
    }
}

/**
 * Colorises the content in tags
 * @param {*} tag contains answers 
 * @param {*} boolean right or wrong answer
 */
function afficherBonneReponse(tag, boolean) {
    if (boolean) {
        tag.setAttribute('id', "correct");
    } else {
        tag.setAttribute('id', 'expected')
    }
    document.getElementById('resultats').append(tag);
}

/**
 * Displays the selected wrong answer by the player
 * @param {mauvaise réponse d'une question} reponse 
 */
function afficherMauvaiseReponse(reponse) {
    let tag = document.createElement('p');
    tag.setAttribute('id', "wrong");
    tag.textContent = "Sorry you've got it wrong!! You answered " + reponse;
    document.getElementById('resultats').append(tag);
}

/**
 * Checks if the player answered correctly
 * @param {[]} tabInit correct answers 
 * @param {[]} tabRep selected answers by the player
 * @returns true if the selected answers are correct, false otherwise.
 */
function compareTableau(tabInit, tabRep) {
    for (let i = 0; i < tabInit.length; i++) {
        if (tabInit[i] != tabRep[i]) {
            return tabRep[i];
        }
    }
    return true;
}

/**
 * Launch the verification
 */
window.onload = checkedAnswer();