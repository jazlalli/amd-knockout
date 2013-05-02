define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var BalanceTransferController = function() {
            var self = this;
            var options = { selectedCategory: 'BalanceTransfer' };

            self.Table = new TableController(options);
        };

        return BalanceTransferController;
    });