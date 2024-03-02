import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import DatabaseManager from './app/database-manager';
import AuthRoutes from './app/routes/auth.routes';
import UserRoutes from './app/routes/user.routes';

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
AuthRoutes(app);
UserRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initialize Database Manager
DatabaseManager.connect();