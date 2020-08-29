const pg = require('pg');
const { makeExecutableSchema } = require('graphql-tools');

const db = new pg.Pool({ 
    host : 'localhost',
    user : 'the_watchers_user',
    database : 'the_watchers',
    password : 'p@ssword1',
    port : 5432
})

db.query(`
    CREATE TABLE IF NOT EXISTS "Bootcampers" 
    ("id"   SERIAL , "first_name" VARCHAR(255), 
    "last_name" VARCHAR(255), "username" VARCHAR(255) UNIQUE, 
    "email" VARCHAR(255), "campus" VARCHAR(255), 
    "gender" VARCHAR(255), "ethnicity" VARCHAR(255), 
    "active" VARCHAR(255), "selected" VARCHAR(255), 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Days" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Mark1" INTEGER, 
    "Comment1" VARCHAR(255), "Mark2" INTEGER, 
    "Comment2" VARCHAR(255), "Mark3" INTEGER, 
    "Comment3" VARCHAR(255), "Cheating" VARCHAR(255), 
    "Day" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Colles" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Mark1" INTEGER, 
    "Comment1" VARCHAR(255), "Cheating" VARCHAR(255), 
    "Colle" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "Exams" 
    ("id"   SERIAL , "Username" VARCHAR(255), 
    "User_id" VARCHAR(255), 
    "Campus" VARCHAR(255), 
    "Final_mark" INTEGER, "Exam" VARCHAR(255), 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
`)

const { typeDefs } = require('../schema_sql');
const { resolvers } = require('../resolvers_sql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = {
    db, schema
}