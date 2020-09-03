import React, { Component } from 'react';

class NoteError extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.log("Grabbing an Error");
        return { hasError: true };
    }
    render() {
        console.log("Rendered Error Boundary");
        if (this.state.hasError) {
            console.log("We got an error!");
            return (
                <div>
                    <h2>We ran into an issue displaying the content</h2>
                    <h3>Please Refresh the Page to Continue</h3>
                </div>
            );
        }
        return this.props.children;
    }
}

export default NoteError;