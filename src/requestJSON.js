var request = require('request'),
    moment = require('moment'),
    mongo = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

request('http://earthquake.usgs.gov/earthquakes/feed/geojson/2.5/day', function (error, response, body) {
    console.log('request');
    if (!error && response.statusCode == 200) {
        var features = JSON.parse(body).features,
            db = new Db('local', new Server('127.0.0.1', 27017, {auto_reconnect: true}), {w: 1});

            db.on('open', function (error) {
                console.log(arguments);
                console.log('Connection to db is open.');
            });

            db.on('close', function (error) {
                console.log('Connection to db was closed.');
            });

            db.open (function (err, result) {
                console.log('open');
                console.log(arguments);
                db.collection ('quakes', function (err, collection) {
                    console.log('collection');
                    console.log(arguments);
                    features.forEach(function (item) {
                        console.log('forEach');
                        console.log(item);
                        var p = item.properties,
                            doc = {
                                id: item.id,
                                place: p.place,
                                magnitude: p.mag,
                                depth: item.geometry.coordinates[2],
                                date: moment.unix(p.time).format("dddd, MMMM Do YYYY, h:mm:ss A Z"),
                                url: p.url
                        };
                        console.log(doc);

                        collection.insert(doc, {safe: true}, function (err, records) {
                            console.log('Record added as ' + records[0]._id);
                            console.log("Id: " + item.id);
                            console.log("Place: " + p.place);
                            console.log("Magnitude: " + p.mag);     
                            console.log("Depth: " + item.geometry.coordinates[2]);
                            console.log("Date: " + moment.unix(p.time).format("dddd, MMMM Do YYYY, h:mm:ss A Z"));
                            console.log("URL: " + p.url);
                            console.log("====");
                        });
                
                    });
                    db.close();
                });
            });

    }
});
