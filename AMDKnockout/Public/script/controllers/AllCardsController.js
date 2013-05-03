define(['pager', 'controllers/CategoryController', 'controllers/TableController', 'shared/messageBus'],
    function(pager, CategoryController, TableController, messageBus) {

        var AllCardsController = function () {
            var self = this;
            var options = { selectedCategory: 'CreditCard' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);

            self.initialize.call(self);
        };

        _.extend(AllCardsController.prototype, {
            initialize: function () {
                var self = this;
                
                self.setupSubscriptions.call(self);
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('allcards.table.sort', function () {
                    self.Table.updateCards();
                });
            },
            
            sortByBalanceTransfer: function () {
                var self = this;
                
                self.sortBy('DurationofBalRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'allcards.table.sort',
                    data: self
                });
            },
            
            sortByPurchase: function () {
                var self = this;
                
                self.sortBy('DurationofPurchRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'allcards.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'allcards.table.sort',
                    data: self
                });
            }
        });

        return AllCardsController;
    });