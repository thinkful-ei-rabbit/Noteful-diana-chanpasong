import React from 'react';
import config from '../config';
import APIContext from '../ApiContext';

export default class AddNote extends React.Component {
    static contextType = APIContext;

    handleSubmit(event) {
        event.preventDefault();
        // process form values here
        const noteName = event.target.noteName.value;
        const noteContent = event.target.noteContent.value;
        const noteFolderId = this.context.selectedFolderId;
        const newDate = new Date().toISOString();
        console.log(noteFolderId);
        //console.log("This is the folderName", folderName);
        const body = {"name": noteName, "content": noteContent, "folderId":noteFolderId, "modified":newDate}
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then(note => {
            this.context.handleAddNote(note);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log("This would be AddNote's Fetch",error)
        })
    }
    handleFolderAssignment(value){
        console.log("this should be the value of the folder?", value);
        this.context.selectedFolderId = value;

    }
    render() {
        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div className="form-group">
                    <label htmlFor="noteName">Note Name</label>
                    <input type="text" className="noteInput"
                        name="noteName" id="noteName" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="noteContent">Note Content</label>
                    <input type="text" className="noteInput"
                        name="noteContent" id="noteContent" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="noteFolder">Note Folder</label>
                    <select onChange={(e)=>this.handleFolderAssignment(e.target.value)} required>
                        {this.context.folders.map(folder => {
                            return(
                                <option key={folder.id} id={folder.id} value={folder.id}>{folder.name}</option>
                            )
                        })}
                    </select>
                    {/* <input type="text" className="noteInput"
                        name="noteContent" id="noteContent" required/> */}
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