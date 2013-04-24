define(['underscore', 'shared/resourceManager'], function (_, resourceManager) {
    'use strict';

    var _root = '/SavingsCalculator';
    var _keys = [
        '/CalculateBalanceTransferSavingAmounts',
        '/CalculatePurchaseSavingAmounts',
        '/CalculateCashbackSavingAmounts',
        '/CalculateRewardsSavingAmounts'
    ];

    var i = 0;
    
    var _getSavings = function (data) {
        var _savings = [];

        var _key = _.find(_keys, function (key) {
            return key.indexOf(data.selectedCategory) > -1;
        });

        if (_key) {
            resourceManager.get(_root + _key, data, function(result) {
                i += 1;
                _savings = result;
            });
            
            _savings.sort(function (a, b) {
                return a.SavingAmount < b.SavingAmount
                    ? 1
                    : -1;
            });
        }

        for (var j = 0; j < _savings.length; j++) {
            _savings[j].SavingAmount += i;
        }

        return _savings;
    };

    return {
        getSavings: function (data) {
            return _getSavings(data);
        }
    };
});