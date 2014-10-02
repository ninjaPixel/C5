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
    'd3', 'enhanceCharts', 'ninjaCharts.v0.2.0', 'enhanceData'
], function (d3, enhanceCharts, ninjaCharts, enhanceData) {

    var bubbleChart = d3.enhance.riskAndPerformanceChart();
    var margin = {
        top: 35,
        bottom: 80,
        left: 60,
        right: 20
    };

    var commonChartWidth = 550;

    bubbleChart.height(400)
        .width(commonChartWidth)
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
        drawHistogram(d.individualReturns, d.name);
    });

    var legend = d3.enhance.horizontalLegendSelectable();
    var legendMargin = {
        top: margin.top,
        bottom: 40,
        left: 20,
        right: 0
    };
    //    var legendItems = ['Cash Index', 'Low Risk', 'Medium Risk', 'High Risk', 'Equity Benchmark']

    //histogram
    var myHistogram = d3.ninja.histogram();
    myHistogram.margin(margin)
        .yAxis1Title('Proportion of Portfolios')
        .xAxisTitle('Performance')
    //            .bins(d3.scale.linear().ticks(30))
    .bins(20)
        .plotFrequency(false)
        .yMax(0.45)
        .height(300)
        .width(commonChartWidth);

    myHistogram.tickFormat(function (d) {
        return d + '%';
    })
        .range([-10, 10])

    myHistogram.yAxisTickFormat(function (d) {
        return Math.round(d * 100, 0) + '%';
    });


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

    legend.on('mouseover', function (d) {
        drawHistogram(d.individualReturns, d.name);
    });

    d3.select('#legend')
        .datum(bubbleChartData.slice().reverse())
        .call(legend);


    var drawHistogram = function (histoData, name) {
        myHistogram.title('Distribution of ' + name + ' Product')
        d3.select('#histogram')
            .datum(histoData)
            .call(myHistogram);
    };

    var drawInfoLegend = function () {
        var xTranslate = legendMargin.left,
            yTranslate = legendMargin.top;
        var svgContainer = d3.select('#infoLegend').append('svg')
            .attr('width', 380 + xTranslate)
            .attr('height', 145 + yTranslate);


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
            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
            .style({
                fill: fillColor,
                opacity: opacity,
                stroke: strokeColor
            });

        //        var text1 = svgContainer.selectAll('text1')
        //            .data([0])
        //            .enter()
        //            .append('text').classed('text1', true);
        //
        //        text1.attr('x', 48)
        //            .attr('y', 29)
        //            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
        //            .text('Annualised Performance over previous 36 months');

        var arr = ['Annualised Performance', 'over previous 36 months'];
        var text3 = svgContainer.selectAll('text3')
            .data(arr)
            .enter()
            .append('text').classed('text3', true);

        text3.attr('x', 48)
            .attr('y', 16)
            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
            .each(function (d, i) {
                d3.select(this).append('tspan')
                    .text(d)
                    .attr('dy', i ? '1.2em' : 0)
                    .attr('class', 'tspan' + i);
            });

        var x = 22,
            y = 136;

        svgContainer.append('line')
            .attr({
                x1: x,
                y1: 50,
                x2: x,
                y2: y
            })
            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
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
            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
            .style({
                stroke: fillColor,
                'stroke-width': 1
            });

//        var text2 = svgContainer.selectAll('text2')
//            .data([0])
//            .enter()
//            .append('text').classed('text2', true);
//
//        text2.attr('x', 48)
//            .attr('y', 98)
//            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
//            .text('Max. Drawdown over previous 36 months');

         arr = ['Maximum Drawdown', 'over previous 36 months'];
        var text4 = svgContainer.selectAll('text4')
            .data(arr)
            .enter()
            .append('text').classed('text4', true);

        text4.attr('x', 48)
            .attr('y', 98)
            .attr('transform', 'translate(' + xTranslate + ', ' + yTranslate + ')')
            .each(function (d, i) {
                d3.select(this).append('tspan')
                    .text(d)
                    .attr('dy', i ? '1.2em' : 0)
                    .attr('class', 'tspan' + i);
            });
    };

    drawInfoLegend();
    drawHistogram(bubbleChartData[2].individualReturns, 'Medium Risk')
});