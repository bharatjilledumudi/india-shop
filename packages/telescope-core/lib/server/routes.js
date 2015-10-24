var increasePostClicks = function(postId, ip){

  var clickEvent = {
    name: 'click',
    properties: {
      postId: postId,
      ip: ip
    }
  };

  // make sure this IP hasn't previously clicked on this post
  var existingClickEvent = Events.findOne({name: 'click', 'properties.postId': postId, 'properties.ip': ip});

  if(!existingClickEvent){
    Events.log(clickEvent);
    Posts.update(postId, { $inc: { clickCount: 1 }});
  }
};

Picker.route('/out', function(params, req, res, next) {
  var query = params.query;
  if(query.url){ // for some reason, query.url doesn't need to be decoded
      console.log("Step-1");
    var post = Posts.findOne({url: query.url});
    if (post) {
      console.log("Step-2");
      var ip = req.connection.remoteAddress;
      increasePostClicks(post._id, ip);
      console.log("Step-3");
      res.writeHead(302, {'Location': query.url});
      console.log("Step-4");
      res.end();
      console.log("Step-5");
    } else {
      // don't redirect if we can't find a post for that link
      res.end('Invalid URL');
    }
  } else {
    res.end("Please provide a URL");
  }
});
