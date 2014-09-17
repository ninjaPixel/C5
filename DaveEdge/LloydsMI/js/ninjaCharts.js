// Version 0.1.1
// added stacked area chart
// Version 0.1
// - removed use of XDate

/// <reference path='d3.v3.js' />



// setup our charts in the d3.ninja namespace
d3.ninja = {};

var defaultValues = {
    ease: 'linear',
    width: 800,
    height: 500,
    margin: {
        top: 30,
        bottom: 60,
        left: 60,
        right: 30
    },
    lineWidth: 5,
    colours: {
        primary: '#8DC59A',
        secondary: '#204934',
        tertiary: '#CCE8DA',
        light: '#4B7C63',
        dark: '#0F2D1E'
    },
    cornerRounding: 2,
    transitionDuration: 1000,
    lineInterpolation: 'basis', // use this to smooth line charts
    lineFill: 'none',
    lineOpacity: 1,
    bubbleOpacity: 0.65,
    legendBackgroundOpacity: 0.65,
    legendTextOpacity: 0.75,
    underLineAreaOpacity: 0,
    mouseOverOpacity: 0.95,

    // legend stuff
    legendFontSize: '14px',
    legendFontColor: '#a1a1a1',
    legendItemWidth: 70,
    legendItemHeight: 25,
    legendMargin: {
        top: 0,
        bottom: 0,
        left: 60,
        right: 0
    }
};

d3.ninja.barChart = function module() {
    var svg,
        width = defaultValues.width,
        height = defaultValues.height,
        cornerRounding = defaultValues.cornerRounding,
        barColour = defaultValues.colours.secondary,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        margin = defaultValues.margin;

    var dispatch = d3.dispatch('customHover');

    function exports(_selection) {
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.bottom - margin.top,

        _selection.each(function (_data) {
            var barW = chartWidth / _data.length,
                minData = 0,
                maxData = 0;

            if (d3.max(_data) > 0) {
                maxData = d3.max(_data);
            }
            if (d3.min(_data) < 0) {
                minData = d3.min(_data);
            }

            var xScale = d3.scale.ordinal()
                .domain(_data.map(function (d, i) {
                    return i;
                }))
                .rangeRoundBands([0, chartWidth], 0);

            var yScale = d3.scale.linear()
                .domain([minData, maxData])
                .range([chartHeight, 0]),
                barScale = d3.scale.linear()
                .domain([Math.abs(maxData - minData), 0])
                .range([chartHeight, 0]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');


            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }
            svg.transition().attr({
                width: width,
                height: height
            });

            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });

            svg.select('.x-axis-group.axis')
                .transition()
                .ease(ease)
                .attr({
                    transform: 'translate(' + 0 + ',' + (chartHeight) + ')'
                })
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .ease(ease)
                .call(yAxis);

            // Enter, Update, Exit on bars
            var yScale0 = yScale(0);
            var bars = svg.select('.chart-group').selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
                    x: function (d, i) {
                        return xScale(i);
                    },
                    width: barW * 0.95,
                    y: yScale0,
                    height: 0,
                    fill: barColour,
                    rx: cornerRounding,
                    ry: cornerRounding
                })
                .on('mouseover', dispatch.customHover);

            bars.transition()
                .duration(transitionDuration)
                .ease(ease)
                .attr({
                    x: function (d, i) {
                        return xScale(i);
                    },
                    width: barW * 0.9,
                    y: function (d) {
                        if (d > 0) {
                            return yScale(d);
                        } else {
                            return yScale(0);
                        }
                    },
                    height: function (d) {
                        return Math.abs(barScale(d));
                    },
                });
            bars.exit().transition().style({
                opacity: 0
            }).remove();
        });
    }

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function (_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.barColor = function (_x) {
        if (!arguments.length) return barColour;
        barColour = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.ninja.lineChart = function module() {
    var svg,
        width = defaultValues.width,
        height = defaultValues.height,
        strokeColour = defaultValues.colours.darkBlue,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        margin = defaultValues.margin,
        lineInterpolation = defaultValues.lineInterpolation,
        lineFill = defaultValues.lineFill,
        title = '',
        yAxis1Title = '',
        yAxis2Title = '',
        xAxisTitle = '',
        yMaxUserDefined,
        yMinUserDefined,
        lineOpacity = defaultValues.lineOpacity,
        areaOpacity = defaultValues.underLineAreaOpacity,
        areaSvg,
        lineSvg;

    var dispatch = d3.dispatch('customHover');

    function exports(_selection) {
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.bottom - margin.top;

        _selection.each(function (_data) {

            var _dataLen = _data.length,
                minDate,
                maxDate,
                minY,
                maxY;

            // just creating simple function to get the min and max values for each line (correct practice to do this outside the loop)
            function getMinDate(theData) {
                return d3.min(theData, function (d) {
                    return new Date(d.x).getTime();
                });
            }

            function getMaxDate(theData) {
                return d3.max(theData, function (d) {
                    return new Date(d.x).getTime();
                });
            }

            function getMinY(theData) {
                return d3.min(theData, function (d) {
                    return d.y;
                });
            }

            function getMaxY(theData) {
                return d3.max(theData, function (d) {
                    return d.y;
                });
            }
            // cycle through all the data to get min and max dates and the min/max y values
            for (var index = 0; index < _dataLen; index++) {
                var minDateOfThisArray = getMinDate(_data[index].timeseries),
                    maxDateOfThisArray = getMaxDate(_data[index].timeseries),
                    minYOfThisArray = getMinY(_data[index].timeseries),
                    maxYOfThisArray = getMaxY(_data[index].timeseries);

                if (index === 0) {
                    minDate = minDateOfThisArray;
                    maxDate = maxDateOfThisArray;
                    minY = minYOfThisArray;
                    maxY = maxYOfThisArray;
                } else {
                    if (minDateOfThisArray < minDate) {
                        minDate = minDateOfThisArray;
                    }
                    if (maxDateOfThisArray > maxDate) {
                        maxDate = maxDateOfThisArray;
                    }
                    if (maxYOfThisArray > maxY) {
                        maxY = maxYOfThisArray;
                    }
                    if (minYOfThisArray < minY) {
                        minY = minYOfThisArray;
                    }
                }
            }

            // if the user has specified min/max y values, then apply them now
            if (yMinUserDefined) {
                minY = yMinUserDefined;
            }
            if (yMaxUserDefined) {
                maxY = yMaxUserDefined;
            }

            // create the sclaing functions
            var xScale = d3.time.scale()
                .range([0, chartWidth]);
            xScale.domain([minDate, maxDate]);

            var yScale = d3.scale.linear()
                .domain([minY, maxY])
                .range([chartHeight, 0]);

            // axis of evil
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');


            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
                container.append("g").classed("chartTitle", true);
                container.append("g").classed("yTitle", true);
                container.append("g").classed("xTitle", true);
            }
            svg.transition().attr({
                width: width,
                height: height
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });
            svg.select('.x-axis-group.axis')
                .transition()
                .ease(ease)
                .attr({
                    transform: 'translate(0,' + yScale(0) + ')'
                })
                .call(xAxis);
            svg.select('.y-axis-group.axis')
                .transition()
                .ease(ease)
                .call(yAxis);

            // create line and area functions
            var singleLine = d3.svg.line()
                .x(function (d) {
                    return xScale(d.x);
                })
                .y(function (d) {
                    return yScale(d.y);
                });
            singleLine.interpolate(lineInterpolation);

            var area = d3.svg.area()
                .x(function (d) {
                    return xScale(d.x);
                })
                .y0(yScale(0))
                .y1(function (d) {
                    return yScale(d.y);
                });
            area.interpolate(lineInterpolation);


            // shade area
            areaSvg = svg.select('.chart-group').selectAll('path.area')
                .data(_data, function (d) {
                    return d.name;
                });

            areaSvg.enter()
                .append('svg:path')
                .attr('class', 'area')
                .style('opacity', 0)
                .style('fill', 'none')
                .style('stroke-width', '0px');

            areaSvg.exit()
                .transition()
                .duration(500)
                .ease('linear')
                .style('opacity', 0)
                .remove();

            areaSvg.transition()
                .delay(function (d, i) {
                    return i * 100;
                }) // stagger the transition so that it is easier to follow (make sure this has the same setting in the line drawing code)
            .duration(transitionDuration)
                .ease(ease)
                .attr('d', function (d) {
                    return area(d.timeseries);
                })
                .style('stroke', function (d) {
                    return d.colour;
                })
                .style('fill', function (d) {
                    return d.colour;
                })
                .style('opacity', areaOpacity);

            // draw line
            lineSvg = svg.select('.chart-group').selectAll('path.line')
                .data(_data, function (d) {
                    return d.name;
                });

            lineSvg.enter()
                .append('svg:path')
                .attr('class', 'line')
                .style('opacity', 0)
                .style('fill', lineFill)
                .style('stroke-width', '2.5px');

            lineSvg.exit()
                .transition()
                .duration(500)
                .ease('linear')
                .style('opacity', 0)
                .remove();

            lineSvg.transition()
                .delay(function (d, i) {
                    return i * 100;
                }) // stagger the transition so that it is easier to follow
            .duration(transitionDuration)
                .ease(ease)
                .attr('d', function (d) {
                    return singleLine(d.timeseries);
                })
                .style('stroke', function (d) {
                    return d.colour;
                })
                .style('opacity', lineOpacity);



            function plotLabels() {
                // title
                var arr = new Array();
                arr.push(1);
                var titleSvg = svg.select(".chartTitle").selectAll("text.chartTitle").data(arr);
                titleSvg.enter().append("text")
                    .attr("class", "chartTitle")
                    .attr('x', chartWidth / 2)
                    .attr('y', -(margin.top / 2) + 10);
                // exit
                titleSvg.exit().transition().duration(200).remove();
                // transition
                titleSvg.transition()
                    .duration(300)
                    .text(title)
                    .style('text-anchor', 'middle');

                // y title
                var yTitleSvg = svg.select(".yTitle").selectAll("text.yTitle").data(arr);
                yTitleSvg.enter().append("text")
                    .attr("class", "yTitle")
                    .attr('transform', 'rotate(-90)')

                .style('text-anchor', 'middle');
                // exit
                yTitleSvg.exit().transition().duration(200).remove();
                // transition
                yTitleSvg.transition()
                    .duration(300)
                    .text(yAxis1Title)
                    .attr('x', -chartHeight / 2)
                    .attr('y', -(margin.left * 0.6));

                // x title
                var xTitleSvg = svg.select(".xTitle").selectAll("text.xTitle").data(arr);
                xTitleSvg.enter().append("text")
                    .attr("class", "xTitle")
                    .style('text-anchor', 'middle');
                // exit
                xTitleSvg.exit().transition().duration(200).remove();
                // transition
                xTitleSvg.transition()
                    .duration(300)
                    .text(xAxisTitle)
                    .attr('y', chartHeight + 45)
                    .attr('x', chartWidth / 2);

            }
            plotLabels();
        });
    }

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function (_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.strokeColour = function (_x) {
        if (!arguments.length) return strokeColour;
        strokeColour = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.lineInterpolation = function (_x) {
        if (!arguments.length) return lineInterpolation;
        lineInterpolation = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.title = function (_x) {
        if (!arguments.length) return title;
        title = _x;
        return this;
    };

    exports.yAxis1Title = function (_x) {
        if (!arguments.length) return yAxis1Title;
        yAxis1Title = _x;
        return this;
    };

    exports.yAxis2Title = function (_x) {
        if (!arguments.length) return yAxis2Title;
        yAxis2Title = _x;
        return this;
    };

    exports.xAxisTitle = function (_x) {
        if (!arguments.length) return xAxisTitle;
        xAxisTitle = _x;
        return this;
    };

    exports.yMax = function (_x) {
        if (!arguments.length) return yMaxUserDefined;
        yMaxUserDefined = _x;
        return this;
    };

    exports.yMin = function (_x) {
        if (!arguments.length) return yMinUserDefined;
        yMinUserDefined = _x;
        return this;
    };

    exports.areaOpacity = function (_x) {
        if (!arguments.length) return areaOpacity;
        areaOpacity = _x;
        return this;
    };

    exports.lineOpacity = function (_x) {
        if (!arguments.length) return lineOpacity;
        lineOpacity = _x;
        return this;
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.ninja.stackedArea = function module() {
    var svg,
        //        propertiesToPlot, // ['column name 1', 'column name 2']
        width = defaultValues.width,
        height = defaultValues.height,
        strokeColour = defaultValues.colours.darkBlue,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        margin = defaultValues.margin,
        lineInterpolation = defaultValues.lineInterpolation,
        lineFill = defaultValues.lineFill,
        title = '',
        yAxis1Title = '',
        yAxis2Title = '',
        xAxisTitle = '',
        yMaxUserDefined,
        yMinUserDefined,
        lineOpacity = defaultValues.lineOpacity,
        areaOpacity = 0.5, //defaultValues.underLineAreaOpacity,
        areaSvg,
        lineSvg;

    var dispatch = d3.dispatch('customHover');

    function exports(_selection) {
        //        if (!propertiesToPlot) {
        //            throw 'ninjaCharts - Need to supply an array of properties to plot, for the stacked area chart.';
        //        }
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.bottom - margin.top;

        _selection.each(function (_data) {

            var _dataLen = _data.length,
                minY,
                maxY;

            var dateExtent = d3.extent(_data[0].values, function (d) {
                return d.x;
            })
            var minDate = dateExtent[0],
                maxDate = dateExtent[1];
            console.log('min/max x', minDate, maxDate);

            _data.forEach(function (thisData) {
                console.log('iteration');
                var thisExtent = d3.extent(thisData.values, function (d) {
                    return d.y;
                })
                if (typeof minY === 'undefined') {
                    minY = thisExtent[0];
                    console.log('minY initialised to:', minY);
                } else {
                    if (thisExtent[0] < minY) {
                        minY = thisExtent[1];
                    }
                }

                if (typeof maxY === 'undefined') {
                    maxY = thisExtent[1];
                    console.log('maxY initialised to:', maxY);
                } else {
                    if (thisExtent[1] > maxY) {
                        maxY = thisExtent[1];
                        console.log('maxY updated to:', maxY);
                    }
                }
            });


            console.log('min/max y', minY, maxY);
            // if the user has specified min/max y values, then apply them now
            if (typeof yMinUserDefined !== 'undefined') {
                minY = yMinUserDefined;
            }
            if (typeof yMaxUserDefined !== 'undefined') {
                maxY = yMaxUserDefined;
            }
            console.log('min/max y', minY, maxY);
            // create the sclaing functions
            var xScale = d3.time.scale()
                .range([0, chartWidth]);
            xScale.domain([minDate, maxDate]);

            var yScale = d3.scale.linear()
                .domain([minY, maxY])
                .range([chartHeight, 0]);

            // axis of evil
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');


            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
                container.append("g").classed("chartTitle", true);
                container.append("g").classed("yTitle", true);
                container.append("g").classed("xTitle", true);
            }
            svg.transition().attr({
                width: width,
                height: height
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });
            svg.select('.x-axis-group.axis')
                .transition()
                .ease(ease)
                .attr({
                    transform: 'translate(0,' + yScale(0) + ')'
                })
                .call(xAxis);
            svg.select('.y-axis-group.axis')
                .transition()
                .ease(ease)
                .call(yAxis);
            console.log('test');
            // create line and area functions
            var singleLine = d3.svg.line()
                .x(function (d) {
                    return xScale(d.x);
                })
                .y(function (d) {
                    return yScale(d.y);
                });
            singleLine.interpolate(lineInterpolation);

            var area = d3.svg.area()
                .x(function (d) {
                    return xScale(d.x);
                })
                .y0(function (d) {
                    //                    return yScale(d.y0);
                    return yScale(d.y0);
                })
                .y1(function (d) {
                    return yScale(d.y0 + d.y);
                });

            area.interpolate(lineInterpolation);


            var stack = d3.layout.stack()
                .values(function (d) {
                    return d.values;
                });

            // shade area
            areaSvg = svg.select('.chart-group').selectAll('path.area')
                .data(stack(_data));

            areaSvg.enter()
                .append('svg:path')
                .attr('class', 'area')
                .style('opacity', 0)
                .style('fill', 'none')
                .style('stroke-width', '1px');

            areaSvg.exit()
                .transition()
                .duration(500)
                .ease('linear')
                .style('opacity', 0)
                .remove();

            areaSvg.transition()
                .delay(function (d, i) {
                    return i * 100;
                }) // stagger the transition so that it is easier to follow (make sure this has the same setting in the line drawing code)
            .duration(transitionDuration)
                .ease(ease)
                .attr('d', function (d) {
                    return area(d.values);
                })
                .style('stroke', function (d) {
                    return 'white'; //d.colour;
                })
                .style('fill', function (d) {
                    return d.color;
                })
                .style('opacity', areaOpacity);


            function plotLabels() {
                // title
                var arr = new Array();
                arr.push(1);
                var titleSvg = svg.select(".chartTitle").selectAll("text.chartTitle").data(arr);
                titleSvg.enter().append("text")
                    .attr("class", "chartTitle")
                    .attr('x', chartWidth / 2)
                    .attr('y', -(margin.top / 2) + 10);
                // exit
                titleSvg.exit().transition().duration(200).remove();
                // transition
                titleSvg.transition()
                    .duration(300)
                    .text(title)
                    .style('text-anchor', 'middle');

                // y title
                var yTitleSvg = svg.select(".yTitle").selectAll("text.yTitle").data(arr);
                yTitleSvg.enter().append("text")
                    .attr("class", "yTitle")
                    .attr('transform', 'rotate(-90)')

                .style('text-anchor', 'middle');
                // exit
                yTitleSvg.exit().transition().duration(200).remove();
                // transition
                yTitleSvg.transition()
                    .duration(300)
                    .text(yAxis1Title)
                    .attr('x', -chartHeight / 2)
                    .attr('y', -(margin.left * 0.6));

                // x title
                var xTitleSvg = svg.select(".xTitle").selectAll("text.xTitle").data(arr);
                xTitleSvg.enter().append("text")
                    .attr("class", "xTitle")
                    .style('text-anchor', 'middle');
                // exit
                xTitleSvg.exit().transition().duration(200).remove();
                // transition
                xTitleSvg.transition()
                    .duration(300)
                    .text(xAxisTitle)
                    .attr('y', chartHeight + 45)
                    .attr('x', chartWidth / 2);

            }
            plotLabels();
        });
    }

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function (_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    //    exports.propertiesToPlot = function (_x) {
    //        if (!arguments.length) return propertiesToPlot;
    //        propertiesToPlot = _x;
    //        return this;
    //    };

    exports.strokeColour = function (_x) {
        if (!arguments.length) return strokeColour;
        strokeColour = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.lineInterpolation = function (_x) {
        if (!arguments.length) return lineInterpolation;
        lineInterpolation = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.title = function (_x) {
        if (!arguments.length) return title;
        title = _x;
        return this;
    };

    exports.yAxis1Title = function (_x) {
        if (!arguments.length) return yAxis1Title;
        yAxis1Title = _x;
        return this;
    };

    exports.yAxis2Title = function (_x) {
        if (!arguments.length) return yAxis2Title;
        yAxis2Title = _x;
        return this;
    };

    exports.xAxisTitle = function (_x) {
        if (!arguments.length) return xAxisTitle;
        xAxisTitle = _x;
        return this;
    };

    exports.yMax = function (_x) {
        if (!arguments.length) return yMaxUserDefined;
        yMaxUserDefined = _x;
        return this;
    };

    exports.yMin = function (_x) {
        if (!arguments.length) return yMinUserDefined;
        yMinUserDefined = _x;
        return this;
    };

    exports.areaOpacity = function (_x) {
        if (!arguments.length) return areaOpacity;
        areaOpacity = _x;
        return this;
    };

    exports.lineOpacity = function (_x) {
        if (!arguments.length) return lineOpacity;
        lineOpacity = _x;
        return this;
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.ninja.bubbleChart = function module() {
    var svg,
        width = defaultValues.width,
        height = defaultValues.height,
        strokeColour = 'white',
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        margin = defaultValues.margin,
        maxBubbleRadius = 50, // this value is in pixels
        bubbleOpacity = defaultValues.bubbleOpacity,
        mouseOverOpacity = defaultValues.mouseOverOpacity,
        border = false,
        showAxis = true,
        title = '',
        yAxis1Title = '',
        yAxis2Title = '',
        xAxisTitle = '',
        yMaxUserDefined,
        yMinUserDefined,
        allowBubblesToSpillOffChart = false;

    var dispatch = d3.dispatch('mouseover', 'mouseout', 'click');

    function exports(_selection) {
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.bottom - margin.top;

        _selection.each(function (_data) {
            var minX, maxX, minY, maxY, minR, maxR;
            minX = d3.min(_data, function (d) {
                return d.x;
            });
            maxX = d3.max(_data, function (d) {
                return d.x;
            });
            minY = d3.min(_data, function (d) {
                return d.y;
            });
            maxY = d3.max(_data, function (d) {
                return d.y;
            });
            minR = d3.min(_data, function (d) {
                return d.r;
            });
            maxR = d3.max(_data, function (d) {
                return d.r;
            });



            // sort the bubbles by the radius, as we want to plot the smallest
            // bubble last so that they are not covered by larger bubbles
            _data.sort(function (a, b) {
                return b.r - a.r;
            });

            // create the X Y scaling functions
            var xScale = d3.scale.linear()
                .domain([minX, maxX])
                .range([0, chartWidth]);

            var yScale = d3.scale.linear()
                .domain([minY, maxY])
                .range([chartHeight, 0]);

            // create the radius scaling function
            var rScale = d3.scale.linear()
                .domain([0, maxR])
                .range([0, maxBubbleRadius]);

            if (!allowBubblesToSpillOffChart) {
                // calculate where the edges of the bubble will be plotted (in pixels), so that 
                // they don't spill off the chart
                var dataLength = _data.length;

                // this is an iterative solution.
                // we can work out how many x and y units the radius of each cirle will take up
                // and then set the scaling factors appropriately (i.e. using modified xMax, xMin etc.)
                // but then when we plot the circle (which has a fixed radius in terms of pixels)
                // it will take up a different number of x and y units
                // therefore we take an itterative approach to converge on a suitable result.
                updateXYScalesBasedOnBubbleEdges = function () {
                    var bubbleEdgePixels = [];

                    // find out where the edges of each bubble will be, in terms of pixels
                    for (var i = 0; i < dataLength; i++) {
                        var rPixels = rScale(_data[i].r),
                            rInTermsOfX = Math.abs(minX - xScale.invert(rPixels)),
                            rInTermsOfY = Math.abs(maxY - yScale.invert(rPixels));
                        var upperPixelsY = _data[i].y + rInTermsOfY;
                        var lowerPixelsY = _data[i].y - rInTermsOfY;
                        var upperPixelsX = _data[i].x + rInTermsOfX;
                        var lowerPixelsX = _data[i].x - rInTermsOfX;
                        bubbleEdgePixels.push({
                            highX: upperPixelsX,
                            highY: upperPixelsY,
                            lowX: lowerPixelsX,
                            lowY: lowerPixelsY
                        });
                    }

                    var minEdgeX = d3.min(bubbleEdgePixels, function (d) {
                        return d.lowX;
                    });
                    var maxEdgeX = d3.max(bubbleEdgePixels, function (d) {
                        return d.highX;
                    });
                    var minEdgeY = d3.min(bubbleEdgePixels, function (d) {
                        return d.lowY;
                    });
                    var maxEdgeY = d3.max(bubbleEdgePixels, function (d) {
                        return d.highY;
                    });

                    maxY = maxEdgeY;
                    minY = minEdgeY;
                    maxX = maxEdgeX;
                    minX = minEdgeX;

                    // if the user has specified min/max y values, then apply them now
                    if (yMinUserDefined) {
                        minY = yMinUserDefined;
                    }
                    if (yMaxUserDefined) {
                        maxY = yMaxUserDefined;
                    }

                    // redefine the X Y scaling functions, now that we have this new information
                    xScale = d3.scale.linear()
                        .domain([minX, maxX])
                        .range([0, chartWidth]);

                    yScale = d3.scale.linear()
                        .domain([minY, maxY])
                        .range([chartHeight, 0]);
                };

                // TODO: break if delta is small, rather than a specific number of interations
                for (var scaleCount = 0; scaleCount < 10; scaleCount++) {
                    updateXYScalesBasedOnBubbleEdges();
                }
            }
            // axis of evil
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
                container.append("g").classed("chartTitle", true);
                container.append("g").classed("yTitle", true);
                container.append("g").classed("xTitle", true);
            }
            svg.transition().attr({
                width: width,
                height: height
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });
            if (showAxis) {
                svg.select('.x-axis-group.axis')
                    .transition()
                    .ease(ease)
                    .attr({
                        transform: 'translate(0,' + yScale(0) + ')'
                    })
                    .call(xAxis);
                svg.select('.y-axis-group.axis')
                    .transition()
                    .ease(ease)
                    .attr({
                        transform: 'translate(' + xScale(0) + ',' + 0 + ')'
                    })
                    .call(yAxis);
            }
            // Enter, Update, Exit on bubbles
            var rScale0 = rScale(0);
            var bubbles = svg.select('.chart-group').selectAll('.bubble')
                .data(_data);
            bubbles.enter().append('circle')
                .classed('bubble', true)
                .attr({
                    r: rScale0
                })
                .on('mouseover', function (d) {
                    d3.select(this)
                        .style({
                            opacity: mouseOverOpacity,
                            stroke: 'black'
                        });
                    dispatch.mouseover(d);
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .style({
                            opacity: bubbleOpacity, // Re-sets the opacity of the circle
                            stroke: 'white'
                        });
                    dispatch.mouseout([]);
                })
                .on('click', function () {
                    dispatch.click([]);
                });

            bubbles.transition()
                .duration(transitionDuration)
                .ease(ease)
                .style({
                    fill: function (d) {
                        return d.color;
                    },
                    opacity: bubbleOpacity,
                    stroke: strokeColour // may want to leave this to the CSS so that the dev can set it to be the same as the BG color of the chart
                })
                .attr({
                    cx: function (d) {
                        return xScale(d.x);
                    },
                    cy: function (d) {
                        return yScale(d.y);
                    },
                    r: function (d) {
                        return rScale(d.r);
                    }
                });

            bubbles.exit().transition().style({
                opacity: 0
            }).remove();

            if (border) {
                var smallArray = [1];
                // draw a border
                var borderPath = svg.select('.chart-group').selectAll('.border').data(smallArray);
                borderPath.enter().append('rect')
                    .attr('x', xScale(minX))
                    .attr('y', yScale(maxY))
                    .attr('height', yScale(minY))
                    .attr('width', xScale(maxX))
                    .style('stroke', 'black')
                    .style('fill', 'none')
                    .style('stroke-width', 1);
            }

            function plotLabels() {
                // title
                var arr = new Array();
                arr.push(1);
                var titleSvg = svg.select(".chartTitle").selectAll("text.chartTitle").data(arr);
                titleSvg.enter().append("text")
                    .attr("class", "chartTitle")
                    .attr('x', chartWidth / 2)
                    .attr('y', -(margin.top / 2) + 10);
                // exit
                titleSvg.exit().transition().duration(200).remove();
                // transition
                titleSvg.transition()
                    .duration(300)
                    .text(title)
                    .style('text-anchor', 'middle');

                // y title
                var yTitleSvg = svg.select(".yTitle").selectAll("text.yTitle").data(arr);
                yTitleSvg.enter().append("text")
                    .attr("class", "yTitle")
                    .attr('transform', 'rotate(-90)')
                    .style('text-anchor', 'middle');
                // exit
                yTitleSvg.exit().transition().duration(200).remove();
                // transition
                yTitleSvg.transition()
                    .duration(300)
                    .text(yAxis1Title)
                    .attr('x', -yScale((maxY - minY) / 2))
                    .attr('y', -(margin.left * 0.7));

                // x title
                var xTitleSvg = svg.select(".xTitle").selectAll("text.xTitle").data(arr);
                xTitleSvg.enter().append("text")
                    .attr("class", "xTitle")
                    .style('text-anchor', 'middle');
                // exit
                xTitleSvg.exit().transition().duration(200).remove();
                // transition
                xTitleSvg.transition()
                    .duration(300)
                    .text(xAxisTitle)
                    .attr('y', chartHeight + margin.bottom * 0.9)
                    .attr('x', chartWidth / 2);

            }
            plotLabels();
        });

    }

    exports.showAxis = function (_x) {
        if (!arguments.length) return showAxis;
        showAxis = _x;
        return this;
    };

    exports.bubbleOpacity = function (_x) {
        if (!arguments.length) return bubbleOpacity;
        bubbleOpacity = _x;
        return this;
    };

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function (_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.strokeColour = function (_x) {
        if (!arguments.length) return strokeColour;
        strokeColour = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.bubbleSpill = function (_x) {
        if (!arguments.length) return allowBubblesToSpillOffChart;
        allowBubblesToSpillOffChart = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.maxBubbleRadius = function (_x) {
        if (!arguments.length) return maxBubbleRadius;
        maxBubbleRadius = _x;
        return this;
    };

    exports.border = function (_x) {
        if (!arguments.length) return border;
        border = _x;
        return this;
    };

    exports.yMax = function (_x) {
        if (!arguments.length) return yMaxUserDefined;
        yMaxUserDefined = _x;
        return this;
    };

    exports.yMin = function (_x) {
        if (!arguments.length) return yMinUserDefined;
        yMinUserDefined = _x;
        return this;
    };

    exports.yAxis1Title = function (_x) {
        if (!arguments.length) return yAxis1Title;
        yAxis1Title = _x;
        return this;
    };

    exports.yAxis2Title = function (_x) {
        if (!arguments.length) return yAxis2Title;
        yAxis2Title = _x;
        return this;
    };

    exports.xAxisTitle = function (_x) {
        if (!arguments.length) return xAxisTitle;
        xAxisTitle = _x;
        return this;
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.ninja.horizontalLegendRoundedCorners = function module() {
    var svg,
        width = defaultValues.width,
        itemWidth = defaultValues.legendItemWidth,
        itemHeight = defaultValues.legendItemHeight,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        fontSize = defaultValues.legendFontSize,
        fontColor = defaultValues.legendFontColor,
        margin = defaultValues.legendMargin,
        hoverOpacity = 0.5,
        textOpacity = 0.8,
        widthMultiplier = 0.95;

    var dispatch = d3.dispatch('customClick');

    function exports(_selection) {
        _selection.each(function (_data) {

            var _dataLen = _data.length,
                chartWidth = width + defaultValues.margin.left + defaultValues.margin.right, // (itemWidth * (_dataLen+0)) + defaultValues.margin.left + defaultValues.margin.right,
                //itemsPerRow = Math.floor(chartWidth / itemWidth),
                itemsPerRow = Math.floor(width / itemWidth),
                rowCount = Math.ceil(_dataLen / itemsPerRow),
                chartHeight = (rowCount * itemHeight) + margin.bottom + margin.top; //itemHeight + margin.bottom + margin.top;

            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('legend', true);
            }
            svg.transition().attr({
                width: chartWidth,
                height: chartHeight
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });


            function xPosition(index) {
                return itemWidth * (index % itemsPerRow);
            }

            function yPosition(index) {
                return Math.floor((index + 0) / itemsPerRow) * itemHeight;
            }

            // draw the legend
            var legendSvg = svg.select('.legend');

            var legendRect = legendSvg.selectAll('rect.legend')
                .data(_data);
            // enter
            legendRect.enter().append('rect')
                .attr('class', 'legend')
                .style('opacity', function (d) {
                    return d.opacity
                })
                .on('click', dispatch.customClick)
                .on('mouseover', function (d) {
                    d3.select(this)
                        .style({
                            opacity: hoverOpacity,
                            stroke: 'black'
                        });
                    //                    dispatch.mouseover(d);
                })
                .on('mouseout', function (d) {
                    d3.select(this)
                        .style({
                            opacity: d.opacity, // Re-sets the opacity of the legend item
                            stroke: 'white'
                        });
                    //                    dispatch.mouseout([]);
                })
            // exit
            legendRect.exit().transition().duration(200).attr('width', 0).remove();
            // transition
            legendRect.transition()
                .duration(300)
                .attr('x', function (d, i) {
                    return xPosition(i);
                })
                .attr('y', function (d, i) {
                    return yPosition(i);
                })
                .attr('height', itemHeight * widthMultiplier)
                .attr('width', itemWidth * widthMultiplier)
                .attr('ry', 2)
                .attr('rx', 2)
                .style('fill', function (d) {
                    return d.colour;
                });

            var legendText = legendSvg.selectAll('text.legend')
                .data(_data);
            // enter
            legendText.enter().append('text')
                .attr('class', 'legend')
                .style('font-weight', 'bold')
                .style('fill', function(d){return d.textColor;})
                .style('font-size', fontSize)
                .style('text-anchor', 'middle')
                .style('opacity', textOpacity)
                .attr('transform', 'translate(0, ' + 6 + ')');
            // exit
            legendText.exit().transition().duration(200).remove();
            // transition
            legendText.transition()
                .duration(300)
                .attr('x', function (d, i) {
                    return xPosition(i) + (itemWidth * widthMultiplier) / 2;
                })
                .attr('y', function (d, i) {
                    return yPosition(i) + itemHeight / 2;
                })
                .text(function (d) {
                    return d.name;
                });

        });
    }

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.itemWidth = function (_x) {
        if (!arguments.length) return itemWidth;
        itemWidth = _x;
        return this;
    };

    exports.itemHeight = function (_x) {
        if (!arguments.length) return itemHeight;
        itemHeight = _x;
        return this;
    };

    exports.fontSize = function (_x) {
        if (!arguments.length) return fontSize;
        fontSize = _x;
        return this;
    };

    exports.fontColor = function (_x) {
        if (!arguments.length) return fontColor;
        fontColor = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.textOpacity = function (_x) {
        if (!arguments.length) return textOpacity;
        textOpacity = _x;
        return this;
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.ninja.horizontalLegend = function module() {
    var svg,
        width = defaultValues.width,
        itemWidth = defaultValues.legendItemWidth,
        itemHeight = defaultValues.legendItemHeight,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        fontSize = defaultValues.legendFontSize,
        fontColor = defaultValues.legendFontColor,
        margin = defaultValues.legendMargin,
        backgroundOpacity = defaultValues.legendBackgroundOpacity,
        textOpacity = defaultValues.legendTextOpacity,
        widthMultiplier = 0.95;

    var dispatch = d3.dispatch('customClick');

    function exports(_selection) {
        _selection.each(function (_data) {

            var _dataLen = _data.length,
                chartWidth = width + defaultValues.margin.left + defaultValues.margin.right, // (itemWidth * (_dataLen+0)) + defaultValues.margin.left + defaultValues.margin.right,
                itemsPerRow = Math.floor(width / itemWidth),
                rowCount = Math.ceil(_dataLen / itemsPerRow),
                chartHeight = (rowCount * itemHeight) + margin.bottom + margin.top; //itemHeight + margin.bottom + margin.top;

            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('legend', true);
            }
            svg.transition().attr({
                width: chartWidth,
                height: chartHeight
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });


            function xPosition(index) {
                return itemWidth * (index % itemsPerRow);
            }

            function yPosition(index) {
                return Math.floor((index + 0) / itemsPerRow) * itemHeight;
            }

            // draw the legend
            var legendSvg = svg.select('.legend');

            var legendRect = legendSvg.selectAll('path.legend')
                .data(_data);
            // enter
            legendRect.enter().append('path')
                .attr('class', 'legend')
                .on('click', dispatch.customClick)
                .style('opacity', backgroundOpacity)
                .style('stroke-width', '0px');
            // exit
            legendRect.exit().transition().duration(200).attr('width', 0).remove();
            // transition
            legendRect.transition()
                .duration(300)
                .attr('d', function (d, i) {
                    return ninjaRect(xPosition(i), yPosition(i), (itemWidth * widthMultiplier), (itemHeight * widthMultiplier), 5);
                })
                .style('fill', function (d) {
                    return d.colour;
                });

            var legendText = legendSvg.selectAll('text.legend')
                .data(_data);
            // enter
            legendText.enter().append('text')
                .attr('class', 'legend')
                .style('font-weight', 'bold')
                .style('fill', fontColor)
                .style('font-size', fontSize)
                .style('text-anchor', 'middle')
                .style('opacity', textOpacity)
                .attr('transform', 'translate(0, ' + 6 + ')');
            // exit
            legendText.exit().transition().duration(200).remove();
            // transition
            legendText.transition()
                .duration(300)
                .attr('x', function (d, i) {
                    return xPosition(i) + (itemWidth * widthMultiplier) / 2;
                })
                .attr('y', function (d, i) {
                    return yPosition(i) + itemHeight / 2;
                })
                .text(function (d) {
                    return d.name;
                });


            // Returns path data for a rectangle with rounded bottome right corner
            // The top-left corner is ⟨x,y⟩.
            function ninjaRect(x, y, width, height, radius) {
                return "M" + x + "," + y + "h" + (width) + "v" + (height - 1 * radius) + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius + "h" + (radius - width) + "z";
            }
        });
    }

    exports.backgroundOpacity = function (_x) {
        if (!arguments.length) return backgroundOpacity;
        backgroundOpacity = _x;
        return this;
    };

    exports.textOpacity = function (_x) {
        if (!arguments.length) return textOpacity;
        textOpacity = _x;
        return this;
    };

    exports.width = function (_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.itemWidth = function (_x) {
        if (!arguments.length) return itemWidth;
        itemWidth = _x;
        return this;
    };

    exports.itemHeight = function (_x) {
        if (!arguments.length) return itemHeight;
        itemHeight = _x;
        return this;
    };

    exports.fontSize = function (_x) {
        if (!arguments.length) return fontSize;
        fontSize = _x;
        return this;
    };

    exports.fontColor = function (_x) {
        if (!arguments.length) return fontColor;
        fontColor = _x;
        return this;
    };

    exports.transitionDuration = function (_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function (_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.margin = function (_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };


    d3.rebind(exports, dispatch, 'on');
    return exports;
};