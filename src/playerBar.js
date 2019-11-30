import React from "react";
import "./css/playerBar.css";
import Tooltip from '@material-ui/core/Tooltip';

class PlayerBar extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({
      label: this.props.label,
      showLabel: this.props.showLabel,
      rotateBar: this.props.rotateBar,
      color: this.props.color,
      data: this.props.data,
      tooltip: this.props.tooltip
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        label: this.props.label,
        showLabel: this.props.showLabel,
        rotateBar: this.props.rotateBar,
        color: this.props.color,
        data: this.props.data,
        tooltip: this.props.tooltip
      });
    }
  }

  render() {
    return <div style={{marginTop:3}}>{this.displayBarChart()}</div>;
  }

  displayBarChart = () => {
    const style_svg =
      this.state.rotateBar === true ? { transform: "rotate(180deg)" } : {};
    if (this.state.data !== undefined) {
      return (
        <div>
          {this.state.showLabel && (
            <span className="player-bar-label">{this.state.data}</span>
          )}
          <Tooltip title={this.state.data} disableFocusListener={!this.state.tooltip} disableHoverListener={!this.state.tooltip}>
          <svg
            className="player-bar-svg"
            style={style_svg}
          >
            <rect className="player-bar-rect-default" rx="10" ry="10"/>
            <rect
              className="player-bar-rect"
              width={this.state.data + "px"}
              style={{ fill: this.state.color }}
              rx="10" ry="10"
            />
          </svg>
          </Tooltip>
          {this.state.showLabel && (
            <span className="player-bar-label">{" " + this.state.label}</span>
          )}
        </div>
      );
    }
  };


}

export default PlayerBar;
