define(['postal'], function (postal) {
    var channels = {
        app: postal.channel('app'),
        data: postal.channel('data')
    };
    return channels;
});