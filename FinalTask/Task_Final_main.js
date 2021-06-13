let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W12/G7.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.age = +d.age;
            d.gdp = +d.gdp;
            d.pop = +d.pop;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['USA','Japan','German','UK','France','Italy','Canada']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:60},
            xlabel: 'Age  [years]',
            ylabel: 'Nominal GDP  [million$]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Countries',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes(d.c) );
    }
    scatter_plot.update();
}
