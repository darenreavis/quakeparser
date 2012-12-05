var request = require('request'),
    moment = require('moment'),
    mongo = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

request('http://earthquake.usgs.gov/earthquakes/feed/geojson/2.5/day', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var features = JSON.parse(body).features,
            db = new Db('local', new Server('127.0.0.1', 27017, {auto_reconnect: true}), {w: 1});

            db.open (function (err, result) {
                db.collection ('quakes', function (err, collection) {
                    features.forEach(function (item) {
                        var p = item.properties;
                        if (p.mag >= 3.0 ) {
                            var doc = {
                                id: item.id,
                                place: p.place,
                                magnitude: p.mag,
                                depth: item.geometry.coordinates[2],
                                date: moment.unix(p.time).format("dddd, MMMM Do YYYY, h:mm:ss A Z"),
                                url: p.url
                            };

                            collection.insert(doc, {safe: true}, function (err, records) {});
                        }
                
                    });
                    db.close();
                });
            });
    }
});
