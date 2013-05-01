define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var AllCardsController = function () {
            var self = this;
            self.Table = new TableController();
        };

        return AllCardsController;
    });