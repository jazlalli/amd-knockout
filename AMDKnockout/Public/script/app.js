define(['jquery',
        'ko',
        'controllers/cardsTableController',
        'controllers/categoriesController',
        'controllers/calculatorController',
        'shared/messageBus'],
    function ($, ko, CardsTableController, CategoriesController, CalculatorController, messageBus) {

        var App = function (options) {
            options = options || {};
            this.initialize();
        };

        _.extend(App.prototype, {
            initialize: function () {
                var self = this;

                // TODO Wrap up controllers in page level controller
                //define the controllers global namespace and attach appropriate controllers
                self.Controller = self.Controller || {};
                self.Controller.CardsTable = new CardsTableController();
                self.Controller.Categories = new CategoriesController();
                self.Controller.Calculator = new CalculatorController();
            },
            
            bootstrap: function () {
                var self = this;

                // TODO Bind viewmodel using data attribute instead of hard-coded DOM selector
                // binds viewmodel to DOM element
                ko.applyBindings(self.Controller.Categories.viewModel, $('#categories')[0]);
                ko.applyBindings(self.Controller.Calculator.viewModel, $('#calculators')[0]);
                ko.applyBindings(self.Controller.CardsTable.viewModel, $('#cardstable')[0]);
                
                this.ready();
            },
            
            ready: function () {
                messageBus.app.publish('ready');
                $('#results').css({ visibility: 'visible' });
            }
        });

        return App;
    });