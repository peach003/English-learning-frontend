import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";
import "../styles/DashboardStatisticsSection.css";

const DashboardStatisticsSection = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/api/diagramword/stats/last10days")
      .then(response => {
        const processedData = response.data.map(d => ({
          date: d.date,
          wordCount: Math.round(d.wordCount)
        }));
        setData(processedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 1000; // SVG 宽度
    const height = 300; // SVG 高度
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formattedData = data.map(d => ({
      date: parseDate(d.date),
      wordCount: Math.round(d.wordCount)
    }));

    const xScale = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.wordCount) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f9f9f9")
      .style("border-radius", "8px")
      .style("box-shadow", "2px 2px 6px rgba(0, 0, 0, 0.1)");

    // 添加网格线
    const gridLines = svg.append("g")
      .attr("class", "grid");

    gridLines.selectAll("line.horizontal")
      .data(yScale.ticks())
      .enter().append("line")
      .attr("class", "horizontal")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5");

    gridLines.selectAll("line.vertical")
      .data(xScale.ticks(data.length))
      .enter().append("line")
      .attr("class", "vertical")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", height - margin.bottom)
      .attr("y2", margin.top)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5");

    // 画折线
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.wordCount))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(formattedData)
      .attr("fill", "none")
      .attr("stroke", "#17618f")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // X 轴
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.timeFormat("%m-%d")))
      .selectAll("text")
      .attr("fill", "#333")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("transform", "rotate(0)");

    // Y 轴
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("fill", "#333")
      .style("font-size", "12px");

    // 圆点
    svg.selectAll("circle")
      .data(formattedData)
      .enter().append("circle")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.wordCount))
      .attr("r", 4)
      .attr("fill", "#b46969")
      .on("mouseover", function(event, d) {
        d3.select(this).transition().attr("r", 6);
        svg.append("text")
          .attr("x", xScale(d.date))
          .attr("y", yScale(d.wordCount) - 10)
          .attr("text-anchor", "middle")
          .attr("fill", "#000")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("class", "tooltip")
          .text(d.wordCount);
      })
      .on("mouseout", function() {
        d3.select(this).transition().attr("r", 4);
        svg.selectAll(".tooltip").remove();
      });

  }, [data]);

  return (
    <div className="dashboard-statistics">
      <h2 className="statistics-title">Recent Learning Progress</h2>
      <div className="chart-container">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default DashboardStatisticsSection;






