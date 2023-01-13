const mongoose = require("mongoose");
const {Schema}=mongoose;
const NotesSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },

  descriptions: {
    typeof: "string",
    required: true,
  },
  tags: {
    typeof: "string",
    default: "General",
  },

  date: {
    type: "date",
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
