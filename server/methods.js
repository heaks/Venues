Meteor.methods({
    addQuery : function(queryAttributes) {
        _.extend(queryAttributes, {
            owner: Meteor.userId(),
            date: new Date()
        });
        console.log(queryAttributes);
        Queries.insert(queryAttributes);
    },
    deleteQuery : function(queryId){
        Queries.remove(queryId);
    }
});