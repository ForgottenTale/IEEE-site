import * as d3 from 'd3';
import {select } from 'd3';
import { useEffect, useRef } from 'react';
import './events.scss';

export default function Events({ day }) {

    const ref = useRef();


    useEffect(() => {

  

        const margin = { top: 70, right: 0, bottom: 30, left: 0 };
        const height = 1500;
        const barWidth = "100%";
        const barStyle = {
            background: '#616161',
            textColor: 'white',
            width: barWidth,
            startPadding: 2,
            endPadding: 3,
            radius: 3
        };
        const svg = select(ref.current);

        var node = ref.current;
        node.querySelectorAll('*').forEach(n => n.remove());

        var dates = [];

        if (day.events !== null) {
            dates = [
                ...day.events.map(d => new Date(d.timeFrom)),
                ...day.events.map(d => new Date(d.timeTo))
            ];
        }
        else {
            dates.push(new Date());
        }

        var minTime = new Date(dates[0]);
        minTime.setHours(0, 0, 0, 0);


        var maxTime = new Date(dates[0]);
        maxTime.setHours(24, 0, 0, 0);

        const yScale = d3
            .scaleTime()
            .domain([minTime, maxTime])
            .range([margin.top, height - margin.bottom]);


        const gridLines = d3
            .axisRight()
            .ticks(24)
            .tickSize(ref.current.clientWidth) 
            .tickFormat('')
            .scale(yScale);

        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('opacity', 0.3)
            .call(gridLines);

        if (day.events !== null) {


            const barGroups = svg
                .selectAll('g.barGroup')
                .data(day.events)
                .join('g')
                .attr('class', 'barGroup');

            barGroups
                .append('rect')
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
                .attr('rx', barStyle.radius)
                .attr('fill', "#F2FAF5");


            barGroups
                .append('text')
                .attr('font-family', 'Roboto')
                .attr('font-size', 12)
                .attr('font-weight', 500)
                .attr('text-anchor', 'start')
                .attr('fill', "#87D4A4")
                .attr('x', margin.left + 10)
                .attr('y', d => yScale(new Date(d.timeFrom)) + 20)
                .text(d => d.title);

            barGroups
                .append('rect')
                .attr('x', margin.left)
                .attr('y', d => yScale(new Date(d.timeFrom)) + barStyle.startPadding)
                .attr('height', d => {
                    const startPoint = yScale(new Date(d.timeFrom));
                    const endPoint = yScale(new Date(d.timeTo));
                    return (
                        endPoint - startPoint - barStyle.endPadding - barStyle.startPadding
                    );
                })
                .attr('width', 4)
                .attr('rx', barStyle.radius)
                .attr('fill', "#87D4A4");


        }




    }, [day])

    return (
        <div className="events">
            <div className="events_date">{day.format("DD")}</div>
            <svg width="100%" height="1500" ref={ref}></svg>
        </div>
    );
}
