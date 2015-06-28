// Router.route('/', function () {
//   this.render('Home', {
//     data: function () { return Items.findOne({_id: this.params._id}); }
//   });
// });
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('imageList', {path: '/'});

  this.route('imagePage', {
    path: '/:_id',
    data: function() { return Images.findOne(this.params._id);}
  });
});