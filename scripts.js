
$('#btn-search').click(searchCountries);
$('#btn-search').prop('disabled',true).addClass('btn-disabled');
$('#input-country-name').keyup( function(event) {
	if ($(this).val().length > 2) {
		$('#btn-search').prop('disabled',false).removeClass('btn-disabled');
		if (event.which === 13) {searchCountries()};
		return
	}
	$('#btn-search').prop('disabled',true).addClass('btn-disabled');
	if (event.which === 13) showAlert('Query needs to be at least 3 characters long.');
});
$('#input-country-name').focus();


var searchCountries = () => {
	const url = 'https://restcountries.eu/rest/v1/name/';
 	const searchString = $('#input-country-name').val().toLowerCase();

	$.ajax({
		url: url + searchString,
		method: 'GET',
		success: response => {
			const responseFiltered = filterNarrowMatchingCountries(response, searchString);
			if (responseFiltered.length) {
				showCountriesList(responseFiltered, searchString);
				return;
			};
			hideCountriesList();
			showAlert('No match. Try again.');
		},
		error: response => {
			hideCountriesList();
			if (response.status === 404) { showAlert('No match. Try again.'); }
		}
	});

}

var filterNarrowMatchingCountries = (response, searchString) => {
	// zwraca kraje, dla których szukana fraza zawiera się w głównej nazwie kraju
	var isMatchingPrimaryName = country => {
		const countryName = country.name.toLowerCase();
		return (country.name.toLowerCase().indexOf(searchString) !== -1);
	};

	return response.filter(isMatchingPrimaryName);
}


var showCountriesList = (responseFiltered, searchString) => {
	const countriesList = $('#countries-list');
	const countriesListHeader = $('#countries-list-header');
	let countryTable = $('.country-table').last().clone();
	countriesList.empty();
	countriesList.css('display','flex');

	countriesListHeader.text('Search results matching \"' + searchString +'\"').css('display', 'block');

	responseFiltered.forEach( (country) => {
	
		// uzupełnianie danych tabeli ;
		countryTable.find('.country-flag').children('img').attr('src','http://www.geonames.org/flags/x/'
			+ country.alpha2Code.toLowerCase() +'.gif');
		countryTable.find('.country-name').children('h3').text(country.name);
		countryTable.find('.capital').text(country.capital);
		countryTable.find('.land-area').text(country.area);
		countryTable.find('.population').text(country.population);
		countryTable.find('.currency').text(country.currencies.join(", "));

		const languagesFullNames = country.languages.map( getLanguageFullName );
		countryTable.find('.languages').text(languagesFullNames.join(", "));  

		// dodanie tabeli do DOM
		countriesList.append( countryTable );
		
		// skopiowanie szablonu tabeli
		countryTable = $('.country-table').last().clone();
			
	});
}

var hideCountriesList = () => {
	$('#countries-list').css('display', 'none');
	$('#countries-list-header').css('display', 'none');
}

var showAlert = message => {
	const alert = $('#search-alert').addClass('alert alert-danger').text(message);
	alert.show('fast');
	setTimeout( () => {alert.hide('slow')}, message.length * 100 ); 	
}