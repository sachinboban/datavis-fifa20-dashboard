import React from "react";
import "./css/playerBar.css";
import { transform } from "@babel/core";

class PlayerBar extends React.Component {
  constructor(props) {
    super(props);
    this.mousePos = [0, 0];
    this.state = {
      tooltip: false,
      label: undefined,
      showLabel: undefined,
      rotateBar: undefined,
      color: undefined,
      data: undefined
    };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
    this.setState({
      label: this.props.label,
      showLabel: this.props.showLabel,
      rotateBar: this.props.rotateBar,
      color: this.props.color,
      data: this.props.data
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        label: this.props.label,
        showLabel: this.props.showLabel,
        rotateBar: this.props.rotateBar,
        color: this.props.color,
        data: this.props.data
      });
    }
  }

  render() {
    console.log(this.state.tooltip);
    return <div>{this.displayBarChart()}</div>;
  }

  displayBarChart = () => {
    const style_svg =
      this.state.rotateBar === true ? { transform: "rotate(180deg)" } : {};
    if (this.state.data !== undefined) {
      return (
        <div>
          {this.state.showLabel && (
            <text className="player-bar-label">{this.state.data}</text>
          )}
          <svg
            className="player-bar-svg"
            style={style_svg}
            onMouseEnter={() => this.handleTooltip(true)}
            onMouseLeave={() => this.handleTooltip(false)}
          >
            <rect className="player-bar-rect-default" />
            <rect
              className="player-bar-rect"
              width={this.state.data + "px"}
              style={{ fill: this.state.color }}
            />
          </svg>
          {this.state.showLabel && (
            <text className="player-bar-label">{" " + this.state.label}</text>
          )}
          {this.state.tooltip && (
            <div
              className="player-bar-tooltip"
              style={{
                left: this.mousePos[0] - 10,
                top: this.mousePos[1]
              }}
            >
              <span>{this.state.data}</span>
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

export default PlayerBar;
