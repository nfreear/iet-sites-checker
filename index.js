
/*!

  © Nick Freear, 21-May-2018.
*/

const check = require('check-broken-links');
const request = require('request');
const PKG = require('./package.json');
const sitemap_url = PKG[ 'x-sitemap-json' ];

process.env[ 'http_proxy' ] = 'http://wwwcache.open.ac.uk:80';
process.env[ 'https_proxy' ] = 'http://wwwcache.open.ac.uk:80';
// process.env[ 'no_proxy' ] = '*.open.ac.uk,127.0.0.1';

request.get({
  url: sitemap_url,
  json: true,
  headers: { 'User-Agent': 'request' }
}, (err, res, data) => {
  if (err) {
    console.error('Error:', err);
  }
  else if (res.statusCode !== 200) {
    console.error('Status:', res.statusCode);
  } else {
    console.log(data.urls);

    // request.defaults({ proxy: 'http://wwwcache.open.ac.uk:80' });

    check(null, data.urls).then( brokenLinks => {
      console.log('links:', brokenLinks);

      console.error(brokenLinks.top[ 0 ].err);
    });
  }
});


/* const sitemapChecker = require('sitemap-checker'); // require('./')

sitemapChecker.sitemap('http://127.0.0.1:55423/sitemap.xml') /// 'http://www.videolan.org/sitemap.xml')
    .then(function (data) {
        console.log('then:', data)
    })
    .catch(function (ex) {
        console.error('catch:', ex)
    })
*/
