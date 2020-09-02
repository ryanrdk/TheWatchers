# TheWatchers

## Prerequisites
You will need the following in order to help install and configure all the necessary packages and database setup.

> PostgreSQL
>
> Node
>
> NPM

## PostgreSQL Database Setup
We assume that you have PostgreSQL installed and make use of the default user to configure our database.

First enter PostgreSQL's shell using the command
```sh
$ psql postgres
```
Within the shell, we create a database for our project called **the_watchers**, as well as the user who will manage this database called **the_watchers_user** with the password **p@ssword1** and give them all privileges in order to have full CRUD accessibility to the database. 

>Please note that this is hardcoded into our code for the sake of easy setup and is not something one would do realistically as it is unsafe to store credentials with your source code (bad coding practice).
>

```sh
$ CREATE DATABASE the_watchers;
$ CREATE USER the_watchers_user WITH ENCRYPTED PASSWORD 'p@ssword1';
$ GRANT ALL PRIVILEGES ON DATABASE the_watchers TO the_watchers_user;
```

You can now exit the PostgreSQL shell using the command
```sh
$ \q
```

## TheWatchers Setup
First clone the repo using
```sh
$ git clone https://github.com/rde-kwaa/TheWatchers.git
```
You can see the **main** folder structure is as follows (only listing files and folders relevant for the SQL implementation of this project):
```
TheWatchers 
│
│   README.md
│   
└───client
│   │
│   └───actions
│   │
│   └───components
│   │
│   └───containers
│   │
│   └───queries
│   │
│   └───reducers
│
│   App.jsx
│   index.js
│
└───sql_server
│   │
│   └───config
│   
│   resolvers_sql.js
│   schema_sql.js
│   server.js
│
```

We would need to have both the **server side** and **client side** running at the **same time**. This is because our server is responsible for serving the relevant data that our client side needs in order to operate. 

### Server Side (SQL)
Navigate to the **sql_server** folder (Note: We assume you are at the root of the project folder)
```sh
$ cd sql_server
```

We need to install all the dependencies by using the command
```sh
$ npm install
```

Once all the denpendencies have been installed, we can proceed to running the actual server by using the command
```sh
$ npm start
```

### Client Side
Navigate to the **client** folder (Note: We assume you are at the root of the project folder)
```sh
$ cd client
```

We need to install all the dependencies by using the command
```sh
$ npm install
```

Once all the denpendencies have been installed, we can proceed to running the actual server by using the command
```sh
$ npm start
```

### Testing
We made use of GraphQL's popular GUI called **GraphiQL** in order to test our queries and mutations that would occur (CRUD).

You can view this GUI on the /graphql endpoint in your browser (Note: We assume that you are running the server on your localhost on port 4000)

See below the url we insert in the browser (i.e. Chrome)
```
http://localhost:4000/graphql
```
