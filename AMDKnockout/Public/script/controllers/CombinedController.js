define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var CombinedController = function() {
            var self = this;
            var options = { selectedCategory: 'Combined' };

            self.Table = new TableController(options);
        };

        return CombinedController;
    });