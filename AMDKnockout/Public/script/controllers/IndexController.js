define(['controllers/CategoryController', 'controllers/TableController'], function (CategoryController, TableController) {

    var IndexController = function () {
        var self = this;
        self.Table = new TableController();
    };

    return IndexController;
});