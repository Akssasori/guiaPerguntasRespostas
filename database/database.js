const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','coti',{
    host: 'localhost',
    dialect:'mysql'
});

module.exports = connection