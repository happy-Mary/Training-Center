(function() {
    var App = {
        Models: {},
        Views: {},
        Collections: {},
    };

    var Products = {
        user: {}
    };

    App.template = function(id) {
        return _.template($('#' + id).html());
    }

    // модель товара
    App.Models.Product = Backbone.Model.extend({});
    // вид товара
    App.Views.Product = Backbone.View.extend({
        tagName: 'div',
        className: 'item',
        template: App.template('productTemplate'),
        events: {
            'click .open-but' : function(){console.log(this.model.get('title'));}
        },
        render: function(gridClass) {
            var template = this.template(this.model.toJSON());
            this.$el.addClass(gridClass);
            this.$el.html(template);
            return this;
        }
    });

    // коллекция моделей товаров
    App.Collections.Product = Backbone.Collection.extend({
        model: App.Models.Product,
        changeCategory: function(category){
            var obj = JSON.parse(localStorage.getItem('goods'));
            var goods = [];
            if(category!=='all') {
                for (var i = 0; i <= obj.length - 1; i++) {
                    if (obj[i].category === category) {
                        goods.push(obj[i]);
                    }
                }
            } else {
                goods = obj;
            }
            
            this.set(goods);
            buildGrid();
        }
    });

    // коллекция видов товаров
    App.Views.Products = Backbone.View.extend({
        tagName: 'div',
        className: 'container',

        render: function(paginate) {

            var all = this.collection.length;
        
            var itemCount = parseInt(paginate) || parseInt($('input[name="paginate"]:checked').val());
            var gridCount = 12 / itemCount;
            // количество рядов
            var countRows = Math.ceil(all / itemCount);

            for (var prod = 0, r = 1; r <= countRows; r++) {
                var row = $('<div class = "row"></div>');
                for (var i = 1; i <= itemCount; i++) {
                    if (prod > all - 1) { this.$el.append(row); } else {
                        var product = this.collection.models[prod];
                        // product set attributes
                        this.checkAccess(product, Products.user);
                        // console.log(product);
                        var productView = new App.Views.Product({ model: product });
                        var gridClass = "col-sm-" + gridCount;
                        var newItem = productView.render(gridClass).el;
                        row.append(newItem);
                        prod++;
                    }
                }
                this.$el.append(row);
            }
            return this;
        },

        checkAccess: function(model, user){
            model.set('readible', 'true');
            model.set('rewritable', 'false');
            model.set('removable', 'false');
            model.set('addible', 'false');
           
            if (user.role === 'admin') {
                model.set('rewritable', 'true');
                model.set('removable', 'true');
                model.set('addible', 'true');
            } else if(user.role === 'user'&& user.userId !== model.get('self_id')){
                model.set('addible', 'true');
            } else if(user.role === "user" && user.userId === model.get('self_id') || user.role === "admin" && user.userId === model.get('self_id')){
                // для админа оставить только лэйбу
                // itemOwn.css('display', 'block');
                model.set('addible', 'true');
                model.set('rewritable', 'true');
                model.set('removable', 'true');
            }
             return model;
        }
       
    });


    // GET data on firs load
    // not recommended to use fetch() on first time
    function getGoodsFirstTime() {
        Products.productsCollection = new App.Collections.Product();
         // get user
        Products.user = JSON.parse(localStorage.getItem('user'));
        if (Products.user === null) {
            Products.user = new User();
            localStorage.setItem("user", JSON.stringify(Products.user));
        }
        // get goods
        var goods = JSON.parse(localStorage.getItem('goods'));
         if (goods === null){
            $.ajax({
                url: "json/goods.json",
                success: function(result) {
                    localStorage.setItem('goods', JSON.stringify(result));
                    Products.productsCollection.set(result);
                    buildGrid();
                }
            });
         } else {
            Products.productsCollection.set(goods);
            buildGrid();
        }
    }
    // rebuilding grid
    function buildGrid() {
        Products.productsView = new App.Views.Products({ collection: Products.productsCollection });
        $('.items-goods').html(Products.productsView.render().el);
    }

    // внешние события
    // change grid
    $('.menu a').click(function() {
            $('.menu a.active').removeClass('active');
            $(this).addClass('active');

            var category = $(this).html();
            Products.productsCollection.changeCategory(category);
    });
    // grid pagination
    var paginateRadio = $('input[name="paginate"]');
    paginateRadio.change(function() { 
        Products.productsView.remove(); 
        Products.productsView = new App.Views.Products({ collection: Products.productsCollection });
        $('.items-goods').html(Products.productsView.render().el); 
    });
    // change user
    $('.sendUserButton').click(function(){
        var name = $('#loginName').val();
        var password =  $('#loginPass').val();
        changeUser(name, password);
    });

      //first loading content
        getGoodsFirstTime();

    
     // User class
    function User(id, name, password, role) {
        this.userId = id || 0;
        this.name = name || "Anonim";
        this.password = password || null;
        this.role = role || "anonim";
    }

    // ????? создать вью для общего контейнера ???
    var closeModal = function(modalId) {
        $(modalId).modal('hide');
    }

    var openModal = function(modalId) {
        $(modalId).modal('show');
    }

    function changeUser(name, password) {
        $.ajax({ url: "json/users.json", success: checkUser });
        
            function checkUser(allUsers) {
                $.each(allUsers, function(i) {
                if (allUsers[i].name === name && allUsers[i].password === password) {
                    Products.user = allUsers[i];
                    localStorage.setItem("user", JSON.stringify(Products.user));
                    buildGrid();
                    closeModal('#loginModal');
                    return false;
                } else {
                    $('.text-danger').html("We didn't find you! <br/> Please try again.");
                }
            });     
        }
    }


})();