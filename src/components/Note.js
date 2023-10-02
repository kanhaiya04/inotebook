import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../content/notes/noteContent";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  let navigator=useNavigate();
  const { notes, getNote,updateNotes } = useContext(noteContext);
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNote();
    }
    else{
      navigator("/login");
    }
  }, []);
  const [note, setnote] = useState({id: "",etitle: "",edescription: "",etags: "default",});

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id, 
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
  };
  const handleClick = (e) => {
    refclose.current.click();
    e.preventDefault();
    updateNotes(note.id,note.etitle,note.edescription,note.etags);
    props.showAlert("Successfully Updated the Note","success");
  };
  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refclose=useRef(null);
  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
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
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    value={note.etags}
                    name="etags"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
              disabled={note.edescription.length<5 || note.etitle.length<5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 row">
        <h2>Your notes</h2>
        <div className="container">
        {notes.length===0 && 'No notes to return'}
        </div>
        {notes.map((note) => {
          return <Noteitem showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Note;
