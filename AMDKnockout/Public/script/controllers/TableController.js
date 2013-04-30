define(['knockout',
        'underscore',
        'viewModels/TableViewModel',
        'models/CreditCard',
        'data/cardsRepository',
        'data/savingsRepository',
        'shared/messageBus'],
    function (ko, _, TableViewModel, CreditCard, cardsRepository, savingsRepository, messageBus) {

        var TableController = function () {
            var self = this;
            self.cardsOptions = { calculatorParameters: null };
            
            self.initialize.call(self);
        };
        
        _.extend(TableController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new TableViewModel();
                
                self.setupSubscriptions.call(self);
                self.updateCards.call(self);
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('category.changed', function (category) {
                    self.viewModel.selectedCategory(category);
                    self.viewModel.sortBy('DisplayOrder');
                    self.viewModel.sortByDirection('asc');
                    self.updateCards.call(self);
                });

                messageBus.data.subscribe('calculator.update', function (calculatorParameters) {
                    self.cardsOptions.calculatorParameters = calculatorParameters;
                    self.viewModel.sortBy('SavingAmount');
                    self.viewModel.sortByDirection('desc');
                    self.updateCards.call(self);
                });
            },
            
            sortByBalanceTransfer: function (data, e) {
                var self = App.CurrentController.Table;

                self.viewModel.sortBy('DurationofBalRateM');
                self.viewModel.sortByDirection('desc');
                self.updateCards();
            },

            sortByBalanceTransferFee: function (data, e) {
                var self = App.CurrentController.Table;
                
                self.viewModel.sortBy('IntroBalanceTfrFee');
                self.viewModel.sortByDirection('asc');
                self.updateCards();
            },

            sortByPurchase: function (data, e) {
                var self = App.CurrentController.Table;
                
                self.viewModel.sortBy('DurationofPurchRateM');
                self.viewModel.sortByDirection('desc');
                self.updateCards();
            },

            sortBySavings: function (data, e) {
                var self = App.CurrentController.Table;
                
                self.viewModel.sortBy('SavingAmount');
                self.viewModel.sortByDirection('desc');
                self.updateCards();
            },

            sortByEligibility: function (data, e) {
                var self = App.CurrentController.Table;

                self.viewModel.sortBy('Score');
                self.viewModel.sortByDirection('desc');
                self.updateCards();
            },

            sortByApr: function (data, e) {
                var self = App.CurrentController.Table;

                self.viewModel.sortBy('RepresentativeAPR');
                self.viewModel.sortByDirection('asc');
                self.updateCards();
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