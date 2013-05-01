define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var CombinedController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return CombinedController;
    });