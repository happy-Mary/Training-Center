angular.module('demo', ['calculator'])
.factory('greeter', function() {
  return {
    getGreeting: function(name) {
      return "Hello " + name;
    }
  };
});