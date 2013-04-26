define(['ko', 'underscore', 'viewModels/BaseViewModel'],
    function (ko, _, BaseViewModel) {
        var CalculatorViewModel = function () {
            this.selectedCategory = 'CreditCard';
            this.balance = 2000;
            this.monthlyRepayment = 400;
            this.clearBalance = true;
            this.monthlySpend = 1000;
            this.higherFirstMonthSpend = false;
            
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CalculatorViewModel.prototype, BaseViewModel.prototype, {
            initialize: function (options) {

            }
        });

        return CalculatorViewModel;
    });