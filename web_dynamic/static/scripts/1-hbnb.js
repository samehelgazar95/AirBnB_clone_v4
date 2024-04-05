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
});
