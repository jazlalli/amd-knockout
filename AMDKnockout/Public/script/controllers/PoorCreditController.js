define(['pager', 'controllers/TableController', 'controllers/CategoryController', 'shared/messageBus'],
    function (pager, TableController, CategoryController, messageBus) {

        var PoorCreditController = function() {
            var self = this;
            var options = { selectedCategory: 'PoorCredit' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            
            self.initialize.call(self);
        };

        _.extend(PoorCreditController.prototype, {
            initialize: function () {
                var self = this;

                self.setupSubscriptions.call(self);
            },

            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('poorcredit.table.sort', function () {
                    self.Table.updateCards();
                });
            },
            
            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'poorcredit.table.sort',
                    data: self
                });
            },

            sortByApr: function () {
                var self = this;

                self.sortBy('RepresentativeAPR');
                self.sortByDirection('asc');

                messageBus.data.publish({
                    topic: 'poorcredit.table.sort',
                    data: self
                });
            }
        });

        return PoorCreditController;
    });