import type {Request, Response, NextFunction} from 'express';
import databaseManager from "../database-manager";
import User from "../models/user/user.model"
import { TypedRequestBody } from '../sharedTypes';
const ROLES = databaseManager.userRoles;

const checkDuplicateUsernameOrEmail = (req: TypedRequestBody<{username: string, email: string}>, res: Response, next: NextFunction) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec().then((user) => {
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec().then((userEmail) => {
      if (userEmail) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  }).catch((err) => {
    res.status(500).send({ message: err });
    return;
  });
};

const checkRolesExisted = (req: TypedRequestBody<{roles: string[]}>, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const ensureUserExists = (req: TypedRequestBody<{userId: string}>, res: Response, next: NextFunction) => {
  User.findOne({
    _id: req.body.userId
  }).exec().then((user) => {
    if (!user) {
      res.status(400).send({ message: "Failed! user doesnt exist!" });
      return;
    }

    next();
  }).catch((err) => {
    res.status(500).send({ message: err });
    return;
  })
}

const verifySignUp = {
  ensureUserExists,
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
};

export default verifySignUp;