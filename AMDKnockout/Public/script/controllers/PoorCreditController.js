define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var PoorCreditController = function() {
            var self = this;
            var options = { selectedCategory: 'PoorCredit' };

            self.Table = new TableController(options);
        };

        return PoorCreditController;
    });