$(function() {
    console.log("Started..");
    
    ko.applyBindings(new DeviceViewModel());
});

function Device(data) {
    var self = this;
    self.dev_id = ko.observable(data.dev_id);
    self.nickname = ko.observable(data.nickname);
    self.schedule = ko.observable(data.schedule);
    self.max_power_usage = ko.observable(data.max_power_usage);
    self.max_cost = ko.observable(data.max_cost);
    self.user_set_state = ko.observable(data.user_set_state);
    self.IsChecked = ko.computed({
	read: function() {
	    if (+self.user_set_state() == "2") {
		return getStateFromSchedule(self);
	    } else if (+self.user_set_state() == "1") {
		return true;
	    } else {
		self.user_set_state("0");
		return false;
	    }
	},
	write: function(val) {
	    self.user_set_state((val)?"1":"0")
	}
    });
    self.use_schedule = ko.computed({
	read: function() {
	    return (+self.user_set_state() >= 2);
	},
	write: function(val) {
	    if (val) {
		self.user_set_state("2");
	    } else {
		var on = getStateFromSchedule(self);
		self.user_set_state(on?"1":"0");
	    }
	}
    }); 
    self.nickname.subscribe(function() { self.onChange(); });
    self.max_cost.subscribe(function() { self.onChange(); });
    self.user_set_state.subscribe(function() { self.onChange(); });
    self.use_schedule.subscribe(function() { self.onChange(); });
}
Device.prototype = {
    onChange: function() { 
	console.log("Postback: " + ko.toJSON(this)); 
	updateDevice(this);
    }
}

function DeviceViewModel() {
    var self = this;

    self.devices = ko.observableArray(the_devices);

    self.refresh = function() {
	console.log("user_id is " + user_id);
	$.ajax({
	    url: "http://yoursmartsocket.com/SmartSocket/php_scripts/getDevices.php",
	    dataType: "json",
	    context: this,
	    data: {'user_id': user_id}
	}).done(function(resp) {
	    console.log("ajax returned!");
	    self.devices(resp);
	});
    };
}

function getStateFromSchedule(device) {
    console.log('schedule says: false');
    //TODO: get status by reading schedule and calculating
    return false;
}

function updateDevice(device) {
    data = JSON.parse(ko.toJSON(device));
    console.log("GETing!  dev_id is " + data.dev_id);
	$.ajax({
	    type: "GET",
	    url: "http://yoursmartsocket.com/SmartSocket/php_scripts/updateDevices.php",
	    dataType: "json",
	    context: this,
	    data: data
	}).done(function(resp) {
	    console.log("update ajax returned! resp = [" + resp + "]");
	});
    };