function ViewModel() {
    var self = this;

    self.data = ko.observableArray();
};
var searchModel = Backbone.Model.extend();
var searchColl = Backbone.Collection.extend({
    model : searchModel
});
$.ajax({
    url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&location=leeds',
    dataType : "json",
    success : function(content, textStatus, jqXHR) {
//        searchColl.add(content.response.listings);
        viewModel.data(content.response.listings);
        console.log("---data---",viewModel.data(),searchColl);
    }
});
var viewModel = new ViewModel();

ko.applyBindings(viewModel);
