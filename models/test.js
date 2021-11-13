const path = require('path');
const Sequelize = require('sequelize');

const env = process.NODE_ENV || 'development';
const config = require(__dirname + '../coing/config.json')[env];

const db = {}

