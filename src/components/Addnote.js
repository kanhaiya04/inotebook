import React, { useContext, useState } from "react";
import noteContext from "../content/notes/noteContent";
const Addnote = (props) => {
  const { addNote } = useContext(noteContext);
  const [note,setnote]=useState({title:"",description:"",tags:""})

  const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tags);
        setnote({title:"",description:"",tags:""});
        props.showAlert("Successfull Added Note","success");
  }

  const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
  }

  return (
    <div className="my-3">
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
           Title
          </label>
          <input
            type="text"
            value={note.title}
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Note
          </label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
           value={note.tags}
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            onChange={handleChange}
          />
        </div>
        <button  disabled={note.description.length<5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
