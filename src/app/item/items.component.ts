import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Accuracy } from "ui/enums";
import * as geolocation from "nativescript-geolocation";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    currentLat: number;
    currentLng: number;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();

        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
               this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log('location enabled!');
            this.watch();
        }, e => {
            console.log('Failed to enable', e);
        });
    }

    watch() {
        console.log('watchLocation()');
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    @ViewChild("map", {static: false}) public mapbox: ElementRef;

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 14
            }
        )
    }
}
