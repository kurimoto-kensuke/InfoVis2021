d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:20, bottom:40, left:70}
        };

        const barchart = new BarChart( config, data );
        barchart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);

    self.svg.append('g')
        .append("text")
        .attr("x",160)
        .attr("y",20)
        .attr("text-anchor", "middle")
        .attr("font-size", "18pt")
        .attr("font-weight", "middle")
        .text("BarChart");

        self.svg.append('g')
        .append("text")
        .attr("x", -120)
        .attr("y",15)
        .attr("text-anchor", "middle")
        .attr("font-size", "11pt")
        .attr("font-weight", "middle")
        .attr("transform", "rotate(-90)")
        .text("Name");

        self.svg.append('g')
        .append("text")
        .attr("x", 150)
        .attr("y",252)
        .attr("text-anchor", "middle")
        .attr("font-size", "11pt")
        .attr("font-weight", "middle")
        .text("Number");



        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            //.domain([0, d3.max(data, d => d.value)])
            .range([0, self.inner_width]);

        self.yscale = d3.scaleBand()
            //.domain(data.map(d => d.label))
            .range([0, self.inner_height])
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
      

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);


        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            .tickSizeOuter(0);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);
    }

    update() {
        let self = this;

        self.xscale.domain([0, d3.max(self.data, d => d.value)])
        self.yscale.domain(self.data.map(d => d.label));

        /*const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.label );
        const ymax = d3.max( self.data, d => d.label );
        self.yscale.domain( [ymin, ymax] );
        */

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr('fill',d => d.data.color)
            .attr("x", 0 )
            .attr("y", d => self.yscale(d.label) )
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

        self.xaxis_group
            .call( self.xaxis );
        self.yaxis_group
            .call( self.yaxis);
    }
}



