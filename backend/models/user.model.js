const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const bycrypt = require('bcrypt');

module.exports = () => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        surName: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dateBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordSalt: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bycrypt.genSalt(10);
                    user.password = await bycrypt.hash(user.password, salt);
                    user.passwordSalt = salt;
                }
                return user;
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    const salt = await bycrypt.genSalt(10);
                    user.password = await bycrypt.hash(user.password, salt);
                    user.passwordSalt = salt;
                }
                return user;
            }
        },
    });

    User.prototype.validPassword = async function (password) {
        const values = Object.assign({}, this.get());
        const encryptedPassword = await bycrypt.hash(password, this.passwordSalt);

        return values.password == encryptedPassword;
    };

    return User;
};