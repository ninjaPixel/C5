/// <reference path='d3.v3.js' />
/// <reference path='xdate.js' />
/// <reference path='ninjaCharts.js' />

// setup our charts in the d3.ninja namespace
d3.ninja = {};

d3.ninja.tweetChart = function module() {
    var svg,
        width = defaultValues.width,
        height = defaultValues.height,
        transitionDuration = defaultValues.transitionDuration,
        ease = defaultValues.ease,
        fontSize = '12px',
        fontColor = '#ededed',
        margin = defaultValues.legendMargin,
        backgroundOpacity = defaultValues.legendBackgroundOpacity,
        backgroundColor = '#55acee',
        maxTweetWidth = 150,
        minTweetWidth = 24,
        tweetHeightAsFractionOfWidth = 0.5635, // 16:9 ratio
        minFontSize = Math.ceil(minTweetWidth / 6),
        maxFontSize = Math.ceil(maxTweetWidth / 8),
        textOpacity = 0.9;

    var dispatch = d3.dispatch('customClick');

    function exports(_selection) {
        _selection.each(function(_data) {

            var _dataLen = _data.length,
                chartWidth = width + defaultValues.margin.left + defaultValues.margin.right,
                chartHeight = height + margin.bottom + margin.top;

            // Trick to just append the svg skeleton once
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('tweets', true);
            }
            svg.transition().attr({
                width: chartWidth,
                height: chartHeight
            });
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });

            // sort the data in tweet_count desc. The top n tweets
            // will get randomly assigned some creen real estate, designated as 'sacred space'
            // where other tweets woun't be allowed to be displayed
            // this is to ensure that the most important tweets aren't obscured by the myriad of other tweets
            // TODO make sacred space a fraction smaller than the tweet are, to enable a 
            // litte overlap and perhaps a more organic feel to the plot.

            _data = _data.sort(function(a, b) {
                return b.retweet_count - a.retweet_count
            });
            var maxRetweetCount = _data[0].retweet_count;

            function calculateTweetPosition(retweetCount) {
                var tweetWidth = 1.5 * maxTweetWidth * rationalTanh((1 + retweetCount) / maxRetweetCount) + minTweetWidth, //(retweetCount / maxRetweetCount) * (maxTweetWidth - minTweetWidth) + minTweetWidth,
                    tweetHeight = tweetWidth * tweetHeightAsFractionOfWidth;

                var xPosition = Math.floor(Math.random() * (chartWidth - tweetWidth)),
                    yPosition = Math.floor(Math.random() * (chartHeight - tweetHeight)),
                    cornerRadius = tweetHeight * 0.1;

                var tweetPosition = {
                    x: xPosition,
                    y: yPosition,
                    height: Math.floor(tweetHeight),
                    width: Math.floor(tweetWidth),
                    cornerRadius: cornerRadius
                };

                return tweetPosition;
            }

            var sacredGround = [];

            function liesOnSacredGound(position) {
                if (!sacredGround) {
                    return false;
                } else {
                    var pointTopLeft = {
                        x: position.x,
                        y: position.y
                    },
                        pointTopRight = {
                            x: position.x + position.width,
                            y: position.y
                        },
                        pointBottomLeft = {
                            x: position.x,
                            y: position.y + position.height
                        },
                        pointBottomRight = {
                            x: position.x + position.width,
                            y: position.y + position.height
                        };

                    var points = [pointTopLeft, pointTopRight, pointBottomLeft, pointBottomRight];
                    var sacredLength = sacredGround.length;

                    for (var i = 0; i < sacredLength; i++) {
                        // check to see if any of these points lie in sacred ground
                        for (var j = 0; j < 4; j++) {
                            if (xInSacredGround(points[j].x, sacredGround[i].x, sacredGround[i].width) && yInSacredGround(points[j].y, sacredGround[i].y, sacredGround[i].height)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

            }

            function xInSacredGround(x, sacredX, sacredWidth) {
                if (x >= sacredX && x <= (sacredX + sacredWidth)) {
                    return true;
                } else {
                    return false;
                }
            }

            function yInSacredGround(y, sacredY, sacredHeight) {
                // if (y >= sacredY && y <= (sacredY + sacredHeight)) {
                if (y >= sacredY && y <= (sacredY + sacredHeight)) {
                    return true;
                } else {
                    return false;
                }
            }

            var len = _data.length;
            for (var i = 0; i < len; i++) {
                var position = calculateTweetPosition(_data[i].retweet_count),
                    retryLimit = 100;
                for (var k = 0; k <= retryLimit; k++) {
                    //does this lie on sacred ground
                    if (liesOnSacredGound(position)) {
                        position = calculateTweetPosition(_data[i].retweet_count);
                    } else {
                        // we can use this point
                        break;
                    }
                    // we'll have 10 goes at trying to find clean ground, but if that fails then we'll just use the last point
                    // as the space must be overpopulated.
                    if (k === retryLimit) {
                        console.log('forced to use sacred ground');
                    }
                }

                if (i < len * 0.95) {
                    //add top 20% to sacred ground
                    sacredGround.push(position);
                }
                _data[i].position = position;
            }


            // draw the tweets
            var tweetsSvg = svg.select('.tweets');

            var tweetsRect = tweetsSvg.selectAll('path.tweets')
                .data(_data);
            // enter
            tweetsRect.enter().append('path')
                .attr('class', 'tweets')
                .on('click', dispatch.customClick)
                .style('opacity', backgroundOpacity)
                .style('stroke', 'white')
                .style('stroke-width', '1px');
            // exit
            tweetsRect.exit().transition().duration(200).attr('width', 0).remove();
            // transition
            tweetsRect.transition()
                .duration(300)
                .attr('d', function(d, i) {
                    return ninjaRect(d.position.x, d.position.y, d.position.width, d.position.height, d.position.cornerRadius);
                })
                .style('fill', function(d) {
                    return backgroundColor;
                });

            var tweetsText = tweetsSvg.selectAll('text.tweets')
                .data(_data);
            // enter
            tweetsText.enter().append('text')
                .attr('class', 'tweets')
                .style('fill', fontColor)
                .style('text-anchor', 'left')
                .style('opacity', textOpacity);

            // exit
            tweetsText.exit().transition().duration(200).remove();
            // transition
            tweetsText.transition()
                .duration(300)
                .attr('x', function(d, i) {
                    return d.position.x + 1;
                })
                .attr('y', function(d, i) {
                    return d.position.y + 1;
                })
                .attr('transform', 'translate(0, ' + 8 + ')')
                .style('font-size', 12)
                .text(function(d) {
                    // return d.retweet_count; 
                    return d.text;
                })
                .attr('width', function(d) {
                    return d.position.width - 2;
                })
                .attr('height', function(d) {
                    return d.position.height - 2;
                });
            // .html(function(d) {
            //     if (d.retweet_count >= 0) {
            //         var fontSize = Math.ceil(((maxFontSize - minFontSize) * (d.retweet_count / maxRetweetCount)) + minFontSize);
            //         // return '<div style="width: ' + Math.floor(d.position.width) + 'px; color: #ededed; font-size: ' + fontSize + 'px">' + d.text + '</div>';
            //         return '<div style="color: #ededed; font-size: ' + fontSize + 'px">' + d.text + '</div>';
            //     }
            // });



            function wrap(text, width) {
                text.each(function() {
                    var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        y = text.attr("y"),
                        dy = parseFloat(text.attr("dy")),
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(" "));
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop();
                            tspan.text(line.join(" "));
                            line = [word];
                            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                        }
                    }
                });
            }

            // Returns path data for a rectangle with rounded bottom right corner, and a little speeach bubble 
            // The top-left corner is ⟨x,y⟩.
            function ninjaRect(x, y, rectWidth, rectHeight, rectRadius) {
                return "M" + x + "," + y + "h" + rectWidth + "v" + (rectHeight - 1 * rectRadius) + "a" + rectRadius + "," + rectRadius + " 0 0 1 " + -rectRadius + "," + rectRadius + 'L' + (x + (rectWidth * 0.1)) + ',' + (y + rectHeight) + 'L' + (x + (rectWidth * 0.0)) + ',' + (y + (rectHeight * 1.2)) + 'Z';
            }
        });
    }

    exports.backgroundOpacity = function(_x) {
        if (!arguments.length) return backgroundOpacity;
        backgroundOpacity = _x;
        return this;
    };

    exports.textOpacity = function(_x) {
        if (!arguments.length) return textOpacity;
        textOpacity = _x;
        return this;
    };

    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };
    exports.itemWidth = function(_x) {
        if (!arguments.length) return itemWidth;
        itemWidth = _x;
        return this;
    };

    exports.itemHeight = function(_x) {
        if (!arguments.length) return itemHeight;
        itemHeight = _x;
        return this;
    };

    exports.fontSize = function(_x) {
        if (!arguments.length) return fontSize;
        fontSize = _x;
        return this;
    };

    exports.fontColor = function(_x) {
        if (!arguments.length) return fontColor;
        fontColor = _x;
        return this;
    };

    exports.transitionDuration = function(_x) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _x;
        return this;
    };

    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.margin = function(_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };


    d3.rebind(exports, dispatch, 'on');
    return exports;
};

function rationalTanh(x) // taken from http://stackoverflow.com/questions/6118028/fast-hyperbolic-tangent-approximation-in-javascript
{
    if (x < -3)
        return -1;
    else if (x > 3)
        return 1;
    else
        return x * (27 + x * x) / (27 + 9 * x * x);
}