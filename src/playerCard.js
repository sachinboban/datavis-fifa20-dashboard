import React from "react";
import { Card, CardHeader, Typography, Avatar, Grid, Chip, CardContent } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import PlayerBar from "./playerBar";
import avatarPlaceholder from "./img/avatar-placeholder.jpg";
import leftFoot from "./img/left.png";
import rightFoot from "./img/right.png";
import bothFoot from "./img/both.png";
import RadarPlot from "./radarPlot";

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.playerColor = ["red", "green"];
    this.backgroundColor = ["antiqueWhite", "lavender", "white"]; //Player1, Player2, Default

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
    if (this.state.players.length === 1) {
      return this.getSinglePlayerView();
    } else if (this.state.players.length === 2) {
      return this.getDoublePlayerView();
    }else{
      return this.renderHelpInfo();
    }
  };

  renderHelpInfo = () => {
    return (
        <Col>
          <Card>
            <Grid container justify="center" alignItems="center">
              <CardHeader align="center"
                          title="Welcome to FIFA 20 Dashboard!">
              </CardHeader>
            </Grid>
            <Grid>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="span">
                  <h5>Player Information</h5>
                  <ul>
                    <li>To see details of a player, click on any of the players on the left.</li>
                    <li>Select any two players to compare them</li>
                  </ul>

                  <h5>Table Manipulation</h5>
                  <ul>
                    <li>Click on the arrow next to column headers to sort the table in ascending/
                      descending order.
                    </li>
                    <li>Click on the plus icon next to column header to group by that column
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Col>
    );
  };

  //helper methods
  //view when single player is selected
  getSinglePlayerView = () => {
    const style_col = [
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[0]
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[1]
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[2]
      }
    ];
    const index = 2; //default color for background
    const player_curr = this.state.players[0];
    console.log(player_curr);
    const overall = player_curr.Overall.props.children.props.children;
    return (
      <Col key={"player" + index} className="player-card">
        <Card style={{ backgroundColor: this.backgroundColor[index] }}>
          <Grid container justify="center" alignItems="center">
            {/*/////////////Player Image//////////////*/}
            <Col style={style_col[parseInt(player_curr.selectionIdx)]}>
              <Avatar
                src={
                  player_curr &&
                  player_curr.Image &&
                  player_curr.Image !== "error"
                    ? player_curr.Image
                    : avatarPlaceholder
                }
                onError={() => {
                  this.onError(0);
                }}
              />
            </Col>
          </Grid>
          {/*/////////////Player Name and Country//////////////*/}
          <Grid container justify="center" alignItems="center">
            <CardHeader
              align="center"
              title={player_curr ? player_curr.Name : "Player Name"}
              subheader={player_curr ? player_curr.Country : "Country"}
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <RadarPlot key="radar-plot" input={this.state.players} />
          </Grid>
          <Grid container justify="center" alignItems="center" style={{marginTop: '-15%'}}>
            <Row>
              {/*/////////////Player Age//////////////*/}
              <Col sm="auto">
                <Container>
                  <Row>
                    <Col style={style_col[index]}>
                      <Chip label=  {player_curr ? "Age: " + player_curr.Age : "Player Age"} />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 5}}>
                    {/*/////////////Player Height//////////////*/}
                    <Col style={style_col[index]}>
                      <Chip label= {player_curr  ? "Height: " + player_curr.Height
                          : "Player Height"}/>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 5, height:30}}>
                    {/*/////////////Player Position//////////////*/}
                    <Col style={style_col[index]}>
                      {player_curr.Pos}
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Foot//////////////*/}
                    <Col style={style_col[index]}>
                      <img
                        src={this.getImage(player_curr.foot)}
                        alt={
                          player_curr
                            ? "Foot: " + player_curr.foot
                            : "Player Foot"
                        }
                        title={
                          player_curr
                            ? "Foot: " + player_curr.foot
                            : "Player Foot"
                        }
                        style={{ height: "40px", width: "72px" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/*/////////////Player Weak Foot//////////////*/}
                    <Col style={style_col[index]}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {"Weak Foot"}
                      </Typography>
                      <StarRatings
                        rating={parseInt(player_curr["W/F"])}
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
                    <Col style={style_col[index]}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {"Skill Moves"}
                      </Typography>
                      <StarRatings
                        rating={parseInt(player_curr["SM"])}
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
                  data={overall}
                  label="Overall"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.PAC}
                  label="Pace"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.SHO}
                  label="Shooting"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.PAS}
                  label="Passing"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.DRI}
                  label="Dribbling"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.DEF}
                  label="Defending"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
                <PlayerBar
                  data={player_curr.PHY}
                  label="Physical"
                  showLabel={true}
                  rotateBar={false}
                  color={this.playerColor[0]}
                />
              </Col>
            </Row>
          </Grid>
        </Card>
      </Col>
    );
  };

  getDoublePlayerView = () => {
    const style_col = [
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[0]
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[1]
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.backgroundColor[2]
      }
    ];
    const index = 2; //default color to background
    const player_curr = this.state.players;
    return (
      <Col key={"player" + index} className="player-card">
        <Card style={{ backgroundColor: this.backgroundColor[index] }}>
          <Grid container justify="center" alignItems="center" className="player-card-head">
            <Col style={style_col[parseInt(player_curr[0].selectionIdx)]}>
              {/*/////////////Player Image//////////////*/}
              <Avatar
                src={
                  player_curr[0] &&
                  player_curr[0].Image &&
                  player_curr[0].Image !== "error"
                    ? player_curr[0].Image
                    : avatarPlaceholder
                }
                onError={() => {
                  this.onError(0);
                }}
              />
            </Col>
            <Col style={style_col[parseInt(player_curr[1].selectionIdx)]}>
              <Avatar
                src={
                  player_curr[1] &&
                  player_curr[1].Image &&
                  player_curr[1].Image !== "error"
                    ? player_curr[1].Image
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
            <Col style={style_col[2]}>
              <CardHeader
                align="center"
                disableTypography={true}
                title={<Typography variant="h6" style={{lineHeight: 1.2, fontSize:17, fontWeight:'bold'}}> {player_curr[0] ? player_curr[0].Name : "Player Name"} </Typography>}
                subheader={player_curr[0] ? player_curr[0].Country : "Country"}
              />
            </Col>
            <Col style={style_col[2]}>
              <CardHeader
                align="center"
                disableTypography={true}
                title={<Typography variant="h6" style={{lineHeight: 1.2,fontSize:17, fontWeight:'bold'}}> {player_curr[1] ? player_curr[1].Name : "Player Name"} </Typography>}
                subheader={player_curr[1] ? player_curr[1].Country : "Country"}
              />
            </Col>
          </Grid>
          <Grid container justify="center" alignItems="center" style={{marginTop: '-5%'}}>
            <RadarPlot key="radar-plot" input={this.state.players} />
          </Grid>
          <Grid style={{marginTop: '-20%'}}>
            <Container style={{fontSize: 14}}>
              <Row>
                {/*/////////////Player Age//////////////*/}
                <Col style={style_col[2]}>
                  <Chip label=  {player_curr[0] ? player_curr[0].Age : "Player Age"} />
                </Col>
                <Col style={style_col[2]}>Age</Col>
                {/*/////////////Player Age//////////////*/}
                <Col style={style_col[2]}>
                  <Chip label=  {player_curr[1] ? player_curr[1].Age : "Player Age"} />
                </Col>
              </Row>
              <Row style={{marginTop: 5}} className="height-comp">
                {/*/////////////Player Height//////////////*/}
                <Col style={style_col[2]}>
                  <Chip label= {player_curr[0] ? player_curr[0].Height : "Player Height"}/>
                </Col>
                <Col style={style_col[2]}>Height</Col>
                {/*/////////////Player Height//////////////*/}
                <Col style={style_col[2]}>
                  <Chip label= {player_curr[1] ? player_curr[1].Height : "Player Height"}/>
                </Col>
              </Row>
              <Row style={{marginTop: 5, height:30}}>
                {/*/////////////Player Position//////////////*/}
                <Col style={style_col[2]}>
                  {player_curr[0].Pos}
                </Col>
                <Col style={style_col[2]}>Position</Col>
                {/*/////////////Player Position//////////////*/}
                <Col style={style_col[2]}>
                  {player_curr[1].Pos}
                </Col>
              </Row>
              <Row>
                {/*/////////////Player Foot//////////////*/}
                <Col style={style_col[2]}>
                  <img
                    src={this.getImage(player_curr[0].foot)}
                    alt={
                      player_curr[0]
                        ? "Foot: " + player_curr[0].foot
                        : "Player Foot"
                    }
                    title={
                      player_curr[0]
                        ? "Foot: " + player_curr[0].foot
                        : "Player Foot"
                    }
                    style={{ height: "30px", width: "54px" }}
                  />
                </Col>
                <Col style={style_col[2]}>Foot</Col>
                {/*/////////////Player Foot//////////////*/}
                <Col style={style_col[2]}>
                  <img
                    src={this.getImage(player_curr[1].foot)}
                    alt={
                      player_curr[1]
                        ? "Foot: " + player_curr[1].foot
                        : "Player Foot"
                    }
                    title={
                      player_curr[1]
                        ? "Foot: " + player_curr[1].foot
                        : "Player Foot"
                    }
                    style={{ height: "30px", width: "54px" }}
                  />
                </Col>
              </Row>
              <Row className="foot-comp">
                {/*/////////////Player Weak Foot//////////////*/}
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={parseInt(player_curr[0]["W/F"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="0 5 51 48"
                  />
                </Col>
                <Col style={style_col[2]}>Weak Foot</Col>
                {/*/////////////Player Weak Foot//////////////*/}
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={parseInt(player_curr[1]["W/F"])}
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
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={parseInt(player_curr[0]["SM"])}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col[2]}>Skill Moves</Col>
                {/*/////////////Player Skill Moves//////////////*/}
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={parseInt(player_curr[1]["SM"])}
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
                <Col style={style_col[2]}>Percentile</Col>
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
                <Col style={style_col[2]}>
                  <PlayerBar
                    data={player_curr[0].Overall.props.children.props.children}
                    label="Overall"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                    tooltip={true}
                  />
                  <StarRatings
                    rating={
                      player_curr[0].Overall.props.children.props.children >=
                      player_curr[1].Overall.props.children.props.children
                        ? 1
                        : 0
                    }
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col[2]}>Overall</Col>
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={
                      player_curr[0].Overall.props.children.props.children <=
                      player_curr[1].Overall.props.children.props.children
                        ? 1
                        : 0
                    }
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player_curr[1].Overall.props.children.props.children}
                    label="Overall"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                    tooltip={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={style_col[2]}>
                  <PlayerBar
                    data={player_curr[0].PAC}
                    label="Pace"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                    tooltip={true}
                  />
                  <StarRatings
                    rating={player_curr[0].PAC >= player_curr[1].PAC ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col[2]}>Pace</Col>
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={player_curr[0].PAC <= player_curr[1].PAC ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player_curr[1].PAC}
                    label="Pace"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                    tooltip={true}
                  />
                </Col>
              </Row>
              {/*<Row>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[0].SHO}*/}
              {/*      label="Shooting"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={true}*/}
              {/*      color={this.playerColor[0]}*/}
              {/*    />*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].SHO >= player_curr[1].SHO ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*  <Col style={style_col[2]}>Shooting</Col>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].SHO <= player_curr[1].SHO ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[1].SHO}*/}
              {/*      label="Shooting"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={false}*/}
              {/*      color={this.playerColor[1]}*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*</Row>*/}
              {/*<Row>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[0].PAS}*/}
              {/*      label="Passing"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={true}*/}
              {/*      color={this.playerColor[0]}*/}
              {/*    />*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].PAS >= player_curr[1].PAS ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*  <Col style={style_col[2]}>Passing</Col>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].PAS <= player_curr[1].PAS ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[1].PAS}*/}
              {/*      label="Passing"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={false}*/}
              {/*      color={this.playerColor[1]}*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*</Row>*/}
              {/*<Row>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[0].DRI}*/}
              {/*      label="Dribbling"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={true}*/}
              {/*      color={this.playerColor[0]}*/}
              {/*    />*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].DRI >= player_curr[1].DRI ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*  <Col style={style_col[2]}>Dribbling</Col>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].DRI <= player_curr[1].DRI ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[1].DRI}*/}
              {/*      label="Dribbling"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={false}*/}
              {/*      color={this.playerColor[1]}*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*</Row>*/}
              {/*<Row>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[0].DEF}*/}
              {/*      label="Defending"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={true}*/}
              {/*      color={this.playerColor[0]}*/}
              {/*    />*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].DEF >= player_curr[1].DEF ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*  <Col style={style_col[2]}>Defending</Col>*/}
              {/*  <Col style={style_col[2]}>*/}
              {/*    <StarRatings*/}
              {/*      rating={player_curr[0].DEF <= player_curr[1].DEF ? 1 : 0}*/}
              {/*      starRatedColor="gold"*/}
              {/*      starEmptyColot="gray"*/}
              {/*      numberOfStars={1}*/}
              {/*      starDimension="20px"*/}
              {/*      starSpacing="1px"*/}
              {/*      svgIconViewBox="5 5 51 48"*/}
              {/*    />*/}
              {/*    <PlayerBar*/}
              {/*      data={player_curr[1].DEF}*/}
              {/*      label="Defending"*/}
              {/*      showLabel={false}*/}
              {/*      rotateBar={false}*/}
              {/*      color={this.playerColor[1]}*/}
              {/*    />*/}
              {/*  </Col>*/}
              {/*</Row>*/}
              <Row className="physical-comp">
                <Col style={style_col[2]}>
                  <PlayerBar
                    data={player_curr[0].PHY}
                    label="Physical"
                    showLabel={false}
                    rotateBar={true}
                    color={this.playerColor[0]}
                    tooltip={true}
                  />
                  <StarRatings
                    rating={player_curr[0].PHY >= player_curr[1].PHY ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                </Col>
                <Col style={style_col[2]}>Physical</Col>
                <Col style={style_col[2]}>
                  <StarRatings
                    rating={player_curr[0].PHY <= player_curr[1].PHY ? 1 : 0}
                    starRatedColor="gold"
                    starEmptyColot="gray"
                    numberOfStars={1}
                    starDimension="20px"
                    starSpacing="1px"
                    svgIconViewBox="5 5 51 48"
                  />
                  <PlayerBar
                    data={player_curr[1].PHY}
                    label="Physical"
                    showLabel={false}
                    rotateBar={false}
                    color={this.playerColor[1]}
                    tooltip={true}
                  />
                </Col>
              </Row>
            </Container>
          </Grid>
        </Card>
      </Col>
    );
  };

  getImage = foot => {
    if (foot.toLowerCase() === "left") return rightFoot;
    else if (foot.toLowerCase() === "right") return leftFoot;
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
