$(function() {
 
  $('form').submit(function(evt) {
    evt.preventDefault();
    
    var $searchField = $('#searchInput');
    var $searchTerm = $searchField.val();
    var $submitBtn = $('#submitBtn');
    
    $submitBtn.attr('disabled',true).val('Searching...');

    // url
    var flickrAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
    
    // data
    var flikrOptions = {
      tags: $searchTerm,
      format: 'json'
    };
    
    //callback
    var displayPhotos = function(response) {
      var photoHTML = '<ul>';
      
      $.each(response.items, function(i, photo){
        photoHTML += '<li>'; 
        photoHTML += '<a class="image" target="_blank" href="' + photo.link + '">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); 
      
      photoHTML += '</ul>';
      
      $('#photosContainer').html(photoHTML);
      
      //Display a message if there are no search results
      if ( !$('#photosContainer ul').html().length ) {
        var searchResultMsg = '<div class="searchResultMsg">Sorry, no photos were found matching the search term "';
        searchResultMsg += $searchTerm;
        searchResultMsg += '". Please try another search.</div>';
        $('#photosContainer').html(searchResultMsg);

        //Re-enable the Search button
        $submitBtn.attr('disabled',false).val('Search');
      }

      //Display a message if the search input is empty
      if ( $searchTerm.length === 0 ) {
        $('#photosContainer').html('<div class="searchResultMsg">Please enter a search term.</div>');
      }

      //Success message
      if ( $searchTerm.length && $('#photosContainer ul').html().length ) {
        var successMessage = '<div class="searchResultMsg">Results matching the term "';
        successMessage += $searchTerm;
        successMessage += '"</div>'
        $('#photosContainer ul').before(successMessage);
      }
      
      //Re-enable the Search button
      $submitBtn.attr('disabled',false).val('Search');
    };
    
    
    $.getJSON(flickrAPI, flikrOptions, displayPhotos);

    //Clear the input field
    $searchField.val('');

    //Blur the input field
    $searchField.blur();

  }); //end submit
  
}); //end ready