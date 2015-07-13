// Router.route('/', function () {
//   this.render('Home', {
//     data: function () { return Items.findOne({_id: this.params._id}); }
//   });
// });
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('postList', {path: '/'});

  this.route('postPage', {
    path: '/:_id',
    data: function() { return Posts.findOne(this.params._id);}
  });
});
