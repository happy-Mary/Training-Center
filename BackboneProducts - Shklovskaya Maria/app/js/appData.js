var App = {
    Models: {},
    Views: {},
    Collections: {},
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
        'click .open-but': function() { this.openProductModal('descriptionTemplate', '#descriptionModal'); },
        'click .rewrite-but': function() { this.openProductModal('rewriteTemplate', '#rewriteModal'); },
        'click .remove-but': 'removeProduct'
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
    openProductModal: function(templId, modalId) {
        $(modalId).remove();
        var modal = new App.Views.Modal({ model: this.model });
        $('.modal-windows').append(modal.render(templId, modalId).el);
    },
    removeProduct: function() {
        this.model.destroy();
        Products.productsView.render();
    }
});

// вид для модальных окон
App.Views.Modal = Backbone.View.extend({
    el: $('.modal-windows'),
    events: {
        'change input': 'changeModel',
        'change select': 'changeModel',
        'change textarea': 'changeModel',
        'click .saveChanges': 'saveModel',
    },
    render: function(templId, modalId) {
        this.modalId = modalId;
        this.template = App.template(templId);
        var template = this.template(this.model.toJSON());
        this.$el.append(template);
        Products.productsView.openModal(modalId);
        return this;
    },
    changeModel: function(ev) {
        var target = ev.currentTarget;
        this.model.set(target.name, target.value, { silent: true });
    },
    saveModel: function() {
        this.model.save({ silent: false });
        Products.productsView.closeModal(this.modalId);
    }
});

// коллекция моделей товаров
App.Collections.Product = Backbone.Collection.extend({
    model: App.Models.Product,
    localStorage: new Backbone.LocalStorage('goods')
});

// общий вид для товаров
App.Views.Products = Backbone.View.extend({
    el: $(".shopContainer"),
    events: {
        'click .menu': 'changeGrid',
        'change input[name="paginate"]': 'changePagination',
        'click .sendUserButton': 'changeUser',
        'click .sendAnonimUser': 'logAnonimUser',
        'click .show-more': 'showMore',
        'submit form[name="addItemForm"]': 'createNewProduct'
    },

    render: function(paginate) {
        $('.items-goods').empty();
        if (Products.user.name !== 'Anonim') { $('.loginButton').html("Hello, " + Products.user.name); } else { $('.loginButton').html("Log in"); }
        var all = this.collection.length;
        var itemCount = parseInt(paginate) || parseInt($('input[name="paginate"]:checked').val());
        var gridCount = 12 / itemCount;
        // rows count
        var countRows = Math.ceil(all / itemCount);
        // how much to show
        var toShow = 4;
        // building rows
        for (var prod = 0, r = 1; r <= countRows; r++) {
            var row = $('<div class = "row"></div>');
            // hide more then 4 rows
            if (r > toShow) {
                row.addClass('hideBlock');
            }
            // building cols
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
        // disable button if no more content
        var showMoreBut = $('.show-more');
        ($(".hideBlock").length === 0) ? showMoreBut.attr('disabled', true): showMoreBut.attr('disabled', false);

        // equalHeight
        $('.item-content>img').on('load', function() {
            $(".item").matchHeight();
        });
        return this;
    },
    checkAccess: function(model, user) {
        model.set('readible', 'true');
        model.set('rewritable', 'false');
        model.set('removable', 'false');
        model.set('addible', 'false');
        model.set('label', 'false');

        if (user.role === 'admin') {
            model.set('rewritable', 'true');
            model.set('removable', 'true');
            model.set('addible', 'true');
        } else if (user.role === 'user' && user.userId !== model.get('self_id')) {
            model.set('addible', 'true');
        } else if (user.role === "user" && user.userId === model.get('self_id') || user.role === "admin" && user.userId === model.get('self_id')) {
            model.set('addible', 'true');
            model.set('rewritable', 'true');
            model.set('removable', 'true');
            model.set('label', 'true');
        }
        return model;
    },
    changeGrid: function(ev) {
        $('.menu a.active').removeClass('active');
        $(ev.target).addClass('active');
        var category = $(ev.target).html();
        this.collection.fetch();
        if (category !== 'all') {
            var g = this.collection.where({ category: category });
            this.collection.set(g);
        } else {
            this.collection = this.collection;
        }
        $('.items-goods').empty();
        $('body').append(this.render().el);
    },
    changePagination: function() {
        $('.items-goods').empty();
        $('body').append(this.render().el);
    },
    changeUser: function() {
        var self = this;
        var name = $('#loginName').val();
        var password = $('#loginPass').val();
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
                    ((typeof respond) === 'object') ? self.loginUser(respond): $('.text-danger').html(respond);
                    // callback end
                }
                // ajax end
        });
        // end func
    },
    loginUser: function(obj) {
        Products.user = obj;
        localStorage.setItem("user", JSON.stringify(Products.user));
        $('.items-goods').empty();
        $('body').append(this.render().el);
        this.closeModal('#loginModal');
    },
    logAnonimUser: function() {
        Products.user = new User();
        localStorage.setItem("user", JSON.stringify(Products.user));
        $('.items-goods').empty();
        $('.shopContainer').append(this.render().el);
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
        var rowsItems = $(".items-goods .row");
        var rowsItemsHid = $(".hideBlock");
        var step = 1;
        for (var i = 0; i < step; i++) {
            rowsItemsHid.eq(i).removeClass("hideBlock");
            if ($(".hideBlock").length === 0) {
                $('.show-more').attr('disabled', true);
            }
        }
    },
    rebuildGrid: function() {
        $('.items-goods').empty();
        this.render();
    },
    createNewProduct: function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var self_id = Products.user.userId;
        var category = $('#itemCategory').val();
        var title = $('#itemAddTitle').val();
        var description = $('#itemAddDescr').val();
        var price = $('#itemAddPrice').val();
        var newModel = { self_id: self_id, category: category, title: title, description: description, price: price };
        this.collection.create(newModel);
        this.render();
        this.closeModal('#addItemModal');
    }
});