import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Tile from './tiles/Tile'

function UserPage(props) {
    // const tiles = useState(props.tiles);
    const tiles = props.tiles;

    function removeTileFromFrontend(tileId) {
      props.user.tiles = props.user.tiles.filter((tile) => {
        return tile._id != tileId;
      });
      props.user.setUser(props.user);
    }

    return (
        <Container fluid="xl" className="p-3">
            <Row className="g-3">
                {tiles.map((tile, index) => { 
                    return (
                        <Col className={`tile-index-${index}`} key={index} xs={12} sm={tile.width * 6} md={tile.width * 4} lg={tile.width * 3}>
                            <Tile {...tile} deleteTileFromFrontend={deleteTileFromFrontend}/>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default UserPage;