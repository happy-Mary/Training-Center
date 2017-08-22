tabsModule.directive('tabsDirective', function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'app/tabs/tabset.html',
        scope: {
            tabsTitle: '@',
            tabsInfo: '=info'
        },
        controller: ['$scope', function($scope){
            var vm = this;
            $scope.panes = [];
            vm.registerPane = function(pane){
                $scope.panes.push(pane);
                if($scope.panes.length === 1) {
                    pane.active = true;
                }
            };

            $scope.select = function(currtab){
                angular.forEach($scope.panes, function(pane) {
                    if(pane.active && pane !== currtab) {
                        pane.active = false;
                    }
                });
                currtab.active = true;
            };

            
        }]
    };
});