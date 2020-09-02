const pg = require('pg');
const { makeExecutableSchema } = require('graphql-tools');

/*
Creating a Pool to enable the quering of the database
*/
const db = new pg.Pool({
    host: 'localhost',
    user: 'the_watchers_user',
    database: 'the_watchers',
    password: 'p@ssword1',
    port: 5432
})

/*
Creates all the necessary tables in our PostgreSQL database
if they do not yet exist
*/
db.query(`
    CREATE TABLE IF NOT EXISTS "Bootcampers" 
    ("id"   SERIAL , "first_name" VARCHAR(255), 
    "last_name" VARCHAR(255), "username" VARCHAR(255) UNIQUE, 
    "email" VARCHAR(255), "campus" VARCHAR(255), 
    "gender" VARCHAR(255), "ethnicity" VARCHAR(255), 
    "active" VARCHAR(255), "selected" VARCHAR(255), 
    PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Days" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Mark1" INTEGER, 
    "Comment1" VARCHAR(255), "Mark2" INTEGER, 
    "Comment2" VARCHAR(255), "Mark3" INTEGER, 
    "Comment3" VARCHAR(255), "Cheating" VARCHAR(255), 
    "Day" VARCHAR(255), PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Colles" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Mark1" INTEGER, 
    "Comment1" VARCHAR(255), "Cheating" VARCHAR(255), 
    "Colle" VARCHAR(255), PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Exams" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), 
    "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Exam" VARCHAR(255), 
    PRIMARY KEY ("id"));
`)

/*
Fetching the schema (type definitions for the different tables)
and resolvers (functionality behind each query and mutation)
to be used by GraphQL
*/
const { typeDefs } = require('../schema_sql');
const { resolvers } = require('../resolvers_sql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = {
    db,
    schema
}