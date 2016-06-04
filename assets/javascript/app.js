$(function() {
	//Create global variables
	//holds quiz progress
	var progress = $('#progress'),
			progressKeeper = $('#progressKeeper'),

			//display for notices/UI alerts
			notice = $("#notice"),

			//answer key
			answers= answerKey.answers,

			//creates an array of user answers
			userAnswers = [],

			//length of answers so questions can be seamlessly removed
			questionLength= answers.length,

			//Display for questions
			questionsStatus = $("#questionNumber")
			questionsList = $(".question");

         //search for correct answers
         function checkAnswers() {

         		//gather the array of user responses
            var resultArr = [],

						flag = false;

						//loop length of answers
            for (i=0; i<answers.length; i++) {

                //if any answer in the array equal one another return true or false for right or wrong respectively
                if (answers[i] == userAnswers[i]) {

                    flag = true;
                }
                else {

                    flag = false;
                }
                //push results to flag for each answer in the array
                resultArr.push(flag);
            }

            return resultArr;
		  }
		  
		  //calculate the results
		  function resultMath(num, dec) {

		  	//calculate results:

		  	// math.pow - returns the value of the first argument raised to the power of the second argumen
		  	// math.round - rounds the number to the nearest integer
				var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);

				return result;
			}
			
			//based on the results, give a letter score
			function judgeSkills(score) {

				var returnString;

					if (score==100) returnString = "A+"

					else if (score>90) returnString = "A"

					else if (score>70) returnString = "C"

					else if (score>50) returnString = "D"
					
					else if (score>35) returnString = "F"

					else if (score>20) returnString = "Fail"
					
					else returnString = ""

				return returnString;
			}

				//hide progress and notices for later
			  progressKeeper.hide();
			  notice.hide();

			  //make all the radio inputs unchecked by default
			  $("#triviaGame input:radio").attr("checked", false);
			
			  //click function for selecting answers
				$('.answers li input').click(function() {

						$(this).parents('.answers').children('li').removeClass("selected");

        					$(this).parents('li').addClass('selected');

 				});
	
			  //start button click functionality
			  $('.btnStart').click(function(){
 
                $(this).parents('.questionDiv').fadeOut(500, function(){

                    $(this).next().fadeIn(500, function(){ progressKeeper.show(); 

                    });
                });
					 
					 questionsStatus.text("");

					 return false;
               
            });	  

			  		//next button click functionality
            $('.btnNext').click(function(){
					
					var tempCheck = $(this).parents('.questionDiv').find('input[type=radio]:checked');

                if (tempCheck.length == 0) {

                     notice.fadeIn(300);return false;

                }

					 notice.hide();

                $(this).parents('.questionDiv').fadeOut(500, function(){

                    $(this).next().fadeIn(500);

                });
                
					 return false;
            
            });			
				
            $('.btnPrev').click(function(){

					notice.hide();

                $(this).parents('.questionDiv').fadeOut(500, function(){
                    $(this).prev().fadeIn(500)

                });
                
                
					 return false;
            
            });
				
            $('.btnShowResult').click(function(){
					
					var tempCheck = $(this).parents('.questionDiv').find('input[type=radio]:checked');

                if (tempCheck.length == 0) {

                     notice.fadeIn(300);return false;
                
                }
                var tempArr = $('input[type=radio]:checked');

                for (var i = 0, ii = tempArr.length; i < ii; i++) {

                    userAnswers.push(tempArr[i].getAttribute('data-key'));

                }

                progressKeeper.hide();

                var results = checkAnswers(),

					 		  resultSet = '',

							  trueCount = 0,

							  answerKey = ' Answers <br />',

							  score;

                for (var i = 0, ii = results.length; i < ii; i++){

                    if (results[i] == true) trueCount++;

                    resultSet += '<div class="resultRow"> Question #' + (i + 1) + (results[i]== true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Wrong</span></div>") + "</div>";
						  
						  answerKey += (i+1) +" : "+ answers[i] +' &nbsp;  &nbsp;  &nbsp;   ';
                
                }

					 score =  resultMath(trueCount / questionLength*100, 2);

					 answerKey = "<div id='answer-key'>" + answerKey + "</div>";
					 
                resultSet = '<h2 class="qTitle">' +judgeSkills(score) + ' You scored '+score+'%</h2>' + resultSet + answerKey;

                $('#resultKeeper').html(resultSet).show();
					 
					 $(this).parents('.questionDiv').fadeOut(500, function(){

                    $(this).next().fadeIn(500);

                });

					 return false;

            });

})