function AppViewModel() {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.department = ko.observable();
    self.manager = ko.observable();
    self.phoneNumber = ko.observable();

    self.addRecord = function (event) {
      var payload = {
        FName: self.firstName(),
        LName: self.lastName(),
        DepartmentId: self.department(),
        ManagerId: self.manager(),
        PhoneNumber: self.phoneNumber()
      };
      console.log(payload);
      $.ajax({
        url: 'http://localhost:8000/api/employees',
        async: true,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function () {
          alert('Successful');
        },
        error: function (err, x) {
          console.log(err)
          console.log(x)
        }
      });
    };
}

ko.applyBindings(new AppViewModel());