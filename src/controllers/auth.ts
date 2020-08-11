import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
      const emailInput = req.body.email;
      const usernameInput = req.body.username;
      const passwordInput = req.body.password;

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

      User.findOne({ where: { email: emailInput }, raw: true })
            .then((user: any) => {
                  if (!user) {
                        return res.json({ error: 'No user exists by that email' });
                  } else {
                        bcrypt.compare(passwordInput, user.password, function (err, result) {
                              if (result) {
                                    res.json({ message: 'Successful login' });
                              } else {
                                    res.json({ message: 'Wrong password' });
                              }
                        });
                  }
            })
            .catch((error) => console.log(error));
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {};
