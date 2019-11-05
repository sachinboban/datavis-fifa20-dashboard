import React from 'react';
import Table from './table';
import PlayerCard from './playerCard';
import {MDBContainer,MDBRow,MDBCol} from "mdbreact";

class Dashboard extends React.Component{
    render(){
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol size="8"><Table/> </MDBCol>
                    <MDBCol size="4"> <PlayerCard/> </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Dashboard;
