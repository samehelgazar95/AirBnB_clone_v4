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

    for (const [k, v] of Object.entries(selectedAmenities)) {
      console.log(k, v);
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (body) => {
    if (body.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // >>> BUG <<< THe filter just works fine when filtering with only one amenity
  // but when choosing more than amenity it will not work properly

  // the Fetch will start on clicking the search button
  // first will check if the user filtered the amenities,
  // i will add ids of those amenities to the idsFiltered object
  //  and then pass this object to the ajax url and api route will handle the filtering
  let idsFiltered = {
    states: [],
    cities: [],
    amenities: [],
  };

  $('.filters button').click(function () {
    if (Object.keys(selectedAmenities).length > 0) {
      for (const id of Object.values(selectedAmenities)) {
        idsFiltered['amenities'].push(String(id));
      }
    }

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(idsFiltered),
    })
      .done(function (data) {
        // But before every fetch i clean up the current places
        // in order not to have the previous places with the current ones
        $('.places').empty();
        $.each(data, function (idx, place) {
          $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, (user) => {
            $('.places').append(
              // it's better to create function to create this tag separatly
              // i tried to it in the below code, but got some errors
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
              <div class="description">${place.description}</div>
            </article>
          `)
            );
          });
        });
      })
      .fail(function (xhr, status) {
        console.log(`Error code: ${xhr.status}`);
        console.log(`Status: ${status}`);
      })
      // Here iam cleaning the idsFiltered after fetching
      // in order not to have repeated ids for same amenities
      .always(function () {
        idsFiltered = {
          states: [],
          cities: [],
          amenities: [],
        };
      });
  });

  // Here i was just trying to separate the article tag from the fetching function to make it readable
  // But it's needed to be handled using async await concept
  //   function createArticleForPlace(place) {
  //     $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, (user) => {
  //       const place = $(`
  //           <article>
  //               <div class="title_box">
  //                 <h2>${place.name}</h2>
  //                 <div class="price_by_night">$ ${place.price_by_night}</div>
  //               </div>
  //               <div class="information">
  //                   <div class="max_guest">${place.max_guest} Guest${
  //         place.max_guest != 1 ? 's' : ''
  //       }</div>
  //                   <div class="number_rooms">${place.number_rooms} Bedroom${
  //         place.number_rooms != 1 ? 's' : ''
  //       }</div>
  //                   <div class="number_bathrooms">${
  //                     place.number_bathrooms
  //                   } Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
  //               </div>
  //               <div class="user">
  //                   <b>Owner: </b>${user.first_name} ${user.last_name}
  //               </div>
  //               <div class="description">${place.description}</div>
  //             </article>
  //           `);
  //       return place;
  //     });
  //   }

  //   $.ajax({
  //     url: 'http://0.0.0.0:5001/api/v1/places_search/',
  //     type: 'POST',
  //     contentType: 'application/json',
  //     data: JSON.stringify(idsObj),
  //   })
  //     .done(function (data) {
  //       let counter = 0;
  //       $.each(data, function (idx, place) {
  //         placeArticle = createArticleForPlace(place);
  //         $('.places').append(placeArticle);
  //         counter++;
  //       });
  //       console.log(counter);
  //     })
  //     .fail(function (xhr, status, errorThrown) {
  //       console.log(`Status: ${status}, Error: ${errorThrown}`);
  //     });
});
