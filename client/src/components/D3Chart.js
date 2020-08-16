import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import '../styles/d3Chart.scss'

const D3Chart = (props) => {
  const chartRef = useRef()
  const [chartData, setChartData] = useState(0)

  // useEffect(() => {
  //   renderChart()
  // }, [props])

  useEffect(() => {
    renderChart()
  }, [])

  const updateTest = (event) => {
    setChartData(event.target.value)
    renderChart()
  }

  const renderChart = () => {
    const width = 450
    const height = 450
    const margin = 40
    const radius = Math.min(width, height) / 2 - margin

    const svg = d3.select(chartRef.current)
    const svgGroup = svg.selectAll('g')

    // d3.select("#test > g > *").exit().remove()

    const data = {
      ['Savings']: props.saving,
      ['Current']: props.current,
      ['Store']: props.store
    }

    const color = d3.scaleOrdinal()
      .domain(data)
      .range(['#1B37AA', '#2D374B', '#D7DADE'])

    const pie = d3.pie()
      .value((d) => {
        return d.value;
      })

    // const data_ready = pie(d3.entries(data))
    const data_ready = pie(d3.entries(data))
    console.log(data_ready)

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8)

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    svgGroup
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)

    svgGroup
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
        .attr('stroke', '#D7DADE')
        .style('fill', 'none')
        .attr('stroke-width', 1)
        .attr('points', function(d) {
          const posA = arc.centroid(d)
          const posB = outerArc.centroid(d)
          const posC = outerArc.centroid(d)
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1)
          return [posA, posB, posC]
        })

    svgGroup
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d) => {
        return d.data.key
      })
      .attr('transform', function(d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1)
        return 'translate(' + pos + ')'
      })
      .style('text-anchor', function(d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
      })
      .style('fill', '#D7DADE')

    // svg.selectAll('*').data(data_ready).exit().remove()
    console.log('SVG')
    console.log(svgGroup)

    // d3.selectAll("svg > g > *").remove();
    // svg.selectAll('*').data(data_ready).exit().remove()
    // console.log(svg.selectAll('*'))
    // svg.selectAll('g > *').data(data_ready, (data) => { return data.value }).exit().remove()
    // svgGroup
    //   .selectAll('*')
    //   .data(data_ready)
    //   .exit()
    //   .remove()
    // svg.selectAll('g').data(data_ready).exit().remove()

    // console.log('REMOVE')
    // console.log(svgGroup
    //   .selectAll('g > *')
    //   .data(data_ready)
    //   .exit())

    // svgGroup
    //   .selectAll('g > *')
    //   .data(data_ready)
    //   .exit()
    //   .remove()
    //   .remove()
  }

  return (
    <>
      <svg
        width="650"
        height="450"
        ref={chartRef}
        id="test"
      >
        <g
          className="node"
          transform={`translate(${650 / 2}, ${450 / 2})`}
        ></g>
      </svg>
      <h1>Note: make me (d3 Chart) reactive</h1>
      {/* <input onChange={updateTest} placeholder="Input"></input> */}
    </>
  )
}

export default D3Chart