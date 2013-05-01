define(['knockout',
        'underscore',
        'viewModels/BaseViewModel'],
    function (ko, _, BaseViewModel) {
        'use strict';

        var CategoriesViewModel = function () {
            this.category = [];
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CategoriesViewModel.prototype, BaseViewModel.prototype, {
            initialize: function () {
            }
        });

        return CategoriesViewModel;
    });