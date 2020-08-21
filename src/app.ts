import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import tweetRoutes from './routes/tweets';
import userRoutes from './routes/user';
import User from './models/User';
import Tweet from './models/Tweet';
import sequelize from './utils/database';
import Comment from './models/Comment';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

app.use('/tweets', tweetRoutes);
app.use('/user', userRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      res.status(500).json({ error: err.message });
});

Tweet.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Tweet);

Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Comment);

Comment.belongsTo(Tweet, { constraints: true, onDelete: 'CASCADE' });
Tweet.hasMany(Comment);

sequelize
      .sync({ force: false })
      .then(() => {
            console.log('DATABASE CONNECTED');
            app.listen(9000);
      })
      .catch((error) => {
            console.log(error);
      });
