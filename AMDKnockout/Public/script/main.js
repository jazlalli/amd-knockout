define(function(require) {
    'use strict';

    requirejs.config({
        packages: [
            {
                name: "jquery",
                location: "/Public/script/vendor",
                main: "jquery.js"
            },
            {
                name: "ko",
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
                name: "extensions",
                location: "/Public/script/extensions",
                main: "extensions.js"
            },
            {
                name: "app",
                location: "/Public/script",
                main: "app.js"
            }
        ],
        shim: {
            ko: {
                exports: "ko"
            },
            underscore: {
                exports: "_"
            },
            bootstrap: {
                exports: "bootstrap"
            }
        }
    });

    require(['app', 'extensions'], function (App) {

    });
});