
$('#search').click(searchCountries);
$('#country-name').keydown( function(event) {
	if (event.which == 13) {searchCountries()};
})

function searchCountries() {
	var url = 'https://restcountries.eu/rest/v1/name/';
 	var countryName = $('#country-name').val();
	if (!countryName.length) countryName = 'Poland';

	var request = $.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList,
		error: hideCountriesList
	});

}

function showCountriesList(res) {
	var countriesList = $('#countries-list');
	var countryTable = $('.country-table').last().clone();
	var countriesListHeader = $('#countries-list-header');
	countriesList.empty();
	countriesList.css('display','flex');

	var countryName = $('#country-name').val() ? $('#country-name').val() : 'Poland';
	countriesListHeader.text('Search results matching \"' + countryName +'\"').css('display', 'block');

	res.forEach(function(item){
		
		// uzupełnianie danych tabeli
		countryTable.find('.country-name').text(item.name);
		countryTable.find('.capital').text(item.capital);
		countryTable.find('.land-area').text(item.area);
		countryTable.find('.population').text(item.population);
		countryTable.find('.currency').text(item.currencies.join(", "));
		countryTable.find('.languages').text(item.languages.join(", ")); 

		// dodanie tabeli do DOM
		countriesList.append( countryTable );
		
		// skopiowanie szablonu tabeli
		countryTable = $('.country-table').last().clone();

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