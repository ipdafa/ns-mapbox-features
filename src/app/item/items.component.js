"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("ui/enums");
var geolocation = require("nativescript-geolocation");
var item_service_1 = require("./item.service");
var ItemsComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = this.itemService.getItems();
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(function (enabled) {
            console.log('isEnabled =', enabled);
            if (enabled) {
                _this.watch();
            }
            else {
                _this.request();
            }
        }, function (e) {
            console.log('isEnabled error', e);
            _this.request();
        });
    };
    ItemsComponent.prototype.request = function () {
        var _this = this;
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(function () {
            console.log('location enabled!');
            _this.watch();
        }, function (e) {
            console.log('Failed to enable', e);
        });
    };
    ItemsComponent.prototype.watch = function () {
        var _this = this;
        console.log('watchLocation()');
        geolocation.watchLocation(function (position) {
            _this.currentLat = position.latitude;
            _this.currentLng = position.longitude;
        }, function (e) {
            console.log('failed to get location');
        }, {
            desiredAccuracy: enums_1.Accuracy.high,
            minimumUpdateTime: 500
        });
    };
    ItemsComponent.prototype.onMapReady = function (args) {
        args.map.setCenter({
            lat: this.currentLat,
            lng: this.currentLng,
            animated: true,
            zoomLevel: 14
        });
    };
    __decorate([
        core_1.ViewChild("map"),
        __metadata("design:type", core_1.ElementRef)
    ], ItemsComponent.prototype, "mapbox", void 0);
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGtDQUFvQztBQUNwQyxzREFBd0Q7QUFHeEQsK0NBQTZDO0FBTzdDO0lBS0ksNElBQTRJO0lBQzVJLGlIQUFpSDtJQUNqSCx3QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBSSxDQUFDO0lBRWpELGlDQUFRLEdBQVI7UUFBQSxpQkFlQztRQWRHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNMLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQUEsQ0FBQztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFPLEdBQVA7UUFBQSxpQkFRQztRQVBHLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUUsVUFBQSxDQUFDO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBV0M7UUFWRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFBLFFBQVE7WUFDOUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDLEVBQUUsVUFBQSxDQUFDO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFDLENBQUMsRUFBRTtZQUNDLGVBQWUsRUFBRSxnQkFBUSxDQUFDLElBQUk7WUFDOUIsaUJBQWlCLEVBQUUsR0FBRztTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQsbUNBQVUsR0FBVixVQUFXLElBQVM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQ2Q7WUFDSSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQVhpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBZ0IsaUJBQVU7a0RBQUM7SUFqRG5DLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBUW1DLDBCQUFXO09BUG5DLGNBQWMsQ0E2RDFCO0lBQUQscUJBQUM7Q0FBQSxBQTdERCxJQTZEQztBQTdEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuICAgIGN1cnJlbnRMYXQ6IG51bWJlcjtcbiAgICBjdXJyZW50TG5nOiBudW1iZXI7XG5cbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcOKAmXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2luZyBpZiBnZW9sb2NhdGlvbiBpcyBlbmFibGVkJyk7XG4gICAgICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaXNFbmFibGVkID0nLCBlbmFibGVkKTtcbiAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICB0aGlzLndhdGNoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2lzRW5hYmxlZCBlcnJvcicsIGUpO1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmFibGVMb2NhdGlvblJlcXVlc3QoKScpO1xuICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2NhdGlvbiBlbmFibGVkIScpO1xuICAgICAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gZW5hYmxlJywgZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnd2F0Y2hMb2NhdGlvbigpJyk7XG4gICAgICAgIGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24ocG9zaXRpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF0ID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMbmcgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBnZXQgbG9jYXRpb24nKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDUwMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwibWFwXCIpIHB1YmxpYyBtYXBib3g6IEVsZW1lbnRSZWY7XG5cbiAgICBvbk1hcFJlYWR5KGFyZ3M6IGFueSkge1xuICAgICAgICBhcmdzLm1hcC5zZXRDZW50ZXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGF0OiB0aGlzLmN1cnJlbnRMYXQsIC8vIG1hbmRhdG9yeVxuICAgICAgICAgICAgICAgIGxuZzogdGhpcy5jdXJyZW50TG5nLCAvLyBtYW5kYXRvcnlcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgLy8gZGVmYXVsdCB0cnVlXG4gICAgICAgICAgICAgICAgem9vbUxldmVsOiAxNFxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxufSJdfQ==