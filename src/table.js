import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


class Table extends React.Component{
    render() {
        return (
            <MDBCol>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Table</MDBCardTitle>
                        <MDBCardText>
                            Table goes here
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default Table;