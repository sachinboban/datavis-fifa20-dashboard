import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


class PlayerCard extends React.Component{
    render() {
        return (
            <MDBCol>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Player Info</MDBCardTitle>
                        <MDBCardText>
                            Player info goes here
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default PlayerCard;