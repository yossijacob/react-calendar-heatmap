import React, { Component } from 'react'

// export default class CalHeatmap extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ...props,
//       reversed: props.end < props.start,
//     };
//     console.log(this.state);
//   }

//   dateRange(startDate, endDate) {
//     const days = [];
//     if (endDate >= startDate) {
//       for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//         days.push(new Date(d));
//       }
//     } else {  // reverse
//       for (let d = new Date(startDate); d >= endDate; d.setDate(d.getDate() - 1)) {
//         days.push(new Date(d));
//       }
//     }
//     return days;
//   }

//   dayColor(day) {
//     return this.DAY_COLOR || 'whitesmoke'
//   }

//   dayNumberColor(day) {
//     return this.DAY_NUMBER_COLOR || '#dddddd'
//   }

//   squareSize() {
//     return this.SQUARE_SIZE || 20
//   }

//   renderDays() {
//     const { start, end, reversed } = this.state;
//     const squareSize = this.squareSize();
//     const fontSize = squareSize / 4;
//     const gutterSize = 1;
//     const squareWithGutterSize = squareSize + gutterSize;
//     const firstDayOffset = start.getDay(); // day of the week for start date
//     let index = reversed ? 6 - firstDayOffset : firstDayOffset;
//     return this.dateRange(start, end).map((d) => {
//       let xOffset = squareWithGutterSize * (index % 7);
//       xOffset = reversed ? 6 * (squareSize + gutterSize) - xOffset : xOffset; // for reversed go from right to left
//       const yOffset = squareWithGutterSize * parseInt(index / 7, 10);
//       index++;
//       return (
//         <g key={index - 1}>
//           <rect
//             width={squareSize}
//             height={squareSize}
//             x={xOffset}
//             y={yOffset}
//             fill={this.dayColor(d)}
//           >
//           </rect>
//           <text
//             x={xOffset + 1}
//             y={yOffset + 1}
//             fontSize={fontSize}
//             fill={this.dayNumberColor(d)}
//             dominantBaseline="hanging">
//             {d.getDate()}
//           </text>
//         </g>
//       )
//     })
//   }

//   render() {

//     return (
//       <svg viewBox="0 0 200 800">
//         {this.renderDays()}
//       </svg>
//     )
//   }
// }

const dateRange = (startDate, endDate) => {
  const days = [];
  if (endDate >= startDate) {
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
  } else {  // reverse
    for (let d = new Date(startDate); d >= endDate; d.setDate(d.getDate() - 1)) {
      days.push(new Date(d));
    }
  }
  return days;
}

const renderDays = (start, end, squareSize, gutterSize, dayColor, dayNumberColor, fontSize) => {
  const reversed = end < start;
  const squareWithGutterSize = squareSize + gutterSize;
  const firstDayOffset = start.getDay(); // day of the week for start date
  let index = reversed ? 6 - firstDayOffset : firstDayOffset;
  return dateRange(start, end).map((d) => {
    let xOffset = squareWithGutterSize * (index % 7);
    xOffset = reversed ? 6 * (squareSize + gutterSize) - xOffset : xOffset; // for reversed go from right to left
    const yOffset = squareWithGutterSize * parseInt(index / 7, 10);
    index++;
    return (
      <g key={index - 1}>
        <rect
          width={squareSize}
          height={squareSize}
          x={xOffset}
          y={yOffset}
          fill={dayColor(d)}
        >
        </rect>
        <text
          x={xOffset + 1}
          y={yOffset + 1}
          fontSize={fontSize}
          fill={dayNumberColor(d)}
          dominantBaseline="hanging">
          {d.getDate()}
        </text>
      </g>
    )
  })
}

export default ({
  start,
  end,
  squareSize = 20,
  gutterSize = 1,
  dayColor = (d) => 'whitesmoke',
  dayNumberColor = (d) => '#dddddd',
  weekDaysColor = '#dddddd',
  weekDays = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
}) => {
  const fontSize = squareSize / 4;
  return (
    <svg viewBox="0 0 200 800">

      {/* WeekDays */}
      {weekDays &&
        <g>
          {[...Array(7).keys()].map(i => (  // 7 days in a week
            <text x={1 + i * (squareSize + gutterSize)} y={0} fontSize={fontSize} fill={weekDaysColor} dominantBaseline="hanging">
              {weekDays[i]}
            </text>
          ))}
        </g>
      }

      {/* Days Squares  */}
      <g transform={`translate(0,${fontSize + 2})`}>
        {renderDays(start, end, squareSize, gutterSize, dayColor, dayNumberColor, fontSize)}
      </g>
    </svg>
  )
}