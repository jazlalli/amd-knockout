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
                self.setupSubscriptions.call(self);
            },

            updateCalculations: function () {
                var self = this,
                    property,
                    calculatorParameters = {};
                
                if (event) {
                    event.preventDefault();
                }

                if (self.viewModel) {
                    for (property in self.viewModel) {
                        if (self.viewModel.hasOwnProperty(property)) {
                            if (_.isFunction(self.viewModel[property])) {
                                calculatorParameters[property] = self.viewModel[property]();
                            } else {
                                calculatorParameters[property] = self.viewModel[property];
                            }
                        }
                    }
                }

                messageBus.data.publish({
                    topic: 'calculator.update',
                    data: calculatorParameters
                });

                return false;
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('category.changed', function (category) {
                    self.viewModel.selectedCategory(category);
                    self.updateCalculations.call(self);
                });
            }
        });

        return CalculatorController;
    });