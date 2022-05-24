const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
  },
  isCompleted: Boolean,
  userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Todo', todoSchema);
