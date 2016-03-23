
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

// });







//announce variables
var logsS=true;//switch of log-scale    true:log2 scale,  false:normal scale
var fnames=[];
//var ages=[{'age':"~10"},{'age':"11~20"},{'age':"21~30"},{'age':"31~40"},{'age':"41~50"},{'age':"51~60"},{'age':"61~70"},{'age':"71~80"},{'age':"81~90"},{'age':"91~"}];
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


  var animDuration=1000, tCount=0, timer=setInterval(tupdate,animDuration);
  showTitle(1);
  function tupdate(){
    if(tCount>=7) return clearInterval(timer);

    switch(tCount){
      case 0:
           showTitle(2); 
           break; 
      case 2:
           showTitle(3); 
           break;
      case 3:
           showTitle(4); 
           break;
      case 4:
           showTitle(5); 
           break;
      case 5:
           showTitle(99); //all gray lines
           break;
      case 6:
           
           drawChart();
           drawColorBar();
           break;
      default:

    }
    tCount++;
  }


 
}
function genEmptyArr(n){//generate an empty array by a given size 
    var arr=[];
    for (var i=0;i<n;i++){
        arr.push([]);
    }
    return arr;
}


var colorPalette1=["rgb(39,6,144)","rgb(77,23,152)","rgb(121,48,159)","rgb(135,57,160)","rgb(162,74,158)","rgb(188,93,151)","rgb(212,114,138)","rgb(232,135,118","rgb(249, 160, 88)","rgb(255, 187, 78)"];
var margin = {top: 100, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 660 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 1.0);

var y = d3.scale.linear()
      .range([height, 0]);
function showTitle(showLineNr){
  
  $("#chart1").html("");

  var svg = d3.select("#chart1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  x.domain(years.map(function(d) { return d; }));
  y.domain([nmod(180), nmod(30000)]);
  
  svg.append("text")
    .attr('id','title')
    .attr('x',160)
    .attr('y',250)
    .attr('class','font_style_1stTitle')
    .text('2006~2009 Deaths Count');
  svg.append("text")
    .attr('id','ageLabel1')
    .attr('x',360)
    .attr('y',550)
    .attr('class','font_style_1stAnnotation')
    .text(ages[showLineNr]);  
   

  // Define the line
  var valueline = d3.svg.line()
    .x(function(d) { return x(d.yr); })
    .y(function(d) { return y(nmod(d.val)); });    

  for(var i=0;i<ages.length;i++){
    // Add the valueline path.
    svg.append("path")
        .attr('id','p_'+i.toString())
        .attr("class","thepath")
        .attr({
          'd': valueline(valsMalByAge[i]),
          'y': 0,
          'stroke': (i==showLineNr?colorPalette1[i]:'gray'),
          'stroke-opacity': 1.0,
        });
 
    // Add the scatterplot
    svg.selectAll("dot")
        .data(valsMalByAge[i])
      .enter().append("rect")
        .attr('id','d_'+i.toString())
        .attr('class','thedot')
        .style("fill", (i==showLineNr?colorPalette1[i]:'gray'))
        .attr("x", function(d) { return x(d.yr)-5; })
        .attr("y", function(d) { return y(nmod(d.val))-5; })
        .attr("width",10)
        .attr("height",10);
       
  } 

  for(var i=0;i<ages.length;i++){
    // Add the valueline path.
    svg.append("path")
        .attr('id','p_'+i.toString())
        .attr("class","thepath")
        .attr({
          'd': valueline(valsFMalByAge[i]),
          'y': 0,
          'stroke': (i==showLineNr?colorPalette1[i]:'gray'),
          'stroke-opacity': 1.0,
        });

    // Add the scatterplot
    svg.selectAll("dot")
        .data(valsFMalByAge[i])
      .enter().append("circle")
        .attr('id','d_'+i.toString())
        .attr('class','thedot')
        .style("fill", (i==showLineNr?colorPalette1[i]:'gray'))
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.yr); })
        .attr("cy", function(d) { return y(nmod(d.val)); });
  }
  var selectthepath = $('.thepath').not('#p_'+showLineNr);
  d3.selectAll(selectthepath)
            .style("opacity",0.2);
  var selectthedot = $('.thedot').not('#d_'+showLineNr);
  d3.selectAll(selectthedot)
            .style("opacity",0.2);




}




function drawChart(){
  $("#chart1").html("");
  
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
        .attr("y", 20)
        .attr("x",width-35)
        .text("Year");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x",10)
      .style("text-anchor", "end")
      .text("Number of deaths [log2] ");
  svg.append("text")
      .attr('id','ageLabel')
      .attr('x',width-100)
      .attr('y',height-200)
      .text('');  
  
  svg.selectAll('text')
    .attr('class','font_style_num');


  svg.append("text")
    .attr('id','title')
    .attr('x',290)
    .attr('y',10)
    .attr('class','font_style_title')
    .text('2006~2009 Deaths Count');

   

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
          'stroke-opacity': 1.0,
        }).on('mouseover',function(d){
          //console.log(d)//undefined
          //console.log(this.id)
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(transiTime)
            //.style({"stroke-opacity":0.2,"stroke":'gray'});
            .style("opacity",0.2);
          d3.selectAll('#'+this.id)
            .transition().duration(transiTime)
            .style("opacity",1.0);
          //console.log(ages[parseInt(this.id.slice(2,this.id.length))]);
          d3.selectAll('#ageLabel').attr('class','annotation').text('age: '+ages[parseInt(this.id.slice(2,this.id.length))]);
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(transiTime)
            //.style({"opacity":0.2,"fill":'gray'});
            .style("opacity",0.2);
          d3.selectAll('#d'+this.id.slice(1,this.id.length))
            .transition().duration(transiTime)
            .style("opacity",1.0);
            
        } )
        .on('mouseout',function(){
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(4000)
            .style("opacity",function(d,i){return 1.0;});
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(4000)
            .style("opacity",function(d,i){ return 1.0;});
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
          'stroke-opacity': 1.0,
        })
        .on('mouseover',function(){ 
          //console.log(this.id);
          var thisID=parseInt(this.id.slice(2,this.id.length));
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition().duration(transiTime)
            //.style({"stroke-opacity":0.2,"stroke":'gray'});
            .style("opacity",0.2);
          d3.selectAll('#'+this.id)
            .transition().duration(transiTime)
             .style("opacity",1.0);

          d3.select('#ageLabel').attr('class','annotation').text('age: '+ages[thisID]);

          //console.log(ages[parseInt(this.id.slice(2,this.id.length))]);

          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition().duration(transiTime)
            //.style({"opacity":0.2,"fill":'gray'});
            .style("opacity",0.2);
          d3.selectAll('#d'+this.id.slice(1,this.id.length))
            .transition().duration(transiTime)
            .style("opacity",1.0);
          
        } )
        .on('mouseout',function(){
          var selectthepath = $('.thepath').not(this);
          d3.selectAll(selectthepath)
            .transition()
            .duration(4000)
            .style("opacity",function(d,i){ return 1.0;})
            .call(endAll, function () {
                  //pathColorRecovery();
                  console.log("transition ends path");
            });
            
          var selectthedot = $('.thedot');
          d3.selectAll(selectthedot)
            .transition()
            .duration(4000)
            .style("opacity",function(d,i){ return 1.0;})
            .call(endAll, function () {
                  //dotColorRecovery();
                  console.log("transition ends dot");
            });
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

function dotColorRecovery(){
  for(var i=0;i<ages.length;i++){
    d3.selectAll($('#d_'+i))
        .style("fill",colorPalette1[i]);
  }
}
function pathColorRecovery(){
  for(var i=0;i<ages.length;i++){
    d3.selectAll($('#p_'+i))
      .style("stroke",colorPalette1[i]);   
  }   
}

function nmod(val){
  return (logsS?Math.log(val)/ Math.LN2:val);
}

function endAll (transition, callback) {
    var n;

    if (transition.empty()) {
        callback();
    }
    else {
        n = transition.size();
        transition.each("end", function () {
            n--;
            if (n === 0) {
                callback();
            }
        });
    }
}


