import { Request, Response, NextFunction, RequestParamHandler } from 'express';
import User from '../models/User';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import RequestCustom from '../utils/RequestCustom';

export const fetchUserById: RequestParamHandler = (req: RequestCustom, res: Response, next: NextFunction, userId: number) => {
      User.findByPk(userId)
            .then((data) => {
                  if (!data) {
                        res.status(404).json({
                              error: 'User not found',
                        });
                  } else {
                        req.user = data;
                        next();
                  }
            })
            .catch((error) => {
                  console.log(error);
            });
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
      const emailInput = req.body.email;
      const usernameInput = req.body.username;
      const passwordInput = req.body.password;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
      }

      User.findOne({
            where: {
                  [Op.or]: [{ email: emailInput }, { username: usernameInput }],
            },
            raw: true,
      })
            .then((user) => {
                  if (user) {
                        return res.json({ error: 'User already exists' });
                  } else {
                        bcrypt.hash(passwordInput, 12, function (err, hash) {
                              User.create({ email: emailInput, username: usernameInput, password: hash })
                                    .then(() => {
                                          return res.json({ message: 'New User created' });
                                    })
                                    .catch((error) => console.log(error));
                        });
                  }
            })
            .catch((error) => console.log(error));
};
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
      const emailInput = req.body.email;
      const passwordInput = req.body.password;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
      }

      User.findOne({ where: { email: emailInput }, raw: true })
            .then((user: any) => {
                  if (!user) {
                        return res.json({ error: 'No user exists by that email' });
                  } else {
                        bcrypt.compare(passwordInput, user.password, function (err, result) {
                              if (result) {
                                    const token = jwt.sign({ id: user.id }, 'TWITTER_CLONE');
                                    res.json({ message: 'Successful login', token, userId: user.id });
                              } else {
                                    res.json({ error: 'Wrong password' });
                              }
                        });
                  }
            })
            .catch((error) => console.log(error));
};

export const isSignedIn = expressJwt({
      secret: 'TWITTER_CLONE',
      requestProperty: 'auth',
      algorithms: ['HS256'],
});
