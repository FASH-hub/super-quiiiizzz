function showDescription() {
    quizzes.forEach(element =>
        $("#quizId").append($("<option>")
            .val(element["title"])
            .text(element["description"])
        )
    );
};

console.log(showDescription);