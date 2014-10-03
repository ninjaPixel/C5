require.config({
    config: {
        moment: {
            noGlobal: true
        }
    },
    paths: {
        'moment': 'moment.v2.8.1.min',
        'moment-timezone': 'moment-timezone.v0.2.1.min',
        'moment-timezone-data': 'moment-timezone-with-data-2010-2020',
        'd3': 'd3.v3.4.11.min',
        'queue': 'queue.min',
        'dimple': 'dimple.v2.1.0.min',
        'ninjaCharts': 'ninjaCharts.v0.2.1',
        'opticsData': 'opticsData'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'opticsData'
], function (d3, opticsData) {


    var createTimeSeriesArray(instrumentName) {
        var newTimeSeries = [];
        opticsRawTimeSeries.forEach(function (d) {
            newTimeSeries.push({
                x: d.Dates,
                y: d[instrumentName]
            });
        });
        return [{
            name: instrumentName,
            values: newTimeSeries
        }];
    };

});