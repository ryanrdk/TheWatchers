const fs = require('fs');
const fastCsv = require('fast-csv');

function parseCSV (path, callback) {
    var fileStream = fs.createReadStream(path),
        parser = fastCsv();
    //Reads an converts data
    fileStream.on("readable", function () {
        var data;
        while ((data = fileStream.read()) !== null) {
            parser.write(data);
        }
    }).on("end", function () {
        parser.end();
    });
    var data = [];
    //Creates array
    parser.on("readable", function () {
        var i;
        while ((i = parser.read()) !== null) {
            data.push(i)
        }
    }).on("end", function () {
        console.log("done");
        //Passes converted data back to function
        callback(data);
    });
}

module.exports = parseCSV;