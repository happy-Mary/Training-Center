(function(){
    var container = $('.shopContainer');
    var model = new Model();
    var view = new View();

    view.Set(model, container);
    model.Set(view, container);

    model.initApp();

    var controller = new Controller();
    controller.Set(model, container);
    controller.listenEvents();
})();
