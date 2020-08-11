const pgPromise = require('pg-promise');

const initOptions = {
    // global event notification;
    error(error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const pgp = pgPromise(initOptions);

const psqlConfig = {
    "host": "localhost",
    "port": "5432",
    "database": "the_watchers",
    "user": "the_watchers_user",
    "password": "p@ssword1"
}

const db = pgp(psqlConfig);

exports.db = db;
