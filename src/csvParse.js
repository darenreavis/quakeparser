var csv = require('csv'),
    fs = require('fs'),
    mongo = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
// Format: Year,Month,Day,Time(hhmmss.mm)UTC,Latitude,Longitude,Magnitude,Depth,Catalog

var db = new Db('quakes', new Server('192.168.1.120', 27017, {auto_reconnect: true}), {w: 1});
db.open (function (err, result) {
    db.collection ('quakes', function (err, collection) {
        csv()
            .from.stream(fs.createReadStream(__dirname+'/quakes.csv'))
            .on('data',function(data){
                var line = JSON.stringify(data);
                var doc = {
                    year: line[0].trim(),
                    month: line[1].trim(),
                    day: line[2].trim(),
                    time: line[3].trim(),
                    latitude: line[4].trim(),
                    longitude: line[5].trim(),
                    magnitude: line[6].trim(),
                    depth: line[7].trim()   
                };

                collection.insert(doc, {safe: true}, function (err, records) {});
                console.log(doc);
            })
            .on('end',function(count){
                    console.log('Number of lines: '+count);
            })
            .on('error',function(error){
                    console.log(error.message);
            });
        db.close();
    });
});
