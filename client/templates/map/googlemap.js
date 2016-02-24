Meteor.startup(function() {
    GoogleMaps.load();
});

Template.googlemap.helpers({
   exampleMapOptions: function() {
       if (GoogleMaps.loaded()) {
           return {
               center: new google.maps.LatLng(35.673343, 139.7103788),
               zoom: 10
           };
       }
   }
});

Template.googlemap.onCreated(function() {
    console.log(this);
    var variables = this.data.variables;
    GoogleMaps.ready("exampleMap", function(map) {
        variables.mapInstance.set(map.instance);
        variables.currentCenter.set(map.instance.getCenter());
        var zoomLevel = map.instance.getZoom();
        variables.currentRadius.set(Math.pow(2, (8 - zoomLevel)) * 276890);

        map.instance.addListener('center_changed', function(){
            variables.currentCenter.set(map.instance.getCenter());
        });

        map.instance.addListener('zoom_changed', function() {
            variables.currentRadius.set((Math.pow(2, (8 - map.instance.getZoom()))) * 276890);
        });

    });

});