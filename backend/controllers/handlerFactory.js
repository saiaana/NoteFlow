const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;

    if (Model.modelName === "User") {
      doc = await Model.findById(req.params.id);
    } else {
      doc = await Model.findOne({
        _id: req.params.id,
        author: req.user.id,
      });
    }

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });


exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;

    if ("active" in Model.schema.paths) {
      doc = await Model.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      );
    } else {
      doc = await Model.findByIdAndDelete(req.params.id);
    }

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
