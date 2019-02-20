var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "What happened first in Vault 111?",
  answers: ["You were cryo-frozen", "You are killed", "You go to your room and talk to the family", "You died outside and never went inside the vault in the first place."],
  correctAnswer: "You were cryo-frozen",
  image: "assets/Cryo pod .jpg"
}, {
    question: "What is the best weapon in Fallout 4?",
    answers: ["Laser Rifle", "Aeternus (Unique Gatling Laser)", ".44 Magnum", "Combat Shotgun"],
    correctAnswer: "Aeternus (Unique Gatling Laser)",
    image: "assets/Aeternus.jpg"
}, {
  question: "What faction uses power armor and keeps technology for themselves?",
  answers: ["Brotherhood of Steel", "The Railroad", "The Minutemen", "The Institute"],
  correctAnswer: "Brotherhood of Steel",
  image: "assets/Brotherhood of Steel.png"
}, {
  question: "What group of people stole your son in Vault 111?",
  answers: ["Super Muntants", "The Institute", "Raider", "The Gunners"],
  correctAnswer: "The Institute",
  image: "assets/The institute.jpeg"
}, {
  question: "Which group is known for their muntant hounds?",
  answers: ["Super Mutants", "Raiders", "Minutemen", "Gunners"],
  correctAnswer: "Super Mutants",
  image: "assets/Super Mutant.jpeg"
}, {
  question: "Which of these are not companions you can not have?",
  answers: ["Cait", "Dogmeat", "Javier", "Preston Garvey"],
  correctAnswer: "Javier",
  image: "assets/Fallout 4 Companions.jpg"
}];


// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  //function
  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  //loads in the question in order
  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  //Code for when 30 seconds is over
  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    //Sets the amount of time for each question which is 30 seconds
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  //Displays the results
  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});