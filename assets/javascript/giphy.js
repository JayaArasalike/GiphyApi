
	var topics = ["cats","dogs","elephants","cows","goats","sheeps","lions","tigers","chimps","monkeys","giraffes","zebras"];
		
	//array of topics, which holds animals
	for(var i=0; i < topics.length; i++) {
		var buttons = $('<button>');
		buttons.append(topics[i]);
		buttons.attr("data-animal",topics[i]);
		$('body').append(buttons);	
	}

	//creating to div to display animals
	var imgArea = $('<div>');
	imgArea.attr("id","imgsHere");
	$('body').append(imgArea);
	//on a button specific button click
	$("button").on("click",function(){

	//on this button click, search this animal with data property
	var x = $(this).data("animal");	
	console.log("Animal clicked: ",x);

	//generate queryURL with apikey and limiting it to 10
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);

		$.ajax({
			url:queryURL,
			method:"GET"
		}).done(function(response){
			console.log(response);
			for(var i=0; i<response.data.length; i++) {

			//create a div hold animals and rating	
			var	animalDiv = $('<div>');
			var p = $('<p>').text("Rating :"+ response.data[i].rating);
			
			var animalImage = $('<img>');
			animalImage.attr("src",response.data[i].images.original.url);
			animalImage.attr("data-state","still");

			var state = $(animalImage).attr("data-state");
			console.log("state: ",state);

			//if state if still, replace it with animate
			if (state === "still") {
        		$(animalImage).attr("src", $(animalImage).attr("data-animate"));
        		$(this).attr("data-state", "animate");
      			} 
      		else {
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
      		}
			

			//append ratings and image to animalDiv
			animalDiv.append(p);
			animalDiv.append(animalImage);

			//append animalDiv to page
			$("#imgsHere").append(animalDiv);
			}

		})


	});
