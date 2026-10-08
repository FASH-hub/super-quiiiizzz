"use strict";

/**
 * Fills the quiz selector dropdown dynamically from the quizzes object.
 */
function quizzDescription() {
    for (let element in quizzes) {
        $("#quizId").append($("<option>")
            .val(element)
            .text(quizzes[element].title)
        );
    }
}
quizzDescription();
