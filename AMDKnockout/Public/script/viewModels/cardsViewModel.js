define(['ko',
        'underscore',
        'viewModels/baseViewModel',
        'models/creditCard',
        'data/cardsRepository',
        'data/savingsRepository',
        'shared/messageBus'],
    function (ko, _, BaseViewModel, CreditCard, cardsRepository, savingsRepository, messageBus) {
        var CardsViewModel = function() {
            this.cards = [];
            this.selectedCategory = null;
            this.sortBy = 'DisplayOrder';
            this.sortByDirection = 'asc';

            this.pageSize = 10;
            this.currentPage = 1;
            this.totalPages = 1;
            this.showMore = false;

            BaseViewModel.apply(this, arguments);
        };

        var calculatorUpdateHandler = function(calculatorData) {
            var self = this;

            var calculatorResults = savingsRepository.getSavings(calculatorData);
            self.filterCardsByCategory();

            _.each(calculatorResults, function(saving) {
                var matchedCard = _.find(self.cards(), function(card) {
                    return saving.ProductCode === card.ProductCode();
                });

                if (matchedCard) {
                    matchedCard.SavingAmount(saving.SavingAmount);
                }
            });

            sortingHandler.call(self);
        };

        var sortingHandler = function () {
            var self = this;

            if (self.selectedCategory() === 'CreditCard' || self.selectedCategory() === 'Combined' || self.selectedCategory() === 'PoorCredit') {
                self.sortBy('DisplayOrder');
                self.sortByDirection('asc');
            } else {
                self.sortBy('SavingAmount');
                self.sortByDirection('desc');
            }
        };


        _.extend(CardsViewModel.prototype, BaseViewModel.prototype, {
            initialize: function(options) {
                var self = this;

                self.selectedCategory('CreditCard');
                
                self.filterCardsByCategory();
                
                self.filteredCards = ko.pauseableComputed(function () {
                    self.sortCards();
                    self.trimCards();

                    console.log(self.sortBy() + ' ' + self.sortByDirection());

                    return self.cards();
                }, self);

                self.setupSubscriptions.call(self);
            },
            
            filterCardsByCategory: function () {
                var self = this;
                
                var cardsByCategory = [];
                _.each(cardsRepository.getCards(self.selectedCategory()), function (item) {
                    cardsByCategory.push(new CreditCard(item));
                });

                self.cards(cardsByCategory);
            },
            
            sortCards: function () {
                var self = this;
                self.cards.sortByProperty.call(self.cards, self.sortBy(), self.sortByDirection());
            },
            
            trimCards: function () {
                var self = this,
                    total = self.cards().length,
                    numberOfItemsToShow = self.pageSize() * self.currentPage();

                self.totalPages(total / self.pageSize());
                self.cards(self.cards().slice(0, numberOfItemsToShow));
            },
            
            setupSubscriptions: function () {
                var self = this;
                
                messageBus.data.subscribe('category.changed', function (category) {
                    self.filteredCards.pause();
                    self.selectedCategory(category);
                    self.filteredCards.resume();
                });
                
                messageBus.data.subscribe('calculator.update', function (calculatorData) {
                    self.filteredCards.pause();
                    calculatorUpdateHandler.call(self, calculatorData);
                    self.filteredCards.resume();
                });
                
                messageBus.data.subscribe('sort', function (data) {
                    self.filteredCards.pause();
                    self.sortBy(data.sortByProperty);
                    self.sortByDirection(data.sortByDirection);
                    self.filteredCards.resume();
                });
            }
        });

        return CardsViewModel;
    });