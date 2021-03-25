let selectedQuiz = [];

function initSelectedQuiz() {
    let id = new URL(location.href).searchParams.get("quizId");
    let i = 0;
    while (i < quizzes[element].length && quizzes[element]["id"] != id) {
        i++;
    };
    selectedQuiz = quizzes[element];
}