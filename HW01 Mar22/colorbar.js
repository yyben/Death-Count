
	var data=[1,2,3,4,5,6,7,8,9,10];
	 // d3.text("https://cdn.rawgit.com/yyben/Death-Count/master/data/death.95.csv",function(text){
	 	//d3.csv.parseRows(text, function(d,i){
	  		//console.log(d);
	  	//	if(i>0)
	  	//		data.push(parseInt(d[2]));
	 	//});
	 	//console.log(data)
 	var colorPalette1=["rgb(39,6,144)","rgb(77,23,152)","rgb(121,48,159)","rgb(135,57,160)","rgb(162,74,158)","rgb(188,93,151)","rgb(212,114,138)","rgb(232,135,118","rgb(249, 160, 88)","rgb(255, 187, 78)"];

 	var svg1 = d3.select("body").append("div")
        .append("svg").attr("width", 960).attr("height", 300);
        svg1.selectAll("rect").data(data).enter().append("rect")
		.attr("x", function(d,i){return 240+i*48})
		.attr("y", function(d,i){ return 0;})
		.attr("width", function(d,i){ return 48;})
		.attr("height", 48)
		.attr("fill",function(d,i){return colorPalette1[i];})
	 
	 for(var i=0;i<=colorPalette1.length;i++){
		  if(i<colorPalette1.length){
		 	svg1.append("text")
		      .attr("transform", "rotate(0)")
		      .attr("transform", "translate("+(248+48*i).toString() +")")
		      .attr("y", 65)
		      .attr("dy", 0)
		      .style("text-anchor", "end")
		      .text((i*10).toString())
		      .attr('class','font_style_num');
		  }
		  else{
		  	svg1.append("text")
		      .attr("transform", "rotate(0)")
		      .attr("transform", "translate("+(770).toString() +")")
		      .attr("y", 30)
		      .attr("dy", 0)
		      .style("text-anchor", "end")
		      .text("Age")
		      .attr('class','font_style_text');

		  }
	  }




	
