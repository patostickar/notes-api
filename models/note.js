const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: Date,
  important: Boolean,
  // set a reference to a User document
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// changes the format of the returned document when it's converted to JSON
// for example on the response of the notes controller (response.status(201).json(savedNote);)
noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // bcs id is an object
    // to hide these props
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
