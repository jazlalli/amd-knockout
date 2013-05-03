﻿define(['pager', 'controllers/TableController', 'controllers/CategoryController', 'controllers/CalculatorController', 'shared/messageBus' ],
    function(pager, TableController, CategoryController, CalculatorController, messageBus) {

        var BalanceTransferController = function() {
            var self = this;
            var options = { selectedCategory: 'BalanceTransfer' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            self.Calculator = new CalculatorController();
            
            self.initialize.call(self);
        };
        
        _.extend(BalanceTransferController.prototype, {
            initialize: function () {
                var self = this;

                self.setupSubscriptions.call(self);
            },

            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('balancetransfer.table.sort', function () {
                    self.Table.updateCards();
                });
            },

            sortByBalanceTransfer: function () {
                var self = this;

                self.sortBy('DurationofBalRateM');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'balancetransfer.table.sort',
                    data: self
                });
            },

            sortByBalanceTransferFee: function () {
                var self = this;

                self.sortBy('IntroBalanceTfrFee');
                self.sortByDirection('asc');

                messageBus.data.publish({
                    topic: 'balancetransfer.table.sort',
                    data: self
                });
            },
            
            sortBySavings: function () {
                var self = this;

                self.sortBy('SavingAmount');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'balancetransfer.table.sort',
                    data: self
                });
            },

            sortByEligibility: function () {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');

                messageBus.data.publish({
                    topic: 'balancetransfer.table.sort',
                    data: self
                });
            }
        });

        return BalanceTransferController;
    });