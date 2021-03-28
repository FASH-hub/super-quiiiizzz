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
        case "webg2":
            tab = questions_webg2;
    }
    for (let i = 0; i < tab.length; i++) {
        $("#questions").append($("<div>").attr("id", tab[i].id))
        $("#" + tab[i].id).append($("<p>").text(tab[i].question));

        for (let j = 0; j < tab[i].reponses.length; j++) {
            $("#" + tab[i].id).append($("<input[name=answer]:checked>").text(tab[i].reponses[j]))

        }

        $("#" + tab[i].id).append($("<img>").attr("src", "../images/" + tab[i].image));
    }
}

window.onload = displaySelectedQuiz();