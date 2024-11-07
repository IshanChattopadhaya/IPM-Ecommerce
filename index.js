const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const PORT = 3000;
const cors = require('cors');
const session = require('express-session');

// MonngoDB pass = HiJs2cpQV54qnbTo     Username = IshanChatto

const mongoose = require("mongoose");
const UserModel = require('./userModel')

mongoose
    .connect("mongodb://localhost:27017/UserDeets")
    .then(() => {
        console.info("Connected to DB");
    })
    .catch((e) => {
        console.log("Error:", e);
    });

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'hi', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res)=>{
  const params = {};
  res.status(200).render('index.pug',params);
});

app.get('/loginpage',(req,res)=>{
  const params = {};
  res.status(200).render('login.pug',params);
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Save email to session on successful login
    req.session.email = email;

    // Redirect to profile page
    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile route
app.get('/profile', (req, res) => {
  const email = req.session.email;
  if (!email) {
    return res.status(400).send("User not logged in.");
  }

  res.render('profile', { email });
});

// Logout route (optional, for session cleanup)
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect('/loginpage'); // Redirect to login page
  });
});


app.get('/user',(req,res)=>{
  const params = {};
  res.status(200).render('user.pug',params);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});