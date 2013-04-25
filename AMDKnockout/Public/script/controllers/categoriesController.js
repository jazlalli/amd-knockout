define(['ko',
        'underscore',
        'controllers/baseController',
        'models/productCategory',
        'data/categoriesRepository',
        'shared/messageBus'],
    function(ko, _, BaseController, ProductCategory, categoriesRepository, messageBus) {

        var CategoriesController = function() {
            BaseController.apply(this, arguments);
        };

        _.extend(CategoriesController.prototype, BaseController.prototype, {
            initialize: function() {
            },

            buildModel: function() {
                var model = [],
                    categories = categoriesRepository.getCategories();

                _.each(categories, function(category) {
                    model.push(new ProductCategory(category));
                }, this);

                return model;
            },
            
            setSelectedCategory: function (category) {
                console.log('category change handler in controller');
                
                messageBus.data.publish({
                    topic: 'category.changed',
                    data: category.Name()
                });
            }
        });

        return CategoriesController;
    });