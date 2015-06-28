if (Meteor.isClient) {
  Meteor.call('getImages', function (error, result) {
    if (error) {
      console.log('error', error);
    }
    console.log('result');

    Session.set('fffounds', result);
  });

  Template.fffounds.helpers({
    imagesStack: function () {
      return Session.get('fffounds');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire("cheerio");

    Meteor.methods({
      getImages: function(){
        result = Meteor.http.get("http://ffffound.com/")
        $ = cheerio.load(result.content);
        var resp = $('.header');
        return resp;
      }
    })
  });
}
