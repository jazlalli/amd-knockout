define(['knockout',
        'underscore',
        'viewModels/TableViewModel',
        'models/CreditCard',
        'data/cardsRepository',
        'data/savingsRepository',
        'shared/messageBus'],
    function (ko, _, TableViewModel, CreditCard, cardsRepository, savingsRepository, messageBus) {

        var TableController = function (options) {
            var self = this;
            options = options || {};
            
            self.cardsOptions = { calculatorParameters: null };
            self.initialize.call(self, options);
        };
        
        _.extend(TableController.prototype, {
            initialize: function (options) {
                var self = this;

                self.viewModel = new TableViewModel(options);
                self.setupSubscriptions.call(self);
                self.updateCards.call(self);
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('calculator.update', function (calculatorParameters) {

                    console.log('calculator update subscription');

                    self.cardsOptions.calculatorParameters = calculatorParameters;
                    self.viewModel.sortBy('SavingAmount');
                    self.viewModel.sortByDirection('desc');
                    self.updateCards.call(self);
                });
            },
            
            updateCards: function() {
                var self = this;
                var cardsModel = [];

                self.cardsOptions.category = self.viewModel.selectedCategory();
                self.cardsOptions.sortBy = self.viewModel.sortBy();
                self.cardsOptions.sortByDirection = self.viewModel.sortByDirection();
                self.cardsOptions.pageSize = self.viewModel.pageSize();
                self.cardsOptions.currentPage = self.viewModel.currentPage();

                _.each(cardsRepository.getCards(self.cardsOptions), function (card) {
                    cardsModel.push(new CreditCard(card));
                });
                
                self.viewModel.cards(cardsModel);
            }
        });

        return TableController;
    });