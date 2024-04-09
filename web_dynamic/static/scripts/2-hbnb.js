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
  
});
