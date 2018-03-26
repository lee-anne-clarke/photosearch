//This is the pre-compiled JS file used for Flikr photo search: http://lee-anne-clarke.com/work/photosearch/


import $ from 'jquery'

$(function() {

  $('form').submit(function(evt) {
    evt.preventDefault();
    
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
      let photoHTML = '<ul>';

      for (let photo of response.items) {
        photoHTML += '<li>'; 
        photoHTML += `<a class="image" target="_blank" href="${photo.link}">`;
        photoHTML += `<img src="${photo.media.m}"></a></li>`;
      }
      
      photoHTML += '</ul>';
      
      $('#photosContainer').html(photoHTML);
      
      //Display a message if there are no search results
      if ( !$('#photosContainer ul').html().length ) {
        $('#photosContainer').html(`<div class="searchResultMsg">Sorry, no photos were found matching the search term "${$searchTerm}".</div>`);

        //Re-enable the Search button
        $submitBtn.attr('disabled',false).val('Search');        
      }

      //Display a message if the search input is empty
      if ( $searchTerm.length === 0 ) {
        $('#photosContainer').html('<div class="searchResultMsg">Please enter a search term.</div>');
      }

      //Success message
      if ( $searchTerm.length && $('#photosContainer ul').html().length ) {
        $('#photosContainer ul').before(`<div class="searchResultMsg">Results matching the term "${$searchTerm}".</div>`);
      }
      
      //Re-enable the Search button
      $submitBtn.attr('disabled',false).val('Search');
    };
    
    
    $.getJSON(flickrAPI, flikrOptions, displayPhotos);

    //Clear the form field
    $searchField.val('');

    //Blur the input field
    $searchField.blur();

  }); //end submit

}); //end ready