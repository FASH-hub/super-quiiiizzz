"use strict";

/**
 * Checks the answers.
 * Gets the quiz via URL and collects selected answers into an array.
 */
function checkedAnswer() {
    const params = new URL(location.href).searchParams;
    let tabReponses = [];
    let selectedQuizz = params.get("quizz");
    let array = quizzes[selectedQuizz].data;
    if (selectedQuizz == "mer" || selectedQuizz == "jeux") {
        for (let i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            let rep = params.get("answer" + array[i].id);
            tabRepQuestion.push(rep);
            tabReponses.push(tabRepQuestion);
            tabReponses = convertionTabRadio(tabReponses);
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            for (let j = 0; j < array[i].reponses.length; j++) {
                let rep = params.get("answer" + array[i].id + ',' + j);
                tabRepQuestion.push(rep);
            }
            tabReponses.push(tabRepQuestion);
            tabReponses = conversionTabCheckbox(tabReponses);
        }
    }
    compare(array, tabReponses);
}

/**
 * Converts string values to int values using parseInt.
 * @param {array} tab string values
 * @returns array containing int values
 */
function convertionTabRadio(tab) {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] !== null) {
                tab[i][j] = parseInt(tab[i][j], 10);
            }
        }
    }
    return tab;
}

/**
 * Removes the null values from the 2D array.
 * @param {array} tab of values
 * @returns array without null values (keeps only answered indices)
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
 * Checks the answers and displays them on the results page.
 * @param {[]} array quiz data
 * @param {array} tabReponse selected answers by the player
 */
function compare(array, tabReponse) {
    let result = document.createElement('h1');
    result.textContent = "Results :"
    document.getElementById('resultats').append(result);
    for (let i = 0; i < array.length; i++) {
        let question = document.createElement('p')
        question.textContent = i + 1 + " : " + array[i].question;
        document.getElementById('resultats').append(question);
        if (compareTableau(array[i].bonneReponses, tabReponse[i]) == true) {
            let balise = document.createElement('p');
            balise.textContent = "Well done!! You gave the correct answer --> "
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
 * Applies a class to colour the answer tag.
 * @param {Element} tag contains the answer text
 * @param {boolean} isCorrect true for correct, false for expected
 */
function afficherBonneReponse(tag, isCorrect) {
    tag.classList.add(isCorrect ? 'correct' : 'expected');
    document.getElementById('resultats').append(tag);
}

/**
 * Displays the wrong answer selected by the player.
 * @param {string} reponse the wrong answer text
 */
function afficherMauvaiseReponse(reponse) {
    let tag = document.createElement('p');
    tag.classList.add('wrong');
    tag.textContent = "Sorry you've got it wrong!! You answered " + reponse;
    document.getElementById('resultats').append(tag);
}

/**
 * Checks if two answer arrays match.
 * @param {[]} tabInit correct answers
 * @param {[]} tabRep selected answers by the player
 * @returns true if correct, or the mismatched player answer value if wrong.
 */
function compareTableau(tabInit, tabRep) {
    for (let i = 0; i < tabInit.length; i++) {
        if (tabInit[i] != tabRep[i]) {
            return tabRep[i];
        }
    }
    return true;
}

window.onload = checkedAnswer();
