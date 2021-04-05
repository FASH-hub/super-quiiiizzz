/**
 * Gets the id of selected quizz on the previous page.
 * Displays the description of the quizz
 */
function displaySelectedQuiz() {

    let SelectedQuiz = new URL(location.href).searchParams.get("quiz");


    for (let element in quizzes) {
        if (element === SelectedQuiz) {
            playQuiz(element);
        }
    }

}

/**
 * Implements the selected quizz from the quizzes container.
 * @param {quizzes container} array 
 */
function playQuiz(array) {
    let tab = quizzes[array].data;

    for (let i = 0; i < tab.length; i++) {
        console.log(tab[i].question);
        $("#questions").append($("<div>").attr("id", tab[i].id))
        $("#" + tab[i].id).append($("<p>").text(tab[i].question));

        $("#" + tab[i].id).append($("<img>").attr("src", "../images/" + tab[i].image));

        $("#" + tab[i].id).append($("<div>").attr("id", "answer-" + tab[i].id));
        $("#" + "answer-" + tab[i].id).attr('name', "answer-" + tab[i].id);
        for (let j = 0; j < tab[i].reponses.length; j++) {

            if (tab === questions_webg2 || tab === questions_couples) {
                $("#answer-" + tab[i].id).append($("<input type='checkbox' name='answer" + tab[i].id + ',' + j + "' id='" + tab[i].id + ',' + j + "'>").text(tab[i].reponses[j]))

            } else {
                $("#answer-" + tab[i].id).append($("<input type='radio' name='answer" + tab[i].id + "' value='" + j + "'>").text(tab[i].reponses[j]))
            }
            $("#answer-" + tab[i].id).append($("<label>").text(tab[i].reponses[j]))
            $("#answer-" + tab[i].id).append($("<br/>"));
        }

    }
    document.getElementById('quizz').setAttribute('value', array);
    $("#questions").append($("<button id='button'>").text('SOUMETTRE'));
}

window.onload = timer();