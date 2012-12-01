var feedparser = require('feedparser'),
	fs = require('fs'),
    parser = feedparser.parseUrl('http://earthquake.usgs.gov/earthquakes/catalogs/1day-M2.5.xml');

function callback (error, meta, articles){
    console.log('callback');
    if (error) {
        console.error(error);
    } else {
        console.log('Feed info');
        console.log('%s - %s - %s', meta.title, meta.link, meta.xmlurl);
        console.log('Articles');
        articles.forEach(function (article){
          console.log('%s - %s (%s)', article.date, article.title, article.link);
        });
    }
}

parser.on('article', function(article) {
    console.log('Got article: %s', JSON.stringify(article));
}

//var request = require('request');
//var reqObj = {
//    'uri': 'http://earthquake.usgs.gov/earthquakes/catalogs/1day-M2.5.xml',
//    'headers': {
//        'If-Modified-Since' : <your cached 'lastModified' value>,
//        'If-None-Match' : <your cached 'etag' value>
//    }
};

// parseString()
/*request(reqObj, function(err, response, body) {
    console.log('request')
	feedparser.parseString(body)
        .on('entry', callback);
});*/

/*feedparser.parseUrl('http://earthquake.usgs.gov/earthquakes/catalogs/1day-M2.5.xml')
  .on('response', function (response) {
    console.log("response");      
    console.log(arguments);

})
  .on("feed", function (error, meta, articles) {
    console.log("parsed");  
    console.log(arguments);
  });

// Stream piping
//request(reqObj).pipe(feedparser.stream);

// Or you could try letting feedparser handle working with request (experimental)
//feedparser.parseUrl(reqObj)
//    .on('response', function (response){
    // do something like save the HTTP headers for a future request
//    })
//    .on('article', callback);

// Using the stream interface with a file (or string)
// A good alternative to parseFile() or parseString() when you have a large local file
//feedparser.parseStream(fs.createReadStream('./feed'))
//    .on('article', callback);
// Or
//fs.createReadStream('./feed').pipe(feedparser.stream)
//    .on('article', callback);
