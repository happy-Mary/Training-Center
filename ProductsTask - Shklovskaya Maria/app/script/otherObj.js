// localStorage
var localStorageObj = (function(){
    return {
        save: function(name, obj) {
            localStorage.setItem(name, JSON.stringify(obj));
            },
        get: function(name) {
            return JSON.parse(localStorage.getItem(name));
            }
        }
})();


// constructor User
function User(id, name, password, role) {
    this.id = id || 0;
    this.name = name || "Anonim";
    // this.name = name || 'Anna';
    this.password = password || null;
    // this.password = password || 1011;
    this.role = role || "anonim";
}

// constructor Item
function Item(id, itemId, category, title, description, price) {
    this.id = id;
    this.itemId = parseInt(itemId);
    this.category = category;
    this.title = title;
    this.description = description;
    this.price = parseInt(price);
    this.moderate = false,
    this.image = "img/no-photoI.gif"
}
