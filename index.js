// ViewModel Class
var ViewModel = function() {
    var self = this; // Scope Trick

    /**
     * Observables
     */
    self.username   = ko.observable('');
    self.password   = ko.observable('');
    self.confirm    = ko.observable('');

    /**
     * Computed Observables
     */
    self.passwordStength = ko.computed(function() {
        if(self.password().length <= 0) return 0;
        return Math.round(checkPassword(self.password()) / 100 * 100);
    });

    self.passwordColor = ko.computed(function(){
        var str = self.passwordStength();
        if(str == 0) return "black";
        if(str > 80) return "green";
        if(str > 50) return "#B0C705";
        if(str > 25) return "#FFC23F";
        return "red";
    });

    self.isConfirmed  = ko.computed(function(){
        if(!self.password().length) return false;
        return self.password() == self.confirm()
    });

    self.isValidForm = ko.computed(function(){
        if(self.username().length < 3)  return false;
        if(self.passwordStength() < 50) return false;
        if(!self.isConfirmed())         return false;
        return true;
    });

    /**
     * Actions
     */
    self.save = function() {
        alert(self.isValidForm() ? 'Saved!' : 'Form is invalid!');
    };

};

// Instantiate the ViewModel
window.view_model = new ViewModel();

// Away we go...
ko.applyBindings(view_model);