var tests = [];

for (var file in window.__karma__.files) {
    if (/Tests\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/Public/script',

    paths: {
        require: "require-jquery",
        jquery: "vendor/jquery",
        knockout: "vendor/knockout",
        knockoutvalidation: "vendor/knockout-validation",
        underscore: "vendor/underscore",
        postal: "vendor/postal",
        pager: "vendor/pager",
        extensions: "shared/extensions",
        app: "app"
    },
    
    shim: {
        underscore: { exports: "_" },
        bootstrap: { exports: "bootstrap" },
        pager: { exports: "pager", deps: ["knockout", "underscore", "history"] },
        history: { exports: "history", deps: ["jquery"] },
        knockoutvalidation: { deps: ["knockout"] }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,
    
    callback: window.__karma__.start
});