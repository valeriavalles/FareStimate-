

var marker;// variable del marcador
var coords= {}; //coordenadas obtenidas  


var proxy = 'https://cors-anywhere.herokuapp.com/';
var apiLinkDS = 'https://cors-anywhere.herokuapp.com/https://api.uber.com/v1.2/estimates/price?server_token=G1QV-BUwGiR6iwzCCO8aGWqwSFsdFb0qF8NOcGxR&start_latitude=-12.143310&start_longitude=-76.973480&end_latitude=-12.050993&end_longitude=-77.124886';
//var button = $('#btn');

  $.ajax({
    url: proxy + apiLinkDS,
    success: function(prices) { 
      console.log(prices);
      
    }

});    
//-12.143310, -76.973480
//-12.050993, -77.124886

//-12.153854, -76.971732
//-4.752382, -80.607259



