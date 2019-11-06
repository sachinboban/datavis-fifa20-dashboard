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

    render() {
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
    }
}

export default PlayerCard;