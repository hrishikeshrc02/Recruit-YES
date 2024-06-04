const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const User = require("../models/userModel");


const JWT_SECRET = process.env.JWT_SECRET;



// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ username, password: hashedPassword });
    const user = await newUser.save();

    res.send("User Created Successfully");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);

    const user = await User.findOne({ _id: req.body._id });

    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.get("/getallusers", async(req, res) => {
  
  try {
      const users = await User.find()
      res.send(users)
  } catch (error) {
      return res.status(400).json({ error });
  }

});

module.exports = router;
