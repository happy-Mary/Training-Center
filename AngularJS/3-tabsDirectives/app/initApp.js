angular.module('tabsApp', ['tabsModule'])
.controller('mainCtrl', function($scope){
    $scope.hello = 'Glad to see you';
    $scope.tabsContent = [
        {title: 'title1', text: 'text1'},
        {title: 'title2', text: 'text2'},
        {title: 'title3', text: 'text3'},
        {title: 'title4', text: 'text4'}
    ];
    $scope.testM = "test text"
});