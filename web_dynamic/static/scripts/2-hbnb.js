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

//   $.getJSON('http://0.0.0.0:5001/api/v1/status/', (body) => {
//     if (body.status === 'OK') {
//       $('div#api_status').addClass('available');
//     } else {
//       $('div#api_status').removeClass('available');
//     }
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

  // $.ajax({
  //   method: 'GET',
  //   url: 'http://localhost:5001/api/v1/status/',    
  //   success: function () { $('div#api_status').addClass('available') },
  //   error:  function () { $('div#api_status').removeClass('available') },
  // });

  $.get('http://localhost:5001/api/v1/status/', function(data) {
    if (data.status == "OK") {
      $('div#api_status').addClass('available')
    } else {
      $('div#api_status').removeClass('available')
    }
  })
  
});
