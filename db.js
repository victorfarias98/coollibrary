var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'library'
     }
});
module.exports = knex