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
// });

$(document).ready(function () {
  const amenitiesChecked = {};
  $('.amenities input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenitiesChecked[$(this).data('name')] = $(this).data('id');
      console.log(amenitiesChecked)
    } else {
      delete amenitiesChecked[$(this).data('name')];
      console.log(amenitiesChecked)
    }
    $(".amenities h4").text(Object.keys(amenitiesChecked))
  });
});
