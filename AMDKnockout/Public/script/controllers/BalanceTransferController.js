﻿define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var BalanceTransferController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return BalanceTransferController;
    });