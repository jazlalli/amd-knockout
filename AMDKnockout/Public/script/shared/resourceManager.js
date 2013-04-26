define(['jquery', 'underscore'], function($, _) {
    'use strict';

    if (window.ResponseData) {
        localStorage.setItem('/Cards', JSON.stringify(window.ResponseData));
    }

    return {
        get: function (key, data, callback) {
            var result = JSON.parse(localStorage.getItem(key));

            if (result) {
                callback(result);
            } else {
                $.ajax({
                    url: key,
                    data: data,
                    type: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        localStorage.setItem(key, JSON.stringify(response));
                        callback(response);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            }
        }
    };
});