const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("eCommers", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
});



sequelize.authenticate()
    .then(() => {
        sequelize.sync({ force: false })  // force: true ile mevcut veritabanı tabloları silinir ve yeniden oluşturulur
            .then(() => {
                console.log('Veritabanı senkronize edildi.');
            })
            .catch((error) => {
                console.error('Veritabanı senkronizasyon hatası:', error);
            });
        console.log('Database bağlantısı başarılı.',);
    })
    .catch(error => {
        console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT)
        console.error('Database bağlantısı başarısız:', error)
    });


module.exports = sequelize;