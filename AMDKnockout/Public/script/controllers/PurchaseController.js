define(['controllers/CategoryController', 'controllers/TableController'], function (CategoryController, TableController) {

    var PurchaseController = function () {
        var self = this;
        self.Table = new TableController();
    };

    return PurchaseController;
});