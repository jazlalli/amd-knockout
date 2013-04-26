define(['ko',
        'underscore',
        'data/calculatorRepository',
        'viewModels/calculatorViewModel',
        'shared/messageBus'],
    function (ko, _, calculatorRepository, CalculatorViewModel, messageBus) {

        var _calculatorParameters = {};
        
        var CalculatorController = function () {
            var self = this;
            self.initialize.call(self);
        };

        _.extend(CalculatorController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new CalculatorViewModel();
                self.setupSubscriptions.call(self);
                
                _calculatorParameters = self.viewModel;
            },

            updateCalculations: function (data, event) {
                if (event) {
                    event.preventDefault();
                }

                if (data) {
                    _calculatorParameters = data;
                }

                messageBus.data.publish({
                    topic: 'calculator.update',
                    data: _calculatorParameters
                });

                return false;
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('category.changed', function (data) {
                    self.viewModel.selectedCategory(data);
                    self.updateCalculations();
                });
            }
        });

        return CalculatorController;
    });