const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const express_graphql = require('express-graphql');
const cors = require('cors');
const csvFolder = './CSVs';
const csv = require('csvtojson');

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

//Add bootcamper data to database
// MongoClient.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false }, function (err, db) {
//     if (err) throw err;
//     const dbo = db.db("bootcampers");
//     if (!fs.existsSync(csvFolder)) {
//         fs.mkdirSync(csvFolder);
//     }
//     fs.readdir(csvFolder, function (err, files) {
//         files.forEach(file => {
//             let type = 'Day';
//             if (file.includes('exam')) {
//                 type = 'Exam';
//             } else if (file.includes('colle')) {
//                 type = 'Colle'
//             }
//             //Converts CSV data to JSON array
//             csv().fromFile(csvFolder + '/' + file).then((jsonObj) => {
//                 //Adds Day field to each object
//                 jsonObj.map((element) => {
//                     return element[type] = file.slice(0, -4);
//                 });
//                 //Adds Data to database
//                 dbo.collection(type.toLowerCase() + 's').insertMany(jsonObj, (err) => {
//                     if (err) throw err;
//                     db.close();
//                     //Deletes CSV file
//                     fs.unlinkSync(csvFolder + '/' + file);
//                 });
//             });
//         });
//     });
// });