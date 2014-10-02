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
        'dimple': 'js/dimple.v2.1.0.min',
        'enhanceCharts': 'js/enhanceCharts',
        'enhanceData': 'js/enhanceData',
        'ninjaCharts.v0.2.0': 'js/ninjaCharts.v0.2.0'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'enhanceCharts', 'enhanceData', 'ninjaCharts.v0.2.0'
], function (d3, enhanceCharts, enhanceData, ninjaCharts) {

    var bubbleChart = d3.enhance.riskAndPerformanceChart();
    var margin = {
        top: 30,
        bottom: 80,
        left: 60,
        right: 20
    };

    bubbleChart.height(400)
        .width(700)
        .border(false)
        .maxBubbleRadius(25)
        .yAxis1Title('Performance')
        .xAxisTitle('Risk')
        .title('Index Performance vs. Risk')
        .strokeColour('#525252')
        .bubbleSpill(false)
        .yMin(-14)
        .showGridLines(true)
        .margin(margin);

    bubbleChart.on('mouseover', function (d) {
console.log('mouseover:',d);
        myHistogram.title('Return Distribution of ' + d.name)
        drawHistogram(d.individualReturns);

    });

    var legend = d3.enhance.horizontalLegendSelectable();
    var legendMargin = {
        top: 20,
        bottom: 40,
        left: 10,
        right: 0
    };
    var legendItems = ['Cash Index', 'Low Risk', 'Medium Risk', 'High Risk', 'Equity Benchmark']

    //histogram
    var myHistogram = d3.ninja.histogram();
    myHistogram.margin(margin)
    .yAxis1Title('Proportion of Portfolios')
    .xAxisTitle('Annualised Return')
        .tickFormat(d3.format(".01f"))
        .range([-10, 10])
    //        .bins(d3.scale.linear().ticks(20))
    .bins(20)
        .plotFrequency(false)
    //    .xMax(6).xMin(-6)
    .height(300)
        .width(700);

    console.log('histo margin',myHistogram.margin());     



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


    var drawHistogram = function (histoData) {
        d3.select("#histogram")
            .datum(histoData)
            .call(myHistogram);
    };

    var drawInfoLegend = function () {
        var svgContainer = d3.select('#infoLegend').append('svg')
            .attr('width', 380)
            .attr('height', 145);
        // http://tributary.io/inlet/cc4700b1fb7c30177fa4
        //var svgContainer = d3.select("svg");

        var jsonCircles = [{
                'x_axis': 22,
                'y_axis': 22,
                'radius': 20
}],
            fillColor = '#9b9b9b',
            opacity = 0.7,
            strokeColor = '#333';

        var circles = svgContainer.selectAll('circle')
            .data(jsonCircles)
            .enter()
            .append('circle');

        circles.attr('cx', function (d) {
            return d.x_axis;
        })
            .attr('cy', function (d) {
                return d.y_axis;
            })
            .attr('r', function (d) {
                return d.radius;
            })
            .style({
                fill: fillColor,
                opacity: opacity,
                stroke: strokeColor
            });

        var text1 = svgContainer.selectAll('text1')
            .data([0])
            .enter()
            .append('text').classed('text1', true);

        text1.attr('x', 48)
            .attr('y', 29)
            .text('Annualised Performance over previous 36 months');


        var x = 22,
            y = 136;

        svgContainer.append('line')
            .attr({
                x1: x,
                y1: 50,
                x2: x,
                y2: y
            })
            .style({
                stroke: fillColor,
                'stroke-width': 3
            });

        svgContainer.append('line')
            .attr({
                x1: x - 10,
                y1: y,
                x2: x + 10,
                y2: y
            })
            .style({
                stroke: fillColor,
                'stroke-width': 1
            });

        var text2 = svgContainer.selectAll('text2')
            .data([0])
            .enter()
            .append('text').classed('text2', true);

        text2.attr('x', 48)
            .attr('y', 98)
            .text('Max. Drawdown over previous 36 months');
    };

    drawInfoLegend();
    drawHistogram(bubbleChartData[2].individualReturns)
});