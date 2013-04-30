define(['underscore', 'shared/resourceManager'], function (_, resourceManager) {
    'use strict';

    var _key = '/Cards';
    var _cardsData = [];

    var mapOfferDetails = function (options) {
        var i, item,
            cardCount = _cardsData.length,
            cardProperty,
            cardCategory,
            cardDisplayOrder,
            cardCategories,
            cardDisplayOrders,
            sortValue;

        for (i = 0; i < cardCount; i += 1) {
            item = _cardsData[i];
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

    var getCardsInCategory = function (options) {
        resourceManager.get(_key, {}, function(data) {
            _cardsData = _.filter(data.CreditCards, function(item) {
                return _.pluck(item.Categories, 'Name').indexOf(options.category) > -1;
            });
        });
    };

    var sortCards = function (options) {
        _cardsData.sortByProperty('DisplayOrder', 'asc');
        _cardsData.sortByProperty(options.sortBy, options.sortByDirection);
    };

    return {
        getCards: function (options) {

            getCardsInCategory(options);
            mapOfferDetails(options);
            sortCards(options);

            return _cardsData.slice(0, (options.pageSize * options.currentPage));
        }
    };
});