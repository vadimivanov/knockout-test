var viewModel = {
    detail: ko.observableArray(),
    results : ko.observableArray(),
    favorites: ko.observableArray(),
    query: ko.observable(''),
    showView: {
        Start: ko.observable(true),
        Result: ko.observable(false),
        Detail: ko.observable(false),
        Favorites: ko.observable(false)
    },
    startView: function(){
        console.log('start');
    },
    searchLoc : function() {
        var self = this;
        $.ajax({
            type : 'GET',
            url : "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&location="+viewModel.query(),
            success : function(content, textStatus, jqXHR) {
                viewModel.results(content.response.listings);
                viewModel.showView.Start(false);
                viewModel.showView.Result(true);
                console.log('results list',viewModel.results());
            }
        });
    },
    details : function(e){
        list.dispose();
        console.log('Checked arr',e);
        viewModel.detail.push(e);
        viewModel.showView.Detail(true);
        viewModel.showView.Result(false);
        console.log('GET details',viewModel.detail());
    },
    goToFavorite : function(e){
            viewModel.favorites.push(e);
            viewModel.showView.Detail(false);
            viewModel.showView.Favorites(true);
            console.log('info fav',viewModel.favorites());
    },
    goToBack: function(e){
        console.log('Check back');
        if(this.showView.Result() == true){
            this.showView.Start(true);
            this.showView.Detail(false);
            this.showView.Favorites(false);
            this.showView.Result(false);
        } else if(this.showView.Detail() == true){
            viewModel.detail.removeAll();
            this.showView.Start(false);
            this.showView.Detail(false);
            this.showView.Favorites(false);
            this.showView.Result(true);
        }  else if(this.showView.Favorites() == true){
            this.showView.Start(false);
            this.showView.Detail(true);
            this.showView.Favorites(false);
            this.showView.Result(false);
        }
    }
};
var list = viewModel.query.subscribe(viewModel.searchLoc);

ko.applyBindings(viewModel);

