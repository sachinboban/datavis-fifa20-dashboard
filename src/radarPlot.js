import React, { Component } from "react";
import RadarChart from "react-svg-radar-chart";
import { Col } from "react-bootstrap";
import "./css/radar.css";

class RadarPlot extends Component {
  constructor(props) {
    super(props);
    this.mode = 1;
    this.state = {
      input: [],
      data: [],
      captions: {},
      dot: {}
    };
    this.mousePos = [0, 0];
    this.aggr_skills = ["Goalkeeping", "Defense", "Midfield", "Attack"];
    this.gk_skills = [
      "GK Handling",
      "GK Diving",
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
    let curr_data = [];
    let captions = [];

    //add click event listeners to captions
    const caption_class = document.getElementsByClassName("caption");
    if (caption_class.length !== 0) {
      for (var ind = 0; ind < caption_class.length; ind++) {
        caption_class[ind].addEventListener("click", this.handleMouseClick);
      }
    }

    //check for update
    if (prevProps.input !== this.props.input) {
      if (this.props.input[0] === undefined) {
        this.reset();
        return;
      }

      let attr;
      if (this.props.input[0].BP === undefined) {
        //set attributes for aggregate view
        this.mode = 0;
        //select attributes for aggregate
        attr = this.aggr_skills;
        [curr_data, captions] = [...this.getFormattedDataAndCaption(attr)];
      } else {
        //set attributes for player view
        this.mode = 1;
        //select attributes by position of input[0]
        attr = this.skills[this.position[this.props.input[0].BP]];
        [curr_data, captions] = [...this.getFormattedDataAndCaption(attr)];
      }

      this.setState({
        input: this.props.input,
        data: curr_data,
        captions: captions
      });
    }
  }

  //render state to page
  render() {
    //console.log(this.state);
    const dot = this.state.dot;
    return <div>{this.displayRadarPlot(dot)}</div>;
  }

  //helper methods////////////////////////////////
  displayRadarPlot = dot => {
    if (this.state.input.length !== 0) {
      return (
        <Col>
          <RadarChart
            captions={this.state.captions}
            data={this.state.data}
            size={400}
            options={{
              scales: 5,
              captionMargin: 10,
              setViewBox: () => "-75 -20 500 500",
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
                left: this.mousePos[0],
                top: this.mousePos[1]
              }}
            >
              <span>{Math.ceil(dot.value * 100)}</span>
            </div>
          )}
        </Col>
      );
    }
  };

  //handle mouse events////////////////////////////////
  //toggle view on mouse click on caption
  handleMouseClick = e => {
    //toggle mode
    this.mode = this.mode === 0 ? 1 : 0;
    //console.log(e.target.innerHTML);

    let curr_data, captions, attr;
    if (this.mode === 0) {
      //set attributes for aggregate view
      //select attributes for aggregate
      attr = this.aggr_skills;
      [curr_data, captions] = [...this.getFormattedDataAndCaption(attr)];
    } else {
      //set attributes for position view
      //select attributes by position clicked on
      switch (e.target.innerHTML) {
        case "Goalkeeping":
          attr = this.gk_skills;
          break;
        case "Defense":
          attr = this.def_skills;
          break;
        case "Midfield":
          attr = this.mid_skills;
          break;
        case "Attack":
          attr = this.att_skills;
          break;
      }
      [curr_data, captions] = [...this.getFormattedDataAndCaption(attr)];
    }
    this.setState({
      data: curr_data,
      captions: captions
    });
  };

  //Tooltip
  //positioning the tooltip
  handleMouseMove = e => {
    this.mousePos = [e.pageX, e.pageY];
  };

  handleToolTip = dot => {
    this.setState({ dot });
  };

  //format data for plot////////////////////////////////
  getDataValuesForPlot = (attr, data, item_no) => {
    //API Info: attr = [List of attr], data=player data, item_no=1/2

    //populate attribute values for player or group
    let attr_value = {};
    if (this.mode === 0) {
      let agg_values = [];
      agg_values.push(
        this.gk_skills.map(d => {
          return parseInt(data[d]) / 100;
        })
      );
      agg_values.push(
        this.def_skills.map(d => {
          return parseInt(data[d]) / 100;
        })
      );
      agg_values.push(
        this.mid_skills.map(d => {
          return parseInt(data[d]) / 100;
        })
      );
      agg_values.push(
        this.att_skills.map(d => {
          return parseInt(data[d]) / 100;
        })
      );

      const add = (val1, val2) => val1 + val2;

      const avg_values = agg_values.map(list_vals => {
        const sum = list_vals.reduce(add);
        return sum / list_vals.length;
      });
      attr.map(d => {
        attr_value["point" + attr.indexOf(d)] = avg_values[attr.indexOf(d)];
        return 0;
      });
      //console.log(attr_value);
    } else {
      attr.map(d => {
        attr_value["point" + attr.indexOf(d)] = parseInt(data[d]) / 100;
        return 0;
      });
    }

    let player_color;
    if (item_no === 1) {
      player_color = "red";
    } else {
      player_color = "green";
    }

    return { data: attr_value, meta: { color: player_color } };
  };

  getDataCaptionsForPlot = attr => {
    //populate attribute names
    let attr_names = {};
    attr.map(d => {
      attr_names["point" + attr.indexOf(d)] = d;
      return 0;
    });

    return attr_names;
  };

  getFormattedDataAndCaption = attr => {
    let curr_data = [];
    let captions = [];
    const input0 = this.getDataValuesForPlot(attr, this.props.input[0], 1);
    captions = this.getDataCaptionsForPlot(attr);
    curr_data.push(input0);
    if (this.props.input.length === 2) {
      const input1 = this.getDataValuesForPlot(attr, this.props.input[1], 2);
      curr_data.push(input1);
    }
    return [curr_data, captions];
  };

  //reset object////////////////////////////////
  reset = () => {
    this.mode = 1;
    this.setState({
      input: [],
      data: [],
      captions: {},
      dot: {}
    });
    return;
  };
}

export default RadarPlot;
