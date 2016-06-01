
//Object with trivia questions, options and answers.
var triviaQA = [
	{
		"question": "Question 1",
		"option1": "Option 1",
		"option2": "Option 2",
		"answer": "Answer",
	},
	{
		"question": "Question 2",
		"option1": "Option 1",
		"option2": "Option 2",
		"answer": "Answer",
	},
	{
		"question": "Question 3",
		"option1": "Option 1",
		"option2": "Option 2",
		"answer": "Answer",
	},
	{
		"question": "Question 4",
		"option1": "Option 1",
		"option2": "Option 2",
		"answer": "Answer",
	},
]

//Timer start on button click
$('#startTrivia').on("click", function() {

	//Styling timer and seconds left	
	$('#secondsLeft').addClass('timerStyle');
	$('#timer').addClass('timerStyle');

	//Timeouts for five/ten seconds and time up
	setTimeout(fiveSeconds, 1000 * 20);
	setTimeout(tenSeconds, 1000 * 25);
	setTimeout(timeUp, 1000 * 30);

	//5 Seconds left function
	function fiveSeconds() {
	    $('#secondsLeft').html('<h2>About 10 Seconds Left!</h2>');
	}

	//10 Seconds left function
	function tenSeconds() {
	    $('#secondsLeft').html('<h2>About 5 Seconds Left!</h2>');
	}

	//Time up function
	function timeUp(){
	    $('#secondsLeft').html('<h2>Time\'s Up!</h2>');
	}

	//Timer variables
	var count = 30;

	var counter = setInterval(timer, 1000); //1000 will run it every 1 second

	//Timer function counts down from 30 seconds
	function timer() {

	  count = count - 1;

	  if (count == -1) {
	     clearInterval(counter); // Stops the counter
	     return;
	  }

	  $("#timer").html(count + " secs");
	}

	function gameDisplay() {
		$('#question').html(triviaQA[0].question);
		$('#option1').html(triviaQA[0].option1).addClass('li');
		$('#option2').html(triviaQA[0].option2).addClass('li');
	}

	gameDisplay();


})