Meteor.startup(function () {
  var cheerio = Meteor.npmRequire('cheerio');

  Meteor.methods({
    getPosts: function () {
      result = Meteor.http.get("http://forums.overclockers.ru/viewforum.php?f=85");
      $ = cheerio.load(result.content);

      $('tr').each(function() {
        var now = new Date().getTime();
        var $topictitle = $(this).find('.topictitle')[0];
        if(!$topictitle){
          return true;
        }
        // happens to be topictitle is not a jquery object
        var title = $topictitle.children[0].data;
        var dateSubmit = $topictitle.attribs.title.split('Добавлено: ')[1];
        console.log(dateSubmit);
        dateSubmit = moment(dateSubmit, "DD.MM.YYYY HH:mm").format();
        console.log(title);
        console.log(dateSubmit);
        var lastMessage  = $(this).find('.row3 p').text();
        // NOTE: todo store last message from overclocks - class topicdeatails
        var link = 'http://forums.overclockers.ru/viewtopic.php?f=85&t='+$topictitle.attribs.href.split('&t=')[1].split('&sid')[0];
        var result = Meteor.http.get(link);
        var $2 = cheerio.load(result.content);
        var content = $2('.postbody').html();
        // checking for uniqueness
         var postWithSameLink = Posts.findOne({link: link});
            if (postWithSameLink) return true;
        // end check
        Posts.insert(
          {
            title: title,
            link: link,
            submitted: now,
            content: content,
            dateSubmit: dateSubmit
          });
      });
    }
  });
});
