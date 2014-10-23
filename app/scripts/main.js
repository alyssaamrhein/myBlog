var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collections/wordsfrompeople';
var template = _.template($('#postTemplate').html());

var Post = function (attributes) {
  return _.extend({
    sentAt: new Date(),
    title: 'title goes here',
    post: 'a blog post',
  }, attributes);
};

$('input[type=submit]').on('click', function (event) {
    event.preventDefault();

    var postName    =  $('input.field, textarea.field').serializeArray();
    //Turn everything into an array of js objects and not DOM objects
    var postObject = new Post();

    postName.forEach(function (postTitle) {
      postObject[postTitle.name] = postTitle.value;
    });

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: postObject
      //Send a POST request to our API to save the data from the form.
    }).done(function (data) {
      $('input.field, textarea.field').val('')
    });
    //Clear all the data in the form after its done.
});

var getBlogPosts = function () {
  $.ajax({url: apiUrl}).done(function (allPosts) {

     var compiledTemplate = _.map(allPosts, function (postTemplate) {
       return template(new Post(postTemplate));
     });

     $('#postContainer').html(compiledTemplate);
  });
};

setInterval(getBlogPosts, 1000);
