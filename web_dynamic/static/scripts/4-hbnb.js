// $('document').ready(function () {
//   const selectedAmenities = {};

//   $('.amenities input').click(function () {
//     if (this.checked) {
//       selectedAmenities[this.dataset.name] = this.dataset.id;
//     } else {
//       delete selectedAmenities[this.dataset.name];
//     }

//     $('.amenities h4').text(Object.keys(selectedAmenities));
//     if ($.isEmptyObject(selectedAmenities)) {
//       $('.amenities h4').html('&nbsp;');
//     }
//   });

//   $.getJSON('http://localhost:5001/api/v1/status/', (body) => {
//     if (body.status === 'OK') {
//       $('div#api_status').addClass('available');
//     } else {
//       $('div#api_status').removeClass('available');
//     }
//   });

//   /*
//     the Fetch will start on clicking the search button
//     first will check if the user filtered the amenities,
//     it will add ids of those amenities to the filteredIds object, then clear the places' previous children
//     and then pass this filteredIds to the ajax url and api route will handle the filtering,
//     then create the article and append it to places
//   */
//   const filteredIds = {};
//   $('.filters button').click(function (event) {
//     let i = 0;
//     event.preventDefault();
//     $('.places').text('');
//     if (Object.keys(selectedAmenities).length > 0) { filteredIds.amenities = Object.values(selectedAmenities); }
//     console.log(filteredIds)

//     $.ajax({
//       url: 'http://localhost:5001/api/v1/places_search/',
//       type: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify(filteredIds)
//     })
//       .done(function (data) {
//         $.each(data, function (idx, place) {
//           i += 1;
//           $.get(
//             `http://localhost:5001/api/v1/users/${place.user_id}`,
//             function (user) {
//               $(`
//             <article>
//               <div class="title_box">
//                 <h2>${place.name}</h2>
//                 <div class="price_by_night">$ ${place.price_by_night}</div>
//               </div>
//               <div class="information">
//                   <div class="max_guest">${place.max_guest} Guest${
//                 place.max_guest != 1 ? 's' : ''
//               }</div>
//                   <div class="number_rooms">${place.number_rooms} Bedroom${
//                 place.number_rooms != 1 ? 's' : ''
//               }</div>
//                   <div class="number_bathrooms">${
//                     place.number_bathrooms
//                   } Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
//               </div>
//               <div class="user">
//                   <b>Owner: </b>${user.first_name} ${user.last_name}
//               </div>
//               <div class="description">${place.description}</div>
//             </article>
//           `).appendTo('.places');
//             }
//           );
//         });
//         console.log(i)
//       })
//       .fail(function (xhr, status) {
//         console.log(`Error code: ${xhr.status}, Status: ${status}`);
//       });
//   });
// });

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
