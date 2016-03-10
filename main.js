//file url: "https://cdn.rawgit.com/yyben/Death-Count/master/-w10503091722141437036921-c0120202.csv"
//valMat valMat[year][itemID]
//Interested male_items id:23-43    female_items id:45-65
var valMat=[], csvdata=[], items=[] ,male_items=[], female_items=[], years=[];
var iMaleID_start=23,MaleID_end=43, iFMaleID_start=45,iFMaleID_end=65;
d3.text("https://cdn.rawgit.com/yyben/Death-Count/master/-w10503091722141437036921-c0120202.csv",function(text){
    d3.csv.parseRows(text,function(d,i){
        years.push(d[0]);
        csvdata.push(d);
    });
    items=csvdata[1].slice(1,67);
    male_items=csvdata[1].slice(24,45);
    female_items=csvdata[1].slice(46,67);
    years=years.slice(2,years.length-1);

    for(var idx=2;idx<csvdata.length;idx++){
        valMat.push(csvdata[idx].slice(1,csvdata[idx].length));
    }
    console.log(csvdata);//NaN  " - "
    console.log(valMat);
    console.log(male_items);
    console.log(years);
    for(var i=0;i<years.length;i++){
        console.log(years[i]);
        console.log(valMat[i][65]);
    }
});





// Generate a Bates distribution of 10 random variables.
var values = d3.range(1000).map(d3.random.bates(10));

// A formatter for counts.
var formatCount = d3.format(",.0f");

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

// Generate a histogram using twenty uniformly-spaced bins.
var data = d3.layout.histogram()
    .bins(x.ticks(20))
    (values);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("#canvas111").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bar = svg.selectAll(".bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data[0].dx) - 1)
    .attr("height", function(d) { return height - y(d.y); });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", x(data[0].dx) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatCount(d.y); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);