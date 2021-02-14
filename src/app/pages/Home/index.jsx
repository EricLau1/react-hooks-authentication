import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MainMenu from '../../components/MainMenu';

function Home() {
    return (
        <Row>
            <Col md={12}>
                <MainMenu />
            </Col>
        </Row>
    );
}

export default Home;