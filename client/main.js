//иницилизируем глобальную переменную
  images =[];
  // без слова var

  Meteor.call('getPosts', function (error, result) {
    if (error) {
      console.log("error", error);
    }
    Session.set("posts", result);
  });

  Template.postList.helpers({
    posts: function () {
      return Posts.find({}, {sort: {dateSubmit: -1}});
    }
  });
