$(document).ready(function() {

	var tweetLink = "https://twitter.com/intent/tweet?text=";
	var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";

	getQuote();
	
	$('.trigger').click(function() {
		getQuote();
	});

	function getQuote() {
		$.getJSON(quoteUrl, createTweet);
	}

	function createTweet(input) { // KONRAD: Jak jest przekazywany obiekt input, skoro nie ma go przekazanego w funkcji getQuote;
		input.quoteAuthor = !input.quoteAuthor.length ? 'Unknown author' : input.quoteAuthor;

		var tweetText = 'Quote of the day: "' + input.quoteText + '", Author: ' + input.quoteAuthor;

		if (tweetText.length > 140) {
			getQuote();
		} else {
			var tweet = tweetLink + encodeURIComponent(tweetText);
			var quote = '\"' + input.quoteText + '\"';
			$('.quote').text(quote);
			$('.author').text(input.quoteAuthor);
			$('.tweet').attr('href', tweet);
		}
	}

});