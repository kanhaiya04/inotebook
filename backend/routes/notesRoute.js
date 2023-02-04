const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//add note
router.post(
  "/addnote",
  [
    //validation
    body("title", "Can't be blank").exists(),
    body("description", "Min. Length should be 3").isLength({ min: 3 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let Note = new note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });
      const savedNote = await Note.save();
      res.send(savedNote);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

//fectch all notes
router.get("/getnote", fetchUser, async (req, res) => {
  try {
    const notes = await note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//update the notes

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    let newNote = {};
    if (req.body.title) {
      newNote.title = req.body.title;
    }
    if (req.body.description) {
      newNote.description = req.body.description;
    }
    if (req.body.tags) {
      newNote.tags = req.body.tags;
    }
    let Note = await note.findById(req.params.id);
    if (!Note) {
      return res.status(404).send({ error: "Note not found" });
    }
    if (Note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Note not found" });
    }
    Note = await note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({ Note });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});


//delete a note 
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let Note = await note.findById(req.params.id);
    if (!Note) {
      return res.status(404).send({ error: "Note not found" });
    }
    if (Note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Note not found" });
    }
    await note.findByIdAndDelete(req.params.id);
    res.send({ Success: "Note deleted", Note: Note });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
