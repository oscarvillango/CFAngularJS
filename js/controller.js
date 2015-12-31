/* First App AngularJS */

var app = angular.module("MyFirstApp", []);

app.controller("firstController", function($scope){
	$scope.nombre = "Oscar";
});


/* ng-Model */
var app = angular.module("NgModelApp", []);

app.controller("ngmFirstController", function($scope){
	$scope.nombre = "Oscar";
	$scope.nuevoComentario = {};
	$scope.comentarios = [
		{
			comentario : "Primer comentario",
			usuario : "User 1"
		},
		{
			comentario : "Segundo comentario",
			usuario : "User 2"
		}
	];

	$scope.agregarComentario = function(){
		$scope.comentarios.push($scope.nuevoComentario);
		$scope.nuevoComentario = {};
	}
});

/* Dependency Inyection */

var appDI = angular.module("DIApp", []);

appDI.controller("depInyFirstController", ["$scope", function(m){
	m.nombre = "Oscar";
	m.nuevoComentario = {};
	m.comentarios = [
		{
			comentario : "Primer comentario",
			usuario : "User 1"
		},
		{
			comentario : "Segundo comentario",
			usuario : "User 2"
		}
	];

	m.agregarComentario = function(){
		m.comentarios.push(m.nuevoComentario);
		m.nuevoComentario = {};
	}
}]);

/* Ajax in AngularJS */

var ajaxApp = angular.module("ajaxApp", []);

ajaxApp.controller("ajaxController", ["$scope", "$http", function(m, h){
	m.posts = [];
	h.get("http://jsonplaceholder.typicode.com/posts")
		.success(function(data){
			console.log(data);
			m.posts = data;
		})
		.error(function(err){
			console.log(err);
		});

}]);

/* Ajax - Post in AngularJS */

var ajaxPostApp = angular.module("ajaxPostApp", []);

ajaxPostApp.controller("ajaxPostController", ["$scope", "$http", function(m, h){
	m.posts = [];
	m.newPost = {};
	h.get("http://jsonplaceholder.typicode.com/posts")
		.success(function(data){
			console.log(data);
			m.posts = data;
		})
		.error(function(err){
			console.log(err);
		});

	m.addPost = function(){
		h.post("http://jsonplaceholder.typicode.com/posts", {
			title: m.newPost.title,
			body: m.newPost.body,
			userId: 1
		})
		.success(function(data, status, headers, config){
			m.posts.push(m.newPost);
			console.log(data);
			m.newPost = {};
		})
		.error(function(err){
			console.log(err);
		});
	}
}]);