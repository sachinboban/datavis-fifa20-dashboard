import React from "react";
import PlayerTable from "./table";
import PlayerCard from "./playerCard";
import { Container, Row, Col } from "react-bootstrap";
import * as d3 from "d3";
import data from "./data/raw.csv";
import leagueData from "./data/team-league.csv";
import RadarPlot from "./radarPlot";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      selectedPlayer: []
    };
  }

  componentDidMount() {
    d3.csv(data)
      .then(data => {
        // data.forEach((player,index) => player.id = index);
        d3.csv(leagueData).then(leagueData => {
          let clubToLeagueMap = {};
          leagueData.forEach(row => {
            clubToLeagueMap[row["Name"]] = row["League"];
          });

          data.forEach(
            player =>
              (player.League = clubToLeagueMap[player["Club"]]
                ? clubToLeagueMap[player["Club"]]
                : "")
          );
          this.setState({
            playerData: data,
            selectedPlayer: []
          });
        });
      })
      .catch(function(err) {
        console.log("Error loading player data");
      });
  }

  onSelectionChange = selectedPlayer => {
    let players = [...this.state.selectedPlayer];
    if (selectedPlayer === undefined) {
      players = [];
    } else {
      if (players.length <= 1) {
        players.push(selectedPlayer);
      } else if (players.length === 2) {
        if (players[0] === selectedPlayer) {
          players.pop();
        } else {
          players[1] = selectedPlayer;
        }
      }
    }
    this.setState({
      playerData: this.state.playerData,
      selectedPlayer: players
    });
  };

  getOveralls = () => {
    const overalls = this.state.playerData.map(d => {
      return d.Overall;
    });
    overalls.sort();
    return overalls;
  };

  render() {
    //console.log(this.state.selectedPlayer);
    const test = this.state.selectedPlayer;
    if (test.length !== 0) {
      //test[0].BP = undefined;
    }
    return (
      <Container fluid>
        <Row>
          <Col sm="8">
            <PlayerTable
              data={this.state.playerData}
              onSelectionChange={this.onSelectionChange}
            />{" "}
          </Col>
          <Col sm="4">
            <PlayerCard
              overalls={this.getOveralls()}
              players={this.state.selectedPlayer}
            />
            <RadarPlot key="radar-plot" input={test} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
