import React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from "mdbreact";

class Story extends React.Component {
    render() {
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Story</MDBCardTitle>
                                <MDBCardText>
                                    Story goes here
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Story;
