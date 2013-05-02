define(['pager', 'controllers/CategoryController', 'controllers/TableController'],
    function(pager, CategoryController, TableController) {

        var RewardsController = function() {
            var self = this;
            var options = { selectedCategory: 'Rewards' };

            self.Table = new TableController(options);
        };

        return RewardsController;
    });