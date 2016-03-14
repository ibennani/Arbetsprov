var app = angular.module('searchApp', []);


// SET API-variables
// Never mind what this does, it will get you some data to play with
var apiurl = "https://restcountries.eu/rest/v1/all"


app.controller('searchController', function($scope, $http) {

$scope.searchhistory = [] // contains the search history
$scope.showSearchHistory = false // Do not show that wrapper at start
    
	// Get the station list
	var contryObject
	// Create our own array using the station names
    var contryArray = []

	$http.get(apiurl).then(function(response) {
        contryObject = response.data;

        //console.log("contryObject")
        //console.log(contryObject)
        
        contryObject.forEach(function(contryObject){
        	//console.log(contryObject.name)
        	if (contryArray.indexOf(contryObject.name) == -1) {
        		contryArray.push(contryObject.name)
        		}
        })
    })
    // Remove duplicate items
	$scope.contryArray = contryArray
	// Function to save search


  $scope.searchsubmit = function() {
    // Get current date and time
	var currentTime = new Date()
	
	var year = currentTime.getFullYear() 
	var month = currentTime.getMonth()
	var day = currentTime.getDate()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	var seconds = currentTime.getSeconds()

	month++
	if (month < 10)
		month = "0"+month

	if (day < 10)
		day = "0"+day

	if (hours < 10)
		hours = "0"+hours

	if (minutes < 10)
		minutes = "0"+minutes

	if (seconds < 10)
		seconds = "0"+seconds

	currentDateTime = year+"-"+month+"-"+day+" "+hours+":"+minutes

    if(this.inputstring) {
    	
	    $scope.searchhistory.push({name: this.inputstring, 
	    							time: currentDateTime});
	    $scope.inputstring = ""
	    this.inputstring = ""
	    $scope.showSearchHistory = true

    }
  };
})