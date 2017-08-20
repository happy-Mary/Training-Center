var modals = (function() {
    var login = $('[data-remodal-id=loginModal]').remodal();
    var read = $('[data-remodal-id=readModal]').remodal();
    var rewrite = $('[data-remodal-id=rewriteModal]').remodal();
    var add = $('[data-remodal-id=addModal]').remodal();

    return {
        loginClose: function() {
            login.close();
        },
        readOpen: function() {
            read.open();
        },
        rewriteOpen: function() {
            rewrite.open();
        },
        rewriteClose: function() {
            rewrite.close();
        },
        addOpen: function() {
            add.open();
        },
        addClose: function() {
            add.close();
        }
    }
})();