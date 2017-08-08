(function() {

    var LocalStorage = require('backbone.localstorage');

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
            'click .open-but' : 'openModal'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function(gridClass) {
            var template = this.template(this.model.toJSON());
            this.$el.addClass(gridClass);
            this.$el.html(template);
            return this;
        },
        openModal: function(){
            $('#descriptionModal').remove();   
            var modal = new App.Views.Modal({model: this.model});
            console.log(Products.productsView.collection);
            $('.modal-windows').append(modal.render().el);
        }
    });

    // коллекция моделей товаров
    App.Collections.Product = Backbone.Collection.extend({
        model: App.Models.Product,
    });

    // коллекция видов товаров
    App.Views.Products = Backbone.View.extend({
        el: $(".shopContainer"),

        events: {
            'click .menu': 'changeGrid',
            'change input[name="paginate"]' : 'changePagination',
            'click .sendUserButton': 'changeUser',
            'click .sendAnonimUser' : 'logAnonimUser',
            'click .show-more' : 'showMore'
        },

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
                        var productView = new App.Views.Product({ model: product });
                        var gridClass = "col-sm-" + gridCount;
                        var newItem = productView.render(gridClass).el;
                        row.append(newItem);
                        prod++;
                    }
                }
                $('.items-goods').append(row);
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
        },
        
        changeGrid: function(ev){
            $('.menu a.active').removeClass('active');
            $(ev.target).addClass('active');
            var category = $(ev.target).html();
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
            this.collection.set(goods);
            $('.items-goods').empty();
            $('body').append(this.render().el);    
        },

        changePagination: function(){
            $('.items-goods').empty();
            $('body').append(this.render().el);
        },

        changeUser: function(){
            var self = this;
            var name = $('#loginName').val();
            var password =  $('#loginPass').val();
            $.ajax({ url: "json/users.json", success: function(allUsers){
                var respond = '';
                    $.each(allUsers, function(i) {
                        console.log(allUsers[i].name);
                        console.log(allUsers[i].password);
                        if (allUsers[i].name === name && allUsers[i].password === password) {
                            respond = allUsers[i];
                            return false;
                        } else {
                            respond = "We didn't find you! <br/> Please try again.";
                        }
                    });  
                    ((typeof respond) === 'object') ? self.loginUser(respond) : $('.text-danger').html(respond);
                // callback end
                }
            // ajax end
            });
            // end func
        },
        
        loginUser: function(obj){
            Products.user = obj;
            localStorage.setItem("user", JSON.stringify(Products.user));
            $('.items-goods').empty();
            $('body').append(this.render().el);
            $('.loginButton').html("Hello, " + Products.user.name);
            this.closeModal('#loginModal');
        },

        logAnonimUser: function(){
            Products.user = new User();
            localStorage.setItem("user", JSON.stringify(Products.user));
            $('.items-goods').empty();
            // $('body').append(this.render().el);
            $('.shopContainer').append(this.render().el);
            $('.loginButton').html("Hello, " + Products.user.name);
            this.closeModal('#loginModal');
        },

        closeModal: function(modalId) {
            $(modalId).modal('hide');
        }, 

        openModal: function(modalId) {
            $(modalId).modal('show');
        },

        showMore: function() {
            console.log('show more but');
        }
       
    });

    // Modal windows
    // App.Models.Modal = Backbone.Model.extend({});
    App.Views.Modal = Backbone.View.extend({
        el: $('.modal-windows'),
        events: {
            'click .close' : 'closeThisModal'
        },
        render: function(){
            // console.log(this.model);
            this.model.set({title: "hello"});
            this.template = App.template('descriptionTemplate');
            var template = this.template(this.model.toJSON());
            this.$el.append(template);
            Products.productsView.openModal('#descriptionModal');
            return this;
        },
        closeThisModal: function(){
            Products.productsView.closeModal('#descriptionModal');
        }

    });




    // GET data on firs load
    // not recommended to use fetch() on first time
    function initApplication() {
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
        console.log('building grid');
        Products.productsView = new App.Views.Products({ collection: Products.productsCollection });
        // $('body').append(Products.productsView.render().el);
        $('.shopContainer').append(Products.productsView.render().el);
    }
    //first loading content
    initApplication();

    
     // User class
    function User(id, name, password, role) {
        this.userId = id || 0;
        this.name = name || "Anonim";
        this.password = password || null;
        this.role = role || "anonim";
    }

})();


