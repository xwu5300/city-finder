import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

class UsDataOverview extends React.Component {
  constructor(props) {
    super(props);
    this.showOverview = this.showOverview.bind(this);
  }

  componentDidMount() {
    this.showOverview(this.props.cities)
  }


  showOverview(cities) {
    var nodes = [];
    cities.forEach((city) => {
    var cityName = `${city.city_name_short}, ${city.state}`;
    nodes.push(
        {
            name: cityName, 
            category: 'Avg Rent:', 
            value: city.avg_rent_index / 2,
            cityValue: `$${city.rent_cost}`
        },
        {
            name: cityName, 
            category: 'Avg High Temperature:', 
            value: city.avg_high_temp / 2.5,
            cityValue: `${city.avg_high_temp}°F`
        },
        {
            name: cityName, 
            category: 'Population:', 
            value: city.population / 200000,
            cityValue: city.population
        }
    )})
    var simulation = d3.forceSimulation()
    .force('forceX', d3.forceX().strength(.1).x(600))
    .force('forceY', d3.forceY().strength(.1).y(500))
    .force('charge', d3.forceManyBody().strength(-100));

    simulation.nodes(nodes)
                .force('collide', d3.forceCollide().strength(1).radius(d => d.value + 3).iterations(2))
                .alphaTarget(1)
                .on('tick', ticked);

    d3.selection.prototype.moveToFront = function() {  
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
        };

    const svg = d3.select('svg').attr('text-anchor', 'middle');
    
    var color = d3.scaleOrdinal(['rgb(31,119,180', 'rgb(255,127,14', 'rgb(44,160,44']);

    let node = svg.selectAll('.node')
                    .data(nodes)
                    .enter().append('g')
                    .attr('class', 'node')
                    .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended)
                );

    node.append('circle')
        .attr('r', d => d.value)
        // .attr('class', 'unselected')
        .attr('x', 0)
        .attr('y', 0)
        .style('position', 'relative')
        .style('fill', d => color(d.category))

    node.append('rect')
    .attr('rx', 0)
    .attr('ry', 0)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width',0)
    .attr('height',0)
    // .attr('class', 'unselected')
    .attr('stroke','black')
    .attr('fill','white')
    .style('position', 'relative')
    .style('visibility', 'hidden'); 
    
    node.append('text')
    // .attr('class', 'unselected')
    .selectAll('tspan')
    .data(d => [d.name, d.category, d.cityValue])
    .enter()
    .append('tspan')
    .attr('x', 0)
    .attr('y', (d, i, nodes) => 30 + (i - nodes.length / 1.5 - 0.5) * 20)
    .text(d => d)
    .style('font-size', '0')
    .style('font-weight', (d, i, nodes) => {
        if (i === 0) {
        return 'bold';
        }
    })
    .style('position', 'relative')
    .style('visibility', 'hidden');

    node.on('mouseover', function(d) {
        d3.select(this)
        .selectAll('rect')
        .transition()
        .duration(1000)
        .attr('x', -100)
        .attr('y', -50)
        .attr('width',200)
        .attr('height',100)
        .style('visibility', 'visible')        
        .style('position', 'relative')
        
        d3.select(this)
        .moveToFront()
        .selectAll('tspan')
        .transition()
        .duration(1000)
        .style('font-size', '20px')
        .style('visibility', 'visible')        
        .style('position', 'relative');
    })

    node.on('mouseout', function(d, i) {
        d3.select(this)
        .selectAll('tspan')
        .transition()
        .style('font-size', '0')
        .style('visibility', 'hidden');

        d3.select(this)
        .selectAll('rect')
        .transition()
        .attr('x', 0)
        .attr('y', 0)
        .attr('width',0)
        .attr('height',0)
        .style('visibility', 'hidden');

    })

    node.on('click', function(d, i) {
        var category = d.category;
        var selectedNodes = d3.selectAll('g')
        .filter(d => d.category === category).transition().duration(1000)
        .attr('transform', d => `translate(50, ${d.y})`)
        setTimeout(() => {
            selectedNodes._groups[0].forEach(node => {
                node.__data__.fx = 50;
                node.__data__.fy = node.__data__.y
                
            })
        }, 500)
        
    })

    function ticked() {
        node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    }
    
    function dragstarted(d) {
        if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) {
        simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        }
    }

  }

  render() {
    return (
        <div>
          <svg width='1200' height='1000'>
          </svg>
        </div>
    )
  }
}

export default UsDataOverview;