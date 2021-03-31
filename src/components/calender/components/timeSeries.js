import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { select } from 'd3';

function TimeSeries() {

    const time = useRef();

    useEffect(() => {

        const margin = { top: 60, right: 30, bottom: 30, left: 50 };
        const height = 900;

        // const timeSeries = d3
        //     .create('svg')
        //     .attr('width', "40px")
        //     .attr('height', height);

        // time.current.append(timeSeries.node());
        const timeSeries = select(time.current)

        var minTime = new Date();
        minTime.setHours(0,0,0,0);

        var maxTime = new Date();
        maxTime.setHours(24);

        const yScale = d3
            .scaleTime()
            .domain([minTime,maxTime])
            .range([margin.top, height - margin.bottom]);

        const yAxis = d3
            .axisLeft()
            .ticks(24)
            .scale(yScale);
        
        timeSeries
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('opacity', 0.5)
            .call(yAxis);

        timeSeries
            .selectAll('g.tick')
            .filter((d, i, ticks) => i === 0 || i === ticks.length - 1)
            .select('text')
            .text('12 AM');;
    }, []);
    return (
        <div>
            <svg height="1000px" width="40px" ref={time}></svg>
        </div>
    );
}

export default TimeSeries;