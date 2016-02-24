Template.query.events({
    "click .delete" : function() {
        Meteor.call("deleteQuery", this._id);
    }
});

Template.query.helpers({
    showDate: function()
    {
        return (('0' + this.date.getDate()).slice(-2) + " " + ("0" + (this.date.getMonth() + 1)).slice(-2) + " " +
        this.date.getFullYear() + " " + this.date.getHours()+ ":" +("0" + this.date.getMinutes()).slice(-2) + ":" +
        ("0" + this.date.getSeconds()).slice(-2)).toString();
    }
});