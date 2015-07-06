Meteor.startup(function () {
  var cheerio = Meteor.npmRequire('cheerio');

  Meteor.methods({
    getImages: function () {
      result = Meteor.http.get("http://forums.overclockers.ru/viewforum.php?f=85");
      $ = cheerio.load(result.content);
      $('.topictitle').each(function(){
        var now = new Date().getTime();
        var link = 'http://forums.overclockers.ru/viewtopic.php?f='+$(this).attr('href').split('f=')[1].split('&sid')[0];
        var postWithSameLink = Images.findOne({link: link});
        if (postWithSameLink) return true;
        var title = $(this).text();
        var result2 = Meteor.http.get(link);
        var cheerioInside = cheerio.load(result2.content);
        var postContent = cheerioInside('.postbody').html();
        Images.insert(
          {
            link: link,
            title: title,
            submitted: now,
            content:  postContent
          });
      });
    }
  });

});
