/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('msdb', 'akash', 'olivia@2003', {
    host: 'skyinc.mysql.database.azure.com',
    dialect: "mysql",
    port: 3306,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


export default sequelize
