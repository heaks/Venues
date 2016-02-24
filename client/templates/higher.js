Template.higher.onCreated(function(){
    this.venuesData = new ReactiveVar([]);
    this.currentCenter = new ReactiveVar();
    this.currentRadius = new ReactiveVar();
    this.markersArray = new ReactiveVar([]);
    this.mapInstance = new ReactiveVar();
    this.venuesMarker = function(element){
        if(this.mapInstance){
        var marker = new google.maps.Marker({
            position: {lat:element.location.lat, lng:element.location.lng},
            map: this.mapInstance.get()
        });
            this.markersArray.get().push(marker);
        }
    }
});

Template.higher.helpers({
    options : function() {
        var instance = Template.instance();
        return {
            venuesData : instance.venuesData,
            currentCenter : instance.currentCenter,
            currentRadius : instance.currentRadius,
            markersArray : instance.markersArray,
            mapInstance : instance.mapInstance,
            venuesMarker : instance.venuesMarker
        }
    }
});