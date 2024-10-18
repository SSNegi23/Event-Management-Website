const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const Jwt = require("jsonwebtoken");
const User = require("./db/User");
const Event = require("./db/Events");
require("./db/config");  // This ensures the connection is established

const jwtKey = "event-management";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const conn = mongoose.connection; // Use the existing connection from config
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});



// User signup route
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  try {
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        return res.send({ result: "Something went wrong, please try again." });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login route
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return res.send({ result: "Something went wrong, please try again." });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "No User Found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});
const upload = multer({ storage: storage });

// Route to handle event creation
app.post('/upload', upload.single('photos'), async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      photos: req.file.filename, // Save file name in MongoDB
      rules: req.body.rules,
      paymentAmount: req.body.paymentAmount,
      contacts: req.body.contacts,
    });
    console.log(newEvent);
    const savedEvent = await newEvent.save();
    res.status(201).json({ event: savedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
});


// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
