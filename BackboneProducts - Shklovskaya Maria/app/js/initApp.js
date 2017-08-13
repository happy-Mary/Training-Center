var Products = {
    user: {}
};

function initApplication() {
    // get user
    Products.user = JSON.parse(localStorage.getItem('user'));
    if (Products.user === null) {
        Products.user = new User();
        localStorage.setItem("user", JSON.stringify(Products.user));
    }
    Products.productsCollection = new App.Collections.Product();
    Products.productsCollection.comparator = function(model) {
        return model.get("self_id");
    };
    // get goods
    Products.productsCollection.fetch();
    if (Products.productsCollection.length <= 0) {
        $.ajax({
            url: "json/goods.json",
            success: function(result) {
                Products.productsCollection.set(result);
                Products.productsCollection.models.forEach(function(model) {
                    model.save();
                });
                buildGrid();
            }
        });
    }
    buildGrid();
}

// rebuilding grid on first load
function buildGrid() {
    console.log('initial building grid');
    Products.productsView = new App.Views.Products({ collection: Products.productsCollection });
    $('.shopContainer').append(Products.productsView.render().el);
}

//first loading content
initApplication();

// default User class
function User(id, name, password, role) {
    this.userId = id || 0;
    this.name = name || "Anonim";
    this.password = password || null;
    this.role = role || "anonim";
}