const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const req = require("express/lib/request");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://daniel:so7insta@cluster0.uqyzdaa.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333);
