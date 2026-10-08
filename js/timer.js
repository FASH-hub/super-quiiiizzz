let time = 3;

let timerDecompte;

/**
 * Creates timer required before displaying the selected quiz.
 */
function timer() {
    timerDecompte = setInterval(next, 1000);
}

/**
 * Counts down from 3 to 1, then starts the quiz.
 */
function next() {
    if (time === 0) {
        clearInterval(timerDecompte);
        document.getElementById('timer').remove();
        displaySelectedQuiz();
        return;
    }
    document.getElementById('timer').innerHTML = time;
    time--;
}
