"use strict";
require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_CLIENT
    },
    "test": {
        "url": 'sqlite::memory:',
        "dialect": 'sqlite',
        "pool": {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_CLIENT
    }
};
