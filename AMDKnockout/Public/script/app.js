define(['jquery',
        'underscore',
        'knockout',
        'pager',
        'controllers/CategoryController',
        'controllers/AllCardsController',
        'controllers/BalanceTransferController',
        'controllers/PurchaseController',
        'controllers/CashbackController',
        'controllers/RewardsController',
        'controllers/CombinedController',
        'controllers/PoorCreditController',
        'shared/messageBus'],
    function ($,
        _,
        ko,
        pager,
        CategoryController,
        AllCardsController,
        BalanceTransferController,
        PurchaseController,
        CashbackController,
        RewardsController,
        CombinedController,
        PoorCreditController,
        messageBus) {

        var App = function(options) {
            options = options || {};
            this.initialize();
        };

        _.extend(App.prototype, {
            initialize: function() {
                var self = this;

                // TODO Wrap up controllers in page level controller
                self.CategoryController = new CategoryController();
                self.AllCardsController = new AllCardsController();
                self.BalanceTransferController = new BalanceTransferController();
                self.PurchaseController = new PurchaseController();
                self.CashbackController = new CashbackController();
                self.RewardsController = new RewardsController();
                self.CombinedController = new CombinedController();
                self.PoorCreditController = new PoorCreditController();

                this.ready();
            },

            bootstrap: function() {
                var self = this;

                pager.useHTML5history = true;
                pager.Href5.history = History;

                var rootViewModel = {
                    categories: self.CategoryController.viewModel,
                    allcards: self.AllCardsController.Table.viewModel,
                    balancetransfer: self.BalanceTransferController.Table.viewModel,
                    purchase: self.PurchaseController.Table.viewModel,
                    cashback: self.CashbackController.Table.viewModel,
                    rewards: self.RewardsController.Table.viewModel,
                    combined: self.CombinedController.Table.viewModel,
                    poorcredit: self.PoorCreditController.Table.viewModel
                };

                pager.extendWithPage(rootViewModel);
                ko.applyBindings(rootViewModel);
                pager.startHistoryJs();
            },

            ready: function() {
                messageBus.app.publish('ready');
            }
        });

        return App;
    });