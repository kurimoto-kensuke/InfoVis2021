
d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W10/data4.csv")
.then( data => {
    data.forEach( d => { d.x = +d.x; d.y = +d.y; });

    var config = {
        parent: '#drawing_region',
        width: 256,
        height: 256,
        margin: {top:30, right:20, bottom:40, left:70}
    };

    const scatterplot = new ScatterPlot( config, data );
    scatterplot.update();

})
.catch( error => {
    console.log( error );
});
