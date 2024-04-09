$(document).ready(function () {
  const amenitiesChecked = {};
  $('.amenities input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenitiesChecked[$(this).data('name')] = $(this).data('id');
    } else {
      delete amenitiesChecked[$(this).data('name')];
    }
    $(".amenities h4").text(Object.keys(amenitiesChecked))
  });

  $.get('http://localhost:5001/api/v1/status/', function(data) {
    if (data.status == "OK") {
      $('div#api_status').addClass('available')
    } else {
      $('div#api_status').removeClass('available')
    }
  })

  $.ajax({
    method: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',    
    data : '{}',
    contentType: 'application/json',
    success: function(data) {
      data.forEach(place => {
        $('.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            ${place.max_guest} Guest
          </div>
          <div class="number_rooms">
            ${place.number_rooms} Bedroom
          </div>
          <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">${place.description}</div>
        </article>`)
      })
    }
  });

  $('.filters button').click(function () {
    let i = 0;
    let filteredAmenities = {}
    filteredAmenities['amenities'] = Object.values(amenitiesChecked)
    $('.places').text('')
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',    
      data : JSON.stringify(filteredAmenities),
      contentType: 'application/json',
      success: function(data) {
        data.forEach(place => {
          i += 1
          $('.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom
            </div>
          </div>
          <div class="description">${place.description}</div>
          </article>`)
        })
      console.log(i)
      }
    });
  });
});
