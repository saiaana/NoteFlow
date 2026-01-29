const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");

router.route("/").post(authController.protect, noteController.createNote);

router.route("/search").get(authController.protect, noteController.searchNotes);

router
  .route("/get-my-notes")
  .get(authController.protect, noteController.getMyNotes);

router
  .route("/notes-by-tag")
  .get(authController.protect, noteController.getNotesByTag);

router
  .route("/:id")
  .get(authController.protect, noteController.getNote)
  .patch(authController.protect, noteController.updateNote)
  .delete(authController.protect, noteController.deleteNote);

module.exports = router;
