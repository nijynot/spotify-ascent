var headers = new Headers({
  'Host': 'api.spotify.com',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getHashParams().access_token}`
});

var options = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

fetch(`https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=google&oq=google`, options)
.then((res) => {
  return res;
}).then((value) => {
  console.log(value);
});
