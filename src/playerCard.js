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
import avatarPlaceholder from "./img/avatar-placeholder.jpg";

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.players !== this.props.players) {
      this.setState({
        players: this.props.players
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
      return (
        <Col key={"player" + index} className="player-card">
          <Card style={{ height: "100%" }}>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "20%" }}
            >
              <Avatar
                src={
                  player && player.Image && player.Image != "error"
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
              style={{ height: "55%" }}
            >
              <CardHeader
                align="center"
                title={player ? player.Name : "Player Name"}
                subheader={player ? player.Country : "Country"}
              />
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "20%" }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {player ? player.Age : "Player Age"}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {player ? player.Position : "Player Position"}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {player ? player.Potential : "Player Potential"}
                </Typography>
              </CardContent>
            </Grid>
            <Grid
              style={{
                height: "5%",
                backgroundColor: index === 0 ? "red" : "green"
              }}
            ></Grid>
          </Card>
        </Col>
      );
    });
    return player_cards;
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
