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
        className: 'item',
        template: template('productTemplate'),
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
    });

    // коллекция видов товаров
    App.Views.Products = Backbone.View.extend({
        tagName: 'div',
        className: 'container',
        render: function() {
            var all = this.collection.length;
            var itemCount = parseInt($('input[name="paginate"]:checked').val());
            // var itemCount = 6;
            var gridCount = 12 / itemCount;
            // количество рядов
            var countRows = Math.ceil(all / itemCount);

            for (var prod = 0, r = 1; r <= countRows; r++) {
                var row = $('<div class = "row"></div>');
                for (var i = 1; i <= itemCount; i++) {
                    if (prod > all - 1) { this.$el.append(row); } else {
                        var product = this.collection.models[prod];
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