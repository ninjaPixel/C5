colors = ['#c7eae5','rgb(140,81,10)','rgb(191,129,45)','rgb(223,194,125)','#35978f'];

var getEnhanceData = function () {
    var enhanceData = [
        {
            "date": "2014-03-31",
            "name": "Cash Benchmark",
            "annualisedPerformance": 0.10,
            "risk": 0.00,
            "maxDrawdown": -0.00
  },
        {
            "date": "2014-03-31",
            "name": "Low Risk",
            "annualisedPerformance": 3.00,
            "risk": 4.00,
            "maxDrawdown": -3.00
  },
        {
            "date": "2014-03-31",
            "name": "Medium Risk",
            "annualisedPerformance": 3.7,
            "risk": 7,
            "maxDrawdown": -7.00
  },
        {
            "date": "2014-03-31",
            "name": "High Risk",
            "annualisedPerformance": 5.70,
            "risk": 10.50,
            "maxDrawdown": -10.50
  },
        {
            "date": "2014-03-31",
            "name": "Equity Benchmark",
            "annualisedPerformance": 7.60,
            "risk": 14.10,
            "maxDrawdown": -12.00
  }
];
    
    for(var i=0; i < enhanceData.length; i++){
     enhanceData[i].color = colors[i];   
        enhanceData[i].opacity = 0.5;
    }
    return enhanceData;
};

var getEnhanceDataXY = function () {
    var data = getEnhanceData();
    data.forEach(function (d) {
        d.x = d.risk;
        d.y = d.annualisedPerformance;
        d.r = 10;
    });
    return data;
};