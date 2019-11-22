import React, { Component } from "react";
import Radar from "react-d3-radar";

class RadarPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: undefined,
      player2: undefined,
      plot_points: {}
    };
    this.gk_skills = [
      "Goalkeeping",
      "GK Diving",
      "GK Handling",
      "GK Kicking",
      "GK Positioning",
      "GK Reflexes"
    ];
    this.def_skills = [
      "Interceptions",
      "Marking",
      "Standing Tackle",
      "Sliding Tackle",
      "Strength",
      "Jumpimg"
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    let curr_plot_points = this.state.plot_points;

    if (prevProps.player1 !== this.props.player1) {
      //select attributes by position of player1
      const attr = this.skills[this.position[this.props.player1.BP]];

      //populate attribute names
      const attr_names = attr.map(d => {
        return { key: "point" + attr.indexOf(d), label: d };
      });

      //populate attribute values for player 1
      let attr_values1 = {};
      attr.map(d => {
        attr_values1["point" + attr.indexOf(d)] = this.props.player1[d];
      });

      //populate attribute values for player 2
      let attr_values2 = {};
      attr.map(d => {
        attr_values2["point" + attr.indexOf(d)] = this.props.player2[d];
      });

      curr_plot_points = {
        variables: attr_names,
        sets: [
          { key: "player1", label: "Player1 Attributes", values: attr_values1 },
          { key: "player2", label: "Player2 Attributes", values: attr_values2 }
        ]
      };

      this.setState({
        player1: this.props.player1,
        plot_points: curr_plot_points
      });
    }

    if (prevProps.player2 !== this.props.player2) {
      if (prevProps.player1 == this.props.player1) {
        const attr = curr_plot_points.variables.map(d => {
          return d.label;
        });

        //populate attribute values for player 2
        let attr_values2 = {};
        attr.map(d => {
          attr_values2["point" + attr.indexOf(d)] = this.props.player2[d];
        });

        curr_plot_points.sets[1].values = attr_values2;
        this.setState({
          plot_points: curr_plot_points
        });
      }

      this.setState({
        player2: this.props.player2
      });
    }
  }
  render() {
    return <div>{this.displayRadarPlot()}</div>;
  }

  getPlayer = playerNo => {
    if (playerNo == 1) {
      return this.props.player1 === undefined ? " " : this.props.player1.Name;
    } else if (playerNo == 2) {
      return this.props.player2 === undefined ? " " : this.props.player2.Name;
    }
  };

  displayRadarPlot = () => {
    if (this.state.player1 != undefined) {
      return (
        <Radar
          width={500}
          height={500}
          padding={70}
          domainMax={100}
          highlighted={null}
          onHover={point => {
            if (point) {
              console.log("hovered over a data point");
            } else {
              console.log("not over anything");
            }
          }}
          data={this.state.plot_points}
        />
      );
    }
  };
}

export default RadarPlot;
