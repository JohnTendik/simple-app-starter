import mongoose from 'mongoose';
import { User, Role } from './models'
import config from './config/db.config';

/**
 * Database manager, handles importing models, connections etc.
 */
class DatabaseManager {

  config;
  models;
  mongoose;
  userRoles;
  
  // Initializer
  constructor() {
    this.config = config;
    this.models = {
      User,
      Role,
    };
    this.mongoose = mongoose;
    this.userRoles = ['user', 'admin', 'moderator'];
  }

  /**
   * Establishes connection with the database using mongoose
   */
  connect() {
    this.mongoose.connect(`mongodb://${this.config.HOST}:${this.config.PORT}/${this.config.DB}`, {})
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      
      try {
        this.prepopulateRoles();
      } catch (err) {
        console.error('Unable to verify and populate default roles, check database connection is working');
      }
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
  async prepopulateRoles() {
    const Roles = this.models.Role;

    const hasDefaultRolesCount = await Roles.find().estimatedDocumentCount();

    if (hasDefaultRolesCount === 0) {
      new Role({
        name: "user"
      }).save().then(() => {
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save().then(() => {
        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save().then(() => {
        console.log("added 'admin' to roles collection");
      });
    }
  }
}

export default new DatabaseManager();