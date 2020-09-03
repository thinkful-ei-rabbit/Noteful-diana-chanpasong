import React from 'react';

export default class AddFolder extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        // process form values here
        const folderName = "";
        this.setState({
            folders: this.state.folders
        })
    }
    render() {
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>AddFolder</h2>
                <div className="form-group">
                    <label htmlFor="folderName">Folder-Name</label>
                    <input type="text" className="folderInput"
                        name="folderName" id="folderName" />
                </div>
                <div className="registration__button__group">
                    <button type="submit" className="registration__button">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}