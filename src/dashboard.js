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
      selectedPlayer: undefined
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
            selectedPlayer: undefined
          });
        });
      })
      .catch(function(err) {
        console.log("Error loading player data");
      });
  }

  onSelectionChange = selectedPlayer => {
    this.setState({
      playerData: this.state.playerData,
      selectedPlayer: selectedPlayer
    });
  };

  render() {
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
            <PlayerCard player={this.state.selectedPlayer} />
            <RadarPlot
              player1={this.state.selectedPlayer}
              player2={this.state.playerData[1]}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
