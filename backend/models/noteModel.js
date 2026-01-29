const mongoose = require("mongoose");

const DAY = 24 * 60 * 60 * 1000;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please give your note some title."],
  },
  content: {
    type: String,
  },
  tags: {
    type: [String],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return this.isDemo === true ? new Date(Date.now() + DAY) : undefined;
    },
  },
});

noteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
