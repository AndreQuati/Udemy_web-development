$(document).on("keydown", function (e) {

  $("h1").text(e.key);

});

$("button").on("click", function (e) {
  // Adding a series of animation methods in series
  $("h1").fadeToggle().slideUp().slideDown().animate({opacity: 0.5});

});
