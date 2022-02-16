/* Scripts by James DeWalt, 2022 */
//this calls the cities function when the script loads
function initialize(){
	cities(); 

};
//this function is used to create a table with some cities and their population
function cities(){
    //defined two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];
	//this creates a table element
	var table = document.createElement("table");

	//this creates a header row element and appends it to the table
	var headerRow = document.createElement("tr");
	table.appendChild(headerRow);

	//this creates the "City" and "Population" column headers
	headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")
	
	//this uses a loop to add a new row for each city
cityPop.forEach(function(cityObject){
		
		// this assigns longer html strings to a variable
		var rowHtml = "<tr><td>" + cityObject.city + "</td><td>" + cityObject.population + "</td></tr>";
		//this adds the row's html string to the table
		table.insertAdjacentHTML('beforeend',rowHtml);
	})
	
	//this appends the table element to the div
	document.querySelector("#mydiv").appendChild(table);

    addColumns(cityPop);
    addEvents();

};

//this function is used to add the city size column to the table
function addColumns(cityPop){
    
	// this selects all the column rows
	var rows = document.querySelectorAll("tr")
	
	// this loop adds a column for each row
	document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>'); // fixed incorrect spelling of adjacent
    	} else {
			// this determines the size based on total population there
    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';  // fixed misspelled variable name citysize

    		} else {
    			citySize = 'Large';
    		};
				//this adds a new table cell with the city size
				var newRow = document.createElement('td')
				newRow.innerHTML = citySize
				//this appends the city size cell to table
				row.appendChild(newRow)	
			row.insertAdjacentHTML = '<td' + citySize + '</td>'; // fixed incorrect spelling of adjacent
    	};
    });
};

// this function adds mouse events. Fun Fun!
function addEvents(){

	// This selects the table element
	table = document.querySelector("table");
	
	// adds a mouseover event for the table
	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};

	}
		//this gives the style table a random color. Creates rainbow when you hover over the tables
		table.style.color = color;


		
	}); // added additional bracket to close off function properly

	//this function is used to display text if you click on a table element
	function clickme(){

		alert('Hey, you clicked me!');
	};
	//this adds the event for clicking on a table element
	table.addEventListener("click", clickme)

};

function debugAjax(){

	var myData; // variable to hold data
	console.log(myData) //undefined console outside the callback
	fetch("data/megacities.geojson") //basic fetch
		.then(function(response){
			return response.json(); // this converts data to usable form
		})
		.then(callback) // retrieves data to a callback
		myData = response;
		console.log(myData); // console log executed within the callback
};

//this defines the callback function
function callback(response){
	myData = response
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', "GeoJSON data: "  + JSON.stringify(response)); // stringify the response and the displays "GeoJSON data: 
};





//this calls the initialize and debug functions
document.addEventListener('DOMContentLoaded',initialize)
document.addEventListener('DOMContentLoaded',debugAjax)
