var myApp = angular.module('myApp', []);
myApp.controller('firstCtrl', firstController);
myApp.controller('secondCtrl', secondController);

function firstController($scope){
	$scope.obj = {a: 5};
}

function secondController($scope){
	
}
