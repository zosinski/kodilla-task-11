
$('#btn-search').click(searchCountries);
$('#btn-search').prop('disabled',true).addClass('btn-disabled');
// $('#input-country-name').change(function(event){
// });
$('#input-country-name').keyup( function(event) {
	if ($(this).val().length > 2) {
		$('#btn-search').prop('disabled',false).removeClass('btn-disabled');
		if (event.which == 13) {searchCountries()};
		return
	}
	$('#btn-search').prop('disabled',true).addClass('btn-disabled');
});

function searchCountries() {
	var url = 'https://restcountries.eu/rest/v1/name/';
 	var searchString = $('#input-country-name').val();
	if (!searchString.length) searchString = 'Poland';

	var request = $.ajax({
		url: url + searchString,
		method: 'GET',
		success: showCountriesList,  // KONRAD: jak przekazać do funkcji showCountriesList parametr searchString?
		error: hideCountriesList
	});

}

function showCountriesList(res, searchString) {
	var countriesList = $('#countries-list');
	var countryTable = $('.country-table').last().clone();
	var countriesListHeader = $('#countries-list-header');
	countriesList.empty();
	countriesList.css('display','flex');

	var countryName = $('#country-name').val() || 'Poland';
	countriesListHeader.text('Search results matching \"' + countryName +'\"').css('display', 'block');

	res.forEach(function(country){
		
		// czy szukana fraza zawiera się w głównej nazwie kraju
		// if (country.name.search(searchString) !== -1) {
			// uzupełnianie danych tabeli
			countryTable.find('.country-flag').children('img').attr('src','http://www.geonames.org/flags/x/'
				+ country.alpha2Code.toLowerCase() +'.gif');
			countryTable.find('.country-name').children('h3').text(country.name);
			countryTable.find('.capital').text(country.capital);
			countryTable.find('.land-area').text(country.area);
			countryTable.find('.population').text(country.population);
			countryTable.find('.currency').text(country.currencies.join(", "));

			var languagesFullNames = [];
			country.languages.forEach(function(languageCode){
				// languageFullName = 
				languagesFullNames.push( getLanguageFullName(languageCode) );
			});
			
			countryTable.find('.languages').text(languagesFullNames.join(", ")); 
			// countryTable.find('.languages').text(item.languages.join(", ")); 

			// dodanie tabeli do DOM
			countriesList.append( countryTable );
			
			// skopiowanie szablonu tabeli
			countryTable = $('.country-table').last().clone();
			
		// }  


	});
}

function hideCountriesList(jqXHR) {
	$('#countries-list').css('display', 'none');
	$('#countries-list-header').css('display', 'none');

	if (jqXHR.status === 404) {
		var alert = $('#search-alert').addClass('alert alert-danger').text('No match. Try again.');
		alert.show('fast');
		setTimeout( function() {alert.hide('slow')}, 3000 ); 	
	}
}