define(['ko',
        'underscore',
        'viewModels/cardsTableViewModel',
        'models/creditCard',
        'data/cardsRepository',
        'shared/messageBus'],
    function (ko, _, CardsTableViewModel, CreditCard, cardsRepository, messageBus) {

        var CardsTableController = function () {
            var self = this;
            self.initialize.call(self);
        };
        
        _.extend(CardsTableController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new CardsTableViewModel();
                
                self.setupSubscriptions.call(self);
                self.updateCards.call(self);
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('category.changed', function (category) {
                    self.viewModel.selectedCategory(category);
                    self.updateCards.call(self);
                });
            },
            
            sortByBalanceTransfer: function (data, e) {
                var self = this;

                self.sortBy('DurationofBalRateM');
                self.sortByDirection('desc');
                self.updateCards();
            },

            sortByBalanceTransferFee: function (data, e) {
                var self = this;
                
                console.log(self);
                
                self.sortBy('IntroBalanceTfrFee');
                self.sortByDirection('asc');
                self.updateCards();
            },

            sortByPurchase: function (data, e) {
                var self = this;
                
                console.log(self);
                
                self.sortBy('DurationofPurchRateM');
                self.sortByDirection('desc');
                self.updateCards();
            },

            sortBySavings: function (data, e) {
                var self = this;
                
                self.sortBy('SavingAmount');
                self.sortByDirection('desc');
                self.updateCards();
            },

            sortByEligibility: function (data, e) {
                var self = this;

                self.sortBy('Score');
                self.sortByDirection('desc');
                self.updateCards();
            },

            sortByApr: function (data, e) {
                var self = this;

                self.sortBy('RepresentativeAPR');
                self.sortByDirection('asc');
                self.updateCards();
            },
            
            updateCards: function () {
                var self = this;
                var cardsModel = [];
                var options = {
                    category: self.viewModel.selectedCategory(),
                    sortBy: self.viewModel.sortBy(),
                    sortByDirection: self.viewModel.sortByDirection(),
                    pageSize: self.viewModel.pageSize(),
                    currentPage: self.viewModel.currentPage()
                };

                _.each(cardsRepository.getCards(options), function (card) {
                    cardsModel.push(new CreditCard(card));
                });
                
                self.viewModel.cards(cardsModel);
            }
        });

        return CardsTableController;
    });