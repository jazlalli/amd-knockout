define(['ko', 'underscore', 'viewModels/BaseViewModel', 'shared/messageBus'],
    function (ko, _, BaseViewModel, messageBus) {
        var CalculatorViewModel = function () {
            this.selectedCategory = null;

            this.balance = 2000;
            this.monthlyRepayment = 400;
            this.clearBalance = true;
            this.monthlySpend = 1000;
            this.higherFirstMonthSpend = false;
            
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CalculatorViewModel.prototype, BaseViewModel.prototype, {
            initialize: function (options) {
                var self = this;

                self.selectedCategory('CreditCard');
                
                messageBus.data.subscribe('category.changed', function (data) {
                    self.selectedCategory(data);
                    self.updateParameters();
                });
            },

            updateParameters: function (data, event) {
                var self = this,
                    parameters = {
                        selectedCategory: self.selectedCategory(),
                        DebtAmount: self.balance(),
                        MonthlyRepayment: self.monthlyRepayment(),
                        TransferAtEnd: self.clearBalance(),
                        MonthlySpend: self.monthlySpend(),
                        InitialSpend: self.higherFirstMonthSpend()
                    };

                if (event) {
                    event.preventDefault();
                }

                messageBus.data.publish({
                    topic: 'calculator.update',
                    data: parameters
                });

                return false;
            }
        });

        return CalculatorViewModel;
    });