// Version 0.1.3
// added grid lines to bubble plot
// Version 0.1.2
// added require.js and new charts - horizontalLegendSelectable and stackedAreaWithSecondaryAxisLines
// Version 0.1.1
// added stacked area chart
// Version 0.1
// - removed use of XDate

/// <reference path='d3.v3.js' />

require.config({
    config: {
        moment: {
            noGlobal: true
        }
    },
    paths: {
        'moment': 'js/moment.v2.8.1.min',
        'moment-timezone': 'js/moment-timezone.v0.2.1.min',
        'moment-timezone-data': 'js/moment-timezone-with-data-2010-2020',
        'd3': 'js/d3.v3.4.11.min',
        'd3-tip': 'js/d3-tip'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'moment', 'd3-tip'
], function (d3, moment) {
    console.log('enhanceCharts loaded. Using d3 version', d3.version);

    // setup our charts in the d3.ninja namespace
    d3.enhance = {};

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

    d3.enhance.riskAndPerformanceChart = function module() {
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
            showGridLines = false,
            lineOpacity = 0.7,
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
                    return d.maxDrawdown;
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

                // save the actual min and max values before they get recalculated by the 'no spill' algorithm
                // i need these values when drawing the grid lines becasue in cases where the original min x
                // is near 0, then the no spill algorithm may set minX to be a negative number
                // and it doesn't quite look right to have the grid lines flowing over the y-axis
                var minXOriginal = minX,
                    maxXOriginal = maxX,
                    minYOriginal = minY,
                    maxYOriginal = maxY;

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

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([0, 10])
                    .direction('e')
                    .html(function (d) {
                        return '<div class="innerTooltip"><h4>' + d.name + '</h4><br/> Return <b>' + d.annualisedPerformance.toFixed(1) + '%</b><br/>Risk <b>' + d.risk.toFixed(1) + '%</b><br/>Max Drawdown <b>' + d.maxDrawdown.toFixed(1) + '%</b></div>';
                    });

                // axis of evil
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .tickFormat(function (d) {
                        return d + "%";
                    });

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left')
                    .tickFormat(function (d) {
                        return d + "%";
                    });
                // xxx
                // Trick to just append the svg skeleton once
                if (!svg) {
                    svg = d3.select(this)
                        .append('svg')
                        .classed('chart', true);
                    var container = svg.append('g').classed('container-group', true);
                    container.append('g').classed('horizontalGrid', true);
                    container.append('g').classed('verticalGrid', true);
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

                if (showGridLines) {
                    console.log('xscale domain', xScale.domain());
                    var horizontalLines = svg.select('.horizontalGrid').selectAll('hLines').data(yScale.ticks());

                    horizontalLines.enter()
                        .append('line')
                        .classed('hLines', true);

                    horizontalLines.transition().ease(ease)
                        .attr({
                            "x1": xScale(Math.floor(minXOriginal)),
                            "x2": xScale(maxXOriginal),
                            "y1": function (d) {
                                return yScale(d);
                            },
                            "y2": function (d) {
                                return yScale(d);
                            }
                        });

                    var verticalLines = svg.select('.verticalGrid').selectAll('hLines').data(xScale.ticks());

                    verticalLines.enter()
                        .append('line')
                        .classed('hLines', true);

                    verticalLines.transition().ease(ease)
                        .attr({
                            "x1": function (d) {
                                return xScale(d);
                            },
                            "x2": function (d) {
                                return xScale(d);
                            },
                            "y1": 0,
                            "y2": yScale(Math.floor(minY))
                        });

                }
                // Enter, Update, Exit on bubbles
                var rScale0 = rScale(0);
                var bubbles = svg.select('.chart-group').call(tip).selectAll('.bubble')
                    .data(_data, function (d) {
                        return d.name + d.date;
                    });
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
                        tip.show(d);
                        dispatch.mouseover(d);
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .style({
                                opacity: function(d){ return d.opacity;}, // Re-sets the opacity of the circle
                                stroke: strokeColour
                            });
                        tip.hide();
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
                        opacity: function(d) { return d.opacity;},
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

                function plotRisk() {
                    // draw line xxx
                    var verticalLine = d3.svg.line()
                        .x(function (d) {
                            return xScale(d.x);
                        })
                        .y(function (d) {
                            return yScale(d.maxDrawdown);
                        });

                    var vertLineSvg = svg.select('.chart-group').selectAll('path.line')
                        .data(_data, function (d) {
                            return d.name + d.date;
                        });

                    vertLineSvg.enter()
                        .append('svg:path')
                        .attr('class', 'line')
                        .style('opacity', 0)
                        .style('stroke-width', '5.0px');

                    vertLineSvg.exit()
                        .transition()
                        .duration(transitionDuration)
                        .ease(ease)
                        .style('opacity', function(d){return d.opacity;})
                        .remove();

                    vertLineSvg.transition()
                        .delay(function (d, i) {
                            return i * 100;
                        }) // stagger the transition so that it is easier to follow
                    .duration(transitionDuration)
                        .ease(ease)
                        .attr('d', function (d) {
                            var values = [{
                                x: d.x,
                                maxDrawdown: 0
                            }, {
                                x: d.x,
                                maxDrawdown: d.maxDrawdown
                            }];
                            return verticalLine(values);
                        })
                        .style('stroke', function (d) {
                            return d.color;
                        })
                        .style('opacity', lineOpacity);

                    var horizontalLine = d3.svg.line()
                        .x(function (d) {
                            return xScale(d.x);
                        })
                        .y(function (d) {
                            return yScale(d.maxDrawdown);
                        });

                    var horzLineSvg = svg.select('.chart-group').selectAll('path.hLine')
                        .data(_data, function (d) {
                            return d.name + d.date;
                        });

                    horzLineSvg.enter()
                        .append('svg:path')
                        .attr('class', 'hLine')
                        .style('opacity', 0)
                        .style('stroke-width', '1.0px');

                    horzLineSvg.exit()
                        .transition()
                        .duration(transitionDuration)
                        .ease(ease)
                        .style('opacity', function(d){return d.opacity;})
                        .remove();

                    horzLineSvg.transition()
                        .delay(function (d, i) {
                            return i * 100;
                        }) // stagger the transition so that it is easier to follow
                    .duration(transitionDuration)
                        .ease(ease)
                        .attr('d', function (d) {
                            var values = [{
                                x: d.x - xScale.invert(d.r),
                                maxDrawdown: d.maxDrawdown
                            }, {
                                x: d.x +xScale.invert(d.r),
                                maxDrawdown: d.maxDrawdown
                            }];
                            return horizontalLine(values);
                        })
                        .style('stroke', function (d) {
                            return d.color;
                        })
                        .style('opacity', lineOpacity);
                }
                plotRisk();

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
                        .duration(transitionDuration)
                        .text(title)
                        .style('text-anchor', 'middle');

                    // y title
                    var yTitleSvg = svg.select(".yTitle").selectAll("text.yTitle").data(arr);
                    yTitleSvg.enter().append("text")
                        .attr("class", "yTitle")
                        .style('text-anchor', 'middle')
                        .attr('transform', 'rotate(-90)');

                    // exit
                    yTitleSvg.exit().transition().duration(200).remove();

                    // transition
                    yTitleSvg.transition()
                        .duration(transitionDuration)
                        .text(yAxis1Title)
                        .attr('x', -chartHeight / 2)
                        .attr('y', -(margin.left * 0.7));
                    console.log('maxY', maxY, 'minY', minY);

                    // x title
                    var xTitleSvg = svg.select(".xTitle").selectAll("text.xTitle").data(arr);
                    xTitleSvg.enter().append("text")
                        .attr("class", "xTitle")
                        .style('text-anchor', 'middle');

                    // exit
                    xTitleSvg.exit().transition().duration(200).remove();

                    // transition
                    xTitleSvg.transition()
                        .duration(transitionDuration)
                        .text(xAxisTitle)
                        .attr('y', chartHeight + margin.bottom * 0.4)
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

        exports.title = function (_x) {
            if (!arguments.length) return title;
            title = _x;
            return this;
        }
        exports.showGridLines = function (_x) {
            if (!arguments.length) return showGridLines;
            showGridLines = _x;
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

    d3.enhance.horizontalLegendSelectable = function module() {
        var svg,
            width = defaultValues.width,
            itemWidth = defaultValues.legendItemWidth,
            itemHeight = defaultValues.legendItemHeight,
            transitionDuration = defaultValues.transitionDuration,
            ease = defaultValues.ease,
            fontSize = defaultValues.legendFontSize,
            fontColor = defaultValues.legendFontColor,
            margin = defaultValues.legendMargin,
            hoverOpacity = 0.7,
            textOpacity = 1,
            widthMultiplier = 0.95;

        var dispatch = d3.dispatch('click');

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

                var legendText = legendSvg.selectAll('text.legend')
                    .data(_data);
                // enter
                legendText.enter().append('text')
                    .attr('class', 'legend')
                    .style('font-weight', 'bold')
                    .style('fill', function (d) {
                        return d.textColor;
                    })
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


                var legendRect = legendSvg.selectAll('rect.legend')
                    .data(_data, function (d) {
                        return d.name;
                    });
                // enter
                legendRect.enter().append('rect')
                    .attr('class', 'legend')
                    .style('opacity', function (d) {
                        return d.opacity
                    })
                    .on('click', dispatch.click)
                    .on('mouseover', function (d) {
                        d3.select(this)
                            .style({
                                opacity: hoverOpacity,
                                stroke: '#525252'
                            });
                    })
                    .on('mouseout', function (d) {
                        d3.select(this)
                            .style({
                                opacity: d.opacity, // Re-sets the opacity of the legend item
                                stroke: 'white'
                            });
                    })
                // exit
                legendRect.exit().transition().duration(200).attr('width', 0).remove();
                // transition
                legendRect.transition()
                    .duration(transitionDuration)
                    .attr('x', function (d, i) {
                        return xPosition(i);
                    })
                    .attr('y', function (d, i) {
                        return yPosition(i);
                    })
                    .attr('height', itemHeight * widthMultiplier)
                    .attr('width', function (d) {
                        if (d.selected) {
                            return itemWidth * widthMultiplier;
                        } else {
                            return itemWidth * widthMultiplier * 0.95;
                        }
                    })
                    .attr('ry', 2)
                    .attr('rx', 2)
                    .style('fill', function (d) {
                        return d.color;
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


});