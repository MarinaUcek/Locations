/*jshint esversion: 6 */


// Google map initialization

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(40.7344458, -73.86704922),
    zoom: 14,
    scrollwheel: false,
    mapTypeId: "roadmap",
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#c6c6c6"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}]
  });

  var lastInfobox;
  var lastClickedMarker;


  // Create and place markers function

  function createMarker(locationData) {
    
    var newMarkers = [];

    for (var i in locationData) { 

      var location = new google.maps.LatLng(locationData[i].lat, locationData[i].lang);
      
      var markerContent = document.createElement('div');
      markerContent.innerHTML =
        '<div id="marker" data-id="'+ locationData[i].id +'">' +
            '<div class="title">'+ locationData[i].title +'</div>' +
            '<div class="marker-wrapper">' +
                '<div class="tag"><i class="fa fa-check" aria-hidden="true"></i></div>' +
                '<div class="pin">' +
                    '<div class="image" style="background-image: url('+ locationData[i].thumbnailImage +');"></div>' +
                '</div>' +
                '<div class="search"><i class="fa fa-search" aria-hidden="true"></i></div>' +
            '</div>' +
        '</div>';


      // Create marker using RichMarker plugin

      var marker = new RichMarker({
        map: map,
        position: location,
        content: markerContent,
        draggable: false,
        flat: true
      });


      // Add event listener - Click

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            openInfobox( $(this.content.firstChild).attr("data-id"), this, i );
        };
      })(marker, i));

      newMarkers.push(marker);
    }
    

    // Create popup marker box using infobox plugin

    function openInfobox(id, _this, i){

      console.log("openInfoBox");

      var infoboxContent = document.createElement('div');
      infoboxContent.innerHTML = 
        '<div class="item infobox" data-id="'+ locationData[i].id +'">' +
          '<a href="#">' + 
            '<div class="description">' + 
              '<div class="label">' + locationData[i].label + '</div>' +
              '<h3>' + locationData[i].title + '</h3>' +
              '<h4>' + locationData[i].address + '</h4>' + 
            '</div>' + 
            '<div class="image" style="background-image: url(' + locationData[i].thumbnailImage + ')"></div>' + 
          '</a>' + 
          '<div class="rating">' + 
            '<span class="stars"><i class="' + locationData[i].star.one + ' fa fa-star" aria-hidden="true"></i></span>' + 
            '<span class="stars"><i class="' + locationData[i].star.two + ' fa fa-star" aria-hidden="true"></i></span>' +
            '<span class="stars"><i class="' + locationData[i].star.three + ' fa fa-star" aria-hidden="true"></i></span>' +
            '<span class="stars"><i class="' + locationData[i].star.four + ' fa fa-star" aria-hidden="true"></i></span>' +
            '<span class="stars"><i class="' + locationData[i].star.five + ' fa fa-star" aria-hidden="true"></i></span>' +
            '<span class="reviews">' + locationData[i].reviews + '</span>' + 
          '</div>' + 
          '<div class="controls-more">' + 
            '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' + 
            '<ul>' + 
              '<li><a href="#">Add to favorites</a></li>' + 
              '<li><a href="#">Add to watchlist</a></li>' + 
            '</ul>' + 
          '</div>' + 
        '</div>';

      infoboxOptions = {
        content: infoboxContent,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(-135, -50),
        zIndex: null,
        alignBottom: true,
        boxClass: "infobox-wrapper",
        enableEventPropagation: true,
        closeBoxMargin: "0px 0px -8px 0px",
        closeBoxURL: "assets/img/close-btn.png",
        infoBoxClearance: new google.maps.Size(1, 1)
      };

      if(lastInfobox !== undefined){
          lastInfobox.close();
      }

      newMarkers[i].infobox = new InfoBox(infoboxOptions);
      newMarkers[i].infobox.open(map, _this);
      lastInfobox = newMarkers[i].infobox;

      setTimeout(function(){
          $(".item.infobox[data-id="+ id +"]").parent().parent().addClass("show");
      }, 10);

      google.maps.event.addListener(newMarkers[i].infobox,'closeclick',function(){
          $(lastClickedMarker).removeClass("active");
      });
    }
  }

  createMarker(locationData);
}