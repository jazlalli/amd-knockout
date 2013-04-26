define(['ko',
        'underscore',
        'data/categoriesRepository',
        'models/productCategory',
        'viewModels/categoriesViewModel',
        'shared/messageBus'],
    function (ko, _, categoriesRepository, ProductCategory, CategoriesViewModel, messageBus) {

        var CategoriesController = function() {
            var self = this;
            self.initialize.call(self);
        };

        _.extend(CategoriesController.prototype, {
            initialize: function () {
                var self = this;
                
                self.viewModel = new CategoriesViewModel();

                var model = self.buildCategoriesModel();
                self.viewModel.categories(model);
            },
            
            buildCategoriesModel: function () {
                var model = [],
                    categories = categoriesRepository.getCategories();

                _.each(categories, function (category) {
                    model.push(new ProductCategory(category));
                }, this);

                return model;
            },

            setSelectedCategory: function (category) {
                messageBus.data.publish({
                    topic: 'category.changed',
                    data: category.Name()
                });
            }
        });

        return CategoriesController;
    }); 