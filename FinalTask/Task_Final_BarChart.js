
class BarChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .range([0, self.inner_width])
            .paddingInner(0.2)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .range([self.inner_height, 0]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(['USA','Japan','German','UK','France','Italy','Canada'])
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update(age) {
        let self = this;
        var extData = this.data.filter(d => d.age == age)
        //self.data = extData;
        //self.zvalue = d => d.pop;
        const data_map = d3.rollup( extData, v => v.length, d => d.c );
        self.aggregated_data = Array.from( data_map, ([key,count]) => ({key,count}) );

        self.value = d => d.c;
        self.xvalue = d => d.key;
        self.yvalue = d => d.pop;
        //self.zvalue = d => d.pop;

        const items = self.aggregated_data.map( self.xvalue );
        self.xscale.domain(items);

        const ymin = 0;
        //const ymax = d3.max( self.aggregated_data, self.yvalue );
        const ymax = d3.max( extData, self.yvalue );
        self.yscale.domain([ymin, 330]);
        console.log(7);
        console.log(ymax);
        self.render(age);
    }

    render(age) {
        let self = this;
        
        var padding = 20, dheight =27;
        
        var extData = this.data.filter(d => d.age == age)
        //self.data = extData;
        //self.zvalue = d => d.pop;

        self.chart.selectAll(".bar")
        .data(extData)
        .join("rect")
        .transition().duration(100)
        .attr("class", "bar")
        //.attr("x", d => self.xscale( self.xvalue(d) ) )
        .attr("x", (d, i) => i * (dheight + padding / 8))
        .attr("y", d => self.yscale( self.yvalue(d) ) )
        .attr("width", self.xscale.bandwidth())
        .attr("height", d => self.inner_height - self.yscale( self.yvalue(d)  ))
        .attr("fill", d => self.config.cscale( self.value(d) ))


        self.chart.selectAll(".bar")
            .data(self.aggregated_data)
            .on('click', function(ev,d) {
                const is_active = filter.includes(d.key);
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push( d.key );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });


        self.xaxis_group
            .call(self.xaxis);

        self.yaxis_group
            .call(self.yaxis);

        
    }
}
