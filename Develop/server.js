const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const notes = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add note`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      text,
      note,
    };

    const response = {
      status: "success",
      body: newNote,
    };
  }
});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
