define(['controllers/CategoryController', 'controllers/TableController'], function (CategoryController, TableController) {

    var BalanceTransferController = function () {
        var self = this;
        self.Table = new TableController();
    };

    return BalanceTransferController;
});