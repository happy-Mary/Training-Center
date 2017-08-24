describe('calculator', function(){
    var $controller;
    beforeEach(module('calculator'));
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    it('first meaning is zero', function(){
         var $scope = {};
        var controller = $controller('makeCalculation', { $scope: $scope });
        expect($scope.z).toEqual(0);
    });

    it('1+2 seems to be 3', function(){
      var $scope = {};
      var controller = $controller('makeCalculation', { $scope: $scope });
      $scope.x = 1;
      $scope.y = 2;
      expect($scope.makeSum()).toEqual(3);
    });
});