import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import './events.scss';

export default function Events({day }) {

    const ref = useRef();
    console.log(day)
    // const [currentDay, setCurrentDay] = useState("");

    // useEffect(() => {
    //     let date = new Date(day.key.toString());
    //     var month = date.getMonth() + 1;
    //     var dateString =String( date.getDate() + "/" + month + "/" + date.getFullYear());

    //     setCurrentDay(dateString)


    //     const margin = { top: 30, right: 0, bottom: 30, left: 0 };
    //     const height = 600;
    //     const width = "100%";
    //     const barWidth = 200;
    //     const nowColor = '#EA4335';
    //     const backgroundColor = '#00ffb3';
    //     const barStyle = {
    //         background: '#616161',
    //         textColor: 'white',
    //         width: barWidth,
    //         startPadding: 2,
    //         endPadding: 3,
    //         radius: 5
    //     };

    //     const svg = d3
    //         .create('svg')
    //         .attr('width', width)
    //         .attr('height', height);


    //     ref.current.append(svg.node());


    //     if (day.events !== undefined) {


    //         const dates = [
    //             ...day.events.events.map(d => new Date(d.timeFrom)),
    //             ...day.events.events.map(d => new Date(d.timeTo))
    //         ];
    

    //         var minTime = new Date(dates[0]);
    //         minTime.setHours(0);

    //         var maxTime = new Date(dates[0]);
    //         maxTime.setHours(24)

    //         const yScale = d3
    //             .scaleTime()
    //             .domain([minTime, maxTime])
    //             .range([margin.top, height - margin.bottom]);

    //         const gridLines = d3
    //             .axisRight()
    //             .ticks(24)
    //             .tickSize(barStyle.width)
    //             .tickFormat('')
    //             .scale(yScale);

    //         svg
    //             .append('g')
    //             .attr('transform', `translate(${margin.left},0)`)
    //             .attr('opacity', 0.3)
    //             .call(gridLines);

    //         const barGroups = svg
    //             .selectAll('g.barGroup')
    //             .data(day.events.events)
    //             .join('g')
    //             .attr('class', 'barGroup');

    //         barGroups
    //             .append('rect')
    //             .attr('fill', backgroundColor)
    //             .attr('x', margin.left)
    //             .attr('y', d => yScale(new Date(d.timeFrom)) + barStyle.startPadding)
    //             .attr('height', d => {
    //                 const startPoint = yScale(new Date(d.timeFrom));
    //                 const endPoint = yScale(new Date(d.timeTo));
    //                 return (
    //                     endPoint - startPoint - barStyle.endPadding - barStyle.startPadding
    //                 );
    //             })
    //             .attr('width', barStyle.width)
    //             .attr('rx', barStyle.radius);
    //         const currentTimeDate = new Date();

    //         barGroups
    //             .append('rect')
    //             .attr('fill', nowColor)
    //             .attr('x', margin.left)
    //             .attr('y', yScale(currentTimeDate) + barStyle.startPadding)
    //             .attr('height', 2)
    //             .attr('width', barStyle.width);

    //         barGroups
    //             .append('text')
    //             .attr('font-family', 'Roboto')
    //             .attr('font-size', 12)
    //             .attr('font-weight', 500)
    //             .attr('text-anchor', 'start')
    //             .attr('fill', barStyle.textColor)
    //             .attr('x', margin.left + 10)
    //             .attr('y', d => yScale(new Date(d.timeFrom)) + 20)
    //             .text(d => d.title);
    //     }




    // }, [day])

    return (
        <div className="events">
            <div style={{ position: "absolute" }}>{day.format("DD/MM/YYYY")}</div>
            <div ref={ref}></div>
        </div>
    );
}
