define(['knockout',
        'underscore',
        'data/categoriesRepository',
        'models/ProductCategory',
        'viewModels/CategoriesViewModel',
        'shared/messageBus'],
    function (ko, _, categoriesRepository, ProductCategory, CategoriesViewModel, messageBus) {

        var CategoryController = function() {
            var self = this;
            self.initialize.call(self);
        };

        _.extend(CategoryController.prototype, {
            initialize: function () {
                var self = this;
                
                self.viewModel = new CategoriesViewModel();
                self.viewModel.categories(self.buildCategoriesModel());
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

        return CategoryController;
    }); 