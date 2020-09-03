import React from 'react';
import config from '../config';
import APIContext from '../ApiContext';
export default class AddFolder extends React.Component {
    static contextType = APIContext;

    handleSubmit(event) {
        event.preventDefault();
        // process form values here
        const folderName = event.target.folderName.value;
        //console.log("This is the folderName", folderName);
        const body = {"name": folderName}
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then(folder => {
            this.context.handleAddFolder(folder);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log("This would be AddFolder's Fetch",error)
        })
    }
    render() {
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>AddFolder</h2>
                <div className="form-group">
                    <label htmlFor="folderName">Folder-Name</label>
                    <input type="text" className="folderInput"
                        name="folderName" id="folderName" required/>
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