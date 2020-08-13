import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import '../styles/d3Chart.scss'

const D3Chart = (props) => {
  const chartRef = useRef()

  useEffect(() => {
    renderChart()
  }, [])

  const renderChart = () => {
    const width = 450
    const height = 450
    const margin = 40

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const data = {
      a: props.saving,
      b: props.current,
      c: props.store
    }

    const color = d3.scaleOrdinal()
      .domain(data)
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

    const pie = d3.pie()
      .value((d) => { return d.value; })

    const data_ready = pie(d3.entries(data))

    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', (d) => { return color(d.data.key) })
      .style('opacity', 0.7)
  }

  return (
    <>
      <p>Saving: {props.saving}</p>
      <p>Current: {props.current}</p>
      <p>Store: {props.store}</p>
      <div className="d3-chart" ref={chartRef}></div>
    </>
  )
}

export default D3Chart