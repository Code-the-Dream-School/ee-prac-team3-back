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
  const {
    params: { id: noteId },
  } = req;
  try {
    const note = await noteModel.findByIdAndUpdate({ _id: noteId }, req.body);
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

// delete many notes of the user
const deleteManyNotes = async (req, res) => {
  try {
    const ids = req.query.ids.split(",");
    await noteModel.deleteMany({
      _id: { $in: ids },
    });
    res.status(200).json({
      success: true,
      message: "Notes has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNote,
  getNotes,
  updateNote,
  deleteManyNotes,
};
