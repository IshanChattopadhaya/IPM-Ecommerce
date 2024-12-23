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
    .connect("mongodb+srv://IshanChatto:HiJs2cpQV54qnbTo@login.1mna1.mongodb.net/?retryWrites=true&w=majority&appName=Login")
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

app.get('/cart',(req,res)=>{
  const params = {};
  res.status(200).render('cart.pug',params);
});

app.get('/mens_all', (req, res) => {
  res.render('mens_all', { items: mensItems });
});

app.get('/mens_cloth',(req,res)=>{
  const params = {};
  res.status(200).render('mens_cloth.pug',params);
});

app.get('/women_cloth',(req,res)=>{
  const params = {};
  res.status(200).render('women_cloth.pug',params);
});

app.get('/reviews',(req,res)=>{
  const params = {};
  res.status(200).render('reviews.pug',params);
});

app.get('/checkout',(req,res)=>{
  const params = {};
  res.status(200).render('checkout.pug',params);
});

const mensItems = [
  { name: 'Stylish T-Shirt', description: 'High-quality cotton t-shirt', price: 499, image: '/static/Mens_wear_pics/mens_tshirt1.jpg' },
  { name: 'Leather Army Shoes', description: 'Comfortable and modern shoes', price: 860, image: '/static/Mens_wear_pics/mens_shoes1.jpg' },
  { name: 'Black Classic Jeans', description: 'High-quality denim jeans', price: 899, image: '/static/Mens_wear_pics/mens_jeans1.jpg' },
  { name: '2-In-1 Hoodie', description: 'High-quality hoodie', price: 850, image: '/static/Mens_wear_pics/mens_hoodie1.jpg.png' },

  { name: 'Ethnic Wear', description: 'Women Ethnic Wear', price: 799, image: '/static/Women_wear_pics/womens_ethnic1.jpg' },
  { name: 'Red T-Shirt', description: 'High-quality cotton t-shirt', price: 399, image: '/static/Women_wear_pics/womens_tshirt1.jpg' },
  { name: '2-In-1 formal wear', description: 'High-quality formal wear', price: 559, image: '/static/Women_wear_pics/womens_dress1.jpg' },
  { name: 'Designer Jeans', description: 'High-quality denim jeans', price: 770, image: '/static/Women_wear_pics/womens_jeans1.jpg' },
  // Add more items as needed
];

app.get('/search', (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : '';
  const filteredItems = mensItems.filter(item =>
    item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
  );
  res.render('mens_all', { items: filteredItems, query });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});