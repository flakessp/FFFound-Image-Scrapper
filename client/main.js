//иницилизируем глобальную переменную 
  images =[];
  // без слова var

  Meteor.call('getImages', function (error, result) {
    if (error) {
      console.log("error", error);
    };
    Session.set("images", result);
  });

  Template.imageList.helpers({
    images: function () {
      return Images.find().fetch();
    }
  });