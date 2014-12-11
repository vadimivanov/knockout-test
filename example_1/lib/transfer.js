(function(win){
    win.transfer={};

    transfer.save = function(msg,data){
        console.log("transfer save",msg,data);
        localStorage.setItem(msg, JSON.stringify(data));
    };
    transfer.load = function(data){
        var localLoad = localStorage.getItem(data),
            parc = {};
            parc = JSON.parse(localLoad) ;
       return parc;
    };

})(this);