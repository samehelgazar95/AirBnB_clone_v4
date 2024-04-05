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
});
