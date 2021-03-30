/**
 * Displays the selected quiz on the quizz's page.
 */
function displaySelectedQuiz() {

    let SelectedQuiz = new URL(location.href).searchParams.get("quiz");
    let descript = "";

    for (let element in quizzes) {
        if (element === SelectedQuiz) {
            playQuiz(element);
        }
    }
    $("#description").text(descript);

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

        $("#" + tab[i].id).append($("<form>").attr("id", "answer-" + tab[i].id));
        for (let j = 0; j < tab[i].reponses.length; j++) {

            if (tab === questions_webg2 || tab === questions_couples) {
                $("#answer-" + tab[i].id).append($("<input type='checkbox' name='answer' id='" + tab[i].id + ',' + j + "'>").text(tab[i].reponses[j]))

            } else {
                $("#answer-" + tab[i].id).append($("<input type='radio' name='answer' id=" + tab[i].id + ',' + j + "' >").text(tab[i].reponses[j]))
            }
            $("#answer-" + tab[i].id).append($("<label>").text(tab[i].reponses[j]))
            $("#answer-" + tab[i].id).append($("<br/>"));
        }

    }
    $("#questions").append($("<button id='button' onclick='resultat()'>").text('verification'));
}

window.onload = timer();