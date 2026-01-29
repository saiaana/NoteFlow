const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Note = require("../models/noteModel");

dotenv.config({ path: "backend/config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

const notes = JSON.parse(
  fs.readFileSync(`${__dirname}/notes-dev-data.json`, "utf-8")
);

const importData = async () => {
  try {
    await Note.create(notes);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Note.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
