// Inicializando el mapa
function initMap() {
  var latitud, longitud, marcador;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -9.082632,
      lng: -84.0431127}// Coordenadas de Peru
  });
  var miUbicacion = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    marcador = new google.maps.Marker({
      position: {lat: latitud,
        lng: longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });
    map.setZoom(17);
    map.setCenter({lat: latitud,
      lng: longitud});
  };
  var error = function(error) {
    window.alert('Tu navegador no soporta la API de geolocalizacion');
  };

  function buscar(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(miUbicacion, error);
    }
  }

  // funcion getcords vale-yani
  function getCoords() {
  // Creamos el objeto geodecoder
 
    var geocoder = new google.maps.Geocoder();
    console.log(geocoder);
    address = document.getElementById('puntoPartida').value;
    address2 = document.getElementById('puntoDestino').value;
    console.log(address);
    console.log(address2);

    if (address !== '' && address2 !== '') {
      console.log('estoy llenito');
      // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
      geocoder.geocode({ 'address': address}, function(results, status) {
        console.log(results);
        console.log(status);
        if (status == 'OK') {
          console.log('llegamos valeria');
          // Mostramos las coordenadas obtenidas en el p con id coordenadas
          //  document.getElementById("coordenadas").innerHTML='Coordenadas:   '+results[0].geometry.location.lat()+', '+results[0].geometry.location.lng();
          document.getElementById('cslat').textContent = results[0].geometry.location.lat();
          document.getElementById('cslog').textContent = results[0].geometry.location.lng();
          //  document.getElementById("celat").value = results[0].geometry.location.lat();
        }
      });

      geocoder.geocode({ 'address': address2}, function(results, status) {
        console.log(results);
        console.log(status);
        if (status == 'OK') {
          console.log('llegamos yanina');
          // Mostramos las coordenadas obtenidas en el p con id coordenadas
          //  document.getElementById("coordenadas2").innerHTML='Coordenadas:   '+results[0].geometry.location.lat()+', '+results[0].geometry.location.lng();
          document.getElementById('celat').textContent = results[0].geometry.location.lat();
          document.getElementById('celog').textContent = results[0].geometry.location.lng();
        }
      });
    }
    // e.preventDefault();
    console.log('hola coordenadas');
  }  

  // Trazando ruta
  var puntoPartida = document.getElementById('puntoPartida');
  var puntoDestino = document.getElementById('puntoDestino');
  new google.maps.places.Autocomplete(puntoPartida);
  new google.maps.places.Autocomplete(puntoDestino);

  var direccionService = new google.maps.DirectionsService;
  // console.log(direccionService);
  var direccionDisplay = new google.maps.DirectionsRenderer;
  // console.log(direccionDisplay);
  var calcularRuta = function(direccionService, direccionDisplay) {
    var request = {
      origin: puntoPartida.value,
      destination: puntoDestino.value,
      travelMode: 'DRIVING'
    };
    //   console.log(request); 
    direccionService.route(request, function(result, status) {
      console.log(request);
      if (status == 'OK') {
        direccionDisplay.setDirections(result);
      }
    });
    direccionDisplay.setMap(map);
    marcador.setMap(null);
  };

  window.addEventListener('load', buscar);
  let inputSearch = document.getElementById('puntoDestino');
  let place = new google.maps.places.Autocomplete(inputSearch);
  place.addListener('place_changed', () => {
    // e.preventDefault(); 
    calcularRuta(direccionService, direccionDisplay);   
    getCoords();
  });
}

