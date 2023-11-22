const noteModel = require("../models/noteSchema");

const addNote = async (req, res) => {
  const { title, note } = req.body;
  try {
    //Verified is field is fullfiled
    if (!title || !note) {
      return res.status(400).json({
        success: false,
        message: "The following fields are required: title,note",
      });
    }

    //create Note
    const noteItem = new noteModel({
      createdBy: req.user.userId,
      title,
      note,
    });
    await noteItem.save();
    res.status(200).json({
      success: true,
      message: " Your note has been created successfuly",
      noteItem,
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
  const { userId } = req.user;
  try {
    const notes = await noteModel.find({ createdBy: userId });
    //verify is not array is empty and return a message
    if (notes.length === 0) {
      throw new Error("You don't have any note for the moment !");
    }

    res.status(200).json({
      success: true,
      notes: notes,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//update a note of the user
const updateNote = async (req, res) => {
  // const noteId = req.params.noteid;
  const { noteId } = req.body;
  try {
    const note = await noteModel.findByIdAndUpdate(noteId, req.body);
    await note.save();
    res.status(200).json({
      success: true,
      message: " Your note has been updated successfuly",
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
  // const noteId = req.params.noteid;
  const { noteId } = req.body;
  try {
    await noteModel.findByIdAndDelete(noteId);
    res.status(200).json({
      success: true,
      message: " Your note has been deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//delete all the notes of the user
const deleteAllNote = async (req, res) => {
  // const noteId = req.params.noteid;
  const { userId } = req.user;
  try {
    await noteModel.deleteMany({ createdBy: userId });
    res.status(200).json({
      success: true,
      message: " Your notes has been deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addNote, getNotes, updateNote, deleteNote, deleteAllNote };
