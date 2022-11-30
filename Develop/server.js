const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require("./db/db.json");
const fs = require("fs");
const uniqid = require("uniqid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add note`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      text,
      title,
      id: uniqid(),
    };

    notes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2));

    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  }
});

//splice array method, findIndex to delete note
app.delete("/api/notes/:id", (req, res) => {
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2));
  const { id } = req.params;
  console.log(id + "note id");
  const noteIndex = notes.findIndex((note) => note.id === id);
  console.log(noteIndex);
  const removeNote = notes.splice(noteIndex, 1);
  return res.send(removeNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
