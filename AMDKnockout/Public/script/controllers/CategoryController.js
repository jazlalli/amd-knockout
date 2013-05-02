define(['knockout',
        'underscore',
        'data/categoriesRepository',
        'models/ProductCategory',
        'viewModels/CategoriesViewModel',
        'shared/messageBus'],
    function (ko, _, categoriesRepository, ProductCategory, CategoriesViewModel, messageBus) {

        var CategoryController = function(category) {
            var self = this;
            self.initialize.call(self, category);
        };

        _.extend(CategoryController.prototype, {
            initialize: function (category) {
                var self = this;
                
                self.viewModel = new CategoriesViewModel();
                self.viewModel.category(self.buildCategoriesModel(category));
            },
            
            buildCategoriesModel: function (category) {
                var self = this;
                var model = [],
                    categories = categoriesRepository.getCategories();

                _.each(categories, function (c) {
                    var categoryModel = new ProductCategory(c);
                    if (category === c.Name) {
                        categoryModel.Selected(true);
                    }

                    model.push(categoryModel);
                }, self);

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