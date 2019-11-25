import React from "react";

function getBarChartJSX(width, maxWidth) {
  const actualWidth = (width * maxWidth) / 100;
  const barStyle = {
    width: actualWidth
  };

  return (
    <div className="bar-chart">
      <div className="bar" style={barStyle}>
        {width}
      </div>
    </div>
  );
}

export default getBarChartJSX;
