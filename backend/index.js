const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const Jwt = require("jsonwebtoken");
const User = require("./db/User");
const Event = require("./db/Events");
require("./db/config");

const jwtKey = "event-management";
const app = express();
app.use(express.json());
app.use(cors());

const conn = mongoose.connection; // Use the existing connection from config
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Configure Multer storage for GridFS
const storage = new GridFsStorage({
  url: conn.client.s.url,  // Use the same URL from the established connection
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage });

// User signup route
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  try {
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        return res.status(500).send({ message: "Something went wrong, please try again." });
      }
      res.status(201).send({ result, auth: token });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login route
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      let user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");
      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return res.status(500).send({ message: "Something went wrong, please try again." });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.status(400).send({ message: "No User Found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send({ message: "Invalid credentials" });
  }
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type, only images are allowed!'), false);
//     }
//   }
// });

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
    image: {
      filename: req.file.filename,
      contentType: req.file.mimetype,
    },
  });

  try {
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    res.status(400).send(error);
  }
});

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
