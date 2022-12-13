import * as d3 from "d3";
import { motion } from "framer-motion";

/*
    IMPORTANT TO NOTE:
    - when in React do not need to worry about selections, appending, etc.
    - b/c can already render and update elements from the screen - using JSX
    - so in this example just using d3 for what it is best at (eg calc line path, scales, etc)
*/

const ChartInner = ({ data, width, height }) => {
  //   let margin = {
  //     top: 10,
  //     right: 10,
  //     bottom: 20,
  //     left: 24,
  //   };

  //   let startDay = startOfMonth(data.at(0).date);
  //   let endDay = endOfMonth(data.at(-1).date);
  //   let months = eachMonthOfInterval({ start: startDay, end: endDay });

  //   let xScale = d3
  //     .scaleTime()
  //     .domain([startDay, endDay])
  //     .range([margin.left, width - margin.right]);

  //   let yScale = d3
  //     .scaleLinear()
  //     .domain(d3.extent(data.map((d) => d.estimatedMax)))
  //     .range([height - margin.bottom, margin.top]);

  //   let line = d3
  //     .line()
  //     .x((d) => xScale(d.date))
  //     .y((d) => yScale(d.estimatedMax));
  //   let d = line(data);

  let margin = {
    top: 20,
    right: 20,
    bottom: 22,
    left: 22,
  };

  let xScale = d3
    .scaleLinear()
    // with arr of objs would just do (d) => d.prop instead here
    .domain(d3.extent(data.map((d) => d[0]))) // how long the data stretches
    .range([margin.left, width - margin.right]); // how long the actual chart stretches

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[1])))
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  let d = line(data);

  return (
    <>
      <svg className="bg-gray-100" viewBox={`0 0 ${width} ${height}`}>
        {/* Y Axis */}
        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(0,${yScale(max)})`}
            className="text-gray-400"
            key={max}
          >
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="currentColor"
            />
            <text
              alignmentBaseline="middle"
              className="text-[10px]"
              fill="currentColor"
            >
              {max}
            </text>
          </g>
        ))}

        {/* X Axis */}
        {xScale.ticks(5).map((date) => (
          <g
            key={date}
            className="text-gray-400"
            transform={`translate(${xScale(date)},${height - 10})`}
          >
            <text fill="currentColor" className="text-[10px]">
              {date}
            </text>
          </g>
        ))}

        {/* Line */}
        <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5, type: 'spring'}}
        d={d} fill="none" stroke="currentColor" strokeWidth="2" />

        {/* Circles */}
        {data.map((d, i) => (
          <motion.circle
            initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ type: "spring", duration: 0.4, delay: 0.1 * i }}
            key={d}
            fill="currentColor"
            r="5"
            cx={xScale(d[0])}
            cy={yScale(d[1])}
            stroke="rgb(243 244 246)"
            strokeWidth={2}
          />
        ))}
      </svg>
    </>

    // <>
    //   <svg className="" viewBox={`0 0 ${width} ${height}`}>
    //     {/* X axis */}
    //     {months.map((month, i) => (
    //       <g
    //         key={month}
    //         className="text-gray-400"
    //         transform={`translate(${xScale(month)},0)`}
    //       >
    //         {i % 2 === 1 && (
    //           <rect
    //             width={xScale(endOfMonth(month)) - xScale(month)}
    //             height={height - margin.bottom}
    //             fill="currentColor"
    //             className="text-gray-100"
    //           />
    //         )}
    //         <text
    //           x={(xScale(endOfMonth(month)) - xScale(month)) / 2}
    //           y={height - 5}
    //           textAnchor="middle"
    //           fill="currentColor"
    //           className="text-[10px]"
    //         >
    //           {format(month, "MMM")}
    //         </text>
    //       </g>
    //     ))}

    //     {/* Y axis */}
    //     {yScale.ticks(5).map((max) => (
    //       <g
    //         transform={`translate(0,${yScale(max)})`}
    //         className="text-gray-400"
    //         key={max}
    //       >
    //         <line
    //           x1={margin.left}
    //           x2={width - margin.right}
    //           stroke="currentColor"
    //           strokeDasharray="1,3"
    //         />
    //         <text
    //           alignmentBaseline="middle"
    //           className="text-[10px]"
    //           fill="currentColor"
    //         >
    //           {max}
    //         </text>
    //       </g>
    //     ))}

    //     {/* Line */}
    //     <motion.path
    //       initial={{ pathLength: 0 }}
    //       animate={{ pathLength: 1 }}
    //       transition={{ duration: 1.5, type: "spring" }}
    //       d={d}
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //     />

    //     {/* Circles */}
    //     {data.map((d, i) => (
    //       <motion.circle
    //         key={d.date}
    //         r="5"
    //         cx={xScale(d.date)}
    //         cy={yScale(d.estimatedMax)}
    //         fill="currentColor"
    //         strokeWidth={2}
    //         stroke={
    //           months.findIndex((m) => isSameMonth(m, d.date)) % 2 === 1
    //             ? "#f5f5f4"
    //             : "white"
    //         }
    //       />
    //     ))}
    //   </svg>
    // </>
  );
};

export default ChartInner;
