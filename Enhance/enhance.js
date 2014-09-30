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
        'enhanceCharts': 'js/enhanceCharts',
        'enhanceData':'js/enhanceData'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'enhanceCharts', 'enhanceData'
], function (d3, enhanceCharts,enhanceData) {

    var bubbleChart = d3.ninja.bubbleChart();
    var margin = {
        top: 20,
        bottom: 40,
        left: 60,
        right: 20
    };
    
    bubbleChart.height(400)
    .width(600)
    .border(false)
    .maxBubbleRadius(25)
    .yAxis1Title('Performance (previous 36 months)')
    .xAxisTitle('Risk')
    .title('Annualised Performance and Drawdown vs. Risk')
    .strokeColour('#525252')
    .bubbleSpill(false)
    .yMin(-14)
    .showGridLines(true)
    .margin(margin);

    var legend = d3.ninja.horizontalLegendSelectable();
        var legendMargin = {
        top: 20,
        bottom: 40,
        left: 10,
        right: 0
    };
    var legendItems = ['Cash Index', 'Low Risk', 'Medium Risk', 'High Risk', 'Equity Benchmark']
    

var bubbleChartData = getEnhanceDataXY();
    console.log('enhance data', bubbleChartData);
        d3.select('#bubbleChart')
            .datum(bubbleChartData)
            .call(bubbleChart);
    
    legend.margin(legendMargin)
    .width(250)
    .itemWidth(250)
    .fontColor('white')
    .fontSize(20)
    .fontColor('#333');
    d3.select('#legend')
        .datum(bubbleChartData.slice().reverse())
        .call(legend);

});


