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
            
            self.cardViewOptions = { calculator: null };
            self.initialize.call(self, options);
        };
        
        _.extend(TableController.prototype, {
            initialize: function (options) {
                var self = this;

                self.viewModel = new TableViewModel(options);

                self.setupSubscriptions.call(self, options.selectedCategory);
                self.updateCards.call(self);
            },
            
            setupSubscriptions: function (category) {
                var self = this;

                messageBus.data.subscribe(category.toLowerCase() + '.table.sort', function () {
                    self.updateCards();
                });
                
                messageBus.data.subscribe(category.toLowerCase() + '.savings.update', function (data) {
                    self.updateSavings(data);
                });
            },
            
            updateSavings: function (parameters) {
                var self = this,
                    prop;

                self.cardViewOptions.calculator = {};

                for (prop in parameters) {
                    if (parameters.hasOwnProperty(prop)) {
                        if (_.isFunction(parameters[prop])) {
                            self.cardViewOptions.calculator[prop] = parameters[prop]();
                        } else {
                            self.cardViewOptions.calculator[prop] = parameters[prop];
                        }
                    }
                }

                self.viewModel.sortBy('SavingAmount');
                self.viewModel.sortByDirection('desc');
                self.updateCards.call(self);
            },
            
            updateCards: function() {
                var self = this;
                var cardsModel = [];

                self.cardViewOptions.category = self.viewModel.selectedCategory();
                self.cardViewOptions.sortBy = self.viewModel.sortBy();
                self.cardViewOptions.sortByDirection = self.viewModel.sortByDirection();
                self.cardViewOptions.pageSize = self.viewModel.pageSize();
                self.cardViewOptions.currentPage = self.viewModel.currentPage();

                _.each(cardsRepository.getCards(self.cardViewOptions), function (card) {
                    cardsModel.push(new CreditCard(card));
                });
                
                self.viewModel.cards(cardsModel);
            }
        });

        return TableController;
    });