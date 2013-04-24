define(['shared/resourceManager'], function (resourceManager) {
    'use strict';

    var _key = '/Cards';
    var _categories = [];

    var _getCategories = function () {
        resourceManager.get(_key, {}, function (data) {
            _categories = data.ProductCategories;
        });

        return _categories;
    };

    return {
        getCategories: function () {
            return _getCategories();
        }
    };
});