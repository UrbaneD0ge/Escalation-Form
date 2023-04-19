const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  FName: String,
  LName: String,
  Email: String,
  Phone: String,
  Address: String,
  Zip: String
});

module.exports = mongoose.model('Form', formSchema);