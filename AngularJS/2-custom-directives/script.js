{
    "vsicons.presets.angular": false
}   $scope.text = "I'm the main text and I'm glad you're reading me";
    $scope.open = false;
    $scope.closeModal = function() {
        $scope.open = false;
    }
});

myApp.directive('modal', function() {
    return {
        scope: {
            'titleCountry': "@",
            'close': "&onClose"
        },
        templateUrl: "modalTempl.html",
        transclude: true,
        replace: true
    }
});