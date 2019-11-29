import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Grid
} from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import PercentileGraph from "./percentile";
import avatarPlaceholder from "./img/avatar-placeholder.jpg";
import leftFoot from "./img/left.png";
import rightFoot from "./img/right.png";
import bothFoot from "./img/both.png";

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overalls: [],
      players: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.players !== this.props.players) {
      this.setState({
        players: this.props.players
      });
    }

    if (prevProps.overalls !== this.props.overalls) {
      this.setState({
        overalls: this.props.overalls
      });
    }
  }

  render() {
    return <Row>{this.getPlayerCards()}</Row>;
  }

  //helper methods
  getPlayerCards = () => {
    const player_cards = this.state.players.map(player => {
      const index = this.state.players.indexOf(player);
      const background_color = ["antiqueWhite", "lavender"];
      return (
        <Col key={"player" + index} className="player-card">
          <Card
            style={{ height: "100%", backgroundColor: background_color[index] }}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "20%" }}
            >
              <Avatar
                src={
                  player && player.Image && player.Image !== "error"
                    ? player.Image
                    : avatarPlaceholder
                }
                onError={() => {
                  this.onError(index);
                }}
              />
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "30%" }}
            >
              <CardHeader
                align="center"
                title={player ? player.Name : "Player Name"}
                subheader={player ? player.Country : "Country"}
                style={{}}
              />
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "45%" }}
            >
              <Col style={{ width: "50%" }}>
                <Grid align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player ? "AGE: " + player.Age : "Player Age"}
                  </Typography>
                </Grid>
                <Grid align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player ? player.Position : "Player Position"}
                  </Typography>
                </Grid>
                <Grid align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player ? "OVR: " + player.Potential : "Player Potential"}
                  </Typography>
                </Grid>
                <Grid align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <img
                      src={this.getImage(player.foot)}
                      alt={player ? "Foot: " + player.foot : "Player Foot"}
                      title={player ? "Foot: " + player.foot : "Player Foot"}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Typography>
                </Grid>
              </Col>
              <Col style={{ width: "50%" }}>
                <Grid align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    Percentile Rank
                  </Typography>
                </Grid>
                <Grid align="center">
                  <PercentileGraph percentile={this.getPercentile(index)} />
                </Grid>
              </Col>
            </Grid>
            <Grid
              align="center"
              style={{
                height: "5%",
                backgroundColor: index === 0 ? "red" : "green"
              }}
            >
              <CardContent />
            </Grid>
          </Card>
        </Col>
      );
    });
    return player_cards;
  };

  //helper methods
  getImage = foot => {
    if (foot.toLowerCase() === "left") return leftFoot;
    else if (foot.toLowerCase() === "right") return rightFoot;
    else return bothFoot;
  };

  getPercentile = index => {
    const player_overall = this.state.players[index].Overall;
    const index_player =
      this.state.overalls.indexOf(player_overall) +
      Math.ceil(
        (this.state.overalls.lastIndexOf(player_overall) -
          this.state.overalls.indexOf(player_overall) +
          1) /
          2
      );
    const result = ((100 * index_player) / this.state.overalls.length).toFixed(
      2
    );
    console.log(index);
    return result;
  };

  onError = index => {
    const player = this.state.players;
    player[index].Image = "error";
    this.setState({
      players: player
    });
  };
}

export default PlayerCard;
