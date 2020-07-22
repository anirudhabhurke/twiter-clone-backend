import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('twitter-app', 'root', 'root', {
      dialect: 'mysql',
      host: 'localhost',
      logging: false,
});

export default sequelize;
