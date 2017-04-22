/*jshint esversion: 6 */


// get JSON data

var locationData;

$.getJSON('assets/json/data.json').done(function(data) {
  locationData = data;
}).fail(function(err) {
  console.log("error");
});


$(document).ready(function() {
  console.log("ready");


  // Anchor tag shows on 600px, when scroll down

  $(document).scroll(function() {
    console.log("scroll");
    var y = $(this).scrollTop();
    if (y > 600) {
      $('.back-to-top').fadeIn();
    } else {
      $('.back-to-top').fadeOut();
    }
  });


  // Body tag gets a class nav-btn-only on screen width 898px

    // Check width on page load

  if (window.matchMedia('(max-width: 898px)').matches) {
   $('body').addClass('nav-btn-only');
  }
  else {}
  
    // If browser resized, check width again

  $(window).resize(function() {
    console.log("resize");
    if (window.matchMedia('(max-width: 898px)').matches) {
      $('body').addClass('nav-btn-only');
    }
    else {
      $('body').removeClass('nav-btn-only');
      $(".nav-btn").removeClass("active");
      $(".primary-nav, div.wrapper, div.nav-wrapper, div.mega-menu, ul.list-wrapper").removeClass("showMe");
    }
  });


  // Nav-btn menu

  $(".nav-btn").click(function() {
    $(this).toggleClass("active");
    $(".primary-nav").toggleClass("showMe");
    $("div.wrapper, div.nav-wrapper, div.mega-menu, ul.list-wrapper").removeClass("showMe");
  });

  $("li > a, li.mega-menu-parent .col-sm-3 a").click(function() {
    event.preventDefault();
  });

  $("li.has-child > a").click(function() {
    $(this).next().toggleClass("showMe");
  });

  $("li.mega-menu-parent > a").click(function() {
    $(this).next().children(".mega-menu").toggleClass("showMe");
  });

  $("li.mega-menu-parent .col-sm-3 > a").click(function() {
    event.preventDefault();
    $(this).next().toggleClass("showMe");
  });


  // "Controls-more" menu - open on click and close on click anywhere on the page

  $(document).on("click", function(e){
    if(e.target.className === "controls-more"){
      $(".controls-more.show").removeClass("show");
      $(e.target).addClass("show");
    } else {
      $(".controls-more.show").each(function() {
        $(this).removeClass("show");
      });
    }
  });


  // Bootstrap-datepicker plugin initialization

  $(".date-picker").datepicker();


  // iCheck plugin initialization

  if ($("input[type=checkbox]").length > 0) {
    $("input").iCheck();
  }

  if ($("input[type=radio]").length > 0) {
    $("input").iCheck();
  }
  

  // noUiSlider plugin initialization and options

  var slider = document.getElementById("price-slider");
  noUiSlider.create(slider, {
    start: [10, 400],
    connect: true,
    step: 10,
    range: {
      min: 10,
      max: 400
    },
    format: wNumb ({
      decimals: 0,
      thousand: ".",
      prefix: "$"
    })
  });

  var sliderValues = [
    document.getElementById('input-format-min'),
    document.getElementById('input-format-max')
  ];

  slider.noUiSlider.on('update', function(values, handle) {
    sliderValues[handle].innerHTML = values[handle];
  });


  // Recent Places Section

  function createInnerHTML(className) {
    var item = $('.' + className);
    item.each(function() {
      var dataId = this.getAttribute("data-id");
      var place = locationData[dataId];
      this.innerHTML = createHTMLElement(place);
    });
  }

  function createHTMLElement(place){

    return  '<div class="item">' +
            '<span class="' + place.top + ' ribbon">Top</span>' +  
            '<a href="#">' +
              '<div class="description">' + 
                '<span class="info">' + place.info + '</span>' +
                '<span class="label">' + place.label + '</span>' + 
                '<h3>' + place.title + '</h3>' + 
                '<h4>' + place.address + '</h4>' + 
              '</div>' + 
              '<div class="image" style="background-image: url(' + place.thumbnailImage + ')" alt="background-image"></div>' + 
            '</a>' + 
            '<div class="additional-info">' +
              '<span class="' + place.top + ' check-circle">' + 
                '<i class="fa fa-check" aria-hidden="true"></i>' + 
              '</span>' + 
              '<div class="rating">' + 
                '<span class="stars">' + 
                  '<i class="' + place.star.one + ' fa fa-star" aria-hidden="true"></i>' + 
                  '<i class="' + place.star.two + ' fa fa-star" aria-hidden="true"></i>' + 
                  '<i class="' + place.star.three + ' fa fa-star" aria-hidden="true"></i>' + 
                  '<i class="' + place.star.four + ' fa fa-star" aria-hidden="true"></i>' + 
                  '<i class="' + place.star.five + ' fa fa-star" aria-hidden="true"></i>' + 
                '</span>' + 
                '<span class="reviews">' + place.reviews + '</span>' + 
              '</div>' + 
              '<div class="controls-more">' + 
                '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' + 
                '<ul>' + 
                  '<li><a href="#">Add to favorites</a></li>' + 
                  '<li><a href="#">Add to watchlist</a></li>' + 
                  '<li><a href="#">Quick detail</a></li>' + 
                '</ul>' +   
              '</div>' + 
            '</div>' + 
          '</div>';
  }

  createInnerHTML("item-wrapper");
  createInnerHTML("rated-item-wrapper");
  createInnerHTML("gallery-item-wrapper");


  // Gallery Section - Initialize slick plugin

  $('.gallery-slider').slick({
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    appendArrows: $("#gallery-nav"),
    prevArrow: $("#slick-prev"),
    nextArrow: $("#slick-next")
  });


  // Rated Items Section - Initialize slick plugin

  $('.testimonials-slider').slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000
  });


  // Slick-dots settings
  
  $(".slick-dots li button").remove();
  $(".slick-dots li").append("<span></span>");


  // Google map initialization call

  initMap();
});