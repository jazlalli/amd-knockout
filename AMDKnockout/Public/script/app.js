define(['jquery',
        'underscore',
        'knockout',
        'pager',
        'controllers/CategoryController',
        'controllers/IndexController',
        'controllers/BalanceTransferController',
        'controllers/PurchaseController',
        'shared/messageBus'],
    function ($, _, ko, pager, CategoryController, IndexController, BalanceTransferController, PurchaseController, messageBus) {

        var App = function (options) {
            options = options || {};
            this.initialize();
        };

        _.extend(App.prototype, {
            initialize: function () {
                var self = this;

                pager.useHTML5history = true;
                pager.Href5.history = History;
                
                // TODO Wrap up controllers in page level controller
                self.CategoryController = new CategoryController();
                self.IndexController = new IndexController();
                self.BalanceTransferController = new BalanceTransferController();
                self.PurchaseController = new PurchaseController();
                
                pager.extendWithPage(self.CategoryController.viewModel);
                pager.extendWithPage(self.IndexController.Table.viewModel);
                pager.extendWithPage(self.BalanceTransferController.Table.viewModel);
                pager.extendWithPage(self.PurchaseController.Table.viewModel);
            },
            
            bootstrap: function () {
                var self = this;
                
                // TODO Bind viewmodel using data attribute instead of hard-coded DOM selector
                ko.applyBindings(self.CategoryController.viewModel, $('#categories')[0]);
                ko.applyBindings(self.IndexController.Table.viewModel, $('#all')[0]);
                ko.applyBindings(self.BalanceTransferController.Table.viewModel, $('#bt')[0]);
                ko.applyBindings(self.PurchaseController.Table.viewModel, $('#purchase')[0]);
                
                pager.startHistoryJs();
                this.ready();
            },
            
            ready: function () {
                messageBus.app.publish('ready');
                $('#results').css({ visibility: 'visible' });
            }
        });

        return App;
    });