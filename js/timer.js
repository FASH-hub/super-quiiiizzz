let time = 3;

var timerDecompte;

function timer() {
    timerDecompte = setInterval("next()", 1500);
}

function next() {
    console.log(time);
    document.getElementById('timer').innerHTML = time;
    time--;
    if (time == -2) {
        clearInterval(timerDecompte);
        document.getElementById('timer').remove();
        displaySelectedQuiz();
    }
}