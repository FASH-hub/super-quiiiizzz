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

function compare(array, tabReponse, tableauGeneral) {

    for (let i = 0; i < array.length; i++) {
        if (compareTableau(array[i].bonneReponses, tabReponse[i]) == true) {
            console.log(i);
            for (let j = 0; j < tableauGeneral[i].bonneReponses.length; j++) {
                console.log("bravo, c'était bien : " + tableauGeneral[i].reponses[tableauGeneral[i].bonneReponses[j]]);
                afficherBonneReponse(tableauGeneral[i].reponses[tableauGeneral[i].bonneReponses[j]], true);
            }
        } else {
            let fausseRep = compareTableau(array[i].bonneReponses, tabReponse[i]);
            console.log('yooooo');
            console.log(tableauGeneral[i].reponses[fausseRep] + " était faux");
            afficherMauvaiseReponse(tableauGeneral[i].reponses[fausseRep]);
            for (let j = 0; j < tableauGeneral[i].bonneReponses.length; j++) {
                console.log("bonne réponse était : " + tableauGeneral[i].reponses[tableauGeneral[i].bonneReponses[j]]);
                afficherBonneReponse(tableauGeneral[i].reponses[tableauGeneral[i].bonneReponses[j]], false);
            }
        }
    }
}

function afficherBonneReponse(reponse, boolean) {
    let balise = document.createElement('p');
    if (boolean) {
        balise.setAttribute('id', "right");
        balise.textContent = "bravo, c'était bien : " + reponse;
    } else {
        balise.setAttribute('id', 'espére')
        balise.textContent = "une bonne réponse était : " + reponse;
    }
    document.getElementById('resultats').append(balise);
}

function afficherMauvaiseReponse(reponse) {
    let balise = document.createElement('p');
    balise.setAttribute('id', "mauvais");
    balise.textContent = "ce n'était pas : " + reponse;
    document.getElementById('resultats').append(balise);
}

function compareTableau(tabInit, tabRep) {
    for (let i = 0; i < tabInit.length; i++) {
        if (tabInit[i] != tabRep[i]) {
            return tabRep[i];
        }
    }
    return true;
}


window.onload = checkedAnswer();