const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/home',(req,res)=>{
  const params = {};
  res.status(200).render('index.pug',params);
});

app.get('/login',(req,res)=>{
  const params = {};
  res.status(200).render('login.pug',params);
});

app.get('/user',(req,res)=>{
  const params = {};
  res.status(200).render('user.pug',params);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});