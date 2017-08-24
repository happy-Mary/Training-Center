angular.module('calculator', [])
.controller('makeCalculation', function($scope){
    $scope.z = 0;
    $scope.makeSum = function(){
        $scope.z =  $scope.x + $scope.y;
        return $scope.z;
    };
});