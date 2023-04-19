const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoConnect = process.env.mongoConnect;
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
