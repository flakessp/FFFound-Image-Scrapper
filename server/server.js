Meteor.startup(function () {
  var cheerio = Meteor.npmRequire('cheerio');

  Meteor.methods({
    getImages: function () {
      result = Meteor.http.get("http://ffffound.com/?offset=0");
      $ = cheerio.load(result.content);

      data = $(".description").html();

      var images = [];
      $('.description').each(function(i, elem) {
        var now = new Date().getTime();
        images[i] = $(this).html().split('<br>')[0];

        if(images[i].substr(0,7) != 'http://') images[i] = 'http://' + images[i];

        var url = images[i];
        HTTP.get(url, function (error, result) {
          if (!error) {
            console.log('Found a file!: ' + url);
            console.log('Result: ' + result.statusCode);
          } else {
            console.log(error);
            console.log('Error: ' + error);
          };
          });   

        // checking for uniqueness
        var postWithSameLink = Images.findOne({link: images[i]});
        if (postWithSameLink) return true;
        // end check
        Images.insert(
          {
            link: images[i],
            submitted: now
          });
      });
      return images;
    }
  });

});