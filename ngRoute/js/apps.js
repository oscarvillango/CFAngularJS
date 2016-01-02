/* ng-Route in AngularJS */

angular.module("ngRouteApp", ["ngRoute"])
	.config(function($routeProvider){
		$routeProvider
			.when("/", {
				controller: "ngRouteController",
				templateUrl: "templates/home.html"
			})
			.when("/repo/:name", {
				controller: "repoController",
				templateUrl: "templates/repo.html"
			})
			.otherwise("/");
	});