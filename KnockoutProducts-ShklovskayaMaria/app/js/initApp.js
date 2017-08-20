// App 
var initApp = function() {
    var appData = {
        products: "",
        user: ""
    };

    // check user in LS
    var user = localStorageObj.get("user");
    if (user !== null) {
        appData.user = user;
    }

    // checking goods in LS
    var goods = localStorageObj.get("goods");
    if (goods === null) {
        getAjaxGoods();
    } else {
        appData.products = goods;
        runApp();
    }

    function getAjaxGoods() {
        $.ajax({
            url: "json/goods.json",
            success: function(result) {
                localStorageObj.save("goods", result);
                appData.products = result;
                runApp();
            }
        });
    }

    function runApp() {
        ko.applyBindings(new VM(appData));
    }
};

initApp();