define(['pager',
        'controllers/CategoryController',
        'controllers/TableController',
        'shared/messageBus'],
    function (pager, CategoryController, TableController, messageBus) {

        var CombinedController = function () {
            var self = this;
            var options = { selectedCategory: 'Combined' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            
            self.initialize.call(self);
        };
        
        _.extend(CombinedController.prototype, {
            initialize: function () {
            },

            sortByBalanceTransfer: function () {
                var self = this;

                self.sortBy('DurationofBalRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'combined.table.sort',
                    data: self
                });
            },

            sortByPurchase: function () {
                var self = this;

                self.sortBy('DurationofPurchRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'combined.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'combined.table.sort',
                    data: self
                });
            }
        });

        return CombinedController;
    });