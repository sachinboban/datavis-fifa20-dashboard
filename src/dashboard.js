import React from "react";
import PlayerTable from "./table";
import PlayerCard from "./playerCard";
import {Container, Row, Col} from "react-bootstrap";
import * as d3 from "d3";
import playerData from "./data/raw.csv";
import leagueData from "./data/team-league.csv";
import getBarChartJSX from "./barChart";
import getPositionIndicator from "./positionIndicator";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerData: [],
            selectedPlayers: undefined
        };
    }

    preProcessData(playerData, leagueData) {
        let clubToLeagueMap = {};
        leagueData.forEach(row => {
            clubToLeagueMap[row["Name"]] = row["League"];
        });

        let transformedData = [];
        for (let player of playerData) {
            player.League = clubToLeagueMap[player["Club"]];
            player.Overall = getBarChartJSX(player.Overall, 80);
            player.Pos = getPositionIndicator(player.Position);
            if (player.League && player.Club) {
                transformedData.push(player);
            }
        }

        return transformedData;
    }

    componentDidMount() {
        this.setState({
            playerData: [],
            selectedPlayers: undefined
        });
        d3.csv(playerData).then(playerData => {
            d3.csv(leagueData).then(leagueData => {

                let transformedData = this.preProcessData(playerData, leagueData);
                this.setState({
                    playerData: transformedData,
                    selectedPlayers: undefined
                });
            });
        })
            .catch(function (err) {
                console.log("Error loading player data");
            });
    }

    onSelectionChange = selectedPlayers => {
        this.setState({
            playerData: this.state.playerData,
            selectedPlayers: selectedPlayers
        });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="8" className="table-view">
                        <PlayerTable
                            data={this.state.playerData}
                            onSelectionChange={this.onSelectionChange}
                        />
                    </Col>
                    <Col sm="4" className="player-view">
                        <PlayerCard player={this.state.selectedPlayers ? this.state.selectedPlayers[0]: undefined}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dashboard;
