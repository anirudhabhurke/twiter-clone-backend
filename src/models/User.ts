import sequelize from '../utils/database';
import { INTEGER, STRING } from 'sequelize';

const User = sequelize.define('user', {
      id: {
            type: INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
      },
      username: {
            type: STRING,
            allowNull: false,
            unique: true,
      },
      email: {
            type: STRING,
            allowNull: false,
            unique: true,
      },
      password: {
            type: STRING,
            allowNull: false,
      },
});

export default User;
