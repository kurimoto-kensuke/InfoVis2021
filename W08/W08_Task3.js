d3.csv("https://kurimoto-kensuke.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:20, bottom:40, left:40}
        };

        const piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

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
       
           
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${(self.config.width / 2)}, ${(self.config.height / 2)})`);
      

    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;
        let radius =  Math.min( self.config.width, self.config.height ) / 2;
        let text = d3.arc()
            .outerRadius(radius - 30)
            .innerRadius(radius - 30);

        const pie = d3.pie()
            .value( d => d.value );

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        self.pieGroup = self.chart.selectAll("pie")
            .data(pie(self.data))
            .enter()
            .append("g")
            .attr("class", "pie");
            
        
        self.pieGroup.append("path")
            .attr('d', arc)
            .attr('fill', d => self.d.label)
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        self.pieGroup.append("text")
            .attr("fill", "black")
            .attr("transform", function(d) { return "translate(" + text.centroid(d.label) + ")"; })
            .attr("dy", "5px")
            .attr("font", "10px")
            .attr("text-anchor", "middle")
            .text("text" ,d => d.label);

    }
}



