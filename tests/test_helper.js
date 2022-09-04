const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const validUserId = async () => {
  const user = new User({});
  await user.save();
  // await user.remove();

  const token = jwt.sign(user.toJSON(), process.env.SECRET);
  return token;
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  validUserId,
  notesInDb,
  usersInDb,
};
