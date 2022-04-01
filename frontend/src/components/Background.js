import React from 'react';
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'


class Background extends React.Component {

    render() {
        return (
            <div className="Background" style = {{backgroundColor: this.props.color, backgroundImage: `url(${this.props.backgroundImage})`}}/>
        );
    }
}

export default Background;