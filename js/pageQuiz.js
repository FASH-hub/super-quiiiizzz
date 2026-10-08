"use strict";

/**
 * Gets the id of selected quiz from the URL and starts it.
 */
function displaySelectedQuiz() {
    let selectedQuiz = new URL(location.href).searchParams.get("quiz");
    if (quizzes[selectedQuiz]) {
        playQuiz(selectedQuiz);
    }
}

/**
 * Renders the selected quiz questions into the form.
 * @param {string} key quiz key in the quizzes object
 */
function playQuiz(key) {
    let tab = quizzes[key].data;

    for (let i = 0; i < tab.length; i++) {
        let $questionDiv = $("<div>").attr("id", tab[i].id);
        $questionDiv.append($("<p>").text(tab[i].question));
        $questionDiv.append($("<img>").attr("src", "images/" + tab[i].image));

        let $answerDiv = $("<div>").attr("id", "answer-" + tab[i].id).attr('name', "answer-" + tab[i].id);
        for (let j = 0; j < tab[i].reponses.length; j++) {
            if (tab === questions_webg2 || tab === questions_couples) {
                $answerDiv.append($("<input>").attr({
                    type: 'checkbox',
                    name: "answer" + tab[i].id + ',' + j,
                    id: tab[i].id + ',' + j
                }));
            } else {
                $answerDiv.append($("<input>").attr({
                    type: 'radio',
                    name: "answer" + tab[i].id,
                    value: j
                }));
            }
            $answerDiv.append($("<label>").text(tab[i].reponses[j]));
            $answerDiv.append($("<br/>"));
        }
        $questionDiv.append($answerDiv);
        $("#questions").append($questionDiv);
    }
    document.getElementById('quizz').setAttribute('value', key);
    $("#questions").append($("<button id='button'>").text('SOUMETTRE'));
}

window.onload = timer();
