/*require('whatwg-fetch');

var headers = new Headers({
  Host: 'api.spotify.com',
  'Content-type': 'application/json'
});

var options = {
  method: 'GET',
  headers,
  //mode: 'no-cors',
  cache: 'default'
};

var optionsTumblr = {
  method: 'GET',
  headers,
  mode: 'no-cors',
  cache: 'default'
};

fetch(`https://api.spotify.com/v1/search?q=shishamo&type=track&offset=0&limit=1`, options)
.then((res) => {
  console.log(res);
  return res.json();
})
.then((json) => {
  console.log(json);
});

fetch(`https://api.tumblr.com/v2/tagged?tag=gif&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4`, optionsTumblr)
.then((res) => {
  console.log(res);
  console.log('GET');
});
*/

var arr = [];

function loopData(data) {
  console.log(data);
  for (let i = 0; i < data.response.length - 1; i++) {
    try {
      let url = data.response[i].photos[0].alt_sizes[0].url;
      if (isGif(url)) {
        arr.push(url);
      }
    } catch (e) {
      console.log(e);
    }
  }

  console.log(arr);
}

$.ajax({
  url: 'https://api.tumblr.com/v2/tagged?tag=shishamo&limit=30&api_key=jFs053HURZQQbQ8Y1WRsrac1C44AeDXdMR4BqwGEyrxSgBsivB',
  dataType: 'jsonp',
  success: function (data) {
    loopData(data);
  }
});
