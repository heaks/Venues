Router.configure({
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    loadingTemplate: "loading"
});

Router.route("/", {
    name: "main",
    waitOn: function() {
        return Meteor.subscribe("queries");
    }
})
;