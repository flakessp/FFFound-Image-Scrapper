Meteor.startup(function () {
  var cheerio = Meteor.npmRequire('cheerio');

  Meteor.methods({
    getImages: function () {
      result = Meteor.http.get("http://forums.overclockers.ru/viewforum.php?f=85");
      $ = cheerio.load(result.content);
      var images = [];
      $('.topictitle').each(function(i,elem){
        var now = new Date().getTime();
        var link = 'http://forums.overclockers.ru/viewtopic.php?f='+$(this).attr('href').split('f=')[1];
        var title = $(this).text();

        Images.insert(
          {
            link: link,
            title: title,
            submitted: now
          });
      });

      return images;
    }
  });

});
