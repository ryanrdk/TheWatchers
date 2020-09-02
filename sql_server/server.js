const express = require('express');
const bodyParser = require('body-parser');
const express_graphql = require('express-graphql');
const cors = require('cors');

const PORT = process.env.PORT || "4000";

const { db, schema } = require('./config/db')

// const corsOptions = {
//     origin: 'http://localhost:27017',
//     credentials: true
// };

//https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

const app = express();

app.use('/graphql', cors(), bodyParser.json(), express_graphql({
    schema: schema,
    graphiql: true,
    context: { pgPool : db }
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
