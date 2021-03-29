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

function playQuiz(array) {
    let tab;
    switch (array) {
        case "mer":
            tab = questions_mer;
            break;
        case "couples":
            tab = questions_couples;
            break;
        case "jeux":
            tab = questions_jeux;
            break;
        case "webg2":
            tab = questions_webg2;
            break;
    }
    for (let i = 0; i < tab.length; i++) {
        $("#questions").append($("<div>").attr("id", tab[i].id))
        $("#" + tab[i].id).append($("<p>").text(tab[i].question));

        $("#" + tab[i].id).append($("<img>").attr("src", "../images/" + tab[i].image));

        $("#" + tab[i].id).append($("<form>").attr("id", "answer-" + tab[i].id));
        for (let j = 0; j < tab[i].reponses.length; j++) {

            if (tab === questions_jeux || tab === questions_couples) {
                $("#answer-" + tab[i].id).append($("<input type='checkbox' name='answer'>").text(tab[i].reponses[j]))

            } else {
                $("#answer-" + tab[i].id).append($("<input type='radio' name='answer'>").text(tab[i].reponses[j]))
            }
            $("#answer-" + tab[i].id).append($("<label>").text(tab[i].reponses[j]))
            $("#answer-" + tab[i].id).append($("<br/>"));
        }

    }
    $("#questions").append($("<button id='button' onclick='resultat()'>").text('soumettre'));
}

window.onload = timer();