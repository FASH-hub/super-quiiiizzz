/**
 * Displays in the console the list of quizz' id's.
 */
function display() {
    for (let element in quizzes) {
        console.log(element, quizzes[element].title);
    }
}
display();

function showDescription() {
    for (let element in quizzes) {

        $("#quizId").append($("<option>")
            .val(quizzes[element].title)
            .text(quizzes[element].title)
        )
    }
}
showDescription();