//1. create global variables for correct answers, incorrect answers, unanswered, timer, random question,
//   interval(to stop the timer, boolean) and also an empty array for used questions.
//2. create global variable with all the possible questions and answers for the trivia (object),
//   mark the index of the correct answer in the array
//3. create function for random question with answers
//4. create function for timer
//5. create decrement function for the timer
//6. create function for correct answers
//7. create function for incorrect answers
//8. create game over function
//9. ????????

//2. create global variable with all the possible questions and answers for the trivia (object),
//   mark the index of the correct answer in the array
let questions = [
    firstQuestion = {
        question: 'To which bounty hunter does Darth Vader warn that Han and his friends must not be disintegrated, to which the bounty hunter replies, "As you wish..."?',
        answers: ["Jango Fett", "Bossk", "Boba Fett", "Greedo"], 
        correctAnswer: 2,
        image: "assets/images/boba.gif"
    },    
    secondQuestion = {        
        question: "In 'Episode I,' what did Yoda discover that Anakin possessed, that may lead him to the Dark Side?",        
        answers: ["Passion", "Hate", "Fear", "Happiness"],        
        correctAnswer: 2,
        image: "assets/images/anakin.gif"    
    },
    thirdtQuestion = {
        question: "In which battle did Obi-Wan Kenobi and Anakin Skywalker fly a rescue mission to save Supreme Chancellor Palpatine, who had been captured by General Grievous during the Separatists' invasion?",
        answers: ["Battle of Coruscant", "Battle of Geonosis", "Battle of Kashyyk", "Battle of Hoth"],
        correctAnswer: 0,
        image: "assets/images/cosurcant.gif"
    },
    fourthQuestion = {
        question: 'In "Attack of the Clones", who says "Oh, not good"',
        answers: ["General Grievous", "Obi-Wan Kenobi", "Captain Rex", "Count Dooku"],
        correctAnswer: 1,
        image: "assets/images/hello_there.gif"
    },
    fifthQuestion = {
        question: 'Throughout the prequel trilogy, Anakin Skywalker is called a two-word title in reference to the Jedi prophesy that he would "bring balance to the force". What is this title?',
        answers: ["The Mighty One", "The One", "The Selected One", "The Chosen One"],
        correctAnswer: 3,
        image: "assets/images/chosen_one.gif"
    },
    sixthtQuestion = {
        question: "Which planet is Princess Leia from?",
        answers: ["Naboo", "Hoth", "Mustafar", "Alderaan"],
        correctAnswer: 3,
        image: "assets/images/alderaan.gif"
    },
    seventhQuestion = {
        question: 'When Master Yoda told Anakin Skywalker, "I sense much fear in you", it foreshadowed his future development into which evil Sith Lord? This took place in "Phantom Menace."',
        answers: ["Darth Revan", "Darth Maul", "Darth Vader", "Starkiller"],
        correctAnswer: 2,
        image: "assets/images/darth_vader.gif"
    },
    eighthQuestion = {
        question: 'In "Episode IV (A New Hope)", who is the first character to talk?',
        answers: ["C-3PO", "R2-D2", "Darth Vader", "Princess Leia"],
        correctAnswer: 0,
        image: "assets/images/c3.gif"
    },
    ninthQuestion = {
        question: 'What planet, never previously mentioned in a "Star Wars" movie, is invaded by the Trade Federation in "The Phantom Menace"?',
        answers: ["Coruscant", "Naboo", "Alderaan", "Mustafar"],
        correctAnswer: 1,
        image: "assets/images/jar.gif"
    },
    tenthQuestion = {
        question: "The basis for the Empire's army was an army of clones, originally built for the Republic. From what planet did these clones come?",
        answers: ["Geonosis", "Naboo", "Coruscant", "Kamino"],
        correctAnswer: 3,
        image: "assets/images/clones.gif"
    }
]
//1. create global variables for correct answers, incorrect answers, unanswered, timer, random question,
//   interval, time left and also an empty array for used questions.
let correctAnswerTotal = 0;
let incorrectAnswerTotal = 0;
let unansweredTotal = 0;
let timeLeft = 0;
let randomQuestionSelected, timer, selectedInterval;
let totalQuestions = questions.length
let questionsArr = [];
//4. create function for timer
function timerStart() {
    timer = 10;
    selectedInterval = setInterval(decrement, 1000);
    $('#timer-area').html("<h6 class='display-4 text-danger text-uppercase'>Don't sweat it: " + timer + "</h6>")
}
//5. create decrement function for the timer
function decrement() {
    timer--;
    $('#timer-area').html("<h6 class='display-4 text-danger text-uppercase'>Don't sweat it: " + timer + "</h6>")
    if (timer === 0) {
        unansweredTotal++
        timeLeft++
        clearInterval(selectedInterval);
        userChoice = $('<div>');
        userChoice.addClass('selected-answer');
        $(userChoice).html("<h2 class='text-success text-uppercase'>Correct Answer: " + randomQuestionSelected.answers[randomQuestionSelected.correctAnswer] + "</h2><br>")
        userChoice.append('<img src="' + randomQuestionSelected.image + '"');
        $('.answer').detach();
        $('.answers-area').append(userChoice);
        setTimeout(function() {
            gameOver();
        }, 1000)
    }
}
//6. create function for correct answers
function correctAnswer() {
    userChoice = $("<div>");
    userChoice.addClass('selected-answer');
    userChoice.html("<h2>Correct your answer is!</h2>");
    $('.answer').detach();
    $('.answers-area').append(userChoice);
    setTimeout(function() {
        gameOver();
    }, 5000)
}

//7. create function for incorrect answers
function incorrectAnswer() {
    userChoice = $("<div>");
    userChoice.addClass('selected-answer');
    userChoice.html("<h2>Incorrect your answer is!</h2>");
    $('.answer').detach();
    $('.answers-area').append(userChoice);
    setTimeout(function() {
        gameOver();
    }, 5000)
}
//3. create function for random question with answers

function randomQuestion() {
    let random = Math.floor(Math.random() * questionsArr.length)
    randomQuestionSelected = questionsArr[random];
    questionsArr.splice(random, 1);
    $('.questions-area').html("<h3 class='text-light'>" + randomQuestionSelected.question + "</h3>")
    for (let i = 0; i < randomQuestionSelected.answers.length; i++) {
        divAnswers = $('<div class="mt-4 btn btn-primary btn-lg m-2 btn-wide">');
        divAnswers.addClass('answer');
        divAnswers.attr('id', i);
        divAnswers.html(randomQuestionSelected.answers[i]);
        $('.answers-area').append(divAnswers);
    }
    $(".answer").on('click', function() {
        var selectedId = $(this).attr('id');
        if (selectedId == randomQuestionSelected.correctAnswer) {
            clearInterval(selectedInterval);
            correctAnswerTotal++;
            timeLeft++;
            correctAnswer();
        }
        else {
            clearInterval(selectedInterval);
            incorrectAnswerTotal++;
            timeLeft++;
            incorrectAnswer();
        }
    })
}
//8. create game over function
function gameOver() {
    clearInterval(selectedInterval);
    if (timeLeft === totalQuestions) {
        $('#timer-area').empty();
        $('h6').detach();
        $('h2').detach();
        $('h3').detach();
        $('.answers-area').empty();
        $('.start-button').hide();
        $('.questions-area').append('<h1 class="text-success text-uppercase">Up the time is, see your results and now you must.</h1>');
        let resultsDiv = $('<div>');
        resultsDiv.addClass('results')
        resultsDiv.append('<p class="text-uppercase">Correct Answers: ' + correctAnswerTotal + '</p>');
        resultsDiv.append('<p class="text-uppercase">Incorrect Answers: ' + incorrectAnswerTotal + '</p>');
        resultsDiv.append('<p class="text-uppercase">Unanswered: ' + unansweredTotal + '</p>');
        $('#results').append(resultsDiv)
        $('.btn-outline-light').show();
    }
    else {
        $('.answers-area').empty();
        randomQuestion();
        timerStart();
    }
}


$('.btn-outline-light').hide();
questionsArr = questions.slice();

//9. Listeners
$('.start-button').on('click', function() {
    $(this).hide();
    randomQuestion();
    timerStart();
})
$('.btn-outline-light').on('click', function() {
    console.log("reset")
    $(this).hide();
    $('.answers-area').empty();
    $('.questions-area').empty();
    $('#results').empty();
    timerStart();
    questionsArr = questions.slice();
    randomQuestion();
    timeLeft = 0;
    })
