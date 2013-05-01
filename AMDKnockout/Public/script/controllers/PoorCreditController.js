define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var PoorCreditController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return PoorCreditController;
    });