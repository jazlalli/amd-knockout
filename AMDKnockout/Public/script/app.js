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

        var App = function (options) {
            var self = this;

            options = options || {};
            self.rootViewModel = {};

            self.initialize.call(self, options);
        };

        _.extend(App.prototype, {
            initialize: function () {
            },

            bootstrap: function (path) {
                var self = this;

                pager.useHTML5history = true;
                pager.Href5.history = History;
                
                self.AllCards = new AllCardsController();
                self.BalanceTransfer = new BalanceTransferController();
                self.Purchase = new PurchaseController();
                self.Cashback = new CashbackController();
                self.Rewards = new RewardsController();
                self.Combined = new CombinedController();
                self.PoorCredit = new PoorCreditController();

                self.rootViewModel.AllCards = self.AllCards.Table.viewModel;
                self.rootViewModel.BalanceTransfer = self.BalanceTransfer.Table.viewModel;
                self.rootViewModel.Purchase = self.Purchase.Table.viewModel;
                self.rootViewModel.Cashback = self.Cashback.Table.viewModel;
                self.rootViewModel.Rewards = self.Rewards.Table.viewModel;
                self.rootViewModel.Combined = self.Combined.Table.viewModel;
                self.rootViewModel.PoorCredit = self.PoorCredit.Table.viewModel;

                self.CategoryController = new CategoryController(path);
                self.rootViewModel.Categories = self.CategoryController.viewModel;

                pager.extendWithPage(self.rootViewModel);
                ko.applyBindings(self.rootViewModel);
                pager.startHistoryJs(path);

                self.ready.call(self, path);
            },
            
            ready: function (path) {
                messageBus.app.publish('ready');
                $("#results").css({ visibility: 'visible' });
            }
        });

        return App;
    });