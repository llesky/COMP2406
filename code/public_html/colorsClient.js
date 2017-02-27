
var user;

function load() {
	user = prompt("Enter a username", "user");

	$.ajax({
		method:"GET",
		url:"/colors/user",
		data: {'username':user},
		success: displayGame,
		dataType:'json'
	});
}

function displayGame(data){
	$("#userPrompt").text(data.question);
	$("#gameboard").empty();
	$("#gameboard").append("<tr>");

	var x;
	for (x = 0; x < data.options.length; ++x) {

		var tile = $("<div class='tile' data-index='"+x+"'></div>");
		tile.css("background-color", data.options[x]);
		tile.click(chooseTile);
		$("#gameboard tr").append(tile);
    }

}

function chooseTile(){

	var choice = $(this).attr("data-index");

	$.ajax({
		method:"GET",
		url:"/colors/choice",
		data: {'username':user, 'choice':choice},
		success: displayGame,
		dataType:'json'
	});

}

window.onload = load;