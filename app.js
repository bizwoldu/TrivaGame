 

 $(document).ready(function () {

    var questions = [{
        
            question: "What department did Toby work for?",
            answerOne: "Fire Department",
            answerTwo: "Accounting Department",
            correctAnswer: "HR Department",
            answer: "Marketing Department",
            gif: "./assets/images/toby.gif",
             
        },
        {
            question: "Where did Andy Bernard go to school?",
            answerOne: "Pratt Institute",
            answerTwo: "Harvard",
            answerThree: "Princeton",
            correctAnswer: "Cornell",
            gif: "./assets/images/cornell.gif",

        },
        {
            question: "What did Michael's mug say in the intro?",
            answerOne: "Happy Birthday",
            answerTwo: "Best Dad",
            correctAnswer: "World's Best Boss",
            answerThree: "Dunder Mifflin",
            gif: "./assets/images/mug.giv.gif",

        },

        {
            question: "What pet did Angela keep in the offfice?",
            correctAnswer: "cat",
            answerOne: "dog",
            answerTwo: "bear",
            answerThree: "deer",
            gif: "./assets/images/cat.gif",

        },

        {
            question: "What gift did Angela give Creed in Classy Chrismas which aired in December 2010?",
            answerOne: "New York, NY",
            answerTwo: "hammer",
            correctAnswer: "A multi-pack of underarm deodoran",
            answerThree: "$20 Gift Card",
            gif: ".assets/images/scranton.gif",
        },
        {
            question: "Who did Michael move to Colorado with?",
            correctAnswer: "Holly",
            answerOne: "Pam",
            answerTwo: "Angela",
            answerThree: "Kevin",
            gif: "./assets/images/holly.gif",

        },
        {
            question: "What was the name of Angela's sick cat that Dwight killed?",
            answerOne: "Emmanuel",
            answerTwo: "Randy",
            answerThree: "David ",
            correctAnswer: "Sprinkles",
            gif: ".assets/images/d.gif",

        },
    ]

    var userChoice;
    var answerClicked = false;
    // var windowClicked = false
    var questionIndex = 0;
    var wins = 0;
    var loses = 0;
    var counter;
    var startGameClicked = false;
    var valueOfBtn;
    var interval;
    var noAnswerCounter = 0;

     
    function setUp() {
        startGameClicked = false;
        answerClicked = false;
        counter = 20;
        $("#question").text(questions[questionIndex].question);
        $.each(questions[questionIndex], function (key, val) {
            
            if (key !== "question" && key !== "gif") {
                $("#timer").text(counter)
                $("#answers").append('<button class="one-answer" value="' + val + '">' + val + '</button>');
            }
        })

        $(".one-answer").click(function () {
            //console.log("anwer button was clicked");
            answerClicked = true;
            valueOfBtn = $(this).val();
            if (answerClicked) {
                if (valueOfBtn === questions[questionIndex].correctAnswer) {
                    // console.log("its a match!");
                    //clearInterval(interval);
                    wins++;
                    showResult();
                    $(".immediate-result-screen").append('<p id="correct"> CORRECT! </p> ')
                    $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                    setTimeout(function () {
                        nextQuestion();
                    }, 4000)
                    //console.log("wins are: " + wins);
                } else {
                    loses++;
                    showResult();
                    $(".immediate-result-screen").append('<p id="incorrect"> INCORRECT! </p> ')
                    $(".immediate-result-screen").append('<p id="correct-answer"> answer was : ' + questions[questionIndex].correctAnswer + '</p> ')
                    $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                    setTimeout(function () {
                        nextQuestion();
                    }, 4000)
                    //console.log("loses are: " + loses);

                }
            }
        });
    }

    function timer() {
        interval = setInterval(function () {
            $("#timer").text(counter)
            // console.log(counter);
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter === 0) {
                noAnswerCounter++;
                console.log(noAnswerCounter);
                showResult();
                $(".immediate-result-screen").append('<p id="incorrect"> OUT OF TIME! </p> ')
                $(".immediate-result-screen").append('<p id="correct-answer"> answer was : ' + questions[questionIndex].correctAnswer + '</p> ')
                $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                setTimeout(function () {
                    nextQuestion();
                }, 4000)
            }
        }, 1000);
    }

    function nextQuestion() {
        $(".container-game").css("display", "block");
        $(".immediate-result-screen").removeClass("display");
        clearInterval(interval);
        timer();
        // if (answerClicked) {
        //     clearInterval(interval);
        // }
        // console.log(questionIndex)
        if (questionIndex < questions.length - 1) {
            questionIndex = questionIndex + 1;
        } else {
            clearInterval(interval);
            showResult();
            if (wins == questions.length) {
                console.log("ultmate winner");
                $(".immediate-result-screen").append('<img id="gif" src="./resources/gifs/win-all.gif">');
                $(".immediate-result-screen").append('<p id="how-well"> YOU WIN! EVERYTHING! </p>')
                $("#how-well").css("margin-top","20px");
            } else {
                $(".immediate-result-screen").append('<p id="how-well"> How well did you do? </p>');
                $(".immediate-result-screen").append('<p> Correct Answers : ' + wins + '</p>');
                $(".immediate-result-screen").append('<p> Incorrect Answers : ' + loses + '</p>');
                $(".immediate-result-screen").append('<p> Unanswered Questions : ' + noAnswerCounter + '</p>');
            }
            // console.log(wins);
            // console.log(questions.length);
        }
        $("#answers").text("");
        setUp();
    }


    $("#start").click(function () {
        if (!startGameClicked) {
            timer();
            setUp();
            startGameClicked = true;
            $("#footer").css("display", "flex");
            $("#start").hide();
        }
    })
    
    function showResult() {
        $(".container-game").css("display", "none");
        $(".immediate-result-screen").addClass("display");
        $(".immediate-result-screen").empty();
    }
});
