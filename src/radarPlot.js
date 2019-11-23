import React, { Component } from "react";
import RadarChart from "react-svg-radar-chart";
//import "react-svg-radar-chart/build/css/index.css";
import "./css/radar.css";

class RadarPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: undefined,
      player2: undefined,
      data: [],
      captions: {},
      dot: {}
    };
    this.mousePos = [0, 0];
    this.gk_skills = [
      "Reactions",
      "GK Diving",
      "GK Handling",
      "GK Kicking",
      "GK Positioning",
      "GK Reflexes"
    ];
    this.def_skills = [
      "Standing Tackle",
      "Jumping",
      "Marking",
      "Sliding Tackle",
      "Strength",
      "Interceptions"
    ];
    this.mid_skills = [
      "Short Passing",
      "Long Passing",
      "Ball Control",
      "Crossing",
      "Sprint Speed",
      "Vision"
    ];
    this.att_skills = [
      "Finishing",
      "Long Shots",
      "Positioning",
      "Shot Power",
      "Volleys",
      "Penalties"
    ];
    this.position = {
      GK: "GK",
      CB: "DEF",
      LB: "DEF",
      RB: "DEF",
      LWB: "DEF",
      RWB: "DEF",
      CDM: "MID",
      CM: "MID",
      CAM: "MID",
      LM: "MID",
      RM: "MID",
      LW: "MID",
      RW: "MID",
      CF: "ATT",
      ST: "ATT"
    };
    this.skills = {
      GK: this.gk_skills,
      DEF: this.def_skills,
      MID: this.mid_skills,
      ATT: this.att_skills
    };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  componentDidUpdate(prevProps, prevState) {
    let curr_data = this.state.data;

    if (prevProps.player1 !== this.props.player1) {
      if (this.props.player1 === undefined) {
        this.setState({
          player1: undefined,
          player2: undefined,
          captions: {},
          data: []
        });
        return;
      }

      //select attributes by position of player1
      const attr = this.skills[this.position[this.props.player1.BP]];

      //populate attribute names
      let attr_names = {};
      attr.map(d => {
        attr_names["point" + attr.indexOf(d)] = d;
      });

      //populate attribute values for player 1
      let attr_values1 = {};
      attr.map(d => {
        attr_values1["point" + attr.indexOf(d)] =
          parseInt(this.props.player1[d]) / 100;
      });

      //populate attribute values for player 2
      let attr_values2 = {};
      attr.map(d => {
        attr_values2["point" + attr.indexOf(d)] =
          parseInt(this.props.player2[d]) / 100;
      });

      curr_data = [
        { data: attr_values1, meta: { color: "red" } },
        { data: attr_values2, meta: { color: "green" } }
      ];

      this.setState({
        player1: this.props.player1,
        player2: this.props.player2,
        data: curr_data,
        captions: attr_names
      });
    }

    if (prevProps.player2 !== this.props.player2) {
      if (prevProps.player1 === this.props.player1) {
        if (this.props.player1 === undefined) {
          this.setState({
            player1: undefined,
            player2: undefined,
            captions: {},
            data: []
          });
          return;
        }
        //select attributes by position of player1
        const attr = this.skills[this.position[this.props.player1.BP]];

        //populate attribute names
        let attr_names = {};
        attr.map(d => {
          attr_names["point" + attr.indexOf(d)] = d;
        });

        //populate attribute values for player 2
        let attr_values2 = {};
        attr.map(d => {
          attr_values2["point" + attr.indexOf(d)] =
            parseInt(this.props.player2[d]) / 100;
        });

        curr_data[1] = { data: attr_values2, meta: { color: "green" } };

        this.setState({
          player2: this.props.player2,
          data: curr_data
        });
      }
    }
  }

  //Tooltip
  //positioning the tooltip
  handleMouseMove = e => {
    this.mousePos = [e.pageX, e.pageY];
  };

  handleToolTip = dot => {
    this.setState({ dot });
  };

  //render state to Page
  render() {
    const dot = this.state.dot;
    return <div>{this.displayRadarPlot(dot)}</div>;
  }

  displayRadarPlot = dot => {
    console.log(dot);
    if (this.state.player1 !== undefined) {
      return (
        <div>
          <RadarChart
            captions={this.state.captions}
            data={this.state.data}
            size={350}
            options={{
              scales: 5,
              captionMargin: 18,
              dots: true,
              dotProps: () => ({
                className: "dot",
                mouseEnter: this.handleToolTip,
                mouseLeave: this.handleToolTip
              })
            }}
          />
          {dot.key && (
            <div
              className="radar-tooltip"
              style={{
                left: this.mousePos[0] - 1000,
                top: this.mousePos[1] - 110
              }}
            >
              <span>
                <h3>{Math.ceil(dot.value * 100)}</h3>
              </span>
            </div>
          )}
        </div>
      );
    }
  };
}

export default RadarPlot;
