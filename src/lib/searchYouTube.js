var searchYouTube = (options, callback) => {
  // TODO

  var get = $.ajax({
    type: 'GET',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${options.max}&q=${options.query}&type=video&videoEmbeddable=true&key=${options.key}`
  });
  get.done((data) => callback(data.items));
};

window.searchYouTube = searchYouTube;
