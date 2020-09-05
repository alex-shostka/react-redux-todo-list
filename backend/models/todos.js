const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  // username: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Todo", TodoSchema);
