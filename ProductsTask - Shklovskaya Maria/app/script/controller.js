function Controller() {
    myModel = null;
    myDom = null;

    this.Set = function(model, container) {
        myModel = model;
        myDom = container;
        // console.log(myDom);
    }
  
    this.listenEvents = function() {
        var buttonLogin = myDom.find('.sendUserButton');
        var buttonSetAnonim = myDom.find('.sendAnonimUser');

        buttonLogin.click(function() {
            myModel.changeUser($('#loginName').val(), $('#loginPass').val());
        });

        buttonSetAnonim.click(function() {
            myModel.setAnonimUser();
        });

        // menu categories
        $('.menu a').click(function() {
            $('.menu a.active').removeClass('active');
            $(this).addClass('active');

            myModel.changeCategory($(this).html());
        });

        // grid pagination
        var paginateRadio = myDom.find('input[name="paginate"]');
        paginateRadio.change(function() { myModel.changeGrid(); });

        // read about an item
        $('.items-goods').on('click', '.open-but', function() {
            var itemId = $(this).closest('.item').attr('itemid');
            myModel.readItem(itemId);
        });

        // rewrite an item
        $('.items-goods').on('click', '.rewite-but', function() {
            var itemId = $(this).closest('.item').attr('itemid');
            myModel.getRewriteItem(itemId);
        });

        $('.saveChanges').click(function() {
            var itemId = $('#itemRewriteId').val();
            myModel.saveRewriteItem(itemId);
        });

        // add an item
        $('.items-goods').on('click', '.add-but', function() {
            $('#addItemModal').modal('show');
        });

        // saving new item
        $('form[name="addItemForm"]').submit(function(event) {
            event.preventDefault();
            var itemId = $('#itemId').val();
            var category = $('#itemCategory').val();
            var title = $('#itemAddTitle').val();
            var description = $('#itemAddDescr').val();
            var price = $('#itemAddPrice').val();

            myModel.addItem(itemId, category, title, description, price);
        });


        // delete an item ****
        $('.items-goods').on('click', '.remove-but', function() {
            var itemId = $(this).closest('.item').attr('itemid');
            myModel.removeItem(itemId);
        });

        // show more
        $('.show-more').click(function() {
            myModel.changeCoutToShow();
        });

    }
//  class end
}

