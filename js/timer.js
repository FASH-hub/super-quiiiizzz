let time = 3;

let timerDecompte;

/**
 * Creates timer required before displaying the selected.
 */
function timer() {
    timerDecompte = setInterval("next()", 1500);
}

/**
 * Defines from when starts and ends the timer.
 */
function next() {

    document.getElementById('timer').innerHTML = time;
    time--;
    if (time == -2) {
        clearInterval(timerDecompte);
        document.getElementById('timer').remove();
        displaySelectedQuiz();
    }
}