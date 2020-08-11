const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const PORT = process.env.PORT || "4000";
const { Sequelize } = require('sequelize');

// const db = require("./config/psql").db;

const sequelize = new Sequelize("the_watchers", "the_watchers_user", "p@ssword1", {
    host: "localhost",
    port: "5432",
    dialect: "postgres"
});

// db.connect()
//     .then(obj => {
//         // Can check the server version here (pg-promise v10.1.0+):
//         const serverVersion = obj.client.serverVersion;
//         console.log("Connection Established: ", serverVersion)
//         obj.done(); // success, release the connection;
//     })
//     .catch(error => {
//         console.log("ERROR: ", error.message || error);
// });

const Bootcamper = require('./models/Bootcamper')(sequelize, Sequelize);
const Day = require('./models/Day')(sequelize, Sequelize);
const Colle = require('./models/Colle')(sequelize, Sequelize);
const Exam = require('./models/Exam')(sequelize, Sequelize);

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

sequelize.sync().then(() => console.log("DB connected and synced.")).catch((err) => console.log(err))

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:27017',
//     credentials: true
// };

//https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

app.use('/graphql', cors(), bodyParser.json(), graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { Bootcamper, Day, Colle, Exam }
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
