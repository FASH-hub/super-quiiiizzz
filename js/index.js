/**
 * Displays in the console the id's of each quizz.
 */
function display() {
    for (let element in quizzes) {
        console.log(element, quizzes[element].title);
    }
}
display();

/**
 * Adds the form and fills dynamically the list of quizzes.
 * It also sends the id of chosen quiz to the page reserved for the quizz
 */
function quizzDescription() {
    for (let element in quizzes) {

        $("#quizId").append($("<option>")
            .val(element)
            .text(quizzes[element].title)
        )
    }
}
quizzDescription();