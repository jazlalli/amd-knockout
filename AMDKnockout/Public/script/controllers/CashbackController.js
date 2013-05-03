define(['pager', 'controllers/TableController', 'controllers/CategoryController', 'controllers/CalculatorController'],
    function (pager, TableController, CategoryController, CalculatorController) {

        var CashbackController = function() {
            var self = this;
            var options = { selectedCategory: 'Cashback' };

            self.Table = new TableController(options);
            self.Categories = new CategoryController(options.selectedCategory);
            self.Calculator = new CalculatorController();
        };

        return CashbackController;
    });