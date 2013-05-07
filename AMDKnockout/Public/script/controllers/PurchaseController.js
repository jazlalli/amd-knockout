define(['pager',
        'controllers/TableController',
        'controllers/CategoryController',
        'controllers/CalculatorController',
        'shared/messageBus'],
    function(pager, TableController, CategoryController, CalculatorController, messageBus) {

        var PurchaseController = function() {
            var self = this;
            var options = { selectedCategory: 'Purchase' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            self.Calculator = new CalculatorController();
            
            self.initialize.call(self);
        };
        
        _.extend(PurchaseController.prototype, {
            initialize: function () {
            },

            sortByPurchase: function (data, e) {
                var self = this;

                self.sortBy('DurationofPurchRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'purchase.table.sort',
                    data: self
                });
            },

            sortBySavings: function () {
                var self = this;

                self.sortBy('SavingAmount');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'purchase.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'purchase.table.sort',
                    data: self
                });
            },
            
            updateSavings: function () {
                var self = this;

                messageBus.data.publish({
                    topic: 'purchase.savings.update',
                    data: self
                });
            }
        });

        return PurchaseController;
    });