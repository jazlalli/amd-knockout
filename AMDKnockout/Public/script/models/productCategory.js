define(["knockout", "underscore", "viewModels/baseViewModel"], function (ko, _, BaseViewModel) {
    var ProductCategory = function (options) {
        this.Name = null;
        this.Text = null;
        this.Count = 0;
        this.Selected = false;

        this.initialize();

        BaseViewModel.apply(this, arguments);
    };

    _.extend(ProductCategory.prototype, BaseViewModel.prototype, {
        initialize: function () {
        }
    });

    return ProductCategory;
});