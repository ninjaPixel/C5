require.config({
    config: {
        moment: {
            noGlobal: true
        }
    },
    paths: {
        'moment': '../../js/moment.v2.8.1.min',
        'moment-timezone': '../../js/moment-timezone.v0.2.1.min',
        'moment-timezone-data': '../../js/moment-timezone-with-data-2010-2020',
        'jquery': '../../js/jquery-2.0.0.min',
        'd3': 'js/d3.v3.4.11.min',
        'queue': '../../js/queue.min',
        'XDate': '../../js/XDate',
        'jqueryUI': '../../js/jquery-ui-1.11.1/jquery-ui.min',
        'dimple':'js/dimple.v2.1.0.min'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'dimple'
], function (d3, dimple) {

    var svg = dimple.newSvg("body", 800, 600);
    var data = [
        {
            "Word": "Hello",
            "Awesomeness": 2000
        },
        {
            "Word": "World",
            "Awesomeness": 3000
        }
    ];
    var chart = new dimple.chart(svg, data);
    chart.addCategoryAxis("x", "Word");
    chart.addMeasureAxis("y", "Awesomeness");
    chart.addSeries(null, dimple.plot.bar);
    chart.draw();
});


