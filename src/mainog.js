import $ from 'jquery'

$(function() {

  $('form').submit(function(event) {
    event.preventDefault();
    
    let $searchField = $('#searchInput');
    let $searchTerm = $searchField.val();
    let $submitBtn = $('#submitBtn');
    
    $submitBtn.attr('disabled',true).val('Searching...');

    // url
    let flickrAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
    
    // data
    let flikrOptions = {
      tags: $searchTerm,
      format: 'json'
    };
    
    //callback
    let displayPhotos = response => {
      let photoHTML = '<ul class="photos-list">';

      for (let photo of response.items) {
        photoHTML += '<li class="photos-list-item">'; 
        photoHTML += `<a class="photo-link" target="_blank" href="${photo.link}">`;
        photoHTML += `<img class="photo" src="${photo.media.m}"></a></li>`;
      }
      
      photoHTML += '</ul>';
      
      $('#photosContainer').html(photoHTML);
      
      //Display a message if there are no search results
      if ( !$('#photosContainer ul').html().length ) {
        $('#photosContainer').html(`<p class="form-msg">Sorry, no photos were found matching the search term "${$searchTerm}".</p>`);

        //Re-enable the Search button
        $submitBtn.attr('disabled',false).val('Search');        
      }

      //Success message
      if ( $searchTerm.length && $('#photosContainer ul').html().length ) {
        $('#photosContainer ul').before(`<p class="form-msg">Results matching the term "${$searchTerm}":</p>`);
      }
      
      //Re-enable the Search button
      $submitBtn.attr('disabled',false).val('Search');
    };
    
    $.getJSON(flickrAPI, flikrOptions, displayPhotos);

    //Clear the search input field
    $searchField.val('');

    //Blur the search input field
    $searchField.blur();

  }); //end submit
}); //end ready