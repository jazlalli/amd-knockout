define(['ko',
        'underscore',
        'viewModels/baseViewModel',
        'controllers/categoriesController'],
    function (ko, _, BaseViewModel, CategoriesController) {
        'use strict';

        var CategoriesViewModel = function () {
            this.categories = [];
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CategoriesViewModel.prototype, BaseViewModel.prototype, CategoriesController.prototype, {
            initialize: function () {
                var self = this;

                var controller = new CategoriesController();
                var data = controller.buildModel();
                
                self.categories(data);
            }
        });

        return CategoriesViewModel;
    });