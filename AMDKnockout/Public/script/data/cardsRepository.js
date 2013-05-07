define(['underscore', 'data/savingsRepository', 'shared/resourceManager'], function (_, savingsRepository, resourceManager) {
    'use strict';

    var _key = '/Cards';
    var _cards = [];

    // get all cards in matching category
    var getCardsInCategory = function (options) {
        resourceManager.get(_key, {}, function (data) {
            _cards = _.filter(data.CreditCards, function (item) {
                return _.pluck(item.Categories, 'Name').indexOf(options.category) > -1;
            });
        });
    };
    
    // maps category, displayorder, and all offerdetails up to object root
    var mapOfferDetails = function (options) {
        var i, item,
            cardCount = _cards.length,
            cardProperty,
            cardCategory,
            cardDisplayOrder,
            cardCategories,
            cardDisplayOrders,
            sortValue;

        for (i = 0; i < cardCount; i += 1) {
            item = _cards[i];
            cardCategories = _.pluck(item.Categories, 'Name'),
            cardDisplayOrders = _.pluck(item.Categories, 'DisplayOrder');

            if (cardCategories.indexOf(options.category) > -1) {
                cardCategory = cardCategories[cardCategories.indexOf(options.category)];
                cardDisplayOrder = cardDisplayOrders[cardCategories.indexOf(options.category)];

                item.Category = cardCategory;
                item.DisplayOrder = cardDisplayOrder;
            }
            
            for (cardProperty in item.OfferDetail) {
                if (item.OfferDetail.hasOwnProperty(cardProperty)) {

                    if (item.OfferDetail[cardProperty]) {
                        if (cardProperty === options.sortBy) {
                            sortValue = parseFloat(item.OfferDetail[cardProperty], 10);

                            if (!sortValue) {
                                item[cardProperty] = 0;
                            } else {
                                item[cardProperty] = sortValue;
                            }
                        }
                    }
                }
            }
        }
    };

    // get savings data and map it to the current set of cards
    var getSavings = function (options) {
        var savings = savingsRepository.getSavings(options);

        _.each(_cards, function (card) {
            _.find(savings, function (saving) {
                card.SavingAmount = saving.SavingAmount;
                return card.ProductCode === saving.ProductCode;
            });
        });
    };

    // sorts by the property specified,  always falling back to displayorder
    var sortCards = function (options) {
        _cards.sortByProperty('DisplayOrder', 'asc');
        _cards.sortByProperty(options.sortBy, options.sortByDirection);
    };

    return {
        getCards: function (options) {
            _cards = [];
            
            getCardsInCategory(options);
            mapOfferDetails(options);
            
            if (options.calculator) {
                getSavings(options);
            }

            sortCards(options);
            
            // only return number of objects required for current page parameters
            _cards = _cards.slice(0, (options.pageSize * options.currentPage));
            return _cards;
        }
    };
});