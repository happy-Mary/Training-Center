function VM(appObj) {
    var self = this;
    // Product class
    function newProduct(obj) {
        var obj = obj || {};
        this.self_id = (obj.self_id) ? ko.observable(obj.self_id) : ko.observable(0);
        this.category = (obj.category) ? ko.observable(obj.category) : ko.observable("");
        this.title = (obj.title) ? ko.observable(obj.title) : ko.observable("");
        this.description = (obj.description) ? ko.observable(obj.description) : ko.observable("");
        this.price = (obj.price) ? ko.observable(obj.price) : ko.observable(0);
        this.moderate = (obj.image) ? ko.observable(obj.moderate) : ko.observable(true);
        this.image = (obj.image) ? ko.observable(obj.image) : ko.observable("img/no-photoI.gif");
    }

    // sorting array to show users products first(on setting list and changeUser)
    self.sortInitialArray = function(arr) {
        arr.forEach(function(item, index) {
            if (item.self_id === self.user().userId) {
                var el = arr.splice(index, 1);
                arr.unshift(el[0]);
            }
        });
    };

    self.user = ko.observable(appObj.user);

    if (self.user().name) {
        self.sortInitialArray(appObj.products);
    }
    // initial products array
    self.list = ko.observableArray(appObj.products);

    // products with observable items by BuildData function
    self.resultProd;

    // link to current product
    self.currentProd = ko.observable({});
    // to show data to read about product
    self.readData = {
        title: ko.observable(),
        description: ko.observable(),
        image: ko.observable(),
        price: ko.observable()
    };

    self.rewriteData = ko.observable({});
    // current grid value
    self.checkedGridVal = ko.observable('4');
    // current row value
    self.currRowsToShow = ko.observable(4);
    // how much elements to show
    self.toShow = ko.computed(function() {
        var grid = self.currRowsToShow() * parseInt(self.checkedGridVal());
        return grid;
    }, self);

    self.BuildData = ko.computed(function() {
        var data = self.list();
        self.resultProd = ko.observableArray();
        for (var i in data) {
            var obj = data[i];
            var newP = new newProduct(obj);
            for (var k in newP) {
                newP[k].subscribe(function() {
                    localStorage.setItem('goods', ko.toJSON(self.resultProd()));
                });
            }
            self.resultProd.push(newP);
        }

        return self.resultProd;
    }, self);

    self.changeCategory = function(data, event) {
        var category = $(event.target).html();
        $('.menu').find(".active").removeClass("active");
        $(event.target).addClass('active');
        if (category === "all") {
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

    self.newUser = function(data, event) {
        event.preventDefault();
        var name = $("#loginName").val();
        var password = $("#loginPass").val();

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
                    ((typeof respond) === 'object') ? self.loginUser(respond): $('.error-login').html(respond);
                    // callback end
                }
                // ajax end
        });
        // end func
    };

    self.loginUser = function(obj) {
        // cleaning input fields
        $("#loginName").val("");
        $("#loginPass").val("");
        $('.error-login').html("");
        self.user(obj);
        self.sortInitialArray(appObj.products);
        self.list(appObj.products);
        modals.loginClose();
    };

    self.anonimUser = function() {
        self.user('');
        modals.loginClose();
    }

    self.readProduct = function(product) {
        self.readData.title(product.title());
        self.readData.description(product.description());
        self.readData.image(product.image());
        self.readData.price(product.price());
        modals.readOpen();
    };

    self.rewriteProduct = function(product) {
        var obj = {};
        for (key in product) {
            obj[key] = product[key]();
        }
        self.rewriteData(obj);
        self.currentProd = product;
        modals.rewriteOpen();
    };

    self.saveRewriteProduct = function(data, event, product) {
        event.preventDefault();
        for (key in self.rewriteData()) {
            var result = self.rewriteData()[key];
            self.currentProd[key](result);
            modals.rewriteClose();
        }
        self.currentProd = ko.observable({});
    };

    self.removeProduct = function(data, product) {
        self.resultProd.remove(data);
    };

    self.addProduct = function(product) {
        modals.addOpen();
        var obj = { self_id: self.user().userId };
        self.currentProd(new newProduct(obj));
    };

    self.saveProduct = function(data, event) {
        event.preventDefault();
        self.resultProd.unshift(self.currentProd());
        modals.addClose();
        self.currentProd(new newProduct());
    };

    self.showMore = function() {
        var currNum = self.currRowsToShow();
        currNum++;
        self.currRowsToShow(currNum);
    };

    self.resultProd.subscribe(function() {
        localStorage.setItem('goods', ko.toJSON(self.resultProd()));
    }, self);

    self.user.subscribe(function() {
        localStorage.setItem('user', ko.toJSON(self.user()));
    }, self)

}