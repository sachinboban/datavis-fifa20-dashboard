import React from 'react';
import {Card, CardHeader, CardContent, Typography, Avatar, Grid} from '@material-ui/core';
import Col from 'react-bootstrap/Col';
import avatarPlaceholder from './img/avatar-placeholder.jpg';

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.player !== this.props.player) {
            this.setState({
                player: this.props.player
            });
        }
    }

    isSelectionEmpty = () => {
        return this.state.player === undefined;
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
                                    <li>
                                        Click on plus icon to the right of each column name to group by that column.
                                    </li>
                                </ul>
                            </Typography>
                        </CardContent>
                    </Grid>
                </Card>
            </Col>
        );
    };

    renderPlayer = () => {
        return (
            <Col>
                <Card>
                    <Grid container justify="center" alignItems="center">
                        <Avatar
                            src={this.state.player && this.state.player.Image ? this.state.player.Image : avatarPlaceholder}/>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <CardHeader align="center"
                                    title={this.state.player ? this.state.player.Name : "Player Name"}
                                    subheader={this.state.player ? this.state.player.Country : "Country"}
                        />
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="span">
                                {this.state.player ? this.state.player.Age : "Player Age"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span">
                                {this.state.player ? this.state.player.Position : "Player Position"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span">
                                {this.state.player ? this.state.player.Potential : "Player Potential"}
                            </Typography>

                        </CardContent>
                    </Grid>
                </Card>
            </Col>
        );
    };

    render() {
        if (this.isSelectionEmpty()) {
            return this.renderHelpInfo();
        } else {
            return this.renderPlayer();
        }
    }
}

export default PlayerCard;