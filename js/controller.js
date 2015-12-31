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