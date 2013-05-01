define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var RewardsController = function() {
            var self = this;
            self.Table = new TableController();
        };

        return RewardsController;
    });