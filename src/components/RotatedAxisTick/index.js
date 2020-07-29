import React from "react";

class RotatedAxisTick extends React.Component {
  render () {
    const {x, y, fontSize, stroke, payload} = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} fontSize={fontSize} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default RotatedAxisTick;