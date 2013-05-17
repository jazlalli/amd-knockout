define(function(require) {
    "use strict";

    requirejs.config({
        shim: {
            underscore: { exports: "_" },
            bootstrap: { exports: "bootstrap" },
            pager: { exports: "pager", deps: ["knockout", "underscore", "history"] },
            history: { exports: "history", deps: ["jquery"] },
            jqueryui: { deps: ["jquery"] },
            knockoutvalidation: { deps: ["knockout"] }
        },
        packages: [
            {
                name: "jquery",
                location: "/Public/script/vendor",
                main: "jquery.js"
            },
            {
                name: "jqueryui",
                location: "/Public/script/vendor",
                main: "jquery-ui-1.10.2.custom.min.js"
            },
            {
                name: "knockout",
                location: "/Public/script/vendor",
                main: "knockout.js"
            },
            {
                name: "knockoutvalidation",
                location: "/Public/script/vendor",
                main: "knockout-validation.js"
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
                main: "jquery.history.js"
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

    require(["app", "extensions"], function (App) {
        var path = window.location.pathname.substr(1, window.location.pathname.length);

        window.App = new App();
        window.App.bootstrap(path);
    });
});