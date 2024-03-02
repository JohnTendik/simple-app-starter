import type {Request, Response, NextFunction} from 'express';

import jwt from "jsonwebtoken";
import config from "../config/auth.config";

import DatabaseManager from '../database-manager';

const User = DatabaseManager.models.User;
const Role = DatabaseManager.models.Role;

const verifyToken = (req: Request<any, any, {userId: string}>, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.body.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: Request<any, any, {userId: string}>, res: Response, next: NextFunction) => {
  User.findById(req.body.userId).exec().then((user: any) => {
    Role.find(
      {
        _id: { $in: user.roles }
      }).then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    ).catch(err => {
      res.status(500).send({ message: 'role find failed' });
      return;
    });
  }).catch((err) => {
    res.status(500).send({ message: 'find by id failed' });
    return;
  });
};

const isModerator = (req: Request<any, any, {userId: string}>, res: Response, next: NextFunction) => {
  User.findById(req.body.userId).exec().then((user: any) => {
    Role.find(
      {
        _id: { $in: user.roles }
      })
      .then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  }).catch((err) => {
    res.status(500).send({ message: err });
    return;
  });
};

export {
  isAdmin,
  isModerator,
  verifyToken,
};
