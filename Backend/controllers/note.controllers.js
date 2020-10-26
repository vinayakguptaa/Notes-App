require("dotenv").config();
const Note = require('../models/note.model');

const CreateNote = async (req, res) => {
    const { text } = req.body;
    const user = req.user;
    const note = new Note({
        userId: user._id,
        text
    })
    await note.save().then((result) => {
        console.log(result);
        return res.status(200).json({
            message: "Note saved Successfully!",
            result
        });
    })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ message: "Failed" });
        });
}

const DeleteNote = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;
    await Note.findOne({ _id }).then((result) => {
        if (result.userId === user._id) {
            await Note.deleteOne({ _id }).then(() => {
                console.log("Deleted");
                return res.status(200).json({ message: "Note Deleted" });
            }).catch((err) => {
                console.log(err);
                return res.status(400).json({ message: "Note Not Found" });
            })
        } else {
            return res.status(401).json({ message: "Unauthorised" });
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Note Not Found" });
    })
}

module.exports = { CreateNote, DeleteNote };