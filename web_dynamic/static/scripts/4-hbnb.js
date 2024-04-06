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

  // $.ajax({
  //   url: 'http://0.0.0.0:5001/api/v1/places_search/',
  //   type: 'POST',
  //   contentType: 'application/json',
  //   data: JSON.stringify({}),
  // })
  //   .done(function (data) {
  //     $.each(data, function (idx, place) {
  //       $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, (user) => {
  //         $('.places').append(
  //           $(`
  //           <article>
  //             <div class="title_box">
  //               <h2>${place.name}</h2>
  //               <div class="price_by_night">$ ${place.price_by_night}</div>
  //             </div>
  //             <div class="information">
  //                 <div class="max_guest">${place.max_guest} Guest${
  //             place.max_guest != 1 ? 's' : ''
  //           }</div>
  //                 <div class="number_rooms">${place.number_rooms} Bedroom${
  //             place.number_rooms != 1 ? 's' : ''
  //           }</div>
  //                 <div class="number_bathrooms">${
  //                   place.number_bathrooms
  //                 } Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
  //             </div>
  //             <div class="user">
  //                 <b>Owner: </b>${user.first_name} ${user.last_name}
  //             </div>
  //             <div class="description">${place.description}</div>
  //           </article>
  //         `)
  //         );
  //       });
  //     });
  //   })
  //   .fail(function (xhr, status, errorThrown) {
  //     console.log(`Status: ${status}, Error: ${errorThrown}`);
  //   });

  // THe above commented code is the right code, the bottom one is for testing last task
  // i will create article function to return the article tag
  // and then create the ajax again based on if the amenitiesLen is 0 or > 0
  $('.filters button').click(function (e) {
    let amenitiesLen = Object.keys(selectedAmenities).length;
    if (amenitiesLen > 0) {
      for (const [key, val] of Object.entries(selectedAmenities)) {
        console.log('Amenity ID', val);
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      amenities: ['3fccec93-2842-49a0-8fdb-4008af2ef041'],
    }),
  })
    .done(function (data) {
      let counter = 0;
      $.each(data, function (idx, place) {
        counter++;
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
      console.log(counter);
    })
    .fail(function (xhr, status, errorThrown) {
      console.log(`Status: ${status}, Error: ${errorThrown}`);
    });
});
