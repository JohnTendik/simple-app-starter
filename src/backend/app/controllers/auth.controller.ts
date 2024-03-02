import type {Request, Response} from 'express';
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";
import  User  from '../models/user/user.model';
import  Role  from '../models/user/role.model';

// Auth config
import authConfig from "../config/auth.config";

export function signup(req: Request<{ username: string, password: string, email: string }>, res: Response) {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashSync(req.body.password, 8),
  });

  user.save().then(() => {
    Role.findOne({ name: "user" }).then((role) => {
      if (!role) {
        res.status(500).send({ message: 'user role does not exist' });
        return;
      }

      user.roles = [role._id];
      user.save().then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    });
  });
}

export function signin(req: Request, res: Response) {
  User.findOne({
    username: req.body.username
  })
    .exec().then((user) => {
      if (!user || !user.password) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
          accessToken: null,
        });
      }

      var token = sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      res.status(200).send({
        id: user._id,
        email: user.email,
        username: user.username,
        accessToken: token,
      });
    });
}