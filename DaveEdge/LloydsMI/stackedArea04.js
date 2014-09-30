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
], function (d3, ninjaCharts, lloydsMI, moment) {
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
 //    'User status breakdown;Users who logged in the last month (i.e. since 2008.10.31)', // need to merge on Power Query
    'User status breakdown;Users locked out, unable to login',
    'User status breakdown;Awaiting Physical Evidence users',
    'User status breakdown;Suspended users',
    'User status breakdown;Obsolete users',
    'User status breakdown;Live Users, able to login',
    'User status breakdown;Total Users (including locked out, obsolete etc.)',
 //    'User status breakdown;Users who logged in the last month',
    'User status breakdown;Personal users who logged in in the last month',
 //    'User status breakdown; - Users who logged in the last week',
 //    'User status breakdown; - Personal users who logged in in the last week',
 //    'User status breakdown; - Users who logged in in the last week',
    'User status breakdown;Users who logged in in the last month',
    'User status breakdown;Active Users - Logged in in the last 3 months',
    'User status breakdown;Dormant Users - Logged in more than 3 months ago',
    'User status breakdown;Inactive Users - Users that have never logged in',
    'New Users;New Registrations (total including awaiting approval)',
    'New Users;New Registrations (approved and live)',
    'New Users;New Registrations (who have logged on)'];

    var lloydsJSON = filterLloydsRawData(lloydsCategoriesToKeep);

    var parseDate = d3.time.format('%d/%m/%Y').parse;
    lloydsJSON.forEach(function (d) {
        d.Date = parseDate(d.Date);
    });

    lloydsJSON = lloydsJSON.filter(function (d) {
        var startDate = moment('2008-07-01'),
            endDate = moment('2014-09-15');
        var keepRecord = moment(d.Date).isAfter(startDate) && moment(d.Date).isBefore(endDate);

        return keepRecord;
    });

    var selectionOpacity = 0.5,
        colors = ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'],
        colors2 = ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)'],
        colors3 = ['rgb(255,255,178)', 'rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(240,59,32)', 'rgb(189,0,38)'],
        colorRamp = d3.scale.linear().domain([0, 15]).range(['#737373','#525252']),
        colorRamp2 = d3.scale.linear().domain([0, 7]).range(['#de77ae', '#c51b7d']),
        colorRamp3 = d3.scale.linear().domain([0, 5]).range(['#c7e9c0','#006d2c']),
        categories = [

            {
                name: 'New Registrations (who have logged on)',
                fullName: 'New Users;New Registrations (who have logged on)',
                selected: false,
                color: colorRamp(0),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'New Registrations (total including awaiting approval)',
                fullName: 'New Users;New Registrations (total including awaiting approval)',
                selected: false,
                color: colorRamp(1),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'New Registrations (approved and live)',
                fullName: 'New Users;New Registrations (approved and live)',
                selected: false,
                color: colorRamp(2),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Total Users (including locked out, obsolete etc.)',
                fullName: 'User status breakdown;Total Users (including locked out, obsolete etc.)',
                selected: false,
                color: colorRamp(3),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Live Users, able to login',
                fullName: 'User status breakdown;Live Users, able to login',
                selected: false,
                color: colorRamp(4),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Users locked out, unable to login',
                fullName: 'User status breakdown;Users locked out, unable to login',
                selected: false,
                color: colorRamp(5),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Obsolete users',
                fullName: 'User status breakdown;Obsolete users',
                selected: false,
                color: colorRamp(6),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Suspended users',
                fullName: 'User status breakdown;Suspended users',
                selected: false,
                color: colorRamp(7),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Awaiting Physical Evidence users',
                fullName: 'User status breakdown;Awaiting Physical Evidence users',
                selected: false,
                color: colorRamp(8),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Users who have consented to email marketing',
                fullName: 'User status breakdown;Users who have consented to email marketing',
                selected: false,
                color: colorRamp(9),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'New unapproved users',
                fullName: 'User status breakdown;New unapproved users',
                selected: false,
                color: colorRamp(10),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Users that have never logged in',
                fullName: 'User status breakdown;Inactive Users - Users that have never logged in',
                selected: false,
                color: colorRamp(11),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Logged in more than 3 months ago',
                fullName: 'User status breakdown;Dormant Users - Logged in more than 3 months ago',
                selected: false,
                color: colorRamp(12),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Logged in in the last 3 months',
                fullName: 'User status breakdown;Active Users - Logged in in the last 3 months',
                selected: false,
                color: colorRamp(13),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Users who logged in in the last month',
                fullName: 'User status breakdown;Users who logged in in the last month',
                selected: true,
                color: colorRamp(14),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Personal users who logged in in the last month',
                fullName: 'User status breakdown;Personal users who logged in in the last month',
                selected: false,
                color: colorRamp(15),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'line' // area or line
                },
            {
                name: 'Personal users',
                fullName: 'Breakdown of live users;Personal users',
                selected: false,
                color: colorRamp3(0),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Corporate users',
                fullName: 'Breakdown of live users;Corporate users',
                selected: true,
                color: colorRamp3(1),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Club users',
                fullName: 'Breakdown of live users;Club users',
                selected: true,
                color: colorRamp3(2),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Private Client and Private Banking users',
                fullName: 'Breakdown of live users;Private Client and Private Banking users',
                selected: true,
                color: colorRamp3(3),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Funds Agent users',
                fullName: 'Breakdown of live users;Funds Agent users',
                selected: true,
                color: colorRamp3(4),
                textColor: '#525252',
                opacity: selectionOpacity,
                type: 'area'
                },
            {
                name: 'Funds Shareholder users',
                fullName: 'Breakdown of live users;Funds Shareholder users',
                selected: true,
                color: colorRamp3(5),
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
                        y: d[thisCategory.fullName]
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
    stackedArea.title('User Count by Category');
    stackedArea.yAxis1Title('User Count (area plot)');
    stackedArea.yAxis2Title('User Count (line plot)');
    stackedArea.xAxisTitle('Date');
    stackedArea.yMin(0);
    stackedArea.margin(margin);
    stackedArea.height(600);
    stackedArea.width(800);
    stackedArea.lineOpacity(0.9);

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
    legend.width(450);
    legend.itemWidth(450);
    legend.fontColor('#525252');
    legend.fontSize(12);
    legend.on('click', function (d) {
        console.log('Legend Click:', d);

        // update the selectedCategories array to reflect what the user has just clicked
        var filteredCat = categories.filter(function (dd) {
            return dd.name === d.name
        });
        filteredCat[0].selected = !filteredCat[0].selected;
        //        console.log('categories', categories);

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