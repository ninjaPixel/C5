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
        'dimple':'js/dimple.v2.1.0.min'
    }
});

define([
    // Load our app module and pass it to our definition function
    'd3', 'dimple'
], function (d3, dimple) {

    var svg = dimple.newSvg("body", 800, 600);
    var data = [
        {
            "Word": "Hello",
            "Awesomeness": 2000
        },
        {
            "Word": "World",
            "Awesomeness": 3000
        }
    ];
    var chart = new dimple.chart(svg, data);
    chart.addCategoryAxis("x", "Word");
    chart.addMeasureAxis("y", "Awesomeness");
    chart.addSeries(null, dimple.plot.bar);
    chart.draw();
});


// DATA

var lloydsJSON = [{
        "Date": "31/7/08",
        "Personal users": 16509,
        "Corporate users": 404,
        "Club users": 361,
        "Private Client and Private Banking users": 472,
        "Funds Agent users": 48,
        "Funds Shareholder users": 330,
        "Total": 18124
    },
    {
        "Date": "31/8/08",
        "Personal users": 16943,
        "Corporate users": 420,
        "Club users": 364,
        "Private Client and Private Banking users": 474,
        "Funds Agent users": 57,
        "Funds Shareholder users": 405,
        "Total": 18663
    },
    {
        "Date": "30/9/08",
        "Personal users": 17199,
        "Corporate users": 426,
        "Club users": 369,
        "Private Client and Private Banking users": 478,
        "Funds Agent users": 62,
        "Funds Shareholder users": 445,
        "Total": 18979
    },
    {
        "Date": "31/10/08",
        "Personal users": 17944,
        "Corporate users": 433,
        "Club users": 375,
        "Private Client and Private Banking users": 479,
        "Funds Agent users": 66,
        "Funds Shareholder users": 508,
        "Total": 19805
    },
    {
        "Date": "30/11/08",
        "Personal users": 18433,
        "Corporate users": 487,
        "Club users": 375,
        "Private Client and Private Banking users": 477,
        "Funds Agent users": 66,
        "Funds Shareholder users": 536,
        "Total": 20374
    },
    {
        "Date": "31/12/08",
        "Personal users": 18974,
        "Corporate users": 497,
        "Club users": 381,
        "Private Client and Private Banking users": 481,
        "Funds Agent users": 68,
        "Funds Shareholder users": 561,
        "Total": 20962
    },
    {
        "Date": "31/1/09",
        "Personal users": 19678,
        "Corporate users": 511,
        "Club users": 386,
        "Private Client and Private Banking users": 482,
        "Funds Agent users": 75,
        "Funds Shareholder users": 593,
        "Total": 21725
    },
    {
        "Date": "28/2/09",
        "Personal users": 20285,
        "Corporate users": 536,
        "Club users": 391,
        "Private Client and Private Banking users": 482,
        "Funds Agent users": 77,
        "Funds Shareholder users": 613,
        "Total": 22384
    },
    {
        "Date": "31/3/09",
        "Personal users": 20783,
        "Corporate users": 553,
        "Club users": 395,
        "Private Client and Private Banking users": 482,
        "Funds Agent users": 78,
        "Funds Shareholder users": 632,
        "Total": 22923
    },
    {
        "Date": "30/4/09",
        "Personal users": 21266,
        "Corporate users": 552,
        "Club users": 399,
        "Private Client and Private Banking users": 480,
        "Funds Agent users": 78,
        "Funds Shareholder users": 662,
        "Total": 23437
    },
    {
        "Date": "31/5/09",
        "Personal users": 21736,
        "Corporate users": 577,
        "Club users": 404,
        "Private Client and Private Banking users": 477,
        "Funds Agent users": 81,
        "Funds Shareholder users": 710,
        "Total": 23985
    },
    {
        "Date": "30/6/09",
        "Personal users": 22307,
        "Corporate users": 648,
        "Club users": 405,
        "Private Client and Private Banking users": 479,
        "Funds Agent users": 81,
        "Funds Shareholder users": 776,
        "Total": 24696
    },
    {
        "Date": "31/7/09",
        "Personal users": 23090,
        "Corporate users": 687,
        "Club users": 415,
        "Private Client and Private Banking users": 481,
        "Funds Agent users": 85,
        "Funds Shareholder users": 827,
        "Total": 25585
    },
    {
        "Date": "31/8/09",
        "Personal users": 23755,
        "Corporate users": 702,
        "Club users": 420,
        "Private Client and Private Banking users": 481,
        "Funds Agent users": 89,
        "Funds Shareholder users": 870,
        "Total": 26317
    },
    {
        "Date": "30/9/09",
        "Personal users": 24531,
        "Corporate users": 720,
        "Club users": 425,
        "Private Client and Private Banking users": 482,
        "Funds Agent users": 90,
        "Funds Shareholder users": 888,
        "Total": 27136
    },
    {
        "Date": "31/10/09",
        "Personal users": 25211,
        "Corporate users": 746,
        "Club users": 433,
        "Private Client and Private Banking users": 486,
        "Funds Agent users": 92,
        "Funds Shareholder users": 903,
        "Total": 27871
    },
    {
        "Date": "30/11/09",
        "Personal users": 25377,
        "Corporate users": 747,
        "Club users": 437,
        "Private Client and Private Banking users": 486,
        "Funds Agent users": 92,
        "Funds Shareholder users": 908,
        "Total": 28047
    },
    {
        "Date": "31/12/09",
        "Personal users": 25944,
        "Corporate users": 748,
        "Club users": 444,
        "Private Client and Private Banking users": 489,
        "Funds Agent users": 92,
        "Funds Shareholder users": 919,
        "Total": 28636
    },
    {
        "Date": "31/1/10",
        "Personal users": 26517,
        "Corporate users": 803,
        "Club users": 446,
        "Private Client and Private Banking users": 488,
        "Funds Agent users": 95,
        "Funds Shareholder users": 946,
        "Total": 29295
    },
    {
        "Date": "28/2/10",
        "Personal users": 27039,
        "Corporate users": 843,
        "Club users": 446,
        "Private Client and Private Banking users": 489,
        "Funds Agent users": 97,
        "Funds Shareholder users": 962,
        "Total": 29876
    },
    {
        "Date": "31/3/10",
        "Personal users": 27665,
        "Corporate users": 876,
        "Club users": 452,
        "Private Client and Private Banking users": 489,
        "Funds Agent users": 99,
        "Funds Shareholder users": 988,
        "Total": 30569
    },
    {
        "Date": "12/4/10",
        "Personal users": 27718,
        "Corporate users": 884,
        "Club users": 452,
        "Private Client and Private Banking users": 489,
        "Funds Agent users": 99,
        "Funds Shareholder users": 992,
        "Total": 30634
    },
    {
        "Date": "19/4/10",
        "Personal users": 27822,
        "Corporate users": 879,
        "Club users": 452,
        "Private Client and Private Banking users": 490,
        "Funds Agent users": 99,
        "Funds Shareholder users": 994,
        "Total": 30736
    },
    {
        "Date": "26/4/10",
        "Personal users": 27942,
        "Corporate users": 879,
        "Club users": 453,
        "Private Client and Private Banking users": 490,
        "Funds Agent users": 100,
        "Funds Shareholder users": 995,
        "Total": 30859
    },
    {
        "Date": "30/4/10",
        "Personal users": 28092,
        "Corporate users": 891,
        "Club users": 451,
        "Private Client and Private Banking users": 491,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1003,
        "Total": 31029
    },
    {
        "Date": "10/5/10",
        "Personal users": 28235,
        "Corporate users": 899,
        "Club users": 452,
        "Private Client and Private Banking users": 491,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1009,
        "Total": 31187
    },
    {
        "Date": "17/5/10",
        "Personal users": 28355,
        "Corporate users": 903,
        "Club users": 452,
        "Private Client and Private Banking users": 491,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1009,
        "Total": 31311
    },
    {
        "Date": "24/5/10",
        "Personal users": 28512,
        "Corporate users": 901,
        "Club users": 453,
        "Private Client and Private Banking users": 491,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1014,
        "Total": 31472
    },
    {
        "Date": "31/5/10",
        "Personal users": 28682,
        "Corporate users": 916,
        "Club users": 457,
        "Private Client and Private Banking users": 491,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1016,
        "Total": 31663
    },
    {
        "Date": "7/6/10",
        "Personal users": 28797,
        "Corporate users": 959,
        "Club users": 457,
        "Private Client and Private Banking users": 493,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1019,
        "Total": 31826
    },
    {
        "Date": "14/6/10",
        "Personal users": 28943,
        "Corporate users": 963,
        "Club users": 458,
        "Private Client and Private Banking users": 495,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1022,
        "Total": 31982
    },
    {
        "Date": "21/6/10",
        "Personal users": 29081,
        "Corporate users": 973,
        "Club users": 462,
        "Private Client and Private Banking users": 497,
        "Funds Agent users": 101,
        "Funds Shareholder users": 1024,
        "Total": 32138
    },
    {
        "Date": "28/6/10",
        "Personal users": 29213,
        "Corporate users": 973,
        "Club users": 461,
        "Private Client and Private Banking users": 499,
        "Funds Agent users": 102,
        "Funds Shareholder users": 1028,
        "Total": 32276
    },
    {
        "Date": "30/6/10",
        "Personal users": 29384,
        "Corporate users": 981,
        "Club users": 461,
        "Private Client and Private Banking users": 499,
        "Funds Agent users": 102,
        "Funds Shareholder users": 1027,
        "Total": 32454
    },
    {
        "Date": "5/7/10",
        "Personal users": 29384,
        "Corporate users": 981,
        "Club users": 461,
        "Private Client and Private Banking users": 499,
        "Funds Agent users": 102,
        "Funds Shareholder users": 1027,
        "Total": 32454
    },
    {
        "Date": "12/7/10",
        "Personal users": 29503,
        "Corporate users": 987,
        "Club users": 463,
        "Private Client and Private Banking users": 501,
        "Funds Agent users": 103,
        "Funds Shareholder users": 1029,
        "Total": 32586
    },
    {
        "Date": "19/7/10",
        "Personal users": 29601,
        "Corporate users": 989,
        "Club users": 465,
        "Private Client and Private Banking users": 502,
        "Funds Agent users": 104,
        "Funds Shareholder users": 1035,
        "Total": 32696
    },
    {
        "Date": "26/7/10",
        "Personal users": 29755,
        "Corporate users": 978,
        "Club users": 464,
        "Private Client and Private Banking users": 501,
        "Funds Agent users": 104,
        "Funds Shareholder users": 1040,
        "Total": 32842
    },
    {
        "Date": "31/7/10",
        "Personal users": 29920,
        "Corporate users": 982,
        "Club users": 467,
        "Private Client and Private Banking users": 502,
        "Funds Agent users": 105,
        "Funds Shareholder users": 1044,
        "Total": 33020
    },
    {
        "Date": "9/8/10",
        "Personal users": 30118,
        "Corporate users": 1007,
        "Club users": 469,
        "Private Client and Private Banking users": 503,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1050,
        "Total": 33253
    },
    {
        "Date": "16/8/10",
        "Personal users": 30236,
        "Corporate users": 1011,
        "Club users": 468,
        "Private Client and Private Banking users": 503,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1052,
        "Total": 33376
    },
    {
        "Date": "23/8/10",
        "Personal users": 30366,
        "Corporate users": 1018,
        "Club users": 470,
        "Private Client and Private Banking users": 503,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1060,
        "Total": 33523
    },
    {
        "Date": "30/8/10",
        "Personal users": 30528,
        "Corporate users": 1025,
        "Club users": 470,
        "Private Client and Private Banking users": 506,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1070,
        "Total": 33705
    },
    {
        "Date": "31/8/10",
        "Personal users": 30678,
        "Corporate users": 1047,
        "Club users": 472,
        "Private Client and Private Banking users": 508,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1072,
        "Total": 33883
    },
    {
        "Date": "6/9/10",
        "Personal users": 30678,
        "Corporate users": 1047,
        "Club users": 472,
        "Private Client and Private Banking users": 508,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1072,
        "Total": 33883
    },
    {
        "Date": "13/9/10",
        "Personal users": 30819,
        "Corporate users": 1072,
        "Club users": 470,
        "Private Client and Private Banking users": 511,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1077,
        "Total": 34055
    },
    {
        "Date": "20/9/10",
        "Personal users": 30993,
        "Corporate users": 1072,
        "Club users": 471,
        "Private Client and Private Banking users": 513,
        "Funds Agent users": 106,
        "Funds Shareholder users": 1079,
        "Total": 34234
    },
    {
        "Date": "27/9/10",
        "Personal users": 31124,
        "Corporate users": 1077,
        "Club users": 474,
        "Private Client and Private Banking users": 514,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1082,
        "Total": 34378
    },
    {
        "Date": "30/9/10",
        "Personal users": 31281,
        "Corporate users": 1078,
        "Club users": 475,
        "Private Client and Private Banking users": 515,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1085,
        "Total": 34541
    },
    {
        "Date": "4/10/10",
        "Personal users": 31281,
        "Corporate users": 1078,
        "Club users": 475,
        "Private Client and Private Banking users": 515,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1085,
        "Total": 34541
    },
    {
        "Date": "11/10/10",
        "Personal users": 31448,
        "Corporate users": 1072,
        "Club users": 477,
        "Private Client and Private Banking users": 519,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1087,
        "Total": 34710
    },
    {
        "Date": "18/10/10",
        "Personal users": 31619,
        "Corporate users": 1083,
        "Club users": 480,
        "Private Client and Private Banking users": 521,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1086,
        "Total": 34896
    },
    {
        "Date": "25/10/10",
        "Personal users": 31764,
        "Corporate users": 1093,
        "Club users": 482,
        "Private Client and Private Banking users": 522,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1093,
        "Total": 35061
    },
    {
        "Date": "1/11/10",
        "Personal users": 31888,
        "Corporate users": 1092,
        "Club users": 483,
        "Private Client and Private Banking users": 524,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1100,
        "Total": 35194
    },
    {
        "Date": "31/10/10",
        "Personal users": 31889,
        "Corporate users": 1092,
        "Club users": 483,
        "Private Client and Private Banking users": 524,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1100,
        "Total": 35195
    },
    {
        "Date": "8/11/10",
        "Personal users": 32049,
        "Corporate users": 1090,
        "Club users": 483,
        "Private Client and Private Banking users": 526,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1103,
        "Total": 35358
    },
    {
        "Date": "15/11/10",
        "Personal users": 32219,
        "Corporate users": 1104,
        "Club users": 483,
        "Private Client and Private Banking users": 530,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1106,
        "Total": 35550
    },
    {
        "Date": "22/11/10",
        "Personal users": 32345,
        "Corporate users": 1123,
        "Club users": 486,
        "Private Client and Private Banking users": 531,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1109,
        "Total": 35702
    },
    {
        "Date": "29/11/10",
        "Personal users": 32478,
        "Corporate users": 1132,
        "Club users": 488,
        "Private Client and Private Banking users": 531,
        "Funds Agent users": 107,
        "Funds Shareholder users": 1110,
        "Total": 35846
    },
    {
        "Date": "30/11/10",
        "Personal users": 32655,
        "Corporate users": 1157,
        "Club users": 490,
        "Private Client and Private Banking users": 535,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1117,
        "Total": 36062
    },
    {
        "Date": "6/12/10",
        "Personal users": 32655,
        "Corporate users": 1157,
        "Club users": 490,
        "Private Client and Private Banking users": 535,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1117,
        "Total": 36062
    },
    {
        "Date": "13/12/10",
        "Personal users": 32808,
        "Corporate users": 1172,
        "Club users": 493,
        "Private Client and Private Banking users": 536,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1119,
        "Total": 36236
    },
    {
        "Date": "20/12/10",
        "Personal users": 32928,
        "Corporate users": 1178,
        "Club users": 494,
        "Private Client and Private Banking users": 538,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1123,
        "Total": 36369
    },
    {
        "Date": "27/12/10",
        "Personal users": 33161,
        "Corporate users": 1183,
        "Club users": 496,
        "Private Client and Private Banking users": 541,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1126,
        "Total": 36615
    },
    {
        "Date": "31/12/10",
        "Personal users": 33161,
        "Corporate users": 1183,
        "Club users": 496,
        "Private Client and Private Banking users": 541,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1126,
        "Total": 36615
    },
    {
        "Date": "03/01/11",
        "Personal users": 33162,
        "Corporate users": 1183,
        "Club users": 496,
        "Private Client and Private Banking users": 541,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1126,
        "Total": 36616
    },
    {
        "Date": "10/01/11",
        "Personal users": 33315,
        "Corporate users": 1200,
        "Club users": 497,
        "Private Client and Private Banking users": 543,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1136,
        "Total": 36799
    },
    {
        "Date": "17/01/11",
        "Personal users": 33503,
        "Corporate users": 1212,
        "Club users": 498,
        "Private Client and Private Banking users": 544,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1148,
        "Total": 37013
    },
    {
        "Date": "24/01/11",
        "Personal users": 33639,
        "Corporate users": 1224,
        "Club users": 499,
        "Private Client and Private Banking users": 548,
        "Funds Agent users": 109,
        "Funds Shareholder users": 1171,
        "Total": 37190
    },
    {
        "Date": "31/01/11",
        "Personal users": 33827,
        "Corporate users": 1235,
        "Club users": 501,
        "Private Client and Private Banking users": 549,
        "Funds Agent users": 109,
        "Funds Shareholder users": 1182,
        "Total": 37403
    },
    {
        "Date": "31/1/11",
        "Personal users": 34030,
        "Corporate users": 1243,
        "Club users": 501,
        "Private Client and Private Banking users": 551,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1192,
        "Total": 37625
    },
    {
        "Date": "7/02/11",
        "Personal users": 34032,
        "Corporate users": 1253,
        "Club users": 501,
        "Private Client and Private Banking users": 551,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1193,
        "Total": 37638
    },
    {
        "Date": "14/02/11",
        "Personal users": 34236,
        "Corporate users": 1269,
        "Club users": 502,
        "Private Client and Private Banking users": 555,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1199,
        "Total": 37869
    },
    {
        "Date": "21/02/11",
        "Personal users": 34374,
        "Corporate users": 1279,
        "Club users": 501,
        "Private Client and Private Banking users": 559,
        "Funds Agent users": 109,
        "Funds Shareholder users": 1210,
        "Total": 38032
    },
    {
        "Date": "28/02/11",
        "Personal users": 34565,
        "Corporate users": 1294,
        "Club users": 503,
        "Private Client and Private Banking users": 562,
        "Funds Agent users": 108,
        "Funds Shareholder users": 1220,
        "Total": 38252
    },
    {
        "Date": "28/2/11",
        "Personal users": 34768,
        "Corporate users": 1303,
        "Club users": 505,
        "Private Client and Private Banking users": 565,
        "Funds Agent users": 110,
        "Funds Shareholder users": 1228,
        "Total": 38479
    },
    {
        "Date": "7/03/11",
        "Personal users": 34769,
        "Corporate users": 1303,
        "Club users": 505,
        "Private Client and Private Banking users": 565,
        "Funds Agent users": 110,
        "Funds Shareholder users": 1229,
        "Total": 38481
    },
    {
        "Date": "14/03/11",
        "Personal users": 34991,
        "Corporate users": 1315,
        "Club users": 507,
        "Private Client and Private Banking users": 569,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1234,
        "Total": 38727
    },
    {
        "Date": "21/03/11",
        "Personal users": 35188,
        "Corporate users": 1324,
        "Club users": 509,
        "Private Client and Private Banking users": 569,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1240,
        "Total": 38941
    },
    {
        "Date": "28/03/11",
        "Personal users": 35432,
        "Corporate users": 1334,
        "Club users": 514,
        "Private Client and Private Banking users": 572,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1245,
        "Total": 39208
    },
    {
        "Date": "31/3/11",
        "Personal users": 35680,
        "Corporate users": 1352,
        "Club users": 516,
        "Private Client and Private Banking users": 547,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1250,
        "Total": 39456
    },
    {
        "Date": "4/04/10",
        "Personal users": 35680,
        "Corporate users": 1352,
        "Club users": 516,
        "Private Client and Private Banking users": 547,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1250,
        "Total": 39456
    },
    {
        "Date": "11/04/11",
        "Personal users": 35884,
        "Corporate users": 1369,
        "Club users": 518,
        "Private Client and Private Banking users": 557,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1253,
        "Total": 39695
    },
    {
        "Date": "18/04/11",
        "Personal users": 36091,
        "Corporate users": 1386,
        "Club users": 518,
        "Private Client and Private Banking users": 564,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1257,
        "Total": 39930
    },
    {
        "Date": "27/04/2011",
        "Personal users": 36300,
        "Corporate users": 1390,
        "Club users": 517,
        "Private Client and Private Banking users": 566,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1259,
        "Total": 40146
    },
    {
        "Date": "30/4/11",
        "Personal users": 36426,
        "Corporate users": 1392,
        "Club users": 517,
        "Private Client and Private Banking users": 566,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1259,
        "Total": 40274
    },
    {
        "Date": "9/05/11",
        "Personal users": 36654,
        "Corporate users": 1395,
        "Club users": 520,
        "Private Client and Private Banking users": 570,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1263,
        "Total": 40516
    },
    {
        "Date": "16/05/11",
        "Personal users": 36833,
        "Corporate users": 1411,
        "Club users": 521,
        "Private Client and Private Banking users": 576,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1265,
        "Total": 40720
    },
    {
        "Date": "20/05/11",
        "Personal users": 36973,
        "Corporate users": 1441,
        "Club users": 528,
        "Private Client and Private Banking users": 582,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1266,
        "Total": 40904
    },
    {
        "Date": "27/05/11",
        "Personal users": 37216,
        "Corporate users": 1450,
        "Club users": 534,
        "Private Client and Private Banking users": 588,
        "Funds Agent users": 116,
        "Funds Shareholder users": 1270,
        "Total": 41174
    },
    {
        "Date": "31/5/11",
        "Personal users": 37447,
        "Corporate users": 1455,
        "Club users": 538,
        "Private Client and Private Banking users": 594,
        "Funds Agent users": 117,
        "Funds Shareholder users": 1274,
        "Total": 41425
    },
    {
        "Date": "3/06/11",
        "Personal users": 37448,
        "Corporate users": 1455,
        "Club users": 538,
        "Private Client and Private Banking users": 594,
        "Funds Agent users": 117,
        "Funds Shareholder users": 1274,
        "Total": 41426
    },
    {
        "Date": "10/06/11",
        "Personal users": 37686,
        "Corporate users": 1465,
        "Club users": 539,
        "Private Client and Private Banking users": 598,
        "Funds Agent users": 117,
        "Funds Shareholder users": 1278,
        "Total": 41683
    },
    {
        "Date": "17/06/11",
        "Personal users": 37922,
        "Corporate users": 1479,
        "Club users": 540,
        "Private Client and Private Banking users": 608,
        "Funds Agent users": 117,
        "Funds Shareholder users": 1280,
        "Total": 41946
    },
    {
        "Date": "24/06/11",
        "Personal users": 38176,
        "Corporate users": 1486,
        "Club users": 543,
        "Private Client and Private Banking users": 612,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1280,
        "Total": 42216
    },
    {
        "Date": "30/6/11",
        "Personal users": 38427,
        "Corporate users": 1488,
        "Club users": 547,
        "Private Client and Private Banking users": 613,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1284,
        "Total": 42479
    },
    {
        "Date": "1/07/11",
        "Personal users": 38427,
        "Corporate users": 1488,
        "Club users": 547,
        "Private Client and Private Banking users": 613,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1284,
        "Total": 42479
    },
    {
        "Date": "8/07/11",
        "Personal users": 38651,
        "Corporate users": 1510,
        "Club users": 547,
        "Private Client and Private Banking users": 623,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1286,
        "Total": 42737
    },
    {
        "Date": "15/07/11",
        "Personal users": 38897,
        "Corporate users": 1526,
        "Club users": 548,
        "Private Client and Private Banking users": 629,
        "Funds Agent users": 121,
        "Funds Shareholder users": 1287,
        "Total": 43008
    },
    {
        "Date": "22/07/11",
        "Personal users": 39160,
        "Corporate users": 1547,
        "Club users": 548,
        "Private Client and Private Banking users": 632,
        "Funds Agent users": 118,
        "Funds Shareholder users": 1289,
        "Total": 43294
    },
    {
        "Date": "29/07/11",
        "Personal users": 39418,
        "Corporate users": 1563,
        "Club users": 548,
        "Private Client and Private Banking users": 636,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1293,
        "Total": 43577
    },
    {
        "Date": "31/7/11",
        "Personal users": 39542,
        "Corporate users": 1566,
        "Club users": 549,
        "Private Client and Private Banking users": 636,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1294,
        "Total": 43706
    },
    {
        "Date": "5/08/11",
        "Personal users": 39679,
        "Corporate users": 1569,
        "Club users": 551,
        "Private Client and Private Banking users": 641,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1294,
        "Total": 43853
    },
    {
        "Date": "12/08/11",
        "Personal users": 39946,
        "Corporate users": 1588,
        "Club users": 552,
        "Private Client and Private Banking users": 645,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1298,
        "Total": 44148
    },
    {
        "Date": "19/08/11",
        "Personal users": 40214,
        "Corporate users": 1597,
        "Club users": 553,
        "Private Client and Private Banking users": 649,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1299,
        "Total": 44431
    },
    {
        "Date": "26/08/11",
        "Personal users": 40480,
        "Corporate users": 1608,
        "Club users": 555,
        "Private Client and Private Banking users": 653,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1300,
        "Total": 44716
    },
    {
        "Date": "31/8/11",
        "Personal users": 40718,
        "Corporate users": 1611,
        "Club users": 556,
        "Private Client and Private Banking users": 656,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1301,
        "Total": 44962
    },
    {
        "Date": "2/09/11",
        "Personal users": 40718,
        "Corporate users": 1611,
        "Club users": 556,
        "Private Client and Private Banking users": 656,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1301,
        "Total": 44962
    },
    {
        "Date": "9/09/11",
        "Personal users": 40935,
        "Corporate users": 1611,
        "Club users": 558,
        "Private Client and Private Banking users": 660,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1303,
        "Total": 45187
    },
    {
        "Date": "16/09/11",
        "Personal users": 41153,
        "Corporate users": 1616,
        "Club users": 557,
        "Private Client and Private Banking users": 662,
        "Funds Agent users": 121,
        "Funds Shareholder users": 1305,
        "Total": 45414
    },
    {
        "Date": "23/09/11",
        "Personal users": 41384,
        "Corporate users": 1618,
        "Club users": 558,
        "Private Client and Private Banking users": 666,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1309,
        "Total": 45654
    },
    {
        "Date": "30/09/11",
        "Personal users": 41618,
        "Corporate users": 1645,
        "Club users": 558,
        "Private Client and Private Banking users": 666,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1312,
        "Total": 45918
    },
    {
        "Date": "30/9/11",
        "Personal users": 41862,
        "Corporate users": 1655,
        "Club users": 559,
        "Private Client and Private Banking users": 668,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1314,
        "Total": 46177
    },
    {
        "Date": "7/10/11",
        "Personal users": 41862,
        "Corporate users": 1655,
        "Club users": 559,
        "Private Client and Private Banking users": 668,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1314,
        "Total": 46177
    },
    {
        "Date": "14/10/11",
        "Personal users": 42085,
        "Corporate users": 1660,
        "Club users": 559,
        "Private Client and Private Banking users": 672,
        "Funds Agent users": 120,
        "Funds Shareholder users": 1318,
        "Total": 46414
    },
    {
        "Date": "21/10/11",
        "Personal users": 42335,
        "Corporate users": 1662,
        "Club users": 558,
        "Private Client and Private Banking users": 674,
        "Funds Agent users": 112,
        "Funds Shareholder users": 1318,
        "Total": 46659
    },
    {
        "Date": "28/10/11",
        "Personal users": 42589,
        "Corporate users": 1666,
        "Club users": 559,
        "Private Client and Private Banking users": 676,
        "Funds Agent users": 113,
        "Funds Shareholder users": 1321,
        "Total": 46924
    },
    {
        "Date": "31/10/11",
        "Personal users": 42802,
        "Corporate users": 1665,
        "Club users": 561,
        "Private Client and Private Banking users": 676,
        "Funds Agent users": 113,
        "Funds Shareholder users": 1326,
        "Total": 47143
    },
    {
        "Date": "4/11/11",
        "Personal users": 42802,
        "Corporate users": 1665,
        "Club users": 561,
        "Private Client and Private Banking users": 676,
        "Funds Agent users": 113,
        "Funds Shareholder users": 1326,
        "Total": 47143
    },
    {
        "Date": "11/11/11",
        "Personal users": 43002,
        "Corporate users": 1678,
        "Club users": 564,
        "Private Client and Private Banking users": 678,
        "Funds Agent users": 113,
        "Funds Shareholder users": 1329,
        "Total": 47364
    },
    {
        "Date": "18/11/11",
        "Personal users": 43203,
        "Corporate users": 1684,
        "Club users": 564,
        "Private Client and Private Banking users": 679,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1331,
        "Total": 47575
    },
    {
        "Date": "25/11/11",
        "Personal users": 43464,
        "Corporate users": 1704,
        "Club users": 567,
        "Private Client and Private Banking users": 684,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1334,
        "Total": 47867
    },
    {
        "Date": "30/11/11",
        "Personal users": 43713,
        "Corporate users": 1715,
        "Club users": 570,
        "Private Client and Private Banking users": 682,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1339,
        "Total": 48130
    },
    {
        "Date": "2/12/11",
        "Personal users": 43711,
        "Corporate users": 1715,
        "Club users": 570,
        "Private Client and Private Banking users": 682,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1339,
        "Total": 48128
    },
    {
        "Date": "9/12/11",
        "Personal users": 43968,
        "Corporate users": 1728,
        "Club users": 573,
        "Private Client and Private Banking users": 686,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1343,
        "Total": 48409
    },
    {
        "Date": "16/12/11",
        "Personal users": 44174,
        "Corporate users": 1732,
        "Club users": 573,
        "Private Client and Private Banking users": 686,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1342,
        "Total": 48618
    },
    {
        "Date": "23/12/11",
        "Personal users": 44286,
        "Corporate users": 1739,
        "Club users": 573,
        "Private Client and Private Banking users": 689,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1342,
        "Total": 48740
    },
    {
        "Date": "30/12/11",
        "Personal users": 44394,
        "Corporate users": 1740,
        "Club users": 573,
        "Private Client and Private Banking users": 689,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1343,
        "Total": 48850
    },
    {
        "Date": "31/12/11",
        "Personal users": 44528,
        "Corporate users": 1741,
        "Club users": 573,
        "Private Client and Private Banking users": 691,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1347,
        "Total": 48991
    },
    {
        "Date": "06/01/12",
        "Personal users": 44527,
        "Corporate users": 1741,
        "Club users": 573,
        "Private Client and Private Banking users": 691,
        "Funds Agent users": 111,
        "Funds Shareholder users": 1347,
        "Total": 48990
    },
    {
        "Date": "13/01/12",
        "Personal users": 44731,
        "Corporate users": 1748,
        "Club users": 573,
        "Private Client and Private Banking users": 694,
        "Funds Agent users": 114,
        "Funds Shareholder users": 1352,
        "Total": 49212
    },
    {
        "Date": "20/01/12",
        "Personal users": 44960,
        "Corporate users": 1766,
        "Club users": 572,
        "Private Client and Private Banking users": 697,
        "Funds Agent users": 116,
        "Funds Shareholder users": 1341,
        "Total": 49452
    },
    {
        "Date": "27/01/12",
        "Personal users": 45197,
        "Corporate users": 1773,
        "Club users": 576,
        "Private Client and Private Banking users": 701,
        "Funds Agent users": 117,
        "Funds Shareholder users": 1345,
        "Total": 49709
    },
    {
        "Date": "31/1/12",
        "Personal users": 45444,
        "Corporate users": 1779,
        "Club users": 577,
        "Private Client and Private Banking users": 707,
        "Funds Agent users": 118,
        "Funds Shareholder users": 1346,
        "Total": 49971
    },
    {
        "Date": "03/02/12",
        "Personal users": 45444,
        "Corporate users": 1779,
        "Club users": 577,
        "Private Client and Private Banking users": 707,
        "Funds Agent users": 118,
        "Funds Shareholder users": 1346,
        "Total": 49971
    },
    {
        "Date": "10/02/12",
        "Personal users": 45681,
        "Corporate users": 1785,
        "Club users": 579,
        "Private Client and Private Banking users": 711,
        "Funds Agent users": 119,
        "Funds Shareholder users": 1346,
        "Total": 50221
    },
    {
        "Date": "17/02/12",
        "Personal users": 45892,
        "Corporate users": 1825,
        "Club users": 580,
        "Private Client and Private Banking users": 717,
        "Funds Agent users": 122,
        "Funds Shareholder users": 1348,
        "Total": 50484
    },
    {
        "Date": "24/02/12",
        "Personal users": 46098,
        "Corporate users": 1825,
        "Club users": 580,
        "Private Client and Private Banking users": 721,
        "Funds Agent users": 123,
        "Funds Shareholder users": 1350,
        "Total": 50697
    },
    {
        "Date": "28/2/12",
        "Personal users": 46326,
        "Corporate users": 1834,
        "Club users": 585,
        "Private Client and Private Banking users": 722,
        "Funds Agent users": 124,
        "Funds Shareholder users": 1352,
        "Total": 50943
    },
    {
        "Date": "02/03/12",
        "Personal users": 46323,
        "Corporate users": 1834,
        "Club users": 585,
        "Private Client and Private Banking users": 722,
        "Funds Agent users": 124,
        "Funds Shareholder users": 1352,
        "Total": 50940
    },
    {
        "Date": "09/03/12",
        "Personal users": 46527,
        "Corporate users": 1843,
        "Club users": 587,
        "Private Client and Private Banking users": 723,
        "Funds Agent users": 124,
        "Funds Shareholder users": 1352,
        "Total": 51156
    },
    {
        "Date": "16/03/12",
        "Personal users": 46794,
        "Corporate users": 1839,
        "Club users": 589,
        "Private Client and Private Banking users": 726,
        "Funds Agent users": 125,
        "Funds Shareholder users": 1354,
        "Total": 51427
    },
    {
        "Date": "23/03/12",
        "Personal users": 47009,
        "Corporate users": 1840,
        "Club users": 591,
        "Private Client and Private Banking users": 731,
        "Funds Agent users": 125,
        "Funds Shareholder users": 1359,
        "Total": 51655
    },
    {
        "Date": "30/03/12",
        "Personal users": 47184,
        "Corporate users": 1845,
        "Club users": 592,
        "Private Client and Private Banking users": 737,
        "Funds Agent users": 126,
        "Funds Shareholder users": 1359,
        "Total": 51843
    },
    {
        "Date": "31/3/12",
        "Personal users": 47424,
        "Corporate users": 1849,
        "Club users": 592,
        "Private Client and Private Banking users": 738,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1362,
        "Total": 52092
    },
    {
        "Date": "06/04/12",
        "Personal users": 47424,
        "Corporate users": 1849,
        "Club users": 592,
        "Private Client and Private Banking users": 738,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1362,
        "Total": 52092
    },
    {
        "Date": "13/04/12",
        "Personal users": 47589,
        "Corporate users": 1855,
        "Club users": 593,
        "Private Client and Private Banking users": 740,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1363,
        "Total": 52267
    },
    {
        "Date": "20/04/12",
        "Personal users": 47762,
        "Corporate users": 1861,
        "Club users": 592,
        "Private Client and Private Banking users": 738,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1362,
        "Total": 52442
    },
    {
        "Date": "27/04/12",
        "Personal users": 48026,
        "Corporate users": 1875,
        "Club users": 594,
        "Private Client and Private Banking users": 740,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1366,
        "Total": 52729
    },
    {
        "Date": "30/4/12",
        "Personal users": 48303,
        "Corporate users": 1882,
        "Club users": 595,
        "Private Client and Private Banking users": 744,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1368,
        "Total": 53020
    },
    {
        "Date": "04/05/12",
        "Personal users": 48303,
        "Corporate users": 1882,
        "Club users": 595,
        "Private Client and Private Banking users": 744,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1368,
        "Total": 53020
    },
    {
        "Date": "11/05/12",
        "Personal users": 48590,
        "Corporate users": 1891,
        "Club users": 596,
        "Private Client and Private Banking users": 746,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1371,
        "Total": 53323
    },
    {
        "Date": "18/05/12",
        "Personal users": 48826,
        "Corporate users": 1911,
        "Club users": 595,
        "Private Client and Private Banking users": 749,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1376,
        "Total": 53586
    },
    {
        "Date": "25/05/12",
        "Personal users": 49075,
        "Corporate users": 1925,
        "Club users": 597,
        "Private Client and Private Banking users": 753,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1378,
        "Total": 53857
    },
    {
        "Date": "31/5/12",
        "Personal users": 49306,
        "Corporate users": 1942,
        "Club users": 596,
        "Private Client and Private Banking users": 758,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1378,
        "Total": 54109
    },
    {
        "Date": "01/06/12",
        "Personal users": 49304,
        "Corporate users": 1942,
        "Club users": 596,
        "Private Client and Private Banking users": 758,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1378,
        "Total": 54107
    },
    {
        "Date": "08/06/12",
        "Personal users": 49538,
        "Corporate users": 1947,
        "Club users": 597,
        "Private Client and Private Banking users": 764,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1383,
        "Total": 54359
    },
    {
        "Date": "15/06/12",
        "Personal users": 49794,
        "Corporate users": 1959,
        "Club users": 597,
        "Private Client and Private Banking users": 771,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1386,
        "Total": 54637
    },
    {
        "Date": "22/06/12",
        "Personal users": 50084,
        "Corporate users": 1968,
        "Club users": 597,
        "Private Client and Private Banking users": 776,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1391,
        "Total": 54946
    },
    {
        "Date": "29/06/12",
        "Personal users": 50343,
        "Corporate users": 1998,
        "Club users": 599,
        "Private Client and Private Banking users": 780,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1392,
        "Total": 55242
    },
    {
        "Date": "30/6/12",
        "Personal users": 50653,
        "Corporate users": 2032,
        "Club users": 599,
        "Private Client and Private Banking users": 784,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1397,
        "Total": 55595
    },
    {
        "Date": "06/07/12",
        "Personal users": 50651,
        "Corporate users": 2032,
        "Club users": 599,
        "Private Client and Private Banking users": 784,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1397,
        "Total": 55593
    },
    {
        "Date": "13/07/12",
        "Personal users": 50862,
        "Corporate users": 2036,
        "Club users": 600,
        "Private Client and Private Banking users": 790,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1402,
        "Total": 55820
    },
    {
        "Date": "20/07/12",
        "Personal users": 51166,
        "Corporate users": 2046,
        "Club users": 604,
        "Private Client and Private Banking users": 796,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1405,
        "Total": 56147
    },
    {
        "Date": "27/07/12",
        "Personal users": 51433,
        "Corporate users": 2066,
        "Club users": 607,
        "Private Client and Private Banking users": 805,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1408,
        "Total": 56449
    },
    {
        "Date": "31/7/12",
        "Personal users": 51718,
        "Corporate users": 2064,
        "Club users": 610,
        "Private Client and Private Banking users": 809,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1413,
        "Total": 56744
    },
    {
        "Date": "03/08/12",
        "Personal users": 51719,
        "Corporate users": 2064,
        "Club users": 610,
        "Private Client and Private Banking users": 809,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1413,
        "Total": 56745
    },
    {
        "Date": "10/08/12",
        "Personal users": 51984,
        "Corporate users": 2084,
        "Club users": 610,
        "Private Client and Private Banking users": 816,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1413,
        "Total": 57037
    },
    {
        "Date": "17/08/12",
        "Personal users": 52258,
        "Corporate users": 2090,
        "Club users": 610,
        "Private Client and Private Banking users": 828,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1417,
        "Total": 57335
    },
    {
        "Date": "24/08/12",
        "Personal users": 52528,
        "Corporate users": 2112,
        "Club users": 611,
        "Private Client and Private Banking users": 833,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1424,
        "Total": 57640
    },
    {
        "Date": "31/08/12",
        "Personal users": 52778,
        "Corporate users": 2116,
        "Club users": 612,
        "Private Client and Private Banking users": 836,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1426,
        "Total": 57900
    },
    {
        "Date": "31/8/12",
        "Personal users": 53018,
        "Corporate users": 2128,
        "Club users": 615,
        "Private Client and Private Banking users": 841,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1427,
        "Total": 58161
    },
    {
        "Date": "07/09/12",
        "Personal users": 53016,
        "Corporate users": 2128,
        "Club users": 615,
        "Private Client and Private Banking users": 841,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1427,
        "Total": 58159
    },
    {
        "Date": "14/09/12",
        "Personal users": 53344,
        "Corporate users": 2136,
        "Club users": 615,
        "Private Client and Private Banking users": 847,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1431,
        "Total": 58506
    },
    {
        "Date": "21/09/12",
        "Personal users": 53577,
        "Corporate users": 2159,
        "Club users": 616,
        "Private Client and Private Banking users": 846,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1434,
        "Total": 58765
    },
    {
        "Date": "28/09/12",
        "Personal users": 53830,
        "Corporate users": 2172,
        "Club users": 620,
        "Private Client and Private Banking users": 849,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1439,
        "Total": 59043
    },
    {
        "Date": "30/9/12",
        "Personal users": 54158,
        "Corporate users": 2175,
        "Club users": 622,
        "Private Client and Private Banking users": 853,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1440,
        "Total": 59381
    },
    {
        "Date": "05/10/12",
        "Personal users": 54154,
        "Corporate users": 2175,
        "Club users": 622,
        "Private Client and Private Banking users": 853,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1440,
        "Total": 59377
    },
    {
        "Date": "12/10/12",
        "Personal users": 54397,
        "Corporate users": 2172,
        "Club users": 621,
        "Private Client and Private Banking users": 851,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1441,
        "Total": 59615
    },
    {
        "Date": "19/10/12",
        "Personal users": 54668,
        "Corporate users": 2173,
        "Club users": 623,
        "Private Client and Private Banking users": 855,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1443,
        "Total": 59889
    },
    {
        "Date": "26/10/12",
        "Personal users": 54963,
        "Corporate users": 2187,
        "Club users": 622,
        "Private Client and Private Banking users": 861,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1447,
        "Total": 60207
    },
    {
        "Date": "30/10/12",
        "Personal users": 55257,
        "Corporate users": 2189,
        "Club users": 622,
        "Private Client and Private Banking users": 870,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1449,
        "Total": 60514
    },
    {
        "Date": "02/11/12",
        "Personal users": 55257,
        "Corporate users": 2189,
        "Club users": 622,
        "Private Client and Private Banking users": 870,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1449,
        "Total": 60514
    },
    {
        "Date": "09/11/12",
        "Personal users": 55517,
        "Corporate users": 2221,
        "Club users": 626,
        "Private Client and Private Banking users": 872,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1450,
        "Total": 60813
    },
    {
        "Date": "16/11/12",
        "Personal users": 55747,
        "Corporate users": 2256,
        "Club users": 626,
        "Private Client and Private Banking users": 875,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1451,
        "Total": 61082
    },
    {
        "Date": "23/11/12",
        "Personal users": 55990,
        "Corporate users": 2262,
        "Club users": 629,
        "Private Client and Private Banking users": 880,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1455,
        "Total": 61343
    },
    {
        "Date": "30/11/12",
        "Personal users": 56275,
        "Corporate users": 2277,
        "Club users": 629,
        "Private Client and Private Banking users": 882,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1458,
        "Total": 61648
    },
    {
        "Date": "30/11/12",
        "Personal users": 56506,
        "Corporate users": 2283,
        "Club users": 630,
        "Private Client and Private Banking users": 885,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1462,
        "Total": 61893
    },
    {
        "Date": "07/12/12",
        "Personal users": 56506,
        "Corporate users": 2283,
        "Club users": 630,
        "Private Client and Private Banking users": 885,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1462,
        "Total": 61893
    },
    {
        "Date": "14/12/12",
        "Personal users": 56701,
        "Corporate users": 2297,
        "Club users": 631,
        "Private Client and Private Banking users": 889,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1463,
        "Total": 62109
    },
    {
        "Date": "21/12/12",
        "Personal users": 56910,
        "Corporate users": 2295,
        "Club users": 632,
        "Private Client and Private Banking users": 890,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1466,
        "Total": 62321
    },
    {
        "Date": "28/12/12",
        "Personal users": 56995,
        "Corporate users": 2272,
        "Club users": 634,
        "Private Client and Private Banking users": 890,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1466,
        "Total": 62385
    },
    {
        "Date": "31/12/12",
        "Personal users": 57195,
        "Corporate users": 2281,
        "Club users": 634,
        "Private Client and Private Banking users": 893,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1468,
        "Total": 62599
    },
    {
        "Date": "04/01/13",
        "Personal users": 57196,
        "Corporate users": 2281,
        "Club users": 634,
        "Private Client and Private Banking users": 893,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1468,
        "Total": 62600
    },
    {
        "Date": "11/01/13",
        "Personal users": 57460,
        "Corporate users": 2289,
        "Club users": 636,
        "Private Client and Private Banking users": 898,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1461,
        "Total": 62872
    },
    {
        "Date": "18/01/13",
        "Personal users": 57679,
        "Corporate users": 2340,
        "Club users": 638,
        "Private Client and Private Banking users": 903,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1368,
        "Total": 63056
    },
    {
        "Date": "25/01/13",
        "Personal users": 57885,
        "Corporate users": 2333,
        "Club users": 638,
        "Private Client and Private Banking users": 905,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1344,
        "Total": 63233
    },
    {
        "Date": "31/1/13",
        "Personal users": 58123,
        "Corporate users": 2341,
        "Club users": 639,
        "Private Client and Private Banking users": 906,
        "Funds Agent users": 126,
        "Funds Shareholder users": 1356,
        "Total": 63491
    },
    {
        "Date": "01/02/13",
        "Personal users": 58123,
        "Corporate users": 2341,
        "Club users": 639,
        "Private Client and Private Banking users": 906,
        "Funds Agent users": 126,
        "Funds Shareholder users": 1356,
        "Total": 63491
    },
    {
        "Date": "08/02/13",
        "Personal users": 58323,
        "Corporate users": 2352,
        "Club users": 640,
        "Private Client and Private Banking users": 909,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1359,
        "Total": 63710
    },
    {
        "Date": "15/02/13",
        "Personal users": 58498,
        "Corporate users": 2367,
        "Club users": 642,
        "Private Client and Private Banking users": 918,
        "Funds Agent users": 127,
        "Funds Shareholder users": 1366,
        "Total": 63918
    },
    {
        "Date": "22/02/13",
        "Personal users": 58701,
        "Corporate users": 2376,
        "Club users": 645,
        "Private Client and Private Banking users": 921,
        "Funds Agent users": 128,
        "Funds Shareholder users": 1368,
        "Total": 64139
    },
    {
        "Date": "28/2/13",
        "Personal users": 58908,
        "Corporate users": 2400,
        "Club users": 646,
        "Private Client and Private Banking users": 920,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1369,
        "Total": 64372
    },
    {
        "Date": "01/03/13",
        "Personal users": 58908,
        "Corporate users": 2400,
        "Club users": 646,
        "Private Client and Private Banking users": 920,
        "Funds Agent users": 129,
        "Funds Shareholder users": 1369,
        "Total": 64372
    },
    {
        "Date": "08/03/13",
        "Personal users": 59086,
        "Corporate users": 2419,
        "Club users": 647,
        "Private Client and Private Banking users": 919,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1340,
        "Total": 64541
    },
    {
        "Date": "15/03/13",
        "Personal users": 59274,
        "Corporate users": 2412,
        "Club users": 648,
        "Private Client and Private Banking users": 920,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1249,
        "Total": 64633
    },
    {
        "Date": "22/03/13",
        "Personal users": 59536,
        "Corporate users": 2395,
        "Club users": 646,
        "Private Client and Private Banking users": 924,
        "Funds Agent users": 130,
        "Funds Shareholder users": 1172,
        "Total": 64803
    },
    {
        "Date": "29/03/13",
        "Personal users": 59732,
        "Corporate users": 2405,
        "Club users": 647,
        "Private Client and Private Banking users": 929,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1167,
        "Total": 65011
    },
    {
        "Date": "31/3/13",
        "Personal users": 59869,
        "Corporate users": 2410,
        "Club users": 647,
        "Private Client and Private Banking users": 929,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1170,
        "Total": 65156
    },
    {
        "Date": "05/04/13",
        "Personal users": 59869,
        "Corporate users": 2410,
        "Club users": 647,
        "Private Client and Private Banking users": 929,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1170,
        "Total": 65156
    },
    {
        "Date": "12/04/13",
        "Personal users": 60053,
        "Corporate users": 2423,
        "Club users": 650,
        "Private Client and Private Banking users": 929,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1171,
        "Total": 65357
    },
    {
        "Date": "19/04/13",
        "Personal users": 60299,
        "Corporate users": 2439,
        "Club users": 652,
        "Private Client and Private Banking users": 933,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1177,
        "Total": 65631
    },
    {
        "Date": "26/04/13",
        "Personal users": 60486,
        "Corporate users": 2448,
        "Club users": 653,
        "Private Client and Private Banking users": 939,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1177,
        "Total": 65834
    },
    {
        "Date": "30/4/13",
        "Personal users": 60691,
        "Corporate users": 2466,
        "Club users": 654,
        "Private Client and Private Banking users": 947,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1181,
        "Total": 66070
    },
    {
        "Date": "03/05/13",
        "Personal users": 60691,
        "Corporate users": 2466,
        "Club users": 654,
        "Private Client and Private Banking users": 947,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1181,
        "Total": 66070
    },
    {
        "Date": "10/05/13",
        "Personal users": 60913,
        "Corporate users": 2472,
        "Club users": 655,
        "Private Client and Private Banking users": 951,
        "Funds Agent users": 131,
        "Funds Shareholder users": 1186,
        "Total": 66308
    },
    {
        "Date": "17/05/13",
        "Personal users": 61139,
        "Corporate users": 2493,
        "Club users": 655,
        "Private Client and Private Banking users": 948,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1188,
        "Total": 66556
    },
    {
        "Date": "24/05/13",
        "Personal users": 61272,
        "Corporate users": 2520,
        "Club users": 657,
        "Private Client and Private Banking users": 953,
        "Funds Agent users": 132,
        "Funds Shareholder users": 1190,
        "Total": 66724
    },
    {
        "Date": "31/05/13",
        "Personal users": 61440,
        "Corporate users": 2527,
        "Club users": 658,
        "Private Client and Private Banking users": 952,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1193,
        "Total": 66903
    },
    {
        "Date": "30/5/13",
        "Personal users": 61637,
        "Corporate users": 2527,
        "Club users": 659,
        "Private Client and Private Banking users": 958,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1203,
        "Total": 67117
    },
    {
        "Date": "07/06/13",
        "Personal users": 61637,
        "Corporate users": 2527,
        "Club users": 659,
        "Private Client and Private Banking users": 958,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1203,
        "Total": 67117
    },
    {
        "Date": "14/06/13",
        "Personal users": 61822,
        "Corporate users": 2559,
        "Club users": 658,
        "Private Client and Private Banking users": 962,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1206,
        "Total": 67340
    },
    {
        "Date": "21/06/13",
        "Personal users": 62001,
        "Corporate users": 2569,
        "Club users": 658,
        "Private Client and Private Banking users": 967,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1209,
        "Total": 67537
    },
    {
        "Date": "28/06/13",
        "Personal users": 62201,
        "Corporate users": 2572,
        "Club users": 660,
        "Private Client and Private Banking users": 967,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1213,
        "Total": 67746
    },
    {
        "Date": "30/6/13",
        "Personal users": 62419,
        "Corporate users": 2581,
        "Club users": 660,
        "Private Client and Private Banking users": 971,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1215,
        "Total": 67979
    },
    {
        "Date": "05/07/13",
        "Personal users": 62419,
        "Corporate users": 2581,
        "Club users": 660,
        "Private Client and Private Banking users": 971,
        "Funds Agent users": 133,
        "Funds Shareholder users": 1215,
        "Total": 67979
    },
    {
        "Date": "12/07/13",
        "Personal users": 62553,
        "Corporate users": 2578,
        "Club users": 662,
        "Private Client and Private Banking users": 977,
        "Funds Agent users": 134,
        "Funds Shareholder users": 1219,
        "Total": 68123
    },
    {
        "Date": "19/07/13",
        "Personal users": 62696,
        "Corporate users": 2603,
        "Club users": 663,
        "Private Client and Private Banking users": 978,
        "Funds Agent users": 134,
        "Funds Shareholder users": 1224,
        "Total": 68298
    },
    {
        "Date": "26/07/13",
        "Personal users": 62845,
        "Corporate users": 2611,
        "Club users": 662,
        "Private Client and Private Banking users": 979,
        "Funds Agent users": 135,
        "Funds Shareholder users": 1229,
        "Total": 68461
    },
    {
        "Date": "31 jun 13",
        "Personal users": 63041,
        "Corporate users": 2633,
        "Club users": 662,
        "Private Client and Private Banking users": 981,
        "Funds Agent users": 135,
        "Funds Shareholder users": 1238,
        "Total": 68690
    },
    {
        "Date": "02/08/13",
        "Personal users": 63040,
        "Corporate users": 2633,
        "Club users": 662,
        "Private Client and Private Banking users": 981,
        "Funds Agent users": 135,
        "Funds Shareholder users": 1238,
        "Total": 68689
    },
    {
        "Date": "09/08/13",
        "Personal users": 63228,
        "Corporate users": 2641,
        "Club users": 663,
        "Private Client and Private Banking users": 986,
        "Funds Agent users": 135,
        "Funds Shareholder users": 1240,
        "Total": 68893
    },
    {
        "Date": "16/08/13",
        "Personal users": 63393,
        "Corporate users": 2651,
        "Club users": 664,
        "Private Client and Private Banking users": 989,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1240,
        "Total": 69073
    },
    {
        "Date": "23/08/13",
        "Personal users": 63564,
        "Corporate users": 2653,
        "Club users": 665,
        "Private Client and Private Banking users": 992,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1243,
        "Total": 69253
    },
    {
        "Date": "30/08/13",
        "Personal users": 63705,
        "Corporate users": 2659,
        "Club users": 667,
        "Private Client and Private Banking users": 993,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1243,
        "Total": 69403
    },
    {
        "Date": "31/8/13",
        "Personal users": 63862,
        "Corporate users": 2667,
        "Club users": 667,
        "Private Client and Private Banking users": 996,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1248,
        "Total": 69576
    },
    {
        "Date": "06/09/13",
        "Personal users": 63862,
        "Corporate users": 2667,
        "Club users": 667,
        "Private Client and Private Banking users": 996,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1248,
        "Total": 69576
    },
    {
        "Date": "13/09/13",
        "Personal users": 64067,
        "Corporate users": 2689,
        "Club users": 667,
        "Private Client and Private Banking users": 999,
        "Funds Agent users": 136,
        "Funds Shareholder users": 1250,
        "Total": 69808
    },
    {
        "Date": "20/09/13",
        "Personal users": 64227,
        "Corporate users": 2702,
        "Club users": 669,
        "Private Client and Private Banking users": 1001,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1256,
        "Total": 69992
    },
    {
        "Date": "27/09/13",
        "Personal users": 64412,
        "Corporate users": 2707,
        "Club users": 671,
        "Private Client and Private Banking users": 1003,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1260,
        "Total": 70190
    },
    {
        "Date": "30/9/13",
        "Personal users": 64620,
        "Corporate users": 2730,
        "Club users": 672,
        "Private Client and Private Banking users": 1004,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1265,
        "Total": 70428
    },
    {
        "Date": "04/10/13",
        "Personal users": 64611,
        "Corporate users": 2726,
        "Club users": 672,
        "Private Client and Private Banking users": 1004,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1265,
        "Total": 70415
    },
    {
        "Date": "11/10/13",
        "Personal users": 64759,
        "Corporate users": 2732,
        "Club users": 673,
        "Private Client and Private Banking users": 1006,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1269,
        "Total": 70576
    },
    {
        "Date": "18/10/13",
        "Personal users": 64902,
        "Corporate users": 2726,
        "Club users": 675,
        "Private Client and Private Banking users": 1012,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1278,
        "Total": 70730
    },
    {
        "Date": "25/10/13",
        "Personal users": 65071,
        "Corporate users": 2735,
        "Club users": 675,
        "Private Client and Private Banking users": 1014,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1278,
        "Total": 70910
    },
    {
        "Date": "31/10/13",
        "Personal users": 65265,
        "Corporate users": 2745,
        "Club users": 675,
        "Private Client and Private Banking users": 1020,
        "Funds Agent users": 138,
        "Funds Shareholder users": 1278,
        "Total": 71121
    },
    {
        "Date": "01/11/13",
        "Personal users": 65265,
        "Corporate users": 2745,
        "Club users": 675,
        "Private Client and Private Banking users": 1020,
        "Funds Agent users": 138,
        "Funds Shareholder users": 1278,
        "Total": 71121
    },
    {
        "Date": "08/11/13",
        "Personal users": 65387,
        "Corporate users": 2756,
        "Club users": 675,
        "Private Client and Private Banking users": 1026,
        "Funds Agent users": 138,
        "Funds Shareholder users": 1278,
        "Total": 71260
    },
    {
        "Date": "15/11/13",
        "Personal users": 65549,
        "Corporate users": 2757,
        "Club users": 676,
        "Private Client and Private Banking users": 1024,
        "Funds Agent users": 138,
        "Funds Shareholder users": 1283,
        "Total": 71427
    },
    {
        "Date": "22/11/13",
        "Personal users": 65693,
        "Corporate users": 2770,
        "Club users": 674,
        "Private Client and Private Banking users": 1023,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1286,
        "Total": 71583
    },
    {
        "Date": "29/11/13",
        "Personal users": 65883,
        "Corporate users": 2783,
        "Club users": 674,
        "Private Client and Private Banking users": 1027,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1291,
        "Total": 71795
    },
    {
        "Date": "30/11/13",
        "Personal users": 66036,
        "Corporate users": 2771,
        "Club users": 675,
        "Private Client and Private Banking users": 1025,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1293,
        "Total": 71937
    },
    {
        "Date": "06/12/13",
        "Personal users": 66036,
        "Corporate users": 2771,
        "Club users": 675,
        "Private Client and Private Banking users": 1025,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1293,
        "Total": 71937
    },
    {
        "Date": "13/12/13",
        "Personal users": 66176,
        "Corporate users": 2779,
        "Club users": 676,
        "Private Client and Private Banking users": 1025,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1298,
        "Total": 72091
    },
    {
        "Date": "20/12/13",
        "Personal users": 66297,
        "Corporate users": 2809,
        "Club users": 679,
        "Private Client and Private Banking users": 1028,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1299,
        "Total": 72249
    },
    {
        "Date": "27/12/13",
        "Personal users": 66352,
        "Corporate users": 2819,
        "Club users": 678,
        "Private Client and Private Banking users": 1030,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1299,
        "Total": 72315
    },
    {
        "Date": "31/12/13",
        "Personal users": 66455,
        "Corporate users": 2837,
        "Club users": 679,
        "Private Client and Private Banking users": 1030,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1299,
        "Total": 72437
    },
    {
        "Date": "03/01/14",
        "Personal users": 66455,
        "Corporate users": 2837,
        "Club users": 679,
        "Private Client and Private Banking users": 1030,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1299,
        "Total": 72437
    },
    {
        "Date": "10/01/14",
        "Personal users": 66641,
        "Corporate users": 2858,
        "Club users": 680,
        "Private Client and Private Banking users": 1033,
        "Funds Agent users": 137,
        "Funds Shareholder users": 1303,
        "Total": 72652
    },
    {
        "Date": "17/01/14",
        "Personal users": 66821,
        "Corporate users": 2875,
        "Club users": 681,
        "Private Client and Private Banking users": 1031,
        "Funds Agent users": 138,
        "Funds Shareholder users": 1287,
        "Total": 72833
    },
    {
        "Date": "24/01/14",
        "Personal users": 66999,
        "Corporate users": 2904,
        "Club users": 683,
        "Private Client and Private Banking users": 1042,
        "Funds Agent users": 139,
        "Funds Shareholder users": 1292,
        "Total": 73059
    },
    {
        "Date": "31/01/14",
        "Personal users": 67155,
        "Corporate users": 2912,
        "Club users": 685,
        "Private Client and Private Banking users": 1045,
        "Funds Agent users": 141,
        "Funds Shareholder users": 1296,
        "Total": 73234
    },
    {
        "Date": "31/1/14",
        "Personal users": 67322,
        "Corporate users": 2927,
        "Club users": 685,
        "Private Client and Private Banking users": 1047,
        "Funds Agent users": 141,
        "Funds Shareholder users": 1289,
        "Total": 73411
    },
    {
        "Date": "07/02/14",
        "Personal users": 67322,
        "Corporate users": 2927,
        "Club users": 685,
        "Private Client and Private Banking users": 1047,
        "Funds Agent users": 141,
        "Funds Shareholder users": 1289,
        "Total": 73411
    },
    {
        "Date": "14/02/14",
        "Personal users": 67487,
        "Corporate users": 2957,
        "Club users": 686,
        "Private Client and Private Banking users": 1048,
        "Funds Agent users": 140,
        "Funds Shareholder users": 1296,
        "Total": 73614
    },
    {
        "Date": "21/02/14",
        "Personal users": 67649,
        "Corporate users": 2969,
        "Club users": 687,
        "Private Client and Private Banking users": 1043,
        "Funds Agent users": 142,
        "Funds Shareholder users": 1296,
        "Total": 73786
    },
    {
        "Date": "28/02/14",
        "Personal users": 67846,
        "Corporate users": 2995,
        "Club users": 687,
        "Private Client and Private Banking users": 1047,
        "Funds Agent users": 144,
        "Funds Shareholder users": 1298,
        "Total": 74017
    },
    {
        "Date": "28/2/14",
        "Personal users": 68005,
        "Corporate users": 2993,
        "Club users": 687,
        "Private Client and Private Banking users": 1049,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1300,
        "Total": 74179
    },
    {
        "Date": "07/03/14",
        "Personal users": 68005,
        "Corporate users": 2993,
        "Club users": 687,
        "Private Client and Private Banking users": 1049,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1300,
        "Total": 74179
    },
    {
        "Date": "14/03/14",
        "Personal users": 68149,
        "Corporate users": 3008,
        "Club users": 686,
        "Private Client and Private Banking users": 1052,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1303,
        "Total": 74343
    },
    {
        "Date": "21/03/14",
        "Personal users": 68295,
        "Corporate users": 3054,
        "Club users": 686,
        "Private Client and Private Banking users": 1051,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1306,
        "Total": 74537
    },
    {
        "Date": "28/03/14",
        "Personal users": 68454,
        "Corporate users": 3056,
        "Club users": 688,
        "Private Client and Private Banking users": 1053,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1308,
        "Total": 74704
    },
    {
        "Date": "31/3/14",
        "Personal users": 68606,
        "Corporate users": 3095,
        "Club users": 689,
        "Private Client and Private Banking users": 1060,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1309,
        "Total": 74904
    },
    {
        "Date": "04/04/14",
        "Personal users": 68606,
        "Corporate users": 3095,
        "Club users": 689,
        "Private Client and Private Banking users": 1060,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1309,
        "Total": 74904
    },
    {
        "Date": "11/04/14",
        "Personal users": 68763,
        "Corporate users": 3109,
        "Club users": 690,
        "Private Client and Private Banking users": 1062,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1310,
        "Total": 75079
    },
    {
        "Date": "18/04/14",
        "Personal users": 68904,
        "Corporate users": 3093,
        "Club users": 692,
        "Private Client and Private Banking users": 1069,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1312,
        "Total": 75215
    },
    {
        "Date": "25/04/14",
        "Personal users": 69040,
        "Corporate users": 3122,
        "Club users": 693,
        "Private Client and Private Banking users": 1070,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1315,
        "Total": 75385
    },
    {
        "Date": "30/4/14",
        "Personal users": 69216,
        "Corporate users": 3134,
        "Club users": 694,
        "Private Client and Private Banking users": 1071,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1315,
        "Total": 75575
    },
    {
        "Date": "02/05/14",
        "Personal users": 69215,
        "Corporate users": 3134,
        "Club users": 694,
        "Private Client and Private Banking users": 1071,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1315,
        "Total": 75574
    },
    {
        "Date": "09/05/14",
        "Personal users": 69349,
        "Corporate users": 3135,
        "Club users": 689,
        "Private Client and Private Banking users": 1072,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1317,
        "Total": 75707
    },
    {
        "Date": "16/05/14",
        "Personal users": 69507,
        "Corporate users": 3155,
        "Club users": 691,
        "Private Client and Private Banking users": 1075,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1317,
        "Total": 75890
    },
    {
        "Date": "23/05/14",
        "Personal users": 69650,
        "Corporate users": 3152,
        "Club users": 691,
        "Private Client and Private Banking users": 1074,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1320,
        "Total": 76032
    },
    {
        "Date": "30/05/14",
        "Personal users": 69802,
        "Corporate users": 3176,
        "Club users": 691,
        "Private Client and Private Banking users": 1077,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1321,
        "Total": 76212
    },
    {
        "Date": "31/5/14",
        "Personal users": 69953,
        "Corporate users": 3175,
        "Club users": 692,
        "Private Client and Private Banking users": 1078,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1291,
        "Total": 76334
    },
    {
        "Date": "06/06/14",
        "Personal users": 69953,
        "Corporate users": 3175,
        "Club users": 692,
        "Private Client and Private Banking users": 1078,
        "Funds Agent users": 145,
        "Funds Shareholder users": 1291,
        "Total": 76334
    },
    {
        "Date": "13/06/14",
        "Personal users": 70089,
        "Corporate users": 3230,
        "Club users": 693,
        "Private Client and Private Banking users": 1078,
        "Funds Agent users": 146,
        "Funds Shareholder users": 1036,
        "Total": 76272
    },
    {
        "Date": "20/06/14",
        "Personal users": 70215,
        "Corporate users": 3262,
        "Club users": 694,
        "Private Client and Private Banking users": 1080,
        "Funds Agent users": 147,
        "Funds Shareholder users": 932,
        "Total": 76330
    },
    {
        "Date": "27/06/14",
        "Personal users": 70346,
        "Corporate users": 3280,
        "Club users": 694,
        "Private Client and Private Banking users": 1080,
        "Funds Agent users": 147,
        "Funds Shareholder users": 928,
        "Total": 76475
    },
    {
        "Date": "30/6/14",
        "Personal users": 70473,
        "Corporate users": 3308,
        "Club users": 696,
        "Private Client and Private Banking users": 1082,
        "Funds Agent users": 147,
        "Funds Shareholder users": 930,
        "Total": 76636
    },
    {
        "Date": "04/07/14",
        "Personal users": 70473,
        "Corporate users": 3308,
        "Club users": 696,
        "Private Client and Private Banking users": 1082,
        "Funds Agent users": 147,
        "Funds Shareholder users": 930,
        "Total": 76636
    },
    {
        "Date": "11/07/14",
        "Personal users": 70635,
        "Corporate users": 3329,
        "Club users": 696,
        "Private Client and Private Banking users": 1083,
        "Funds Agent users": 149,
        "Funds Shareholder users": 933,
        "Total": 76825
    },
    {
        "Date": "18/07/14",
        "Personal users": 70775,
        "Corporate users": 3357,
        "Club users": 699,
        "Private Client and Private Banking users": 1086,
        "Funds Agent users": 149,
        "Funds Shareholder users": 936,
        "Total": 77002
    },
    {
        "Date": "25/07/14",
        "Personal users": 70939,
        "Corporate users": 3341,
        "Club users": 700,
        "Private Client and Private Banking users": 1082,
        "Funds Agent users": 149,
        "Funds Shareholder users": 936,
        "Total": 77147
    },
    {
        "Date": "31/7/14",
        "Personal users": 71120,
        "Corporate users": 3353,
        "Club users": 700,
        "Private Client and Private Banking users": 1082,
        "Funds Agent users": 149,
        "Funds Shareholder users": 855,
        "Total": 77259
    },
    {
        "Date": "01/08/14",
        "Personal users": 71120,
        "Corporate users": 3353,
        "Club users": 700,
        "Private Client and Private Banking users": 1082,
        "Funds Agent users": 149,
        "Funds Shareholder users": 855,
        "Total": 77259
    },
    {
        "Date": "08/08/14",
        "Personal users": 71263,
        "Corporate users": 3382,
        "Club users": 700,
        "Private Client and Private Banking users": 1083,
        "Funds Agent users": 149,
        "Funds Shareholder users": 857,
        "Total": 77434
    },
    {
        "Date": "15/08/14",
        "Personal users": 71405,
        "Corporate users": 3404,
        "Club users": 700,
        "Private Client and Private Banking users": 1085,
        "Funds Agent users": 149,
        "Funds Shareholder users": 861,
        "Total": 77604
    },
    {
        "Date": "22/08/14",
        "Personal users": 71539,
        "Corporate users": 3412,
        "Club users": 700,
        "Private Client and Private Banking users": 1084,
        "Funds Agent users": 149,
        "Funds Shareholder users": 869,
        "Total": 77753
    },
    {
        "Date": "29/08/14",
        "Personal users": 71705,
        "Corporate users": 3419,
        "Club users": 700,
        "Private Client and Private Banking users": 1087,
        "Funds Agent users": 149,
        "Funds Shareholder users": 870,
        "Total": 77930
    },
    {
        "Date": "31/8/14",
        "Personal users": 71862,
        "Corporate users": 3449,
        "Club users": 700,
        "Private Client and Private Banking users": 1089,
        "Funds Agent users": 149,
        "Funds Shareholder users": 873,
        "Total": 78122
    },
    {
        "Date": "05/09/14",
        "Personal users": 71862,
        "Corporate users": 3449,
        "Club users": 700,
        "Private Client and Private Banking users": 1089,
        "Funds Agent users": 149,
        "Funds Shareholder users": 873,
        "Total": 78122
    },
    {
        "Date": "12/09/14",
        "Personal users": 72001,
        "Corporate users": 3456,
        "Club users": 700,
        "Private Client and Private Banking users": 1089,
        "Funds Agent users": 149,
        "Funds Shareholder users": 829,
        "Total": 78224
    }];