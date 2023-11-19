const noteModel = require("../models/noteSchema");

const addNote = async (req, res) => {
  const { title, note } = req.body;
  req.body.createdBy = req.user.userId;
  try {
    //Verified is field is fullfiled
    if (!title || !note) {
      return res.status(400).json({
        success: false,
        message: "Every field is required",
      });
    }

    //create Note
    const noteItem = await noteModel.create(req.body);
    await noteItem.save();
    res.status(200).json({
      success: true,
      message: " Note created successfuly",
      note: note,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//get all notes of the user
const getNotes = async (req, res) => {
  const { createdBy } = req.user.userId;
  try {
    const notes = await noteModel.find(createdBy);
    res.status(200).json({
      success: true,
      notes: notes,
    });
    //verify is not array is empty and return a message
    if (notes.length === 0) {
      res.status(200).json({
        success: true,
        message: "You don't have any note for the moment !",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//update a note of the user
const updateNote = async (req, res) => {
  const noteId = req.params.noteid;
  try {
    const note = await noteModel.findByIdAndUpdate(noteId, req.body);
    await note.save();
    res.status(200).json({
      success: true,
      message: " Note updated successfuly",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//delete a note of the user
const deleteNote = async (req, res) => {
  const noteId = req.params.noteid;
  try {
    await noteModel.findByIdAndDelete(noteId);
    res.status(200).json({
      success: true,
      message: " Note deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//delete a note of the user
const deleteAllNote = async (req, res) => {
  const noteId = req.params.noteid;
  try {
    await noteModel.deleteMany();
    res.status(200).json({
      success: true,
      message: " Notes deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addNote, getNotes, updateNote, deleteNote, deleteAllNote };
