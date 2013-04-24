define(['ko',
        'underscore',
        'viewModels/baseViewModel',
        'models/productCategory',
        'data/categoriesRepository',
        'shared/messageBus'],
    function (ko, _, BaseViewModel, ProductCategory, categoriesRepository, messageBus) {
        'use strict';

        var CategoriesViewModel = function () {
            this.categories = [];

            BaseViewModel.apply(this, arguments);
        };

        _.extend(CategoriesViewModel.prototype, BaseViewModel.prototype, {
            initialize: function (options) {
                var self = this;
                this.build.apply(self);
            },
            
            build: function () {
                var categories = categoriesRepository.getCategories();

                _.each(categories, function (category) {
                    this.categories.push(new ProductCategory(category));
                }, this);
            },
            
            setSelectedCategory: function (category) {
                messageBus.data.publish({
                    topic: 'category.changed',
                    data: category.Name()
                });
            }
        });

        return CategoriesViewModel;
    });