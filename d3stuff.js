
        //main script
MaxCount = 5000
        d3.csv("https://raw.githubusercontent.com/djkirkma/testrepo/main/games.csv?token=AKTDRCFVNZ5J36ITUUPRNPLBXESC6", function(error, data) {
      if (error) throw error;
         theMovesPlayed = ""
          winsList = {BlackWin:0, WhiteWin:0}
          ratingList = {}
          NextMoveList = {}

          for(x=0;x<data.length;x++) {
            average = (parseInt(data[x].white_rating) + parseInt(data[x].black_rating)) / 2
            Rounded =  Math.ceil(average/100) * 100

            TheNextMove = data[x].moves.substring(theMovesPlayed,theMovesPlayed+2)
            if(TheNextMove in NextMoveList) {
                NextMoveList[TheNextMove]++
            }
            else {
                NextMoveList[TheNextMove] = 1
            }
            
            if(Rounded in ratingList) {
              ratingList[Rounded]++
            }
            else {
              ratingList[Rounded] = 1
              
            }
            if(data[x].winner == "black") {
              winsList.BlackWin++
            }
            else {
              winsList.WhiteWin++
            }
          }

        var width = 450
            height = 450
            margin = 40
        
        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin
        
        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#my_dataviz")
          .append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        // set the color scale
        var color = d3.scaleOrdinal()
          .domain(data)
          .range(["#ffffff", "#808080"])

        var pie = d3.pie()
          .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(winsList))
        var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
          )
          .attr('fill', function(d){ return(color(d.data.key)) })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)
    
          svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return "" + d.data.key + " " + d.data.value})
          .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 17)
          //Pie2
          var svg = d3.select("#pie2")
          .append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        // set the color scale
        var color = d3.scaleOrdinal()
          .domain(data)
          .range(["#808080 ", "#ffffff", "#9c4964", "#229c03", "#94d0d7"])
        
        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(ratingList))
        var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
          )
          .attr('fill', function(d){ return(color(d.data.key)) })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)
    
          svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return d.data.key + "+"})
          .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 17)
    
                            // set the dimensions and margins of the graph
                    var margin = {top: 30, right: 30, bottom: 70, left: 60},
                    width = 460 - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;

                    // append the svg object to the body of the page
                    var svg = d3.select("#barChart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
                    // X axis
                    var x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(Object.keys(NextMoveList))
                    .padding(0.2);
                    svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                    // Add Y axis
                    var y = d3.scaleLinear()
                    .domain([0, 13000])
                    .range([ height, 0]);
                    svg.append("g")
                    .call(d3.axisLeft(y));

                    // Bars
                    svg.selectAll("mybar")
                    .data(Object.keys(NextMoveList))
                    .enter()
                    .append("rect")
                        .attr("x", function(d) { return x(d); })
                        .attr("y", function(d) { return y(NextMoveList[d]); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(NextMoveList[d]); })
                        .attr("fill", "#69b3a2")
                  console.log(Object.keys(NextMoveList))







              function ResetD3(newdata) {
                //
                var width = 450
                height = 450
                margin = 40
                //

                var svg = d3.select("#my_dataviz")
                svg.selectAll('*').remove();
                var svg = d3.select("#my_dataviz")

                .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
          
              // set the color scale
              var color = d3.scaleOrdinal()
                .range(["#808080 ", "#ffffff", "#9c4964", "#229c03", "#94d0d7"])
              
              // Compute the position of each group on the pie:
              var pie = d3.pie()
                .value(function(d) {return d.value; })

              var data_ready = pie(d3.entries(newdata))
                svg
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius)
                )
                .attr('fill', function(d){ return(color(d.data.key)) })
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
          
                svg
                .selectAll('mySlices')
                .data(data_ready)
                .enter()
                .append('text')
                .text(function(d){ return "" + d.data.key + " " + d.data.value})
                .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
                .style("text-anchor", "middle")
                .style("font-size", 17)
                //Pie2

                  //test2
                  var svg = d3.select("#pie2")
                  svg.selectAll('*').remove();
                var svg = d3.select("#pie2")
                  .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                  .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
                // set the color scale
                var color = d3.scaleOrdinal()
                  .domain(data)
                  .range(["#808080 ", "#ffffff", "#9c4964", "#229c03", "#94d0d7"])
                
                // Compute the position of each group on the pie:
                var data_ready = pie(d3.entries(NewList2))
                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                  .selectAll('whatever')
                  .data(data_ready)
                  .enter()
                  .append('path')
                  .attr('d', d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                  )
                  .attr('fill', function(d){ return(color(d.data.key)) })
                  .attr("stroke", "black")
                  .style("stroke-width", "2px")
                  .style("opacity", 0.7)
            
                  svg
                  .selectAll('mySlices')
                  .data(data_ready)
                  .enter()
                  .append('text')
                  .text(function(d){ return d.data.key + "+"})
                  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
                  .style("text-anchor", "middle")
                  .style("font-size", 17)
                  //Test 3
                  

                           // set the dimensions and margins of the graph
                           var margin = {top: 30, right: 30, bottom: 70, left: 60},
                           width = 460 - margin.left - margin.right,
                           height = 400 - margin.top - margin.bottom;
       
                           // append the svg object to the body of the page
                           var svg = d3.select("#barChart")
                           svg.selectAll('*').remove();
                           var svg = d3.select("#barChart")

                           .append("svg")
                           .attr("width", width + margin.left + margin.right)
                           .attr("height", height + margin.top + margin.bottom)
                           .append("g")
                           .attr("transform",
                               "translate(" + margin.left + "," + margin.top + ")");
                           // X axis
                           var x = d3.scaleBand()
                           .range([ 0, width ])
                           .domain(Object.keys(NewList3))
                           .padding(0.2);
                           svg.append("g")
                           .attr("transform", "translate(0," + height + ")")
                           .call(d3.axisBottom(x))
                           .selectAll("text")
                           .attr("transform", "translate(-10,0)rotate(-45)")
                           .style("text-anchor", "end");

                           var c = (Object.values(NewList3))
                           var z = Math.max(...c)

                           // Add Y axis
                           var y = d3.scaleLinear()
                           .domain([0, z])
                           .range([ height, 0]);
                           svg.append("g")
                           .call(d3.axisLeft(y));
       
                           // Bars
                           svg.selectAll("mybar")
                           .data(Object.keys(NewList3))
                           .enter()
                           .append("rect")
                               .attr("x", function(d) { return x(d); })
                               .attr("y", function(d) { return y(NewList3[d]); })
                               .attr("width", x.bandwidth())
                               .attr("height", function(d) { return height - y(NewList3[d]); })
                               .attr("fill", "#69b3a2")


          }
          function onDrop (source, target, piece, newPos, oldPos, orientation) {
            console.log('Target: ' + target)
            console.log('Piece: ' + piece)
            if(piece.substring(1,2) == "P") {
                doAMove(target)

            }
            else {
                doAMove(piece.substring(1,2)+target)
            }
          }
          var config = {
            onDrop: onDrop,
            showNotation:true,
            draggable: true,
            dropOffBoard: 'snapback', // this is the default
            position: 'start'
          }
          var board = Chessboard('myBoard', config)
          
          function clickShowPositionBtn () {
            console.log('Current position as an Object:')
            console.log(board.position())
          
            var InputFEN = document.getElementById("FEN")
            InputFEN.innerHTML = board.fen()
        
          }
          
          $('#showPositionBtn').on('click', clickShowPositionBtn)
        
          //document.getElementById("button1").onclick = function() {doAMove()};
          function doAMove(target) {
            myInput = target
            theMovesPlayed += myInput+ " "
            newList = {WhiteWin: 0, BlackWin:0}
            NewList2 = {}
            NewList3 = {}
            for(x=0;x<MaxCount;x++) {

                if(data[x].moves.substring(0,theMovesPlayed.length) == theMovesPlayed) {

                    average = (parseInt(data[x].white_rating) + parseInt(data[x].black_rating)) / 2
                    Rounded =  Math.ceil(average/100) * 100
                    holder = data[x].moves
                    //TheNextMove = data[x].moves.substring(theMovesPlayed,theMovesPlayed+2)
                    TheNextMove = holder.substring(theMovesPlayed.length,theMovesPlayed.length+2)


            if(TheNextMove in NewList3) {
                NewList3[TheNextMove]++
            }
            else {
                NewList3[TheNextMove] = 1
            }
            
                    if(Rounded in NewList2) {
                      NewList2[Rounded]++
                    }
                    else {
                        NewList2[Rounded] = 1
                      
                    }
                    if(data[x].winner == "black") {
                        newList.BlackWin++
                    }
                    else {
                        newList.WhiteWin++
                    }
                }

                
            }
            
            ResetD3(newList,NewList2,NewList3);
        }
    });
       
        