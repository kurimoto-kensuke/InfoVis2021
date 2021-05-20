d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W08/data1.csv")
.then( data => {
    data.forEach( d => { d.value = +d.value; });

    var svg = d3.select('#drawing_region');
    update( data );

    function update(data) {
        let padding = 10;
        let height = 20;
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .transition().duration(1000)
            .attr("x", padding)
            .attr("y", (d,i) => padding + i * ( height + padding ))
            .attr("width", d => d.value)
            .attr("height", height);
    }


    d3.select('#reverse')
        .on('click', d => {
        data.reverse();
        update(data);
})
 



    d3.select('#ascend')
        .on('click', d => {
        data.sort();
        //data.selection.sort();
        update(data);
})

})
.catch( error => {
    console.log( error );
});
