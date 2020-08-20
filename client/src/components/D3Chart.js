import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import '../styles/d3Chart.scss'

const D3Chart = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.inner)
    .outerRadius(props.outer);

  const colors = d3.scaleOrdinal()
    .domain(props.data)
    .range(['#1B37AA', '#C44536', '#0ca99e'])

  const format = d3.format('.0f');

  useEffect(() => {
      console.log(props.data)
      const data = createPie(props.data);
      const prevData = createPie(cache.current);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll('g.arc').data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append('g')
        .attr('class', 'arc');

      const path = groupWithUpdate
        .append('path')
        .merge(groupWithData.select('path.arc'));

      const arcTween = (d, i) => {
        const interpolator = d3.interpolate(prevData[i], d);

        return t => createArc(interpolator(t));
      };

      path
        .attr('class', 'arc')
        .attr('fill', (d, i) => colors(i))
        .transition()
        .attrTween('d', arcTween);

      const text = groupWithUpdate
        .append('text')
        .merge(groupWithData.select('text'));

      text
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', 'white')
        .style('font-size', 12)
        .transition()
        .attr('transform', d => `translate(${createArc.centroid(d)})`)
        .tween('text', (d, i, nodes) => {
          const interpolator = d3.interpolate(prevData[i], d);

          return t => d3.select(nodes[i]).text(`£${format(interpolator(t).value)}`);
        });

      cache.current = props.data;
    },
    [props.data]
  );

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.height / 2} ${props.width / 2})`}
      />
    </svg>
  );
};

export default D3Chart