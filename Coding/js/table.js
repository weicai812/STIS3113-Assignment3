//create a table function.
function table() {


   let ourBrush = null,
   selectableElements = d3.select(null),
   dispatcher;

  function chart(selector, data) {
      let table = d3.select(selector)
        .append("table")
          .classed("table-content", true);

      let titles = d3.keys(data[0]);
      //read the header of the data.
      let header = table.append('thead').append('tr')
                    .selectAll('th')
                    .data(titles).enter()
                    .append("th")
                    .text(t => t);
      //read the row of the data.
      let rows = table.append("tbody")
                .selectAll("tr")
                .data(data)
                .enter()
                .append("tr");
      //read the input from the data.
      let cell = rows.selectAll("td")
                  .data(t => d3.values(t))
                  .enter()
                  .append("td")
                  .text(t => t);

      //mouse event
      let onMouseDown;
      d3.selectAll("tr")
      .on("mouseover", (_m, i, elements) => {                  
        d3.select(elements[i]).classed("mouseover", true)     
        if (onMouseDown) {
          d3.select(elements[i]).classed("selected", true)      

      
      let dispatcherItem = Object.getOwnPropertyNames(dispatcher._);
      dispatcher.call(dispatcherItem, this, table.selectAll(".selected").data());
        }
      })

      .on("mousedown", (m, i, elements) => {                  
        d3.selectAll(".selected").classed("selected", false)
        onMouseDown = true
        d3.select(elements[i]).classed("selected", true)      
      
      .on("mouseup", (m, i, elements) => {                   
        onMouseDown = false
      })

      let dispatcherItem = Object.getOwnPropertyNames(dispatcher._);
      dispatcher.call(dispatcherItem, this, table.selectAll(".selected").data());
      })

      
      .on("mouseout", (m, i, elements) => { 
        d3.select(elements[i]).classed("mouseover", false)
      });

      return chart;
    }

    
    chart.selectionDispatcher = function (d) {
      if (!arguments.length) return dispatcher;
      dispatcher = d;
      return chart;
    };

    
    chart.updateSelection = function (selectedData) {
      if (!arguments.length) return;

   
    d3.selectAll('tr').classed("selected", m => {
       return selectedData.includes(m)
     });

    };

    return chart;
  }