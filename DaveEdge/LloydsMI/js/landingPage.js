var colors = d3.scale.category20();
var previousVisit = $.cookie('visited');

//bubble chart
var bubbleChart = d3.ninja.bubbleChart()
    .on("click", function(d) {
        console.log('Yay, you clicked me!');
        drawStructuredChart();
    });
var margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};
bubbleChart.height(800);
bubbleChart.width(1000);
bubbleChart.transitionDuration(1000);
bubbleChart.showAxis(false);

bubbleChart.margin(margin);
bubbleChart.maxBubbleRadius(25);

var finalAnimationDrawn = false;

var randomData = randomBubbleData(),
    structuredData = logSpiralStarData();

function drawRandomChart() {
    d3.select('#chart')
        .datum(randomData)
        .call(bubbleChart);
}

function drawStructuredChart() {
    if (true) {
        bubbleChart.transitionDuration(3000);
        bubbleChart.on("click", function(d) {
            console.log('Yay, you clicked me again!');
            dropBubbles();
        });
        d3.select('#chart')
            .datum(structuredData)
            .call(bubbleChart);
    }
}

function resize() {
    if (!finalAnimationDrawn && !previousVisit) {
        var width = $(window).width(),
            height = $(window).height();

        bubbleChart.height(height);
        bubbleChart.width(width);

        //console.log('resize :' + width + ', ' + height);
        bubbleChart.on("click", function(d) {
            console.log('Keep on clicking');
            drawStructuredChart();
        });

        drawRandomChart();
    }
}

function dropBubbles() {

    $('#chart').fadeOut(1000, function() {
        $('#main').fadeIn(3000, function() {});
    });

    // set cookie to record the fact that the user has visited this page. Next time
    // they won't get the load animation
    $.cookie('visited', 'true', {
        expires: 365
    });

    finalAnimationDrawn = true;
}


if (previousVisit === 'true') {
    $('#main').fadeIn(500, function() {});
    //$('chart').style.display = 'none';
} else {
    drawRandomChart();
}
resize();
d3.select(window).on('resize', resize);


// data

function randomBubbleData() {
    var numberOfBubbles = 100,
        bubbleData = [];



    for (var i = 0; i < numberOfBubbles; i++) {
        var x = randomNumber(6),
            y = randomNumber(6),
            r = Math.abs(randomNumber(30)),
            color = colors(i);

        bubbleData.push({
            x: x,
            y: y,
            r: r,
            color: color
        });
    }
    return bubbleData;
}

function randomBubbleDataFallsAway() {

    var numberOfBubbles = 100,
        bubbleData = [];



    for (var i = 0; i < numberOfBubbles; i++) {
        var x = randomNumber(7),
            y = randomNumber(7),
            r = Math.abs(randomNumber(30)),
            color = colors(i);

        bubbleData.push({
            x: x,
            y: -20,
            r: r,
            color: color
        });
    }
    return bubbleData;
}

function logSpiralStarData() {
    var theta = 0,
        circleRadius = 8,
        a = 1,
        b = 0.306349, // acheives the 'Golden Ratio'
        circleSeperation = 0, // negatvie values will give overlap
        seperationTollerance = 0.1, // possible variation in overlap. There must be some, else a solution may not be found.
        thetaIncrement = 0.1,
        x = 0,
        y = 0,
        maxTheta = 5 * Math.PI;

    var r = function() {
        return a * Math.exp(b * theta);
    };

    var data = [],
        thisValue,
        previousValue;

    for (var i = 0; i < 100; i++) {

        if (i > 0) {
            theta += (Math.PI * 0.02);
            // increase theta to acheive the desired seperation to the next circle

        }
        var color = colors(i);
        x = r() * Math.cos(57.3 * theta);
        y = r() * Math.sin(57.3 * theta);
        thisValue = {
            'x': x,
            'y': y,
            'r': (circleRadius + i),
            'color': colors
        };
        data.push(thisValue);
        previousValue = thisValue;

    }

    return data;
}

function randomNumber(maxAbsoluteValue) {
    var posNeg = -1;
    if (Math.random() > 0.5) {
        posNeg = 1;
    }
    return~~ (Math.random() * maxAbsoluteValue * posNeg);
}