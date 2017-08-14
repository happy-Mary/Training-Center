var myApp = angular.module('myApp', []);
myApp.controller('mainCtrl', function($scope){
    $scope.text = "I'm the main text and I'm glad you're reading me";
    $scope.open = false;
});

myApp.directive('modal', function(){
    return {
        scope: {
            'titleCountry': "@"
        },
        templateUrl: "modalTempl.html",
        transclude: true,
        replace: true
    }
});


