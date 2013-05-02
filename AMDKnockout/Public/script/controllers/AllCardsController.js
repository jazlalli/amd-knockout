define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var AllCardsController = function () {
            var self = this;
            var options = { selectedCategory: 'CreditCard' };

            self.Table = new TableController(options);
        };

        return AllCardsController;
    });