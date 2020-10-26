const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: String,
    text: String
});

const Note = mongoose.model('notes', noteSchema);
module.exports = Note; 