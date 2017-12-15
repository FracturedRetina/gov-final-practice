var quizNum;
var questionNum;
var submitted = false;
var correct = 0;
var total = 0;

$(document).ready(function() {
	refresh();
	
	$('#submit').click(function() {
		if (submitted) {
			refresh();
			$(this).text("Submit")
		} else {
			checkAnswer();
			$(this).text("Next");
		}
		submitted = !submitted
	});
	$('span').click(function() {
		$('input:eq(' + $('span').index(this) + ')').prop("checked", true);
	});
});

function getQustion() {
	quizNum = Math.floor(Math.random() * 15) + 1;
	var quiz = $.ajax({
		url: "res/questions/quiz" + quizNum + ".txt",
		async: false
	}).responseText;
	var questions = quiz.match(/[0-9]{1,2}\. .+/g);
	var answers = /\t[a-e]\. .+/g;
	
	questionNum = Math.floor(Math.random() * questions.length);
	
	var q = questions[questionNum];
	var a = [];
	for (var i = 0; i < 5; i++) {
		a.push(quiz.match(answers)[questionNum * 5 + i]);
	}
	return [q, a];
}

function refresh() {
	var q = getQustion();
	$('#quiz').text("Quiz " + quizNum);
	$('#question').text(q[0]);
	$('#a').text(q[1][0].substring(1));
	$('#b').text(q[1][1].substring(1));
	$('#c').text(q[1][2].substring(1));
	$('#d').text(q[1][3].substring(1));
	$('#e').text(q[1][4].substring(1));
	$('span').css("color", "black");
	
	$('input').prop("checked", false);
}

function checkAnswer() {
	var answers = $.ajax({
		url: "res/answers/quiz" + quizNum + ".txt",
		async: false
	}).responseText;
	var answer;
	
	$('span').each(function(i) {
		if ($('input:eq(' + i + ')').prop('checked')) {
			$(this).css("color", "red");
			answer = $(this).attr("id");
		}
	});
	
	if (answer == answers[questionNum]) {
		correct++;
	}
	total++;
	
	$('#' + answers[questionNum]).css("color", "green");
	$('#score').text(correct + "/" + total);
}