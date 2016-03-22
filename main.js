
// //valMat valMat[year][itemID]
// //Interested male_items id:23-43    female_items id:45-65

// var dataObj=[], itemNr=0;//dataObj for d3   e.g. [{"yr":"81年","val":1152},{"yr":"82年","val":1155}]
// var valMat=[], csvdata=[], items=[] ,male_items=[], female_items=[], years=[];
// var valsMaleitem=[], valsFMaleitem=[];
// var iMaleID_start=23,MaleID_end=43, iFMaleID_start=45,iFMaleID_end=65;
// d3.text("https://gitcdn.xyz/repo/yyben/Death-Count/master/-w10503091722141437036921-c0120202.csv",function(text){
//     d3.csv.parseRows(text,function(d,i){//parse every row from csv
//         years.push(d[0]);
//         csvdata.push(d);
//     });
//     items=csvdata[1].slice(1,67);
//     male_items=csvdata[1].slice(24,45);//store interested items of male death
//     female_items=csvdata[1].slice(46,67);
//     years=years.slice(2,years.length-1);//filter the noise of data

//     for(var idx=2;idx<csvdata.length;idx++){
//         valMat.push(csvdata[idx].slice(1,csvdata[idx].length));
//     }
//     // console.log(csvdata);//NaN  " - "
//     // console.log(valMat);
//     // console.log(male_items);
//     // console.log(years);


//     valsMaleitem=genEmptyArr(male_items.length);
//     valsFMaleitem=genEmptyArr(female_items.length);

//     for(var i=0;i<years.length;i++){
//         //console.log(years[i]);
//         //console.log(valMat[i][65]);
//         for(var itemIdx=0; itemIdx<male_items.length;itemIdx++){
//             //console.log(valMat[i][iMaleID_start+itemIdx]);
//             valsMaleitem[itemIdx].push(valMat[i][iMaleID_start+itemIdx]);
//         }
//          for(var itemIdx=0; itemIdx<female_items.length;itemIdx++){
//             //console.log(valMat[i][iFMaleID_start+itemIdx]);
//             valsFMaleitem[itemIdx].push(valMat[i][iFMaleID_start+itemIdx]);
//         }
//     }
//     //console.log(valsMaleitem);//show male-death count of every item by year
//     //console.log(valsFMaleitem);


//     for(var i=0;i<years.length;i++){
//         dataObj.push({'yr':years[i],'val':parseInt(valsMaleitem[itemNr][i].replace(/,/g,'').trim())});
//     }

//     console.log(dataObj);
//     draw();
// });


// function draw(){
//     var valueLabelWidth = 40; // space reserved for value labels (right)
//     var barHeight = 20; // height of one bar
//     var barLabelWidth = 100; // space reserved for bar labels
//     var barLabelPadding = 5; // padding between bar and bar labels (left)
//     var gridLabelHeight = 18; // space reserved for gridline labels
//     var gridChartOffset = 3; // space between start of grid and first bar
//     var maxBarWidth = 420; // width of the bar with the max value
//     var data=dataObj;
//     // accessor functions 
//     var barLabel = function(d) { return d['yr']; };
//     var barValue = function(d) { return parseFloat(d['val']); };
     
//     // scales
//     var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
//     var y = function(d, i) { return yScale(i); };
//     var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
//     var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);
//     // svg container element
//     var chart = d3.select('#chart1').append("svg")
//       .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
//       .attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight);
//     // grid line labels
//     var gridContainer = chart.append('g')
//       .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
//     gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
//       .attr("x", x)
//       .attr("dy", -3)
//       .attr("text-anchor", "middle")
//       .text(String);
//     // vertical grid lines
//     gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
//       .attr("x1", x)
//       .attr("x2", x)
//       .attr("y1", 0)
//       .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
//       .style("stroke", "#ccc");
//     // bar labels
//     var labelsContainer = chart.append('g')
//       .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
//     labelsContainer.selectAll('text').data(data).enter().append('text')
//       .attr('y', yText)
//       .attr('stroke', 'none')
//       .attr('fill', 'black')
//       .attr("dy", ".35em") // vertical-align: middle
//       .attr('text-anchor', 'end')
//       .text(barLabel);
//     // bars
//     var barsContainer = chart.append('g')
//       .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
//     barsContainer.selectAll("rect").data(data).enter().append("rect")
//       .attr('y', y)
//       .attr('height', yScale.rangeBand())
//       .attr('width', function(d) { return x(barValue(d)); })
//       .attr('stroke', 'white')
//       .attr('fill', 'steelblue');
//     // bar value labels
//     barsContainer.selectAll("text").data(data).enter().append("text")
//       .attr("x", function(d) { return x(barValue(d)); })
//       .attr("y", yText)
//       .attr("dx", 3) // padding-left
//       .attr("dy", ".35em") // vertical-align: middle
//       .attr("text-anchor", "start") // text-align: right
//       .attr("fill", "black")
//       .attr("stroke", "none")
//       .text(function(d) { return d3.round(barValue(d), 2); });
//     // start line
//     barsContainer.append("line")
//       .attr("y1", -gridChartOffset)
//       .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
//       .style("stroke", "#000");


// }





//announce variables
var logsS=true;//switch of log-scale    true:log2 scale,  false:normal scale
var fnames=[];
var ages=[{'age':"~10"},{'age':"11~20"},{'age':"21~30"},{'age':"31~40"},{'age':"41~50"},{'age':"51~60"},{'age':"61~70"},{'age':"71~80"},{'age':"81~90"},{'age':"91~"}];
var ages=["~10","11~20","21~30","31~40","41~50","51~60","61~70","71~80","81~90","91~"], years=[95,96,97,98];

var valsMale=[], valsFMale=[];
var allValsMal=[],allValsFMal=[];
var valsMalByAge=[],valsFMalByAge=[], tmpM=[], tmpFM=[];
var malePathFilter=[true,true,true,true,true,true,true,true,true,true];//male filter by age 
var femalePathFilter=[true,true,true,true,true,true,true,true,true,true];//female filter by age
fnames.push('https://gitcdn.xyz/repo/yyben/Death-Count/master/data/death.95.csv');
fnames.push('https://gitcdn.xyz/repo/yyben/Death-Count/master/data/death.96.csv');
fnames.push('https://gitcdn.xyz/repo/yyben/Death-Count/master/data/death.97.csv');
fnames.push('https://gitcdn.xyz/repo/yyben/Death-Count/master/data/death.98.csv');

queue() //load multiple files
  .defer(d3.csv, fnames[0])
  .defer(d3.csv, fnames[1])
  .defer(d3.csv, fnames[2])
  .defer(d3.csv, fnames[3])
  .await(parseData);

function parseData(error, death95, death96, death97, death98) {
  if(error) { console.log(error); }
  valsMale=genEmptyArr(years.length);
  valsFMale=genEmptyArr(years.length);
  for(var i=0;i<ages.length;i++){
    


    valsMale[0].push({'yr':'95', 'age':ages[i] ,'val':parseInt(death95[i].Male)});
    valsMale[1].push({'yr':'96', 'age':ages[i] ,'val':parseInt(death96[i].Male)});
    valsMale[2].push({'yr':'97', 'age':ages[i] ,'val':parseInt(death97[i].Male)});
    valsMale[3].push({'yr':'98', 'age':ages[i] ,'val':parseInt(death98[i].Male)});
    valsFMale[0].push({'yr':'95', 'age':ages[i] ,'val':parseInt(death95[i].Female)});
    valsFMale[1].push({'yr':'96', 'age':ages[i] ,'val':parseInt(death96[i].Female)});
    valsFMale[2].push({'yr':'97', 'age':ages[i] ,'val':parseInt(death97[i].Female)});
    valsFMale[3].push({'yr':'98', 'age':ages[i] ,'val':parseInt(death98[i].Female)});


    valsMalByAge.push([{'yr':'95', 'age':ages[i] ,'val':parseInt(death95[i].Male)},{'yr':'96', 'age':ages[i] ,'val':parseInt(death96[i].Male)},{'yr':'97', 'age':ages[i] ,'val':parseInt(death97[i].Male)},{'yr':'98', 'age':ages[i] ,'val':parseInt(death98[i].Male)}]);
    valsFMalByAge.push([{'yr':'95', 'age':ages[i] ,'val':parseInt(death95[i].Female)},{'yr':'96', 'age':ages[i] ,'val':parseInt(death96[i].Female)},{'yr':'97', 'age':ages[i] ,'val':parseInt(death97[i].Female)},{'yr':'98', 'age':ages[i] ,'val':parseInt(death98[i].Female)}]);
    

  }


  allValsMal=valsMale[0].concat(valsMale[1],valsMale[2],valsMale[3]);
  allValsFMal=valsFMale[0].concat(valsFMale[1],valsFMale[2],valsFMale[3]);
  //console.log(valsMalByAge);
  //console.log(allValsMal);
  //console.log(allValsFMal);

  drawChart();
}
function genEmptyArr(n){//generate an empty array by a given size 
    var arr=[];
    for (var i=0;i<n;i++){
        arr.push([]);
    }
    return arr;
}

function drawChart(){
  $("#chart1").html("");
  var colorPalette1=["rgb(39,6,144)","rgb(77,23,152)","rgb(121,48,159)","rgb(135,57,160)","rgb(162,74,158)","rgb(188,93,151)","rgb(212,114,138)","rgb(232,135,118","rgb(249, 160, 88)","rgb(255, 187, 78)"];

  var colorPalette2=["#FFF7EC","#FEE8C8","#FDD49E","#FDBB84","#FC8D59","#EF6548","#D7301F","#B30000","#7F0000","#FFFFFF"];

  var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 1.0);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function(d){return d+1911});

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)
      .tickFormat(function(d){return d});

  var svg = d3.select("#chart1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {return "<strong>Number: </strong><span style='color:red'>" + d.val + "</span>"+" , "+"<strong>Age: </strong><span style='color:red'>" + d.age + "</span>"});
  

  x.domain(years.map(function(d) { return d; }));
  y.domain([nmod(180), nmod(30000)]);
  
  svg.call(tip);//for tooltip, infobox



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -5)
        .attr("x",width-35)
        .text("Year");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x",10)
      .style("text-anchor", "end")
      .text("Number of deaths [log2] ");
  svg.append("text")
      .attr('id','ageLabel')
      .attr('x',40)
      .attr('y',20)
      .text('');  

  svg.selectAll('text')
    .attr('class','font_style_num')


  // Define the line
  var valueline = d3.svg.line()
    .x(function(d) { return x(d.yr); })
    .y(function(d) { return y(nmod(d.val)); });    
  var transiTime=500;
  for(var i=0;i<ages.length;i++){
    // Add the valueline path.
    svg.append("path")
        .attr('id','p_'+i.toString())
        .attr("class","thepath")
        .attr({
          'd': valueline(valsMalByAge[i]),
          'y': 0,
          'stroke': colorPalette1[i],
          'stroke-opacity': (malePathFilter[i]?1.0:0.1),
        }).on('mouseover',function(d){
          //console.log(d)//undefined
          //console.log(this.id)
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(transiTime)
            .style("opacity",0.1);
          d3.selectAll('#'+this.id)
            .transition().duration(transiTime)
            .style("opacity",1.0);
          //console.log(ages[parseInt(this.id.slice(2,this.id.length))]);
          d3.selectAll('#ageLabel').text('age: '+ages[parseInt(this.id.slice(2,this.id.length))]);
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(transiTime)
            .style("opacity",0.1);
          d3.selectAll('#d'+this.id.slice(1,this.id.length))
            .transition().duration(transiTime)
            .style("opacity",1.0);

            
        } )
        .on('mouseout',function(){
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(100)
            .style("opacity",1.0);
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(100)
            .style("opacity",1.0);
          d3.selectAll('#ageLabel').text('');
            
           
        });

    // Add the scatterplot
    svg.selectAll("dot")
        .data(valsMalByAge[i])
      .enter().append("rect")
        .attr('id','d_'+i.toString())
        .attr('class','thedot')
        .style("fill", colorPalette1[i])
        .attr("x", function(d) { return x(d.yr)-5; })
        .attr("y", function(d) { return y(nmod(d.val))-5; })
        .attr("width",10)
        .attr("height",10)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);       
  } 

  for(var i=0;i<ages.length;i++){
    // Add the valueline path.
    svg.append("path")
        .attr('id','p_'+i.toString())
        .attr("class","thepath")
        .attr({
          'd': valueline(valsFMalByAge[i]),
          'y': 0,
          'stroke': colorPalette1[i],
          'stroke-opacity': (femalePathFilter[i]?1.0:0.1),
        })
        .on('mouseover',function(){ 
          //console.log(this.id);
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(transiTime)
            .style("opacity",0.1);
          d3.selectAll('#'+this.id)
            .transition().duration(transiTime)
             .style("opacity",1.0);

          d3.select('#ageLabel').text('age: '+ages[parseInt(this.id.slice(2,this.id.length))]);
          //console.log(ages[parseInt(this.id.slice(2,this.id.length))]);

          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(transiTime)
            .style("opacity",0.1);
          d3.selectAll('#d'+this.id.slice(1,this.id.length))
            .transition().duration(transiTime)
            .style("opacity",1.0);
        } )
        .on('mouseout',function(){
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(100)
            .style("opacity",1.0);
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(100)
            .style("opacity",1.0);
          d3.selectAll('#ageLabel').text('');
        });

    // Add the scatterplot
    svg.selectAll("dot")
        .data(valsFMalByAge[i])
      .enter().append("circle")
        .attr('id','d_'+i.toString())
        .attr('class','thedot')
        .style("fill", colorPalette1[i])
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.yr); })
        .attr("cy", function(d) { return y(nmod(d.val)); })
        .on('mouseover',  tip.show)
        .on('mouseout',  tip.hide);    
  }      
}



function nmod(val){
  return (logsS?Math.log(val)/ Math.LN2:val);
}

$(document).ready(function(){


});

