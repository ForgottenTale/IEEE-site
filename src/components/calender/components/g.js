import * as d3 from 'd3';
import { useEffect, useRef } from 'react';


export default function Events() {

    const ref = useRef();



    useEffect(() => {

        const calendarEvents = [
            {
                "title": "Webinar on CyptoCurrency",
                "time": "9 pm - 10 pm IST",
                "timeFrom": "2021-03-30T19:30:00.000Z",
                "timeTo": "2021-03-30T22:30:00.000Z",
                "background": '#616161'
            },
            {
                "title": "Webinar on CyptoCurrency",
                "time": "9 pm - 10 pm IST",
                "timeFrom": "2021-03-30T22:30:00.000Z",
                "timeTo": "2021-03-31T00:30:00.000Z",
                "background": '#616161'
            },
        ];



        const dates = [
            ...calendarEvents.map(d => new Date(d.timeFrom)),
            ...calendarEvents.map(d => new Date(d.timeTo))
        ];

        const margin = { top: 30, right: 30, bottom: 30, left: 50 }; // Gives space for axes and other margins
        const height = 600;
        const width = 900;
        const barWidth = 600;
        const nowColor = '#EA4335';
        const barStyle = {
            background: '#616161',
            textColor: 'white',
            width: barWidth,
            startPadding: 2,
            endPadding: 3,
            radius: 3
        };
        const svg = d3
            .create('svg')
            .attr('width', width)
            .attr('height', height);

        var minTime = new Date(dates[0]);
        minTime.setHours(0, 0, 0, 0);
    

        var maxTime = new Date(dates[0]);
        maxTime.setHours(24, 0, 0, 0);
 
        const yScale = d3
            .scaleTime()
            .domain([minTime, maxTime])
            .range([margin.top, height - margin.bottom]);

        // const yScale = d3
        //     .scaleTime()
        //     .domain([new Date(new Date(dates[0]).setHours(0, 0, 0, 0)), new Date(new Date(dates[0]).setHours(24, 0, 0, 0))])
        //     .range([margin.top, height - 60]);
        const yAxis = d3
            .axisLeft()
            .ticks(24)
            .scale(yScale);
        // We'll be using this svg variable throughout to append other elements to it
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('opacity', 0.5)
            .call(yAxis);

        svg
            .selectAll('g.tick')
            .filter((d, i, ticks) => i === 0 || i === ticks.length - 1)
            .select('text')
            .text('12 AM');

        const gridLines = d3
            .axisRight()
            .ticks(24)
            .tickSize(barStyle.width) // even though they're "ticks" we've set them to be full-width
            .tickFormat('')
            .scale(yScale);

        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('opacity', 0.3)
            .call(gridLines);
        const barGroups = svg
            .selectAll('g.barGroup')
            .data(calendarEvents)
            .join('g')
            .attr('class', 'barGroup');

        barGroups
            .append('rect')
            .attr('fill', d => d.background || barStyle.background)
            .attr('x', margin.left)
            .attr('y', d => yScale(new Date(d.timeFrom)) + barStyle.startPadding)
            .attr('height', d => {
                const startPoint = yScale(new Date(d.timeFrom));
                const endPoint = yScale(new Date(d.timeTo));
                return (
                    endPoint - startPoint - barStyle.endPadding - barStyle.startPadding
                );
            })
            .attr('width', barStyle.width)
            .attr('rx', barStyle.radius);

        const currentTimeDate = new Date(new Date(new Date().setDate(11)).setMonth(10)).setFullYear(2020);

        barGroups
            .append('rect')
            .attr('fill', nowColor)
            .attr('x', margin.left)
            .attr('y', yScale(currentTimeDate) + barStyle.startPadding)
            .attr('height', 2)
            .attr('width', barStyle.width);

        barGroups
            .append('text')
            .attr('font-family', 'Roboto')
            .attr('font-size', 12)
            .attr('font-weight', 500)
            .attr('text-anchor', 'start')
            .attr('fill', barStyle.textColor)
            .attr('x', margin.left + 10)
            .attr('y', d => yScale(new Date(d.timeFrom)) + 20)
            .text(d => d.title);



        ref.current.append(svg.node());



    }, [])

    return (

        <div ref={ref}></div>

    );
}