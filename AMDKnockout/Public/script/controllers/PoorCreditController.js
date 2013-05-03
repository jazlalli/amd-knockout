define(['pager', 'controllers/TableController', 'controllers/CategoryController'],
    function (pager, TableController, CategoryController) {

        var PoorCreditController = function() {
            var self = this;
            var options = { selectedCategory: 'PoorCredit' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
        };

        return PoorCreditController;
    });