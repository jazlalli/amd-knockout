define(['jquery',
        'ko',
        'viewModels/cardsTableViewModel',
        'viewModels/cardsViewModel',
        'viewModels/categoriesViewModel',
        'viewModels/calculatorViewModel',
        'shared/messageBus'],
    function ($, ko, CardsTableViewModel, CardsViewModel, CategoriesViewModel, CalculatorViewModel, messageBus) {

        var App = function (options) {
            options = options || {};

            this.channels = {};
            this.initialize();
        };

        _.extend(App.prototype, {
            initialize: function () {
                
                ko.applyBindings(new CardsTableViewModel(), $('#cardstable')[0]);
                ko.applyBindings(new CategoriesViewModel(), $('#categories')[0]);
                ko.applyBindings(new CalculatorViewModel(), $('#calculators')[0]);
                
                this.ready();
            },
            ready: function () {
                messageBus.app.publish('ready');
                $('#results').css({ visibility: 'visible' });
            }
        });

        return new App();
    });