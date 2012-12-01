var feedparser = require('feedparser'),
	fs = require('fs'),
    //parser = feedparser.parseUrl('http://cyber.law.harvard.edu/rss/examples/rss2sample.xml');
    parser = feedparser.parseUrl('http://earthquake.usgs.gov/earthquakes/catalogs/1day-M2.5.xml');

function callback (error, meta, articles){
    console.log('callback');
    if (error) {
        console.error(error);
    } else {
        console.log('Feed info');
        console.log('%s - %s - %s', meta.title, meta.link, meta.xmlurl);
        //console.log('Articles');
        //articles.forEach(function (article){
          //console.log('%s - %s (%s)', article.date, article.title, article.link);
        //});
    }
}

parser.on('article', callback);
