function VM(){
    self.list = [
        {name: "John", age: 30},
        {name: "Alice", age: 35},
        {name: "Mary", age: 26},
        {name: "Goon", age: 21},
        {name: "Leila", age: 15},
        {name: "Angy", age: 76},
        {name: "Alex", age: 30}
    ];

    self.TableData = ko.computed(function() {
        var data = ko.unwrap(self.list);
        var res = ko.observableArray();

        for (var i in data){
        var obj = data[i];
            res.push({
                name: ko.observable(obj.name),
                age: obj.age,
            });
    }
    return res;
    }, this);
   
}

ko.applyBindings(new VM());