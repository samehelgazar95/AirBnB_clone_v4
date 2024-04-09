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
