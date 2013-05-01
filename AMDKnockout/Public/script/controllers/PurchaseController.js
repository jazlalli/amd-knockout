define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var PurchaseController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return PurchaseController;
    });