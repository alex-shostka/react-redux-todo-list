const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // to dos: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Todo' }],
});

module.exports = mongoose.model("User", UserSchema);
