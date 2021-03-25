/**
 * Displays in the console the list of quizz' id's.
 */
function display() {
    for (let element in quizzes) {
        console.log(element, quizzes[element].title);
    }
}
display();

/**
 * Adds the form and fills dynamically the list of quizzes.
 * It also sends the chosen quiz to the quiz page
 */
function quizzDescription() {
    for (let element in quizzes) {

        $("#quizId").append($("<option>")
            .val(quizzes[element].id)
            .text(quizzes[element].title)
        )
    }
}
quizzDescription();