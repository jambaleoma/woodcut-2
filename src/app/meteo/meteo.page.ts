import { Router } from '@angular/router';
import { OpenweatherService } from './../services/openweather.service';
import { AccessService } from './../services/access.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cities } from './../../assets/JSON/cityList.json';
import { ajax } from 'rxjs/ajax';

import { Plugins } from '@capacitor/core';
import { city } from '../model/city.model';
import { Coord } from '../model/coord.model';

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})
export class MeteoPage implements OnInit {

  city: string;
  description: string;
  iconDescription: string;
  sunSet: number;
  sunRise: number;
  citySelected = false;
  cities: city[] = [];
  citiesSearch: city[] = [];
  logoutTimer = this.accessService.loogoutTimer.asObservable();

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  constructor(
    private accessService: AccessService,
    private openWheatherService: OpenweatherService,
    private router: Router) { }

  ngOnInit() {
    this.cities = cities.map(city => ({
      name: city.name
    }));
  }

  ionViewDidEnter() {
    this.accessService.resetLogoutTimer();
  }

  loadMap(coord: Coord) {

    let latLng = new google.maps.LatLng(coord.lat, coord.lon);

    let mapOptions = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    let marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map
    })

    this.markers.push(marker);
  }

  searchCity($event) {
    this.citiesSearch = this.cities.filter((city) => city.name.includes($event.target.value));
    this.city = null;
    this.citySelected = false;
  }

  checkCity($event) {
    this.city = $event.target.value;
    if (this.citiesSearch.length > 0 && this.city) {
      this.citySelected = true;
    } else {
      this.citySelected = false;
    }
    if (this.city) {
      const wheatherOfCitySerch = ajax(this.openWheatherService.getWheatherAPI().concat('?q=' + this.city + ',it&APPID=' + this.openWheatherService
      .getWheatherAPIToken() + '&units=metric&lang=it'));

      const subscribe = wheatherOfCitySerch.subscribe(
        res => {
          this.sunRise = res.response.sys.sunrise,
          this.sunSet = res.response.sys.sunset,
          this.description = res.response.weather[0].description,
          this.iconDescription = res.response.weather[0].icon,
          this.loadMap(res.response.coord);
        },
        err => console.error(err)
      );
    }
  }

  navigateTo(direction: string) {
    this.router.navigateByUrl(direction);
  }

}
