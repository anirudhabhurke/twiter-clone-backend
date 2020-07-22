import sequelize from '../utils/database';
import { INTEGER, STRING } from 'sequelize';

const Comment = sequelize.define('comment', {
      id: {
            type: INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
      },
      comment: {
            type: STRING,
            allowNull: false,
      },
});

export default Comment;
