﻿import React from "react";
import { HexColorPicker } from "react-colorful";
import HoverDropdown from "./HoverDropdown";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Button from "react-bootstrap/Button";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.maxPageHeight = 0;
        this.state = {
            backgroundColor: this.props.backgroundColor,
            backgroundImage: this.props.backgroundImage,
            snapping: true,
        };
    }

    updateColor = (newBackgroundColor) => {
        this.props.setBackgroundColor(newBackgroundColor);
        this.setState({ backgroundColor: newBackgroundColor });
    };

    updateBackground = () => {
        const updatedBackground = document.getElementById(
            "inputBackgroundImageURL"
        ).value;
        this.props.setBackgroundImage(updatedBackground);
        this.setState({ backgroundImage: updatedBackground });
    };

    toggleSnapping = () => {
        this.setState({ snapping: !this.state.snapping });
        this.props.toggleSnap();
    };

    getFeedback = () => {
        window.open("https://forms.gle/4jsRGbgVRo9QAKnH8");
    };

    render() {
        return (
            <div
                className={
                    "EditHeader" + (this.props.canEdit ? " canEdit" : "")
                }
            >
                <HoverDropdown
                    toggleContent={<div>Add Tile</div>}
                    className="EditHeaderDropdown"
                    dropType="Down"
                >
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("ToDoListTile")}
                    >
                        Todo List
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("BookmarksTile")}
                    >
                        Bookmarks
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("SearchBarTile", { width: 2 })
                        }
                    >
                        Search Bar
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("GradesTile")}
                    >
                        Grades
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("UpcomingAssignmentsTile")
                        }
                    >
                        Assignments
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("NotesTile", {
                                color: { r: 255, g: 255, b: 140, a: 1 },
                            })
                        }
                    >
                        Note
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("RandomImageTile", {
                                color: { r: 0, g: 0, b: 0, a: 0 },
                            })
                        }
                    >
                        Cat Gifs
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("TwitchTile", {
                                width: 2,
                                color: { r: 136, g: 56, b: 255, a: 1 },
                            })
                        }
                    >
                        Twitch
                    </HoverDropdown.Item>
                    <HoverDropdown.Div />
                    <HoverDropdown.Item
                        className="Danger"
                        onClick={() => this.props.deleteAllTiles()}
                    >
                        Delete All Tiles
                    </HoverDropdown.Item>
                </HoverDropdown>
                <HoverDropdown
                    toggleContent={<div>Background</div>}
                    className="EditHeaderDropdown"
                    dropType="Down"
                >
                    <div className="BackgroundPicker">
                        <HexColorPicker
                            className="ColorPicker"
                            color={this.state.backgroundColor}
                            onChange={this.updateColor}
                        />
                        <input
                            className="backgroundPicker"
                            id="inputBackgroundImageURL"
                            placeholder="Image URL"
                            defaultValue={this.props.backgroundImage}
                            onChange={() => this.updateBackground(this.value)}
                            onFocus={(e) => {
                                e.target.select();
                            }}
                        />
                        <button
                            onClick={() => {
                                document.getElementById(
                                    "inputBackgroundImageURL"
                                ).value = "";
                                this.updateBackground("");
                            }}
                        >
                            Remove Image
                        </button>
                    </div>
                </HoverDropdown>
                <label>Tile Snapping: </label>
                <div className="HeaderToggleSnap">
                    <BootstrapSwitchButton
                        checked={this.state.snapping}
                        onChange={() => this.props.toggleSnap()}
                        onstyle="OnStyle"
                        offstyle="OffStyle"
                        onlabel="On"
                        offlabel="Off"
                        size="sm"
                    />
                </div>
                <div className="rightHeader">
                    <Button
                        onClick={this.props.logout}
                        className="editHeaderButton"
                    >
                        Logout
                    </Button>
                    <Button
                        onClick={this.getFeedback}
                        className="editHeaderButton feedbackButton"
                    >
                        Feedback
                    </Button>
                </div>
            </div>
        );
    }
}

export default EditHeader;
