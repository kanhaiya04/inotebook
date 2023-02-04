import React, { useContext} from "react";
import noteContext from "../content/notes/noteContent";

const Noteitem = (props) => {
  const { deleteNote } = useContext(noteContext);
const {note,updateNote} = props;

  return (
        <div className='my-3 col-md-3 '>
    <div className="card" >
  <div className="card-body">          
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);  props.showAlert("Successfully Deleted Note","success");}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
  </div>
</div>
        </div>
        
  )
}

export default Noteitem