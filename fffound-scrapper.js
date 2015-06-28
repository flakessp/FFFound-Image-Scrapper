Images = new Mongo.Collection('images');

if (Meteor.isClient) {

  //иницилизируем глобальную переменную 
  images =[];
  // без слова var

  Meteor.call('getImages', function (error, result) {
    if (error) {
      console.log("error", error);
    };
    Session.set("images", result);
  });

  Template.tweets.helpers({
    rant: function () {
      return Session.get("images");
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      getImages: function () {
        result = Meteor.http.get("http://ffffound.com/");
        $ = cheerio.load(result.content);
        // var open = $('div.permalink-inner.permalink-tweet-container > div > div > p').text();
        data = $(".description").html();

        var images = [];
        $('.description').each(function(i, elem) {
          images[i] = $(this).html().split('<br>')[0];
          console.log(images[i]);
          var postWithSameLink = Images.findOne({link: images[i]});
          if (postWithSameLink) return true;
          
          Images.insert(
            {
              link: images[i]
            });
        });
        return images;
      }
    });

  });
}