const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Form = require('./models/Form.js');
const methodOverride = require('method-override');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoConnect = process.env.mongoConnect;

mongoose.connect(mongoConnect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get('/', async (req, res) => {
  res.render('index');
});

app.post('/', async (req, res, next) => {
  console.log(req.body);
  res.send('Submitted');
  const msg = {
    to: req.body.Email,
    from: 'kdunlap@atlantaga.gov',
    subject: 'New Escalation Form Submission',
    text: `First Name: ${req.body.FName}
    Last Name: ${req.body.LName}
    Email: ${req.body.Email}
    Phone: ${req.body.Phone}
    Address: ${req.body.Address}
    Zip: ${req.body.Zip}`
  }
  try {
    await sgMail.send(msg);
    console.log('Email sent');
  }
  catch (err) {
    console.log(err);
  }
}, saveForm('submit'));

app.get('/submit', async (req, res) => {
  res.send('Submitted' + req.body);

});

function saveForm(path) {
  return async (req, res) => {
    let form = new Form({
      FName: req.body.FName,
      LName: req.body.LName,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Address: req.body.Address,
      Zip: req.body.Zip
    });
    try {
      form = await form.save();
    }
    catch (err) {
      console.log(err);
    }
  };
};