define(['knockout', 'underscore', 'viewModels/BaseViewModel'],
    function (ko, _, BaseViewModel) {

        var TableViewModel = function (options) {
            this.cards = [];
            this.pageSize = 10;
            this.currentPage = 1;

            if (options.selectedCategory) {
                this.selectedCategory = options.selectedCategory;
            } else {
                this.selectedCategory = null;
            }

            if (options.sortBy) {
                this.sortBy = options.sortBy;
            } else {
                this.sortBy = 'DisplayOrder';
            }

            if (options.sortDirection) {
                this.sortByDirection = options.sortDirection;
            } else {
                this.sortByDirection = 'asc';
            }

            BaseViewModel.apply(this, arguments);
        };

        _.extend(TableViewModel.prototype, BaseViewModel.prototype, {
            initialize: function () {
            }
        });

        return TableViewModel;
    });