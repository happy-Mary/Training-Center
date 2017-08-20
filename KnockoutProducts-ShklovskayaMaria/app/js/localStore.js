var localStorageObj = (function() {
    return {
        save: function(name, obj) {
            localStorage.setItem(name, JSON.stringify(obj));
        },
        get: function(name) {
            return JSON.parse(localStorage.getItem(name));
        }
    };
})();