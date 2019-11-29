import React from "react";
import "./css/percentile.css";

class PercentileGraph extends React.Component {
  constructor(props) {
    super(props);
    this.mousePos = [0, 0];
    this.state = {
      tooltip: false,
      percentile: undefined
    };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
    this.setState({
      percentile: this.props.percentile
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.percentile !== this.props.percentile) {
      this.setState({
        percentile: this.props.percentile
      });
    }
  }

  render() {
    console.log(this.state.tooltip);
    return <div>{this.displayBarChart()}</div>;
  }

  displayBarChart = () => {
    if (this.state.percentile !== undefined) {
      return (
        <div>
          <svg
            className="percentile-svg"
            style={{ width: "100%" }}
            onMouseEnter={() => this.handleTooltip(true)}
            onMouseLeave={() => this.handleTooltip(false)}
          >
            <text>Rank by Percentile</text>
            <rect className="percentile-rect-default"></rect>
            <rect
              className="percentile-rect"
              height={this.state.percentile + "px"}
            ></rect>
          </svg>
          {this.state.tooltip && (
            <div
              className="percentile-tooltip"
              style={{
                left: this.mousePos[0] - 10,
                top: this.mousePos[1]
              }}
            >
              <span>{this.state.percentile}</span>
            </div>
          )}
        </div>
      );
    }
  };
  //Tooltip
  handleTooltip = request => {
    const tooltip = request;
    this.setState({
      tooltip: tooltip
    });
  };

  //positioning the tooltip
  handleMouseMove = e => {
    this.mousePos = [e.pageX, e.pageY];
  };
}

export default PercentileGraph;
