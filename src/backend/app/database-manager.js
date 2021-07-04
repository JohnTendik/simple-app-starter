const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Database manager, handles importing models, connections etc.
 */
class DatabaseManager {
  
  // Initializer
  constructor() {
    this.config = require('./config/db.config');
    this.models = require("./models/index");
    this.mongoose = mongoose;
    this.userRoles = ['user', 'admin', 'moderator'];
  }

  /**
   * Establishes connection with the database using mongoose
   */
  connect() {
    this.mongoose.connect(`mongodb://${this.config.HOST}:${this.config.PORT}/${this.config.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      this.prepopulateRoles();
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
  }

  /**
   * Creates user roles in the database if they are not present. Runs once when a connection
   * to the database is established
   */
  prepopulateRoles() {
    const Role = this.models.role;

    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
}

module.exports = new DatabaseManager();