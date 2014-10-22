var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collections/wordsfromalyssa';
var postObject = {}; // Create me an empty object
var template = _.template($('#postTemplate').html());

  $('input[type=submit]').on('click', function (event) {
    event.preventDefault();
    var postName    =  $('input.field').serializeArray();
    var postWords =  $('textarea.field').serializeArray();
    //Turn everything into an array of js objects and not DOM objects

    postName.forEach(function (postTitle) {
      postObject[postTitle.name] = postTitle.value;
    });

    postWords.forEach(function (postContent) {
      postObject[postContent.name] = postContent.value;
    });

    // I know theres a bette rwayt o do this but I couldnt figure it out :(

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: postObject
      //Send a POST request to our API to save the data from the form.
    }).done(function (data) { $('input.field').val('') });
    //Clear all the data in the form after its done.
    });

    $.ajax( {url: apiUrl} ).done(function (allPosts) {

      var compiledTemplate = _.map(allPosts, function (postTemplate) {
          if (_.isUndefined(postTemplate.post)){
            postTemplate.post = " "
          }
          if (_.isUndefined(postTemplate.title)){
            postTemplate.title = " "
          }
        return template(postTemplate)
      });


    $('#postContainer').html(compiledTemplate);
    });
