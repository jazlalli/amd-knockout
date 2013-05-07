define(['pager',
        'controllers/TableController',
        'controllers/CategoryController',
        'controllers/CalculatorController',
        'shared/messageBus'],
    function (pager, TableController, CategoryController, CalculatorController, messageBus) {

        var RewardsController = function () {
            var self = this;
            var options = { selectedCategory: 'Rewards' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            self.Calculator = new CalculatorController();
            
            self.initialize.call(self);
        };
        
        _.extend(RewardsController.prototype, {
            initialize: function () {
            },

            sortBySavings: function () {
                var self = this;

                self.sortBy('SavingAmount');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'rewards.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'rewards.table.sort',
                    data: self
                });
            },

            updateSavings: function () {
                var self = this;

                messageBus.data.publish({
                    topic: 'rewards.savings.update',
                    data: self
                });
            }
        });

        return RewardsController;
    });