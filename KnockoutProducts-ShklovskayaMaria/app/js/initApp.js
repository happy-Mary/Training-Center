
var localStorageObj = (function(){
    return {
        save: function(name, obj) {
            localStorage.setItem(name, JSON.stringify(obj));
            },
        get: function(name) {
            return JSON.parse(localStorage.getItem(name));
            }
        };
})();


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
            $(".loginButton").html("Hello, "+user.name);
        }
        
        // checking goods in LS, if server - ajax request all the time
        var goods = localStorageObj.get("goods");
        if (goods === null){
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

        function runApp(){
             ko.applyBindings(new VM(appData));
        }
    };

    initApp();
    

function VM(appObj){
    var self = this;
    self.list = ko.observableArray(appObj.products);
    self.user = ko.observable(appObj.user);
    self.currentProd = ko.observable({});
    self.res = ko.observableArray();


    self.readData = {
        title: ko.observable(),
        description: ko.observable(),
        image: ko.observable(),
        price: ko.observable()
    };

    self.rewriteData = ko.observable({});

    self.TableData = ko.computed(function() {
        var data = ko.unwrap(self.list);
        for (var i in data){
        var obj = data[i];
            self.res.push({
                self_id: ko.observable(obj.self_id),
                category: ko.observable(obj.category),
                title: ko.observable(obj.title),
                description: ko.observable(obj.description),
                price: ko.observable(obj.price),
                moderate: ko.observable(obj.moderate),
                image: ko.observable(obj.image)
            });   
        }
        return self.res;
    }, self);

    self.changeCategory = function(data, event){
        var category = $(event.target).html();
        $('.menu').find(".active").removeClass("active");
        $(event.target).addClass('active');
        if(category==="all"){
            self.list(appObj.products);
        } else {
            var arr = [];
            for (var i = 0; i <= appObj.products.length - 1; i++) {
                if (appObj.products[i].category === category) {
                    arr.push(appObj.products[i]);
                }
            }
            self.list(arr);
        }
    };

    self.changeGrid = function(data, event) {
        var cls = $(event.target).attr('id');
        $('.items-goods').removeClass('show4 show2 show6').addClass(cls);
    };

    self.newUser = function(data, event){
        event.preventDefault();
        var name = $("#loginName").val();
        var password = $("#loginPass").val();
        console.log(name);
        console.log(password);

        $.ajax({
            url: "json/users.json",
            success: function(allUsers) {
                    var respond = '';
                    $.each(allUsers, function(i) {
                        if (allUsers[i].name === name && allUsers[i].password === password) {
                            respond = allUsers[i];
                            return false;
                        } else {
                            respond = "We didn't find you! <br/> Please try again.";
                        }
                    });
                    ((typeof respond) === 'object') ? self.loginUser(respond) : $('.error-login').html(respond);
                    // callback end
                }
                // ajax end
        });
        // end func
    };

    self.loginUser = function(obj){
        self.user(obj);
        localStorageObj.save("user", obj);
         $(".loginButton").html("Hello, " + self.user().name);
        var loginModal = $('[data-remodal-id=loginModal]').remodal();
        loginModal.close();
    };

    self.readProduct = function(product){
        self.readData.title(product.title());
        self.readData.description(product.description());
        self.readData.image(product.image());
        self.readData.price(product.price());
        var readModal = $('[data-remodal-id=readModal]').remodal();
        readModal.open();
    };

    self.rewriteProduct = function(product){
        var obj = {};
        for(key in product) {
            obj[key] = product[key]();
        }
        self.rewriteData(obj);
        self.currentProd=product;

        var rewriteModal = $('[data-remodal-id=rewriteModal]').remodal();
        rewriteModal.open();
    };

    self.saveRewriteProduct = function(data, event, product){
        event.preventDefault();

        for(key in self.rewriteData()){
            var result = self.rewriteData()[key];
            self.currentProd[key](result);
            var rewriteModal = $('[data-remodal-id=rewriteModal]').remodal();
            rewriteModal.close();
        }
       
    };

    self.removeProduct = function(data, product){
        console.log(self.res());
        self.res.remove(data);
    };

    self.addProduct = function(){

    }

   

}

// create modals object with initialisation



