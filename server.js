const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n')
  next();
})


// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentlyYear', () => {
  return new Date().getFullYear()
})


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTittle: 'Home Page',
    welcomeMessage: 'Welcome To my Website',

  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTittle: 'About Page Faza',

  });
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTittle: 'Projects in Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  })
})

app.listen(port, () => {
  console.log(`server on ${port}`);
});
