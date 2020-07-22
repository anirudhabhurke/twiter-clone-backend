import sequelize from '../utils/database';
import { STRING, INTEGER } from 'sequelize';

const Tweet = sequelize.define('tweet', {
      id: {
            type: INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
      },
      content: {
            type: STRING,
            allowNull: false,
      },
      likes: {
            type: INTEGER,
      },
});

export default Tweet;
