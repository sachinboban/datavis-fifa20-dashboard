import React, { Component } from "react";
import Radar from "react-d3-radar";

class RadarPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: undefined,
      player2: undefined
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.player1 !== this.props.player1) {
      this.setState({
        player1: this.props.player1
      });
    }

    if (prevProps.player2 !== this.props.player2) {
      this.setState({
        player2: this.props.player2
      });
    }
  }
  render() {
    return (
      <div>
        <Radar
          width={500}
          height={500}
          padding={70}
          domainMax={10}
          highlighted={null}
          onHover={point => {
            if (point) {
              console.log("hovered over a data point");
            } else {
              console.log("not over anything");
            }
          }}
          data={{
            variables: [
              { key: "resilience", label: "Resilience" },
              { key: "strength", label: "Strength" },
              { key: "adaptability", label: "Adaptability" },
              { key: "creativity", label: "Creativity" },
              { key: "openness", label: "Open to Change" },
              { key: "confidence", label: "Confidence" }
            ],
            sets: [
              {
                key: "me",
                label: "My Scores",
                values: {
                  resilience: 4,
                  strength: 6,
                  adaptability: 7,
                  creativity: 2,
                  openness: 8,
                  confidence: 1
                }
              },
              {
                key: "everyone",
                label: "Everyone",
                values: {
                  resilience: 10,
                  strength: 8,
                  adaptability: 6,
                  creativity: 4,
                  openness: 2,
                  confidence: 0
                }
              }
            ]
          }}
        />
      </div>
    );
  }

  getPlayer = playerNo => {
    if (playerNo == 1) {
      return this.props.player1 === undefined ? " " : this.props.player1.Name;
    } else if (playerNo == 2) {
      return this.props.player2 === undefined ? " " : this.props.player2.Name;
    }
  };
}

export default RadarPlot;
