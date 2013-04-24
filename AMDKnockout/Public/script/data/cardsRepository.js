define(['underscore', 'shared/resourceManager'], function (_, resourceManager) {
    'use strict';

    var _key = '/Cards';
    var _cards = [];

    var _getCards = function(category) {
        resourceManager.get(_key, {}, function (data) {
            _cards = _.filter(data.CreditCards, function (item) {
                
                var cardCategory,
                    cardDisplayOrder,
                    cardCategories = _.pluck(item.Categories, 'Name'),
                    cardDisplayOrders = _.pluck(item.Categories, 'DisplayOrder');

                if (cardCategories.indexOf(category) > -1) {
                    cardCategory = cardCategories[cardCategories.indexOf(category)];
                    cardDisplayOrder = cardDisplayOrders[cardCategories.indexOf(category)];

                    item.Category = cardCategory;
                    item.DisplayOrder = cardDisplayOrder;
                }

                return _.pluck(item.Categories, 'Name').indexOf(category) > -1;
            });
        });

        return _cards;
    };

    return {
        getCards: function (category) {
            return _getCards(category);
        }
    };
});