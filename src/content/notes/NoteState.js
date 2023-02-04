import React, { useState } from "react";
import NoteContext from "./noteContent";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setnotes] = useState([]);

  //get all notes
  const getNote = async () => {
    const response = await fetch(`${host}/note/getnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "autho-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  //add notes
  const addNote = async (title, description, tags) => {
    const response = await fetch(`${host}/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "autho-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tags }),
    });
    const note = await response.json();

    setnotes(notes.concat(note));
  };

  //update notes
  const updateNotes = async (id, title, description, tags) => {
     await fetch(`${host}/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autho-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tags }),
    });
    //const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
      setnotes(newNotes);
  };

  //delete notes
  const deleteNote = async (id) => {
     await fetch(`${host}/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "autho-token": localStorage.getItem("token"),
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNotes, deleteNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
