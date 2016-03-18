//file url: "https://cdn.rawgit.com/yyben/Death-Count/master/-w10503091722141437036921-c0120202.csv"
//valMat valMat[year][itemID]
//Interested male_items id:23-43    female_items id:45-65

var dataObj=[], itemNr=0;//dataObj for d3   e.g. [{"yr":"81年","val":1152},{"yr":"82年","val":1155}]
var valMat=[], csvdata=[], items=[] ,male_items=[], female_items=[], years=[];
var valsMaleitem=[], valsFMaleitem=[];
var iMaleID_start=23,MaleID_end=43, iFMaleID_start=45,iFMaleID_end=65;
d3.text("https://gitcdn.xyz/repo/yyben/Death-Count/master/-w10503091722141437036921-c0120202.csv",function(text){
    d3.csv.parseRows(text,function(d,i){//parse every row from csv
        years.push(d[0]);
        csvdata.push(d);
    });
    items=csvdata[1].slice(1,67);
    male_items=csvdata[1].slice(24,45);//store interested items of male death
    female_items=csvdata[1].slice(46,67);
    years=years.slice(2,years.length-1);//filter the noise of data

    for(var idx=2;idx<csvdata.length;idx++){
        valMat.push(csvdata[idx].slice(1,csvdata[idx].length));
    }
    // console.log(csvdata);//NaN  " - "
    // console.log(valMat);
    // console.log(male_items);
    // console.log(years);


    valsMaleitem=genEmptyArr(male_items.length);
    valsFMaleitem=genEmptyArr(female_items.length);

    for(var i=0;i<years.length;i++){
        //console.log(years[i]);
        //console.log(valMat[i][65]);
        for(var itemIdx=0; itemIdx<male_items.length;itemIdx++){
            //console.log(valMat[i][iMaleID_start+itemIdx]);
            valsMaleitem[itemIdx].push(valMat[i][iMaleID_start+itemIdx]);
        }
         for(var itemIdx=0; itemIdx<female_items.length;itemIdx++){
            //console.log(valMat[i][iFMaleID_start+itemIdx]);
            valsFMaleitem[itemIdx].push(valMat[i][iFMaleID_start+itemIdx]);
        }
    }
    //console.log(valsMaleitem);//show male-death count of every item by year
    //console.log(valsFMaleitem);


    for(var i=0;i<years.length;i++){
        dataObj.push({'yr':years[i],'val':parseInt(valsMaleitem[itemNr][i].replace(/,/g,'').trim())});
    }

    console.log(dataObj);
    draw();
});

function genEmptyArr(n){//generate an empty array by a given size 
    var arr=[];
    for (var i=0;i<n;i++){
        arr.push([]);
    }
    return arr;
}







function draw(){
    var valueLabelWidth = 40; // space reserved for value labels (right)
    var barHeight = 20; // height of one bar
    var barLabelWidth = 100; // space reserved for bar labels
    var barLabelPadding = 5; // padding between bar and bar labels (left)
    var gridLabelHeight = 18; // space reserved for gridline labels
    var gridChartOffset = 3; // space between start of grid and first bar
    var maxBarWidth = 420; // width of the bar with the max value
    var data=dataObj;
    // accessor functions 
    var barLabel = function(d) { return d['yr']; };
    var barValue = function(d) { return parseFloat(d['val']); };
     
    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);
    // svg container element
    var chart = d3.select('#chart1').append("svg")
      .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
      .attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight);
    // grid line labels
    var gridContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
    gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);
    // vertical grid lines
    gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#ccc");
    // bar labels
    var labelsContainer = chart.append('g')
      .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
    labelsContainer.selectAll('text').data(data).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(barLabel);
    // bars
    var barsContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
    barsContainer.selectAll("rect").data(data).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand())
      .attr('width', function(d) { return x(barValue(d)); })
      .attr('stroke', 'white')
      .attr('fill', 'steelblue');
    // bar value labels
    barsContainer.selectAll("text").data(data).enter().append("text")
      .attr("x", function(d) { return x(barValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".35em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("stroke", "none")
      .text(function(d) { return d3.round(barValue(d), 2); });
    // start line
    barsContainer.append("line")
      .attr("y1", -gridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#000");


}
