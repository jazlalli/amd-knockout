define(function(require) {
    'use strict';

    requirejs.config({
        shim: {
            underscore: { exports: "_" },
            bootstrap: { exports: "bootstrap" },
            pager: { exports: "pager", deps: ["knockout", "underscore", "history"] },
            history: { exports: "history", deps: ["jquery"] }
        },
        packages: [
            {
                name: "jquery",
                location: "/Public/script/vendor",
                main: "jquery.js"
            },
            {
                name: "knockout",
                location: "/Public/script/vendor",
                main: "knockout.js"
            },
            {
                name: "underscore",
                location: "/Public/script/vendor",
                main: "underscore.js"
            },
            {
                name: "postal",
                location: "/Public/script/vendor",
                main: "postal.js"
            },
            {
                name: "bootstrap",
                location: "/Public/script/vendor",
                main: "bootstrap.js"
            },
            {
                name: "pager",
                location: "/Public/script/vendor",
                main: "pager.js"
            },
            {
                name: "history",
                location: "/Public/script/vendor",
                main: 'jquery.history.js'
            },
            {
                name: "extensions",
                location: "/Public/script/shared",
                main: "extensions.js"
            },
            {
                name: "app",
                location: "/Public/script",
                main: "app.js"
            }
        ]
    });

    require(['app', 'extensions'], function (App) {
        var path = window.location.pathname.substr(1, window.location.pathname.length);

        window.App = new App();
        
        window.App.showTable = function (page, callback) {
            $(page.element).fadeIn(500, callback);
        };
        
        window.App.hideTable = function (page, callback) {
            var $e = $(page.element);
            if (!page.pageHiddenOnce) {
                page.pageHiddenOnce = true;
                $e.hide();
            } else {
                $e.fadeOut(100, function () {
                    $e.hide();
                });
                if (callback) {
                    callback();
                }
            }
        };
        
        window.App.bootstrap(path);
    });
});