define(['jquery',
        'underscore',
        'knockout',
        'pager',
        'controllers/AllCardsController',
        'controllers/BalanceTransferController',
        'controllers/PurchaseController',
        'controllers/CashbackController',
        'controllers/RewardsController',
        'controllers/CombinedController',
        'controllers/PoorCreditController',
        'controllers/FormController',
        'shared/messageBus'],
    function ($,
        _,
        ko,
        pager,
        AllCardsController,
        BalanceTransferController,
        PurchaseController,
        CashbackController,
        RewardsController,
        CombinedController,
        PoorCreditController,
        FormController,
        messageBus) {

        var App = function (options) {
            var self = this;
            options = options || {};
            
            self.initialize.call(self, options);
        };

        _.extend(App.prototype, {
            initialize: function () {
            },

            bootstrap: function (path) {
                var self = this,
                    p1, p2, p3,
                    rootViewModel = {};

                pager.useHTML5history = true;
                pager.Href5.history = History;
                
                self.AllCards = new AllCardsController();
                self.BalanceTransfer = new BalanceTransferController();
                self.Purchase = new PurchaseController();
                self.Cashback = new CashbackController();
                self.Rewards = new RewardsController();
                self.Combined = new CombinedController();
                self.PoorCredit = new PoorCreditController();
                self.Form = new FormController();
                
                // traversing the App object to find all the viewmodels and pull them up to top level
                for (p1 in self) {
                    if (self.hasOwnProperty(p1)) {
                        if (p1 === 'viewModel') {
                            rootViewModel[p1] = self[p1];
                        } else {
                            rootViewModel[p1] = {};

                            for (p2 in self[p1]) {
                                if (self[p1].hasOwnProperty(p2)) {
                                    if (p2 === 'viewModel') {
                                        rootViewModel[p1] = self[p1][p2];
                                    } else {
                                        rootViewModel[p1][p2] = {};
                                    }

                                    for (p3 in self[p1][p2]) {
                                        if (self[p1][p2].hasOwnProperty(p3)) {
                                            if (p3 === 'viewModel') {
                                                rootViewModel[p1][p2] = self[p1][p2][p3];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                pager.extendWithPage(rootViewModel);
                ko.applyBindings(rootViewModel);
                pager.startHistoryJs(path);

                self.ready.call(self);
            },
            
            ready: function () {
                messageBus.app.publish('ready');
                $(".content-main").css({ visibility: 'visible' });
            }
        });

        return App;
    });