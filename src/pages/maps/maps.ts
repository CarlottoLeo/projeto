import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
* https://developers.google.com/maps/documentation/javascript/adding-a-google-map
* https://ionicframework.com/docs/native/geolocation/
*/
@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  map: any;

  constructor(private geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapOptions = {
        zoom: 18,
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: "Hello World!"
      });
      var contentString = '<span>Infomações</span>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 700
      });

      // Exibir texto ao clicar no pin;
      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map, marker);
    });

    var locations = [
      ['Eu', resp.coords.latitude, resp.coords.longitude, 4],
      ['<span>Eletricista</span>' + '<br>' + '<span>Disponivel</span>' + '<br>' + '<a href="##">Informações</a>', -27.6378422,-52.2723191, 3],
      ['Encanador', -27.6398612,-52.274529, 2],
      ['Mecânico', -27.6378712,-52.274329, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

  }).catch((error) => {
    console.log('Erro ao recuperar sua posição', error);
  });
}
}
