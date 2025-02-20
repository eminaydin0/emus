const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
});


sequelize.authenticate()
    .then(() => {
        sequelize.sync({ force: false })
        console.log('Database bağlantısı başarılı.')
    })
    .catch(error => {
        console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT)
        console.error('Database bağlantısı başarısız:', error)
    });
module.exports = sequelize;