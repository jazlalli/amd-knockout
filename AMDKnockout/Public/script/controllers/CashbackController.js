define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var CashbackController = function() {
            var self = this;
            var options = { selectedCategory: 'Cashback' };

            self.Table = new TableController(options);
        };

        return CashbackController;
    });