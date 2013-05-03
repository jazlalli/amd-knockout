define(['pager', 'controllers/TableController', 'controllers/CategoryController', 'controllers/CalculatorController', 'shared/messageBus'],
    function (pager, TableController, CategoryController, CalculatorController, messageBus) {

        var CashbackController = function() {
            var self = this;
            var options = { selectedCategory: 'Cashback' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            self.Calculator = new CalculatorController();
            
            self.initialize.call(self);
        };
        
        _.extend(CashbackController.prototype, {
            initialize: function () {
                var self = this;

                self.setupSubscriptions.call(self);
            },

            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('cashback.table.sort', function () {
                    self.Table.updateCards();
                });
            },

            sortBySavings: function () {
                var self = this;

                self.sortBy('SavingAmount');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'cashback.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'cashback.table.sort',
                    data: self
                });
            }
        });

        return CashbackController;
    });