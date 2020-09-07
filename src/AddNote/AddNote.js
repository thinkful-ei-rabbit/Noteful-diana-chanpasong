import React from 'react';
import config from '../config';
import APIContext from '../ApiContext';
import './AddNote.css';
export default class AddNote extends React.Component {
    state = {
        selectedFolderId: {
            value: "",
            touched: false
        }
    }
    static contextType = APIContext;

    handleSubmit(event) {
        event.preventDefault();
        // process form values here
        const noteName = event.target.noteName.value;
        const noteContent = event.target.noteContent.value;
        const noteFolderId = this.state.selectedFolderId.value;
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
        // this.context.selectedFolderId = ;
        this.setState({
            selectedFolderId: {value: value, touched: true}
        })

    }
    validateFolder = () => {
        if (this.state.selectedFolderId.value === ""){
            return "Please choose a folder value!"
        }
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
                    <textarea type="text" className="noteInput"
                        name="noteContent" id="noteContent" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="noteFolder">Note Folder</label>
                    <select onChange={(e)=>this.handleFolderAssignment(e.target.value)} required>
                        <option key="default-option" id="default-id" value="">
                            Choose a folder
                        </option>
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
                    <button type="submit" className="registration__button"
                        disabled={this.validateFolder()}
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}