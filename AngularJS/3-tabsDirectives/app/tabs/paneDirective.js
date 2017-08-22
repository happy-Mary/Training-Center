tabsModule.directive('paneDirective', function(){
    return {
        restrict: 'E',
        transclude: true,
        template: '<div role="tabpanel" class="panel-content" ng-show="active" ng-transclude></div>',
        scope: {
            paneTitle: '='
        },
        require: '^tabsDirective',
        link: function($scope, element, attrs, ctrl) {
            $scope.active = false;
            ctrl.registerPane($scope);
            // console.log(element);
        }
    };
});
