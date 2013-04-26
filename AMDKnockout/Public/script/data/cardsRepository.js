define(['underscore', 'shared/resourceManager'], function (_, resourceManager) {
    'use strict';

    var _key = '/Cards';
    var _cards = [];

    var _getCards = function(options) {

        console.log(options);

        resourceManager.get(_key, {}, function (data) {
            _cards = _.filter(data.CreditCards, function (item) {
                var cardCategory,
                    cardDisplayOrder,
                    cardCategories = _.pluck(item.Categories, 'Name'),
                    cardDisplayOrders = _.pluck(item.Categories, 'DisplayOrder');

                if (cardCategories.indexOf(options.category) > -1) {
                    cardCategory = cardCategories[cardCategories.indexOf(options.category)];
                    cardDisplayOrder = cardDisplayOrders[cardCategories.indexOf(options.category)];

                    item.Category = cardCategory;
                    item.DisplayOrder = cardDisplayOrder;
                }

                return _.pluck(item.Categories, 'Name').indexOf(options.category) > -1;
            });
        });

        _cards.sortByProperty(options.sortBy, options.sortByDirection);
        return _cards.slice(0, (options.pageSize * options.currentPage));
    };

    return {
        getCards: function (options) {
            return _getCards(options);
        }
    };
});