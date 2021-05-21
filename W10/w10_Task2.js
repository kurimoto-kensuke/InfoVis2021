
d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W10/data4.csv")
.then( data => {
    data.forEach( d => { d.x = +d.x; d.y = +d.y; });

    var config = {
        parent: '#drawing_region',
        width: 512,
        height: 512,
        margin: {top:30, right:20, bottom:40, left:70}
    };

    const scatter_plot = new ScatterPlot( config, data );
    scatter_plot.update();

})
.catch( error => {
    console.log( error );
});

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 512,
            height: config.height || 512,
            margin: config.margin || {top:30, right:30, bottom:30, left:30}
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
            .attr("x", 270)
            .attr("y",30)
            .attr("text-anchor", "middle")
            .attr("font-size", "25pt")
            .attr("font-weight", "middle")
            .text("scatter plot");
    
            self.svg.append('g')
            .append("text")
            .attr("x", -256)
            .attr("y",15)
            .attr("text-anchor", "middle")
            .attr("font-size", "15pt")
            .attr("font-weight", "middle")
            .attr("transform", "rotate(-90)")
            .text("Y-label");
    
            self.svg.append('g')
            .append("text")
            .attr("x", 256)
            .attr("y", 511)
            .attr("text-anchor", "middle")
            .attr("font-size", "15pt")
            .attr("font-weight", "middle")
            .text("X-label");
    
            self.svg.append('g')
            .append("text")
            .attr("x", 20)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "middle")
            .text("ymax");
    
            self.svg.append('g')
            .append("text")
            .attr("x", 20)
            .attr("y", 460)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "middle")
            .text("ymin");
    
            self.svg.append('g')
            .append("text")
            .attr("x", 70)
            .attr("y", 505)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "middle")
            .text("xmin");
    
            self.svg.append('g')
            .append("text")
            .attr("x", 470)
            .attr("y", 505)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "middle")
            .text("xmax");
    
    
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );
            
        self.yscale = d3.scaleLinear()
            .range( [self.inner_height,0] );
        
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);
            //.tickSize(10,20)
            //.tickPadding(10)
    
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);
    
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
            
        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);    
            
    }
    
    update() {
        let self = this;
    
        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin - 20, xmax + 10] );
    
        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin - 20, ymax + 10] );
    
        self.render();
    }
    
    render() {
        let self = this;
    
        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );
    
        self.xaxis_group
            .call( self.xaxis );
        self.yaxis_group
            .call( self.yaxis );
    }
    }
    
