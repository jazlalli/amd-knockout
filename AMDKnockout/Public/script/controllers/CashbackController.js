define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var CashbackController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return CashbackController;
    });