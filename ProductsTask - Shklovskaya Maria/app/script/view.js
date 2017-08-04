function View() {
    myModel = null;
    myDom = null;
    this.toShow = 4;

    this.Set = function(model, container) {
        myModel = model;
        myDom = container;
    }

    this.showErrorLogin = function(message) {
        $('.error-login').html(message);
    }

    this.greetUser = function(userObj) {
        $('.loginButton').html('Hello, ' + userObj.name);
    }

    this.closeModal = function(modalId) {
        $(modalId).modal('hide');
    }

    // show content to read about product modal
    this.showItemContent = function(result) {
        $('#descriptionModal').on('show.bs.modal', function() {
            var modal = $(this);
            modal.find('.modal-title').text(result.title);
            modal.find('.modal-body').css('text-align', 'center');
            modal.find('.modal-body > img').attr('src', result.image);
            modal.find('.modal-body > p').html(result.description);
        });
        $('#descriptionModal').modal('show');
    }

    // show content to rewrite product modal
    this.openRewriteWindow = function(result) {
        $('#rewriteModal').on('show.bs.modal', function() {
            var modal = $(this);

            modal.find('#itemRewriteId').val(result.itemId);
            modal.find('#itemRewritePrice').val(result.price);
            modal.find('#itemRewriteTitle').val(result.title);
            modal.find('#itemRewriteDescr').val(result.description);
        });
        $('#rewriteModal').modal('show');
    }

    // show more button clicked
    this.showMore = function() {
        var rowsItems = $(".items-goods .row");
        var rowsItemsHid = $(".hideBlock");

        var step = 1;
        for (var i = 0; i < step; i++) {
            rowsItemsHid.eq(i).removeClass("hideBlock");
            if ($(".hideBlock").length === 0) {
                $('.show-more').attr('disabled', true);
            }
        }
    }

    // building grid
    this.buildGoods = function(user) {
        var category = myModel.grid.category;
        var user = user;

        var allGoods = localStorageObj.get("goods");

        if (category === 'all') {
            var goods = allGoods;
        } else {
            var goods = [];
            for (var i = 0; i <= allGoods.length - 1; i++) {
                if (allGoods[i].category === category) {
                    goods.push(allGoods[i]);
                }
            }
        }

        //  grid
        var itemCount = parseInt($('input[name="paginate"]:checked').val());
        var containerItems = $(".items-goods");
        containerItems.empty();

        var contW = 12 / itemCount;
        var rowsCount = Math.ceil(goods.length / itemCount);
        // building html content
        for (var g = 0, r = 1; r <= rowsCount; r++) {
            var row = $("<div class='row'></div>");

            if (r > this.toShow) {
                row.addClass('hideBlock');
            }

            for (var i = 1; i <= itemCount; i++) {
                if (g > goods.length - 1) { containerItems.append(row); } else {
                    var content = $("<div class='item'></div>").addClass('col-sm-' + contW).attr('itemId', goods[g].itemId);
                    var itemContent = $("<div class='item-content'><p class='price'>" + goods[g].price + " $</p><img src='" + goods[g].image + "' width='100%'/><h4>" + goods[g].title + "</h4></div>");
                    var itemOwn = $("<span class='label label-info item-label'>my</span>");

                    if(!goods[g].moderate) {content.css('display', 'none');}

                    // buttons
                    var itemButtons = $('<div class="btn-group-vertical item-buttons" role="group"></div>');
                    var openBut = $('<button class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>')
                        .addClass('open-but');
                    var rewriteBut = $('<button class="btn btn-primary"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>')
                        .addClass('rewite-but');
                    var removeBut = $('<button class="btn btn-primary"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>')
                        .addClass('remove-but');
                    var addBut = $('<button class="btn btn-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>')
                        .addClass('add-but');

                    // allow activity by user role 
                    // anonim - only read
                    // user - add, read, remove and rewrite own
                    // admin - read, remove, add, rewrite
                    if (user.role !== 'admin' && user.role !== 'user') {
                        rewriteBut.attr('disabled', 'true');
                        addBut.attr('disabled', 'true');
                        removeBut.attr('disabled', 'true');
                    } else if (user.role === "user" && user.id !== goods[g].id) {
                        removeBut.attr('disabled', 'true');
                        rewriteBut.attr('disabled', 'true');
                    } else if (user.role === "user" && user.id === goods[g].id || user.role === "admin" && user.id === goods[g].id) {
                        itemOwn.css('display', 'block');
                    }

                    itemButtons.append(openBut).append(rewriteBut).append(removeBut).append(addBut);
                    content.append(itemContent).append(itemButtons).append(itemOwn);
                    row.append(content);
                    g++;
                }
            }
            containerItems.append(row);
        }
        // disable button if no more content
        var showMoreBut = $('.show-more');
        ($(".hideBlock").length === 0) ? showMoreBut.attr('disabled', true) : showMoreBut.attr('disabled', false);

        // как загрузить динамические изображения до исполнения скрипта?
        // equal container height
        $('.item-content>img').on('load', function() {
            $(".item").matchHeight();
        });
    }

    // end class
}