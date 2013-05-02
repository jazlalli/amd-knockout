define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var PurchaseController = function() {
            var self = this;
            var options = { selectedCategory: 'Purchase' };

            self.Table = new TableController(options);
        };

        return PurchaseController;
    });