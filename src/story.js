import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Paper} from '@material-ui/core';

class Story extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Paper>
                            Story goes here
                        </Paper>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Story;
