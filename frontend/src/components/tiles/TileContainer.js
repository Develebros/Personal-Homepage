import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import SearchBarTile from "./SearchBarTile";
import BookmarksTile from "./BookmarksTile";
import UpcomingAssignmentsTile from "./UpcomingAssignmentsTile";
import CatMemeTile from "./CatMemeTile";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import GradesTile from "./GradesTile";
import axios from 'axios';

class Tile extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             width: this.props.width,
         }
    }

    componentDidMount() {
        //Receives new x, y positions whenever the tile is moved, and forwards this info to the move function (defined in UserPage)
        document
            .getElementById(this.props._id)
            .addEventListener("onTileMove", (e) => {
                this.props.moveTile(this.props._id, e.detail.x, e.detail.y);
            });
        //test
        console.log(this);
    }

    setWidth = async (newWidth) => {
        const res = await axios.post("http://localhost:5001/u/setTileFields", {
            userId: this.props.userId,
            tileId: this.props._id,
            width: newWidth
        }, { withCredentials: true });
        if (res) {
            this.setState({width: newWidth});
        }   
    }

    moveTop = async () => {
        console.log("top!")
    }
    moveUp = async () => {
        console.log("up!")
    }
    moveDown = async () => {
        console.log("down!")
    }
    moveBottom = async () => {
        console.log("bottom!")
    }

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        let transform = {
            transform: `translate(${this.props.x}vw, ${this.props.y}rem)`,
            width: `${this.state.width * 25 - 2}vw`,
        };

        if (window.innerWidth < 720) {
            console.log(window.innerWidth);
            transform = {width: "94vw", position: "static", margin: "3vw"};
        }

        return (
            //These data parameters are so interact.js knows the initial position of the tiles.
            <div
                className={`TileContainer ${this.props.canEdit ? "draggable Editing" : ""}`}
                id={this.props._id}
                style={transform}
                data-x={this.props.x}
                data-y={this.props.y}
                data-snaptogrid={this.props.snapToGrid} >

                {getTileType(this.props)}

                {this.props.canEdit &&
                    <div className="TileControls">
                        <DropdownButton className="TileEditButton" title="" >
                            <DropdownButton title="Width" className="TileEditWidth">
                                <Dropdown.Item onClick={() => this.setWidth(1)}>Small</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(2)}>Medium</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(3)}>Large</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(4)}>Full</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton title="Reorder" className="TileEditOrder">
                                <Dropdown.Item onClick={() => this.moveTop(1)}>Move To Top</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.moveUp(2)}>Move Up</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.moveDown(3)}>Move Down</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.moveBottom(4)}>Move To Bottom</Dropdown.Item>
                            </DropdownButton>
                            <Dropdown.Divider ></Dropdown.Divider>
                            <Dropdown.Item onClick={() => this.props.deleteTile(this.props._id)}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </div>
                }
            </div>
        );
    }
}

function getTileType(props) {
    switch (props.tileType) {

        case "ToDoListTile":
            return <ToDoListTile {...props} />;
            
        case "BookmarksTile":
            return <BookmarksTile {...props} />;

        case "SearchBarTile":
            return <SearchBarTile {...props} />;

        case "GradesTile":
            return <GradesTile {...props} />;

        case "UpcomingAssignmentsTile":
            return <UpcomingAssignmentsTile {...props} />;

        case "CatMemeTile":
            return <CatMemeTile {...props} />;

        default:
            return <DefaultTile  {...props} />;
    }
}

export default Tile;