define(['ko',
        'underscore',
        'viewModels/baseViewModel'],
    function (ko, _, BaseViewModel) {
        'use strict';

        var CategoriesViewModel = function () {
            this.categories = [];
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CategoriesViewModel.prototype, BaseViewModel.prototype, {
            initialize: function () {
            }
        });

        return CategoriesViewModel;
    });