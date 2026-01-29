const Note = require("../models/noteModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");

exports.updateNote = factory.updateOne(Note);
exports.deleteNote = factory.deleteOne(Note);
exports.getNote = factory.getOne(Note);

exports.getMyNotes = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(
    Note.find({ author: req.user.id }),
    req.query
  );

  const { data: notes, hasMore, nextCursor } = await apiFeatures.paginate();

  res.status(200).json({
    status: "success",
    hasMore,
    nextCursor,
    results: notes.length,
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
      },
      notes,
    },
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  const payload = {
    ...req.body,
    author: req.user.id,
  };

  if (req.user.role === "demo-user") {
    payload.isDemo = true;
  }

  const newNote = await Note.create(payload);

  res.status(201).json({
    status: "success",
    data: {
      note: newNote,
    },
  });
});

exports.searchNotes = catchAsync(async (req, res, next) => {
  const query = req.query.query;
  
  if (!query || !query.trim()) {
    return res.status(200).json({
      status: "success",
      data: { notes: [] },
      results: 0,
    });
  }

  const notes = await Note.find({
    author: req.user.id,
    $or: [
      { title: { $regex: query.trim(), $options: "i" } },
      { content: { $regex: query.trim(), $options: "i" } },
    ],
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: { notes },
    results: notes.length,
  });
});


exports.getNotesByTag = catchAsync(async (req, res, next) => {
  const tag = req.query.tags;
  const userId = req.user.id;
  const sortOrder = req.query.sort === "asc" ? 1 : -1;
  const notesPerPage = 3;
  const limit = parseInt(req.query.limit) || notesPerPage;
  const cursor = req.query.cursor ? new Date(req.query.cursor) : null;

  const match = {
    author: new mongoose.Types.ObjectId(userId),
  };

  if (tag) match.tags = { $in: [tag.trim()] };
  if (cursor) {
    match.createdAt = sortOrder === -1 ? { $lt: cursor } : { $gt: cursor };
  }

  const docs = await Note.find(match)
    .sort({ createdAt: sortOrder })
    .limit(limit + 1);

  const hasMore = docs.length > limit;
  const paginated = hasMore ? docs.slice(0, limit) : docs;
  const nextCursor = hasMore ? paginated[paginated.length - 1].createdAt : null;

  res.status(200).json({
    status: "success",
    results: paginated.length,
    hasMore,
    nextCursor,
    data: { notesByTag: paginated },
  });
});
