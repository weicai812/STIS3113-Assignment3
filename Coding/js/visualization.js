// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding "")
  d3.json("data/texas.json").then(data => {

    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = "selectionUpdated";

    // Create a line chart given x and y attributes, labels, offsets; 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let lcYearPoverty = linechart()
      .x(d => d.year)
      .xLabel("YEAR")
      .y(d => d.poverty)
      .yLabel("POVERTY RATE")
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ("#linechart", data);

    // Create a scatterplot given x and y attributes, labels, offsets; 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let spUnemployMurder = scatterplot()
      .x(d => d.unemployment)
      .xLabel("UNEMPLOYMENT RATE")
      .y(d => d.murder)
      .yLabel("MURDER RATE IN STATE PER 100000")
      .yLabelOffset(150)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ("#scatterplot", data);
    
    // Generate the table of the dataset
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let new_table = table()
      .selectionDispatcher(d3.dispatch(dispatchString))
      ("#table", data);


    // When the line chart selection is updated via brushing, 
    // tell the scatterplot to update it's selection (linking),
    // tell the table to update it's selection (linking)
    lcYearPoverty.selectionDispatcher().on(dispatchString + '.lc-to-sp', spUnemployMurder.updateSelection);
    lcYearPoverty.selectionDispatcher().on(dispatchString + '.lc-to-tab', new_table.updateSelection);

    // When the scatterplot selection is updated via brushing, 
    // tell the line chart to update it's selection (linking),
    // tell the table to update it's selection (linking)
    spUnemployMurder.selectionDispatcher().on(dispatchString + '.sp-to-lc', lcYearPoverty.updateSelection);
    spUnemployMurder.selectionDispatcher().on(dispatchString + '.sp-to-tab', new_table.updateSelection);

    // When the table selection is updated via brushing,
    // tell the scatterplot to update it's selection (linking)
    // tell the line chart to update it's selection (linking)
    new_table.selectionDispatcher().on(dispatchString + '.tab-to-sp', spUnemployMurder.updateSelection);
    new_table.selectionDispatcher().on(dispatchString + '.tab-to-lc', lcYearPoverty.updateSelection);
  });

})());