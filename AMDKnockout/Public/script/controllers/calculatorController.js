define(['knockout',
        'underscore',
        'viewModels/CalculatorViewModel',
        'shared/messageBus'],
    function (ko, _, CalculatorViewModel, messageBus) {

        var CalculatorController = function () {
            var self = this;
            self.initialize.call(self);
        };

        _.extend(CalculatorController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new CalculatorViewModel();
            },

            updateSavings: function (data) {
                var self = this;

                console.log(data);
                
                if (event) {
                    event.preventDefault();
                }

                return false;
            }
        });

        return CalculatorController;
    });