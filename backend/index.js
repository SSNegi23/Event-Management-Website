const express = require("express");
const cors = require("cors");
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

// Route to get user data by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password from the response
    if (user) {
      console.log(user);
      res.status(200).json(user);
    } else {
      res.status(404).send({ result: "User not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update user details route
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        address: req.body.address,
        mediaHandles: req.body.mediaHandles,
        hobbies: req.body.hobbies,
      },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).send({ result: "User not found" });
    }
    res.status(200).json(updatedUser);
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
app.post("/upload", upload.fields([
  { name: "photos", maxCount: 1 },
  { name: "paymentlink", maxCount: 1 }
]), async (req, res) => {
  if (!req.files || !req.files.photos || !req.files.paymentlink) {
    return res.status(400).send("Both photos and payment link images are required.");
  }

  const event = new Event({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    rules: req.body.rules,
    paymentAmount: req.body.paymentAmount,
    contacts: req.body.contacts,
    image: req.files.photos[0].filename, // Save the filename for the "photos" field
    paymentlink: req.files.paymentlink[0].filename, // Save the filename for the "paymentlink" field
    organizer: req.body.organizer,
  });

  try {
    await event.save();
    console.log(event);
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

// app.put("/eventList/:id", async (req, res) => {
//   const obj = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         eventList: req.body.eventList,
//       },
//       { new: true } // Return the updated document
//     );
//     if (!updatedUser) {
//       return res.status(404).send({ result: "User not found" });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required");
  try {
    req.user = Jwt.verify(token, jwtKey);
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

// Add event to user's eventList
app.post("/eventList/:id", async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) return res.status(400).send({ result: "Event ID is required" });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ result: "User not found" });

    const eventExists = await Event.findById(eventId);
    if (!eventExists) return res.status(404).send({ result: "Event not found" });

    if (user.eventList.some((event) => event._id.toString() === eventId)) {
      return res.status(400).send({ result: "Event already added to list" });
    }

    user.eventList.push(eventExists);
    await user.save();
    res.status(200).json(user.eventList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Remove event from user's eventList
app.delete("/eventList/:id", async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) return res.status(400).send({ result: "Event ID is required" });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ result: "User not found" });

    const updatedEventList = user.eventList.filter(
      (event) => event._id.toString() !== eventId
    );
    user.eventList = updatedEventList;
    await user.save();
    res.status(200).json(user.eventList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});