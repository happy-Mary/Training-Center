function Model() {

    myView = null;
    myDom = null;
    this.user = null;

    this.grid = {
        category: "all"
    };

    this.Set = function(view, container) {
        myView = view;
        myDom = container;
    }

    // starting an app
    this.initApp = function() {
        var self = this;

        // checking goods in LS, if server - ajax request all the time
        var goods = localStorageObj.get("goods");

        if (goods === null){
             $.ajax({
                    url: "json/goods.json",
                    success: function(result) {
                        console.log('result');
                        console.log(result);
                        localStorageObj.save("goods", result);

                        self.user = self.getCurrUser.call(self);
                        myView.buildGoods(self.user);
                    }
                });
        } else {
            self.user = self.getCurrUser.call(self);
            myView.buildGoods(self.user);
        }
    }

    // check user in LS
    this.getCurrUser = function() {
        var user = localStorageObj.get("user");
        if (user === null) {
            var user = new User();
            localStorageObj.save("user", user);
        }
        if (user.role !== 'anonim') {
            myView.greetUser(user);
        }
        return user;
    }

    // getting, setting, deleting products
    this.getCurrentItem = function(itemId) {
        var itemId = parseInt(itemId);
        var goods = localStorageObj.get('goods');
        var result;
        $.each(goods, function(i) {
            if (goods[i].itemId == itemId) {
                result = goods[i];
                return false;
            }
        });
        return result;
    }

    this.setCurrentItem = function(obj, itemId) {
        var itemId = parseInt(itemId);
        var goods = localStorageObj.get('goods');

        $.each(goods, function(i) {
            if (goods[i].itemId == itemId) {
                goods[i] = obj;
                return false;
            }
        });
        localStorageObj.save("goods", goods);
    }

    this.deleteCurrentItem = function(itemId) {
        var itemId = parseInt(itemId);
        var goods = localStorageObj.get('goods');
        $.each(goods, function(i) {
            if (goods[i].itemId == itemId) {
                goods.splice(i, 1);
                return false;
            }
        });
        localStorageObj.save("goods", goods);
    }

    // log in methods
    this.changeUser = function(name, password) {
        var self = this;
        $.ajax({ url: "json/users.json", success: checkUser });

        function checkUser(allUsers) {
            var serverRespond;
            $.each(allUsers, function(i) {
                if (allUsers[i].name === name && allUsers[i].password === password) {
                    serverRespond = allUsers[i];
                    return false;
                } else {
                    serverRespond = "We didn't find you! <br/> Please try again.";
                }
            });
            self.getUser(serverRespond);
        }
    }

    this.getUser = function(userObj) {
        if ((typeof userObj) !== 'object') {
            myView.showErrorLogin(userObj);
        } else {
            localStorageObj.save("user", userObj);
            this.user = this.getCurrUser();
            myView.buildGoods(this.user);
            myView.greetUser(userObj);
            myView.closeModal('#loginModal');
        }
    }

    this.setAnonimUser = function(){
        var user = new User();
        this.getUser(user);
    }

    

    // change category
    this.changeCategory = function(newCategory) {
        this.grid.category = newCategory;
        myView.buildGoods(this.user);
    }

    // change grid
    this.changeGrid = function() {
        myView.buildGoods(this.user);
    }

    // manipulating products
    this.readItem = function(itemId) {
        var result = this.getCurrentItem(itemId);
        myView.showItemContent(result);
    }

    this.getRewriteItem = function(itemId) {
        var result = this.getCurrentItem(itemId);
        myView.openRewriteWindow(result);
    }

    this.saveRewriteItem = function(itemId) {
        var result = this.getCurrentItem(itemId);
        result.title = $('#itemRewriteTitle').val();
        result.description = $('#itemRewriteDescr').val();
        result.price = $('#itemRewritePrice').val();
        this.setCurrentItem(result, itemId);
        myView.buildGoods(this.user);
        myView.closeModal('#rewriteModal');
    }

    this.addItem = function(itemId, category, title, description, price) {
        var goods = localStorageObj.get("goods");
        var id = this.getCurrUser().id;
        var newItem = new Item(id, itemId, category, title, description, price);
        this.moderateItem(newItem);
        goods.unshift(newItem);
        localStorageObj.save("goods", goods);
        myView.buildGoods(this.user);
        myView.closeModal('#addItemModal');
    }


    this.removeItem = function(itemId) {
        var answer = confirm("Are your sure you want to DELETE this product ?");
        if (!answer) {
            return false;
        }
        this.deleteCurrentItem(itemId);
        myView.buildGoods(this.user);
    }

    // show more products
    this.changeCoutToShow = function() {
        myView.showMore();
    }

    // auto-moderating new product
    this.moderateItem = function(item) {
        item.moderate = true;
    }
    // class end
}
