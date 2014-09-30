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
        'dimple':'js/dimple.v2.1.0.min',
        'ninjaCharts.v0.1.2': 'js/ninjaCharts.v0.1.2',
        'enhanceData':'js/enhanceData'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'ninjaCharts.v0.1.2', 'enhanceData'
], function (d3, ninjaCharts,enhanceData) {

    var bubbleChart = d3.ninja.bubbleChart();
    //bubbleChart.bubbleSpill(true);
    var margin = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 20
    };
    bubbleChart.height(400)
    .width(600)
    .border(false)
    .maxBubbleRadius(25)
    .yAxis1Title('Performance (previous 36 months)')
    .xAxisTitle('Risk')
    .title('Annualised Performance & Drawdown vs. Risk')
    .strokeColour('#525252')
    .bubbleSpill(false)
    .showGridLines(true)
    .margin(margin);


var bubbleChartData = getEnhanceDataXY();
    console.log('enhance data', bubbleChartData);
        d3.select('#bubbleChart')
            .datum(bubbleChartData)
            .call(bubbleChart);

});


