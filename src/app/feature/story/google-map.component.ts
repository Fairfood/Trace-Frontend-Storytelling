/* istanbul ignore file */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
// configs
import { environment } from 'src/environments/environment';
import { mapStyle } from './map-style';
import { Stage } from './story.interface';
declare const MarkerClusterer: any;
declare const google: any;

@Component({
  selector: 'app-google-map',
  template: '',
})
export class GoogleMapComponent {
  googleMapObj: any;
  markerSmall: any;
  markerBig: any;
  mapPolylines: any[] = [];
  markerIcon: any;
  selectedMarkerIcon: any;
  infoWindow: any;
  markers: google.maps.LatLngLiteral[] = [];
  markerCluster: any;
  styles: any[] = mapStyle;
  gMapLoaded = false;
  mapActors: any[];
  stages: Stage[];
  mapDefaultOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    minZoom: 2,
    maxZoom: 8,
    options: {
      gestureHandling: 'greedy',
    },
    streetViewControl: false,
  };
  themeData: any;
  polygonMap: any;

  @ViewChild('mapIdentifier', { read: ElementRef })
  public googleMap: ElementRef<any>;

  // Method to load Google Maps
  loadGoogleMaps(language: string): void {
    const loader = new Loader({
      apiKey: environment.gMapKey,
      language,
    });

    loader.load().then(() => {
      this.gMapLoaded = true;
    });
  }

  // Method triggered when Google Maps is ready
  mapReady(map: any): void {
    this.googleMapObj = map;
    this.googleMapObj.setOptions({
      styles: mapStyle,
    });
    this.initializeMapJourney();
  }

  // Initialize the map journey by setting markers and plotting polylines
  initializeMapJourney(): void {
    this.setMarkerIcons();
    this.initializeInfoWindow();
    this.createMarkers();
    // ploting polylines and setting intial view of map (full journey)
    setTimeout(() => {
      this.setMapView(this.markers, 'fullchain');
      this.plotPolyLines(
        this.markerCluster.clusters_,
        this.markerCluster.markers_
      );
    }, 1000);
    setTimeout(() => {
      this.setMapView(this.stages[0].actors, 'stage');
    }, 9000);
  }

  // Set marker icons for actors
  setMarkerIcons(): void {
    const vm = this;

    // marker icon for actors
    this.markerIcon = {
      url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(vm.markerSmall),
      scaledSize: new google.maps.Size(10, 10),
      anchor: new google.maps.Point(5, 5),
    };
    // marker icon for selected actors
    this.selectedMarkerIcon = {
      url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(vm.markerBig),
      size: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 20),
      zIndex: 100,
    };
  }

  // Initialize info window
  initializeInfoWindow(): void {
    this.infoWindow = new google.maps.InfoWindow();
  }

  // Create markers for actors
  createMarkers(): void {
    const vm = this;
    // Intializing markers
    for (const actor of this.mapActors) {
      const marker = new google.maps.Marker({
        position: {
          lat: actor.latitude,
          lng: actor.longitude,
        },
        icon: this.markerIcon,
        title: actor.name, //+ ' (' + stage.actor_name + ')',
        optimized: false,
      });
      marker['customInfo'] = actor;
      this.markers.push(marker);
    }
    // Adding markers to cluster
    this.markerCluster = new MarkerClusterer(this.googleMapObj, this.markers, {
      styles: [
        {
          textColor: 'white',
          url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(vm.markerBig),
          height: 40,
          width: 40,
        },
        {
          textColor: 'white',
          url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(vm.markerBig),
          height: 40,
          width: 40,
        },
        {
          textColor: 'white',
          url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(vm.markerBig),
          height: 40,
          width: 40,
        },
      ],
      gridSize: 10,
    });
  }

  // function to set mapview based on stage
  setMapView(markers: any, type: string): void {
    const bounds = new google.maps.LatLngBounds();
    let actorDetails;
    for (const marker of markers) {
      if (type === 'fullchain') {
        actorDetails = marker.customInfo;
      } else {
        actorDetails = marker;
      }
      bounds.extend(
        new google.maps.LatLng(actorDetails.latitude, actorDetails.longitude)
      );
    }
    this.googleMapObj.fitBounds(bounds);
  }

  // ploting polyline between markers
  plotPolyLines(clusters: any, markers: any) {
    let position1, position2;
    for (const marker of markers) {
      position1 = this.findMarkerPosition(marker, clusters);
      for (const connection of marker.customInfo.connected_to) {
        let connectedMarker;
        connectedMarker = markers.find(
          (mark: any) => mark.customInfo.id === connection
        );
        position2 = this.findMarkerPosition(connectedMarker, clusters);
        if (position1 && position2) {
          const linePath = [
            { lat: position1.lat(), lng: position1.lng() },
            { lat: position2.lat(), lng: position2.lng() },
          ];
          if (!marker.customInfo?.external_source) {
            this.drawLine(linePath);
          } else {
            this.plotStreamLine(linePath);
          }
        }
      }
    }
  }

  // remove all polylines from map
  removeAllLine(): void {
    for (const line of this.mapPolylines) {
      line.setMap(null);
    }
    this.mapPolylines = [];
  }

  // Search marker in clusters etc and find coridnates of that marker
  findMarkerPosition(marker: any, cluster: any): any {
    if (marker) {
      let clusterIndex;
      for (let i = 0; i < cluster?.length; i++) {
        const index = cluster[i].markers_.indexOf(marker);
        if (index !== -1) {
          clusterIndex = i;
          break;
        }
      }
      if (clusterIndex) {
        return this.markerCluster.clusters_[clusterIndex].center_;
      } else {
        return marker.position;
      }
    }
  }

  // Draw polyline in map based on connection status
  drawLine(linePath: any): void {
    const lineOptions = {
      path: linePath,
      map: this.googleMapObj,
      strokeColor: this.themeData.secondary_colour,
      strokeOpacity: 1,
      strokeWeight: 1,
      geodesic: true,
    };
    const line = new google.maps.Polyline(lineOptions);
    this.mapPolylines.push(line);
  }

  plotStreamLine(linePath: any): void {
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 2,
    };
    const lineOptions = {
      path: linePath,
      map: this.googleMapObj,
      strokeColor: this.themeData.secondary_colour,
      strokeOpacity: 0,
      geodesic: true,
      icons: [
        {
          icon: lineSymbol,
          offset: '0',
          repeat: '15px',
        },
      ],
    };
    const line = new google.maps.Polyline(lineOptions);
    this.mapPolylines.push(line);
  }

  // method to plot polygon
  plotPolygon(arr: any[]): void {
    const triangleCoords: any[] = [];
    arr.forEach(e => {
      const cords = {
        lat: e[0],
        lng: e[1],
      };
      triangleCoords.push(cords);
    });

    // Construct the polygon.
    this.polygonMap = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#700f0d',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#700f0d',
      fillOpacity: 0.35,
    });
    this.polygonMap.setMap(this.googleMapObj);
    const bounds = new google.maps.LatLngBounds();
    for (const markers of triangleCoords) {
      bounds.extend(new google.maps.LatLng(markers.lat, markers.lng));
    }

    this.googleMapObj.fitBounds(bounds);
    setTimeout(() => {
      this.googleMap.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    });
  }

  // Method to reset the map
  resetMap() {
    setTimeout(() => {
      this.setMapView(this.stages[0].actors, 'stage');
    }, 400);
    if (this.polygonMap) {
      this.polygonMap.setMap(null);
    }
  }
}
