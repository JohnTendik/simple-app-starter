import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import DatabaseManager from './app/database-manager';

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initialize Database Manager
DatabaseManager.connect();