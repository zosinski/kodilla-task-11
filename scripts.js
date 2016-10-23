var url = 'http://api.icndb.com/jokes/random';
var button = $('#btn-get-joke');
var paragraph = $('#joke');

getJoke();

button.click(function(){
	getJoke();
});

function getJoke() {
	$.ajax({
		method: 'GET',
		url: url,
		success: function (res) {
			paragraph.text(res.value.joke);
		}
	});

	// var xhr = new XMLHttpRequest();
	// xhr.open('GET', url);
	// xhr.addEventListener('load', function(){
	// 	var response = JSON.parse(xhr.response);
	// 	paragraph.innerText = response.value.joke;
	// });
	// xhr.send();
}
