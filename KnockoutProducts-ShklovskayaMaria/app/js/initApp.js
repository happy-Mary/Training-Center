
var goods = undefined;

var localStorageObj = (function(){
    return {
        save: function(name, obj) {
            localStorage.setItem(name, JSON.stringify(obj));
            },
        get: function(name) {
            return JSON.parse(localStorage.getItem(name));
            }
        };
})();

    var initApp = function() {
        // checking goods in LS, if server - ajax request all the time
        var goods = localStorageObj.get("goods");
        if (goods === null){
             $.ajax({
                    url: "json/goods.json",
                    success: function(result) {
                        console.log('result');
                        console.log(result);
                        localStorageObj.save("goods", result);
                        returnGoods(result);
                    }
                });
        } else {
            returnGoods(goods);
        }
    };
    function returnGoods(obj) {
        goods = obj;
        return goods;
    }

    initApp();

function VM(){
    var self = this;
    self.list = ko.observableArray(goods);

    self.TableData = ko.computed(function() {
        var data = ko.unwrap(self.list);
        var res = ko.observableArray();

        for (var i in data){
        var obj = data[i];
            res.push({
                self_id: obj.self_id,
                category: ko.observable(obj.category),
                title: ko.observable(obj.title),
                description: ko.observable(obj.description),
                price: ko.observable(obj.price),
                moderate: ko.observable(obj.moderate),
                image: ko.observable(obj.image)
            });
    }
    return res;
    }, self);
   
    self.getValues = function(product){
        console.log(product.title());
        product.title("new");
    };

    self.changeCategory = function(data, event){
        var category = $(event.target).html();
        $('.menu').find(".active").removeClass("active");
        $(event.target).addClass('active');
        if(category==="all"){
            self.list(goods);
        } else {
            var arr = [];
            for (var i = 0; i <= goods.length - 1; i++) {
                if (goods[i].category === category) {
                    arr.push(goods[i]);
                }
            }
            self.list(arr);
        }
    };

    self.changeGrid = function(data, event) {
        var cls = $(event.target).attr('id');
        $('.items-goods').removeClass('show4 show2 show6').addClass(cls);
    };



}

ko.applyBindings(new VM());



