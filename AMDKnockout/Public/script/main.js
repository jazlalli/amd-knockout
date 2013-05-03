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

        window.spinnerLoader = function (page, element) {
            var loader = {};
            var txt = $('<img src="Public/images/loader.gif"/>');

            loader.load = function () {
                $(element).empty();
                $(element).append(txt);
            };
            loader.unload = function () {
                txt.remove();
            };

            console.log(loader);

            return loader;
        };

        window.App.bootstrap(path);
    });
});