var url = 'http://api.icndb.com/jokes/random';
var button = document.getElementById('btn-get-joke');
var paragraph = document.getElementById('joke');

getJoke();

button.addEventListener('click', function(){
	getJoke();
});

function getJoke() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.addEventListener('load', function(){
		var response = JSON.parse(xhr.response);
		paragraph.innerText = response.value.joke;
	});
	xhr.send();
}
