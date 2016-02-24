Template.venues.events({
    'keyup .venue-finder': function(event, tmpl){
        event.preventDefault();
        if(event.keyCode === 13){
            console.log(event.target);
            var text = event.target.value;
            var variables = tmpl.data.variables;
            event.target.value = "";

            //clearing old markers
            variables.markersArray.get().forEach(function(marker){
                marker.setMap(null);
            });
            variables.markersArray.set([]);

            //creating new query
            Meteor.call("addQuery", {
                venue: text,
                latitude: variables.currentCenter.get().lat().toFixed(5),
                longitude: variables.currentCenter.get().lng().toFixed(5),
                radius: ((variables.currentRadius.get() / 1000).toFixed(2)).toString() + "km"
            });

            //sending foursquare request
            var coord = variables.currentCenter.get();
            var url = "https://api.foursquare.com/v2/venues/search?ll=" + coord.lat() + ', ' + coord.lng() +
                "&client_id=DGBXAQGXLY0IRU0FLP4GAFRR10VWVSWRD5I3SYBUVIEVA5PB" +
                "&client_secret=0E4RIEHZLCH5EMWHG0QSYS2WDTAURN0KSRI3WRITQ3X4MILM" +
                "&v=20160115&radius=" + variables.currentRadius.get() +
                "&locale=en" + "&query=" + text;

            HTTP.get(url,{},function(error,result) {
                if(error) {
                    console.log(error);
                }
                else {
                    variables.venuesData.set(result.data.response.venues);
                    result.data.response.venues.forEach(function(element){
                        tmpl.data.variables.venuesMarker(element);
                    });
                }
            });
        }


    },
    "click .exportCSV": function(event,tmpl){
        var variables = tmpl.data.variables;
        if(variables.venuesData.get().length != 0){
            var csv = "";
            var allVenues = variables.venuesData.get();
            allVenues.forEach(function(item) {
                csv += [item.name, item.location.city, item.location.address, item.location.lat, item.location.lng].join(",") + "\n";
            });
            var csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
            var link = document.createElement("a");
            link.setAttribute("href", csvContent);
            link.setAttribute("download", "my_venues.csv");
            link.click();
        }
    }
});

Template.venues.helpers({
    venuesNumber: function () {
        return this.variables.venuesData.get();
    },
    showVenuesCount: function() {
        return this.variables.venuesData.get().length;
    }
});
