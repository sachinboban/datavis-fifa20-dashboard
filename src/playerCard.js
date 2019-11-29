import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Grid
} from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import PlayerBar from "./playerBar";
import avatarPlaceholder from "./img/avatar-placeholder.jpg";
import leftFoot from "./img/left.png";
import rightFoot from "./img/right.png";
import bothFoot from "./img/both.png";

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.playerColor = ["red", "green"];
    this.colormap = {
      GK: "orange",
      DEF: "blue",
      MID: "green",
      ATT: "red"
    };
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
    const background_color = ["antiqueWhite", "lavender"];
    if (this.state.players.length === 1) {
      return this.getSinglePlayerView(background_color);
    } else if (this.state.players.length === 2) {
      return this.getDoublePlayerView(background_color);
    }
  };

  //helper methods
  //view when single player is selected
  getSinglePlayerView = background_color => {
    const style_col = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const index = 0;
    const player = this.state.players[index];
    return (
      <Col key={"player" + index} className="player-card">
        <Card style={{ backgroundColor: background_color[index] }}>
          <Grid container justify="center" alignItems="center">
            {/*/////////////Player Image//////////////*/}
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
          {/*/////////////Player Name and Country//////////////*/}
          <Grid container justify="center" alignItems="center">
            <CardHeader
              align="center"
              title={player ? player.Name : "Player Name"}
              subheader={player ? player.Country : "Country"}
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Row>
              {/*/////////////Player Age//////////////*/}
              <Col sm="auto">
                <Container>
                  <Row>
                    <Col style={style_col}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {player ? "Age: " + player.Age : "Player Age"}
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Height//////////////*/}
                    <Col style={style_col}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {player ? "Height: " + player.Height : "Player Height"}
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Position//////////////*/}
                    <Col style={style_col}>
                      <svg height="15" width="15">
                        <circle
                          className="player-comp-pos"
                          cx="7.5"
                          cy="7.5"
                          r="7.5"
                          style={{
                            fill: this.colormap[this.position[player.BP]]
                          }}
                        >
                          <title>
                            {player
                              ? "Position: " + this.position[player.BP]
                              : "Position"}
                          </title>
                        </circle>
                      </svg>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {player ? player.Position : "Player Position"}
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Foot//////////////*/}
                    <Col style={style_col}>
                      <img
                        src={this.getImage(player.foot)}
                        alt={player ? "Foot: " + player.foot : "Player Foot"}
                        title={player ? "Foot: " + player.foot : "Player Foot"}
                        style={{ height: "40px", width: "72px" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Weak Foot//////////////*/}
                    <Col style={style_col}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {"Weak Foot"}
                      </Typography>
                      <StarRatings
                        rating={parseInt(player["W/F"])}
                        starRatedColor="gold"
                        starEmptyColot="gray"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="1px"
                        svgIconViewBox="0 5 51 48"
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Skill Moves//////////////*/}
                    <Col style={style_col}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {"Skill Moves"}
                      </Typography>
                      <StarRatings
                        rating={parseInt(player["SM"])}
                        starRatedColor="gold"
                        starEmptyColot="gray"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="1px"
                        svgIconViewBox="5 5 51 48"
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col>
                {/*/////////////Player Attributes Bar Chart//////////////*/}
                {/*
                <PlayerBar
                  data={this.getPercentile(index)}
                  label="Percentile"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                */}
                <PlayerBar
                  data={player.Overall}
                  label="Overall"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.PAC}
                  label="Pace"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.SHO}
                  label="Shooting"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.PAS}
                  label="Passing"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.DRI}
                  label="Dribbling"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.DEF}
                  label="Defending"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
                <PlayerBar
                  data={player.PHY}
                  label="Physical"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[index]}
                />
              </Col>
            </Row>
          </Grid>
        </Card>
      </Col>
    );
  };

  getDoublePlayerView = background_color => {
    const style_col = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const index = 0;
    const player = this.state.players;
    return (
      <Col key={"player" + index} className="player-card">
        <Card style={{ backgroundColor: background_color[index] }}>
          <Grid container justify="center" alignItems="center">
            <Col style={style_col}>
              {/*/////////////Player Image//////////////*/}
              <Avatar
                src={
                  player[0] && player[0].Image && player[0].Image !== "error"
                    ? player[0].Image
                    : avatarPlaceholder
                }
                onError={() => {
                  this.onError(index);
                }}
              />
            </Col>
            <Col style={style_col}>
              <Avatar
                src={
                  player[1] && player[1].Image && player[1].Image !== "error"
                    ? player[1].Image
                    : avatarPlaceholder
                }
                onError={() => {
                  this.onError(1);
                }}
              />
            </Col>
          </Grid>
          {/*/////////////Player Name and Country//////////////*/}
          <Grid container justify="center" alignItems="center">
            <Col style={style_col}>
              <CardHeader
                align="center"
                title={player[0] ? player[0].Name : "Player Name"}
                subheader={player[0] ? player[0].Country : "Country"}
              />
            </Col>
            <Col style={style_col}>
              <CardHeader
                align="center"
                title={player[1] ? player[1].Name : "Player Name"}
                subheader={player[1] ? player[1].Country : "Country"}
              />
            </Col>
          </Grid>
          <Grid>
            <Container>
              <Row>
                {/*/////////////Player Age//////////////*/}
                <Col style={style_col}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[0] ? player[0].Age : "Player Age"}
                  </Typography>
                </Col>
                <Col style={style_col}>Age</Col>
                {/*/////////////Player Age//////////////*/}
                <Col style={style_col}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[1] ? player[1].Age : "Player Age"}
                  </Typography>
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Height//////////////*/}
                <Col style={style_col}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[0] ? player[0].Height : "Playe Height"}
                  </Typography>
                </Col>
                <Col style={style_col}>Height</Col>
                {/*/////////////Player Height//////////////*/}
                <Col style={style_col}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[1] ? player[1].Height : "Playe Height"}
                  </Typography>
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Position//////////////*/}
                <Col style={style_col}>
                  <svg height="15" width="15">
                    <circle
                      className="player-comp-pos"
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      style={{
                        fill: this.colormap[this.position[player[0].BP]]
                      }}
                    >
                      <title>
                        {player[0]
                          ? "Position: " + this.position[player[0].BP]
                          : "Position"}
                      </title>
                    </circle>
                  </svg>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[0] ? player[0].Position : "Player Position"}
                  </Typography>
                </Col>
                <Col style={style_col}>Position</Col>
                {/*/////////////Player Position//////////////*/}
                <Col style={style_col}>
                  <svg height="15" width="15">
                    <circle
                      className="player-comp-pos"
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      style={{
                        fill: this.colormap[this.position[player[1].BP]]
                      }}
                    >
                      <title>
                        {player[1]
                          ? "Position: " + this.position[player[1].BP]
                          : "Position"}
                      </title>
                    </circle>
                  </svg>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {player[1] ? player[1].Position : "Player Position"}
                  </Typography>
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Foot//////////////*/}
                <Col style={style_col}>
                  <img
                    src={this.getImage(player[0].foot)}
                    alt={player[0] ? "Foot: " + player[0].foot : "Player Foot"}
                    title={
                      player[0] ? "Foot: " + player[0].foot : "Player Foot"
                    }
                    style={{ height: "30px", width: "54px" }}
                  />
                </Col>
                <Col style={style_col}>Foot</Col>
                {/*/////////////Player Foot//////////////*/}
                <Col style={style_col}>
                  <img
                    src={this.getImage(player[1].foot)}
                    alt={player[1] ? "Foot: " + player[1].foot : "Player Foot"}
                    title={
                      player[1] ? "Foot: " + player[1].foot : "Player Foot"
                    }
                    style={{ height: "30px", width: "54px" }}
                  />
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Weak Foot//////////////*/}
                <Col style={style_col}>
                  <StarRatings
                    rating={parseInt(player[0]["W/F"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="0 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Weak Foot</Col>
                {/*/////////////Player Weak Foot//////////////*/}
                <Col style={style_col}>
                  <StarRatings
                    rating={parseInt(player[1]["W/F"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="0 5 51 48"
                  />
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Skill Moves//////////////*/}
                <Col style={style_col}>
                  <StarRatings
                    rating={parseInt(player[0]["SM"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Skill Moves</Col>
                {/*/////////////Player Skill Moves//////////////*/}
                <Col style={style_col}>
                  <StarRatings
                    rating={parseInt(player[1]["SM"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
              </Row>
              {/*/////////////Player Attributes Bar Chart//////////////*/}
              {/*
              <Row>
                <Col>
                  <PlayerBar
                    data={this.getPercentile(0)}
                    label="Percentile"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                </Col>
                <Col style={style_col}>Percentile</Col>
                <Col>
                  <PlayerBar
                    data={this.getPercentile(1)}
                    label="Percentile"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              */}
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].Overall}
                    label="Overall"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].Overall >= player[1].Overall ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Overall</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].Overall <= player[1].Overall ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].Overall}
                    label="Overall"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].PAC}
                    label="Pace"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].PAC >= player[1].PAC ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Pace</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].PAC <= player[1].PAC ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].PAC}
                    label="Pace"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].SHO}
                    label="Shooting"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].SHO >= player[1].SHO ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Shooting</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].SHO <= player[1].SHO ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].SHO}
                    label="Shooting"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].PAS}
                    label="Passing"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].PAS >= player[1].PAS ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Passing</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].PAS <= player[1].PAS ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].PAS}
                    label="Passing"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].DRI}
                    label="Dribbling"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].DRI >= player[1].DRI ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Dribbling</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].DRI <= player[1].DRI ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].DRI}
                    label="Dribbling"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].DEF}
                    label="Defending"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].DEF >= player[1].DEF ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Defending</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].DEF <= player[1].DEF ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].DEF}
                    label="Defending"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col}>
                  <PlayerBar
                    data={player[0].PHY}
                    label="Physical"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                  />
                  <StarRatings
                    rating={player[0].PHY >= player[1].PHY ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col}>Physical</Col>
                <Col style={style_col}>
                  <StarRatings
                    rating={player[0].PHY <= player[1].PHY ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player[1].PHY}
                    label="Physical"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                  />
                </Col>
              </Row>
            </Container>
          </Grid>
        </Card>
      </Col>
    );
  };
  /*
  //view when two players are selected
  getDoublePlayerView = background_color => {
    const style_col = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const player_cards = this.state.players.map(player => {
      const index = this.state.players.indexOf(player);
      return (
        <Col key={"player" + index} className="player-card">
          <Card style={{ backgroundColor: background_color[index] }}>
            <Grid container justify="center" alignItems="center">
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
            <Grid container justify="center" alignItems="center">
              <CardHeader
                align="center"
                title={player ? player.Name : "Player Name"}
                subheader={player ? player.Country : "Country"}
                style={{}}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Row>
                <Col sm="auto">
                  <Container>
                    <Row>
                      <Col style={style_col}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {player ? "Age: " + player.Age : "Player Age"}
                        </Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={style_col}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {player ? "Height: " + player.Height : "Player Age"}
                        </Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={style_col}>
                        <svg height="15" width="15">
                          <circle
                            className="player-comp-pos"
                            cx="7.5"
                            cy="7.5"
                            r="7.5"
                            style={{
                              fill: this.colormap[this.position[player.BP]]
                            }}
                          >
                            <title>
                              {player
                                ? "Position: " + this.position[player.BP]
                                : "Position"}
                            </title>
                          </circle>
                        </svg>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {player ? player.Position : "Player Position"}
                        </Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={style_col}>
                        <img
                          src={this.getImage(player.foot)}
                          alt={player ? "Foot: " + player.foot : "Player Foot"}
                          title={
                            player ? "Foot: " + player.foot : "Player Foot"
                          }
                          style={{ height: "40px", width: "72px" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={style_col}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {"Weak Foot"}
                        </Typography>
                        <StarRatings
                          rating={parseInt(player["W/F"])}
                          starRatedColor="gold"
                          starEmptyColot="gray"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="3px"
                          svgIconViewBox="0 5 51 48"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={style_col}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {"Skill Moves"}
                        </Typography>
                        <StarRatings
                          rating={parseInt(player["SM"])}
                          starRatedColor="gold"
                          starEmptyColot="gray"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="3px"
                          svgIconViewBox="5 5 51 48"
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col>
                  <PlayerBar
                    data={this.getPercentile(index)}
                    label="Percentile"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.Overall}
                    label="Overall"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.PAC}
                    label="Pace"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.SHO}
                    label="Shooting"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.PAS}
                    label="Passing"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.DRI}
                    label="Dribbling"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.DEF}
                    label="Defending"
                    color={this.playerColor[index]}
                  />
                  <PlayerBar
                    data={player.PHY}
                    label="Physical"
                    color={this.playerColor[index]}
                  />
                </Col>
              </Row>
            </Grid>
          </Card>
        </Col>
      );
    });
    return player_cards;
  };
*/
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
