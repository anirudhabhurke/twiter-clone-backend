import { Response, NextFunction, RequestParamHandler, RequestHandler } from 'express';
import RequestCustom from '../utils/RequestCustom';
import Tweet from '../models/Tweet';
import Comment from '../models/Comment';
import User from '../models/User';
import { validationResult } from 'express-validator';

export const fetchTweetById: RequestParamHandler = (req: RequestCustom, res: Response, next: NextFunction, tweetId: number) => {
      Tweet.findByPk(tweetId)
            .then((data) => {
                  if (!data) {
                        res.status(404).json({
                              error: 'tweet not found',
                        });
                  } else {
                        req.tweet = data;
                        next();
                  }
            })
            .catch((error) => {
                  console.log(error);
            });
};

export const getAllTweets: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      Tweet.findAll({ raw: true, include: [User] })
            .then((data: any) => {
                  res.status(200).json({ data });
            })
            .catch((error: any) => {
                  console.log(error);
            });
};

export const createTweet: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      const content = req.body.content;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
      }

      req.user
            .createTweet({
                  content: content,
            })
            .then(() => {
                  res.json({
                        message: 'tweet Successfully created',
                  });
            })
            .catch((error: any) => console.log(error));
};

export const getAllUserTweets: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      req.user
            .getTweets({ raw: true })
            .then((data: any) => {
                  res.status(200).json({ data });
            })
            .catch((error: any) => {
                  console.log(error);
            });
};

export const likeTweet: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      Tweet.update(
            {
                  id: req.tweet.id,
                  likes: req.tweet.likes + 1,
            },
            { where: { id: req.tweet.id } }
      )
            .then(() => {
                  res.json({
                        message: 'Added Like',
                  });
            })
            .catch((err) => console.error(err));
};
export const deleteTweet: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      Tweet.destroy({ where: { id: req.tweet.id } })
            .then((data) => {
                  res.json({ message: 'Tweet deleted' });
            })
            .catch((err) => console.error(err));
};

export const viewComments: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      req.tweet
            .getComments({ raw: true })
            .then((data: any) => {
                  res.status(200).json(data);
            })
            .catch((error: any) => {
                  console.log(error);
            });
};

export const createComment: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
      }

      req.tweet
            .createComment({
                  comment: req.body.comment,
            })
            .then((data: any) => {
                  return Comment.update({ userId: req.user.id }, { where: { id: data.dataValues.id } });
            })
            .then(() => {
                  res.json({ message: 'Comment created' });
            })
            .catch((error: any) => console.log(error));
};

export const deleteComment: RequestHandler = (req: RequestCustom, res: Response, next: NextFunction) => {
      Comment.destroy({ where: { id: req.params.commentId } })
            .then(() => {
                  res.json({ message: 'Comment deleted' });
            })
            .catch((err) => console.error(err));
};
