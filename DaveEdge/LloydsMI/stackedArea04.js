require.config({
    config: {
        moment: {
            noGlobal: true
        }
    },
    paths: {
        'moment': 'js/moment.v2.8.1.min',
        'moment-timezone': '../../js/moment-timezone.v0.2.1.min',
        'moment-timezone-data': '../../js/moment-timezone-with-data-2010-2020',
        'jquery': 'js/jquery-2.0.0.min',
        'd3': 'js/d3.v3.4.11.min',
        'queue': '../../js/queue.min',
        'XDate': '../../js/XDate',
        'jqueryUI': 'js/jquery-ui-1.11.1/jquery-ui.min',
        'dimple': 'js/dimple.v2.1.0.min',
        'ninjaCharts': 'js/ninjaCharts',
        'lloydsMI': 'lloydsMI'
    },
    waitSeconds: 10

});

define([
    // Load our app module and pass it to our definition function
    'd3', 'ninjaCharts', 'lloydsMI', 'moment'
], function (d3, ninjaCharts, lloydsMI,moment) {
    var rawData = getRawLloydsData();

    var lloydsCategoriesToKeep = [
    'Breakdown of live users;Personal users',
    'Breakdown of live users;Corporate users',
    'Breakdown of live users;Club users',
    'Breakdown of live users;Private Client and Private Banking users',
    'Breakdown of live users;Funds Agent users',
    'Breakdown of live users;Funds Shareholder users',
    'Breakdown of live users;Total',
    'User status breakdown;New unapproved users',
    'User status breakdown;Users who have consented to email marketing',
    'User status breakdown;Users who logged in the last month (i.e. since 2008.10.31)',
    'User status breakdown;Users locked out, unable to login',
    'User status breakdown;Awaiting Physical Evidence users',
    'User status breakdown;Suspended users',
    'User status breakdown;Obsolete users',
    'User status breakdown;Live Users, able to login',
    'User status breakdown;Total Users (including locked out, obsolete etc.)',
    'User status breakdown;Users who logged in the last month',
    'User status breakdown;Personal users who logged in in the last month',
 //    'User status breakdown; - Users who logged in the last week',
 //    'User status breakdown; - Personal users who logged in in the last week',
 //    'User status breakdown; - Users who logged in in the last week',
    'User status breakdown;Users who logged in in the last month',
    'User status breakdown;Active Users - Logged in in the last 3 months',
    'User status breakdown;Dormant Users - Logged in more than 3 months ago',
    'User status breakdown;Inactive Users - Users that have never logged in'];



    var lloydsJSON = filterLloydsRawData(lloydsCategoriesToKeep);
    



    var parseDate = d3.time.format('%d/%m/%Y').parse;
    lloydsJSON.forEach(function (d) {
        d.Date = parseDate(d.Date);
    });
    
    lloydsJSON = lloydsJSON.filter(function(d){
        var startDate = moment('2013-01-01'),
            endDate = moment('2014-09-15');
         var keepRecord = moment(d.Date).isAfter(startDate) && moment(d.Date).isBefore(endDate);
        
        return keepRecord;
    });
    console.log('filtered raw data', lloydsJSON);
    //    console.log(lloydsJSON);

    var properties = ['Personal users',
        'Corporate users',
        'Club users',
        'Private Client and Private Banking users',
        'Funds Agent users',
        'Funds Shareholder users',
 //        'Total'
                     ],
        selectionOpacity = 0.5,
        colors = ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'],
        colors2 = ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)'],
        categories = [
            {
                name: 'User status breakdown;New unapproved users',
                selected: true,
                color: colors2[6],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            
            {
                name: 'Breakdown of live users;Personal users',
                selected: true,
                color: colors[1],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Breakdown of live users;Corporate users',
                selected: false,
                color: colors[2],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Breakdown of live users;Club users',
                selected: false,
                color: colors[3],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Breakdown of live users;Private Client and Private Banking users',
                selected: false,
                color: colors[4],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Breakdown of live users;Funds Agent users',
                selected: false,
                color: colors[5],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Breakdown of live users;Funds Shareholder users',
                selected: true,
                color: colors[6],
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                }];

    var formatData = function () {
        var formatedData = [];
        categories.forEach(function (thisCategory) {
            if (thisCategory.selected === true) {
                var valueSet = [];
                lloydsJSON.forEach(function (d) {
                    valueSet.push({
                        x: d.Date,
                        y: d[thisCategory.name]
                    });


                });
                formatedData.push({
                    name: thisCategory.name,
                    values: valueSet,
                    color: thisCategory.color,
                    type: thisCategory.type


                });
            }
        });


    console.log('formated data', formatedData);
        return formatedData;
    };

    var margin = {
        top: 10,
        bottom: 60,
        left: 100,
        right: 100
    };
    var stackedArea = d3.ninja.stackedAreaWithSecondaryAxisLines();
    stackedArea.title('Customer Category');
    stackedArea.yAxis1Title('User Count (area plot)');
    stackedArea.yAxis2Title('User Count (line plot)');
    stackedArea.xAxisTitle('Date');
    stackedArea.yMin(0);
    stackedArea.margin(margin);
    stackedArea.height(600);
    stackedArea.width(900);

    var stackedAreaContext = d3.ninja.stackedAreaWithSecondaryAxisLines();
    stackedAreaContext.yMin(0);
    stackedAreaContext.margin(margin);
    stackedAreaContext.height(150);
    stackedAreaContext.width(900);
    stackedAreaContext.showTooltip(false);
    stackedAreaContext.showYAxes(false);

    // LEGEND
    var legend = d3.ninja.horizontalLegendSelectable();
    var legendMargin = {
        top: 10,
        bottom: 0,
        left: margin.left,
        right: 0
    };
    legend.margin(legendMargin);
    legend.width(650);
    legend.itemWidth(450);
    legend.fontColor('#525252');
    legend.fontSize(20);
    legend.on('click', function (d) {
        console.log('Legend Click:', d);

        // update the selectedCategories array to reflect what the user has just clicked
        var filteredCat = categories.filter(function (dd) {
            return dd.name === d.name
        });
        filteredCat[0].selected = !filteredCat[0].selected;
        console.log('categories', categories);

        // now we need to redraw the chart, given the new categories selected
        var data = formatData();

        d3.select('#chart')
            .datum(data)
            .call(stackedArea);

//        d3.select('#context')
//            .datum(data)
//            .call(stackedAreaContext);

        d3.select('#legend')
            .datum(categories.slice().reverse())
            .call(legend);
    });


    // INITIAL PLOT


    var data = formatData();

    d3.select('#chart')
        .datum(data)
        .call(stackedArea);
//    d3.select('#context')
//        .datum(data)
//        .call(stackedAreaContext);
    d3.select('#legend')
        .datum(categories.slice().reverse())
        .call(legend);


});


// DATA