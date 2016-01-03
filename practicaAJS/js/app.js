angular.module("FinalApp",["lumx","ngRoute", "ngResource"])
	.config(function($routeProvider){
		$routeProvider
			.when("/", {
				controller: "mainController",
				templateUrl: "templates/home.html"
			})
			.when("/post/:id", {
				controller: "postController",
				templateUrl: "templates/post.html"
			})
			.when("/posts/new", {
				controller: "newPostController",
				templateUrl: "templates/new-post.html"
			})
			.when("/posts/edit/:id", {
				controller: "postController",
				templateUrl: "templates/new-post.html"
			})
	});