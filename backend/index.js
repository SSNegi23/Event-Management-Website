const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Jwt = require("jsonwebtoken");
const User = require("./db/User");
const Event = require("./db/Events");
require("./db/config");

const jwtKey = "event-management";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

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

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only images are allowed!"), false);
    }
  },
});

// Route to upload images and create an event
app.post("/upload", upload.single("photos"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const event = new Event({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    rules: req.body.rules,
    paymentAmount: req.body.paymentAmount,
    contacts: req.body.contacts,
    image: req.file.filename, // Save the filename in the database
    organizer: req.body.organizer,
  });

  try {
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    res.status(400).send(error);
  }
});

// app.get("/upload", async (req, res) => {
//   try {
//     const 
//   }
// })

// Route to get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});