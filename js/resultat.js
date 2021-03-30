function checkedAnswer() {
    let tabReponses = [];
    var selectedQuizz = new URL(location.href).searchParams.get("quizz");
    let array = quizzes[selectedQuizz].data;
    if (selectedQuizz == "mer" || selectedQuizz == "jeux") {
        for (var i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            var rep = new URL(location.href).searchParams.get("answer" + array[i].id);
            tabRepQuestion.push(rep);
            tabReponses.push(tabRepQuestion);
            tabReponses = convertionTabRadio(tabReponses);
        }
    } else {
        for (var i = 0; i < array.length; i++) {
            let tabRepQuestion = [];
            for (var j = 0; j < array[i].reponses.length; j++) {
                var rep = new URL(location.href).searchParams.get("answer" + array[i].id + ',' + j);
                tabRepQuestion.push(rep);
            }
            tabReponses.push(tabRepQuestion);
            tabReponses = conversionTabCheckbox(tabReponses);
        }
    }
    return tabReponses;
}

function convertionTabRadio(tab) {
    for (var i = 0; i < tab.length; i++) {
        for (var j = 0; j < tab[i].length; j++) {
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
    for (var i = 0; i < tab.length; i++) {
        var miniTab = [];
        for (var j = 0; j < tab[i].length; j++) {
            if (tab[i][j] != null) {
                miniTab.push(j);
            }
        }
        newTab.push(miniTab);
    }
    return newTab;
}

function compare(array, tabReponse) {

    for (var i = 0; i < array.length; i++) {
        if (compareTableau(array[i].bonneReponses, tabReponse)) {
            //afficher Bonne réponse
        } else {
            //afficher correction
        }
    }
}

function compareTableau(tabInit, tabRep) {
    for (var i = 0; i < tab1.length; i++) {
        if (tabInit[i] != tabRep[i]) {
            return tabRep[i];
        }
    }
    return true;
}

function recupResult() {
    var reponses = checkedAnswer();
    console.log(reponses)
}

window.onload = recupResult();