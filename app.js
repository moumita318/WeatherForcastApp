// MODULE 
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);


//ROUTES
weatherApp.config(function( $routeProvider){
	$routeProvider

	.when('/',{
		templateUrl:'Home.html',
		controller:'homeController'
	})

	.when('/Forecast',{
		templateUrl:'Forecast.html',
		controller:'ForecastController'
	})

	.when('/forecast/:days',{
		templateUrl:'pages/forecast.html',
		controller:'forecastController'
	})
});
//SERVICES
weatherApp.service('cityService', function(){

	this.city="New York, NY"

});
//controllers
weatherApp.controller('homeController',['$scope','cityService',function($scope, $cityService){
$scope.city = cityService.city;

$scope.$watch('city',function(){
	cityService.city = $scope.city;

});
}]);

weatherApp.controller('ForecastController',['$scope','cityService','$resource','$routeParams',function($scope,$resource,$routeParams,$cityService){
	
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || 2;

	$scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=YOURAPIKEY", {
		callback: "JSON_CALLBACK" }, {get:{ method:"JSON"}});
	
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt:$scope.days});


 $scope.convertToFahrenheit = function(degk) {
 	return Math.round((1.8 * (degk -273)) + 32);
 }

 $scope.convertToFahrenheit=function(dt){
 	return new Date(dt * 1000);
 };
 

 }]);

//DIRECTIVES
weatherApp.directive("weatherReport",function() {
	return{
		restrict: 'E',
		templateUrl:'directives/weatherReport.html',
		replace:true,
		scope:{
			weatherDay:"=",
			convertToStandard:"&",
			convertToDate:"&",
			dateFormat:"@"
		}
	}
})