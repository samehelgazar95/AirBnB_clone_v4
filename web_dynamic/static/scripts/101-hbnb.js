$('document').ready(function () {
  const selectedStates = {};
  const selectedCities = {};
  const selectedAmenities = {};
  let locations = [];

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

  $('.locations .state_container input').click(function () {
    if (this.checked) {
      selectedStates[this.dataset.name] = this.dataset.id;
      locations.push(this.dataset.name);
    } else {
      delete selectedStates[this.dataset.name];
      let idx = locations.indexOf(this.dataset.name);
      locations.splice(idx, 1);
    }

    $('.locations h4').text(locations);
    if ($.isEmptyObject(locations)) {
      $('.locations h4').html('&nbsp;');
    }
  });

  $('.locations .city_container input').click(function () {
    if (this.checked) {
      selectedCities[this.dataset.name] = this.dataset.id;
      locations.push(this.dataset.name);
    } else {
      delete selectedCities[this.dataset.name];
      let idx = locations.indexOf(this.dataset.name);
      locations.splice(idx, 1);
    }

    $('.locations h4').text(locations);
    if ($.isEmptyObject(locations)) {
      $('.locations h4').html('&nbsp;');
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (body) => {
    if (body.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  /*
    the Fetch will start on clicking the search button
    first will check if the user filtered the amenities,
    it will add ids of those amenities to the filteredIds object, then clear the places' previous children
    and then pass this filteredIds to the ajax url and api route will handle the filtering,
    then create the article and append it to places
  */

  const filteredIds = {};
  $('.filters button').click(function (event) {
    event.preventDefault();
    $('.places').text('');
    if (Object.keys(selectedStates).length > 0)
      filteredIds.states = Object.values(selectedStates);
    if (Object.keys(selectedCities).length > 0)
      filteredIds.cities = Object.values(selectedCities);
    if (Object.keys(selectedAmenities).length > 0)
      filteredIds.amenities = Object.values(selectedAmenities);

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(filteredIds),
    })
      .done(function (data) {
        $.each(data, function (idx, place) {
          $.get(
            `http://0.0.0.0:5001/api/v1/users/${place.user_id}`,
            function (user) {
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
                  <div class="number_bathrooms">${
                    place.number_bathrooms
                  } Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
              </div>
              <div class="user">
                  <b>Owner: </b>${user.first_name} ${user.last_name}
              </div>
              <div class="description"><p>${place.description}</p></div>
              <div class="amenities">
                    <h2>Amenities</h2>
                    <ul>
                        <li class="tv">TV</li>
                        <li class="wifi">Wifi</li>
                    </ul>
                    <div class=reviews>
                        <h2>3 Reviews</h2>
                        <ul>
                            <li>
                                <h3>From Kamie Nean the 6th September 2017</h3>
                                <p>I felt like a Queen during my stay!</p>
                            </li>
                            <li>
                                <h3>From Heman the 5th October 2017</h3>
                                <p>Beautiful Place.</p>
                            </li>
                            <li>
                                <h3>From Numa the 15th August 2017</h3>
                                <p>Great view and service!</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
          `).appendTo('.places');
            }
          );
        });
      })
      .fail(function (xhr, status) {
        console.log(`Error code: ${xhr.status}, Status: ${status}`);
      });
  });
});
