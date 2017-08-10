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
    App.Models.Product = Backbone.Model.extend({
        defaults: {
        "self_id": 0,
        "category": "",
        "title": "",
        "description": "",
        "price": 0,
        "moderate": true,
        "image": "img/no-photoI.gif"
        }
    });

    // вид товара
    App.Views.Product = Backbone.View.extend({
        tagName: 'div',
        className: 'item',
        template: App.template('productTemplate'),
        events: {
            'click .open-but' : function(){this.openProductModal('descriptionTemplate', '#descriptionModal');},
            'click .rewrite-but' : function(){this.openProductModal('rewriteTemplate', '#rewriteModal');},
            'click .remove-but' : 'removeProduct' 
           
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
        openProductModal: function(templId, modalId){
            // console.log(templId, modalId);
            $(modalId).remove();   
            var modal = new App.Views.Modal({model: this.model});
            $('.modal-windows').append(modal.render(templId, modalId).el);
        },
        removeProduct: function(){
            this.model.destroy();
            Products.productsView.render();
        }
    });

    // Modal windows
    App.Views.Modal = Backbone.View.extend({
        el: $('.modal-windows'),
        events: {
            'change input' : 'changeModel',
            'change select' : 'changeModel',
            'change textarea' : 'changeModel',
            'click .saveChanges': 'saveModel',
        },
        render: function(templId, modalId){
            this.modalId = modalId;
            this.template = App.template(templId);
            var template = this.template(this.model.toJSON());
            this.$el.append(template);
            Products.productsView.openModal(modalId);
            return this;
        },
        changeModel: function(ev){
            var target = ev.currentTarget;
            this.model.set(target.name,target.value,  {silent: true });
        },
        saveModel: function(){
            this.model.save({silent: false});
            Products.productsView.closeModal(this.modalId);
        }
    });

    // коллекция моделей товаров
    App.Collections.Product = Backbone.Collection.extend({
        model: App.Models.Product,
        localStorage: new Backbone.LocalStorage('goods'),
    });

    // коллекция видов товаров
    App.Views.Products = Backbone.View.extend({
        el: $(".shopContainer"),

        events: {
            'click .menu': 'changeGrid',
            'change input[name="paginate"]' : 'changePagination',
            'click .sendUserButton': 'changeUser',
            'click .sendAnonimUser' : 'logAnonimUser',
            'click .show-more' : 'showMore',
            'submit form[name="addItemForm"]': 'createNewProduct'
        },

        render: function(paginate) {
            $('.items-goods').empty();
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
            this.collection.fetch();
            if(category!=='all') {
                var g = this.collection.where({category: category});
                this.collection.set(g);
            } else {
                this.collection = this.collection;
            }
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
        },

        rebuildGrid: function(){
            $('.items-goods').empty();
            this.render();
        },

        createNewProduct: function(event){
            event.preventDefault();
            var self_id = Products.user.userId;
            var category = $('#itemCategory').val();
            var title = $('#itemAddTitle').val();
            var description = $('#itemAddDescr').val();
            var price = $('#itemAddPrice').val();
            var newModel = new App.Models.Product({self_id: self_id, category: category, title: title, description: description, price: price});
            this.collection.add(newModel, {at: 0});
            newModel.save();
            this.render();
            this.closeModal('#addItemModal');
        }
       
    });

    // GET data on first load
    // not recommended to use fetch() on first time
    function initApplication() {
        // get user
        Products.user = JSON.parse(localStorage.getItem('user'));
            if (Products.user === null) {
                Products.user = new User();
                localStorage.setItem("user", JSON.stringify(Products.user));
            }
        Products.productsCollection = new App.Collections.Product();
        Products.productsCollection.comparator= function(model) {
            return model.get("self_id");
        };
        // get goods
        Products.productsCollection.fetch();
         if (Products.productsCollection.length <= 0){
            $.ajax({
                url: "json/goods.json",
                success: function(result) {
                    Products.productsCollection.set(result);
                    Products.productsCollection.models.forEach(function(model){
                        model.save();
                    });
                    buildGrid();
                }
            });
         } 
        buildGrid();
    }

    // rebuilding grid
    function buildGrid() {
        console.log('building grid');
        Products.productsView = new App.Views.Products({ collection: Products.productsCollection });
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


