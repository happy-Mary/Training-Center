(function() {
    var App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.template = function(id) {
        return _.template($('#' + id).html());
    }

    // модель товара
    App.Models.Product = Backbone.Model.extend({});
    // вид товара
    App.Views.Product = Backbone.View.extend({
        tagName: 'div',
        className: 'item col-sm-6',
        template: template('productTemplate'),
        render: function() {
            console.log('build inside');
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    // коллекция моделей товаров
    App.Collections.Product = Backbone.Collection.extend({
        model: App.Models.Product,
    });

    // коллекция видов товаров
    App.Views.Products = Backbone.View.extend({
        tagName: 'div',
        className: 'container',
        render: function() {
            console.log('build outside');
            console.log(this.collection);
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(product) {
            var newView = new App.Views.Product({ model: product });
            this.$el.append(newView.render().el);
        }
    });


    // GET
    function getG() {
        $.ajax({
            url: "json/goods.json",
            success: function(result) {
                console.log('result');
                console.log(result);
                App.Collections.productsCollection = new App.Collections.Product();
                App.Collections.productsCollection.set(result);
                console.log(App.Collections.productsCollection);
                initApp();
            }
        });
    }

    function initApp() {
        console.log(App.Collections.productsCollection);
        var productsView = new App.Views.Products({ collection: App.Collections.productsCollection });
        $('.items-goods').html(productsView.render().el);
    }

    getG();
    console.log('done');
})();