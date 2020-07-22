import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('twitter', 'root', 'toor', {
      dialect: 'mysql',
      host: 'localhost',
      logging: false,
});

export default sequelize;
