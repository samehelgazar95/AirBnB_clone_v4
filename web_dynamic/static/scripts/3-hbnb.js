$('document').ready(function () {
  const selectedAmenities = {};

  $('.amenities input').click(function () {
    if (this.checked) {
      selectedAmenities[this.dataset.name] = this.dataset.id;
    } else {
      delete selectedAmenities[this.dataset.name];
    }

    $('.amenities h4').text(Object.keys(selectedAmenities));
    if ($.isEmptyObject(selectedAmenities)) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (body) => {
    if (body.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

// ajax is returning the whole places from the db
// then looping through every place and fetching the user's name by fetching the user data
// that's has a relation with the current place, by using $.get()
// and  then create the article tag with the fetched data
// --- You can remove the place article tag from 3-hbnb.html if u want ---
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({})
  })
  .done(function(data) {
    $.each(data, function(idx, place){
      $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, (user) => {
        $('.places').append(
          $(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$ ${place.price_by_night}</div>
              </div>
              <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${
                place.max_guest != 1 ? 's' : ''
              }</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${
                place.number_rooms != 1 ? 's' : ''
              }</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                place.number_bathrooms != 1 ? 's' : ''
              }</div>
              </div>
              <div class="user">
                  <b>Owner: </b>${user.first_name} ${user.last_name}
              </div>
              <div class="description">${place.description}</div>
            </article>
          `)
        );
      });
    })
  })
  .fail(function(xhr, status, errorThrown) {
    console.log('Status: ' + status);
    console.log('Error: ' + errorThrown);
  })
});
