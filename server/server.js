const fs = require('fs');
const express = require('express');
const MongoClient = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const express_graphql = require('express-graphql');
const cors = require('cors');
const csvFolder = './CSVs';
const csv = require('csvtojson');

const PORT = process.env.PORT || "4000";

const mongoConfig = require('./config/mongo.json');
const { mongo_username, mongo_password, mongo_url } = mongoConfig;
const mongo_uri = `mongodb://${mongo_username}:${mongo_password}@${mongo_url}`;
console.log(mongo_uri);

const Bootcamper = require('./models/Bootcamper');
const Day = require('./models/Day');
const Colle = require('./models/Colle');
const Exam = require('./models/Exam');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
const app = express();

// const corsOptions = {
//     origin: 'http://localhost:27017',
//     credentials: true
// };

//https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

app.use('/graphql', cors(), bodyParser.json(), express_graphql({
    schema: schema,
    graphiql: true,
    context: { Bootcamper, Day, Colle, Exam }
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));

//Add bootcamper data to database
MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("bootcampers");
    if (!fs.existsSync(csvFolder)) {
        fs.mkdirSync(csvFolder);
    }
    fs.readdir(csvFolder, function (err, files) {
        files.forEach(file => {
            let type = 'Day';
            if (file.includes('exam')){
                type = 'Exam';
            } else if (file.includes('colle')){
                type = 'Colle'
            }
            //Converts CSV data to JSON array
            csv().fromFile(csvFolder + '/' + file).then((jsonObj) => {
                //Adds Day field to each object
                jsonObj.map((element) => { 
                    return element[type] = file.slice(0, -4);
                });
                //Adds Data to database
                dbo.collection(type.toLowerCase() + 's').insertMany(jsonObj, (err) => {
                    if (err) throw err;
                    db.close();
                    //Deletes CSV file
                    fs.unlinkSync(csvFolder + '/' + file);
                });
            });
        });
    });
});