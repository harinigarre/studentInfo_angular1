var app = angular.module("myApp", []);
app.factory('factoryservice', function() {
    var factory = {};
    factory.value = function(a) {
        return a
    }
    return factory;
});

app.service('service1', function(factoryservice) {
    this.serviceValue = function(b) {
        return factoryservice.value(b);
    }
});
app.controller("IndexController", ["$scope", "factoryservice","service1", "$http", function ($scope, fact, serv, $http){
    $scope.valTextModel = "Harini";
    $scope.studentModel= [];
    $scope.myVar = [];
    $scope.clickevent = function(){
        var temp = fact.value("Factory utilized");
        alert(temp);
    }
    $scope.edit = function(id){
         $scope.myVar[id] = !$scope.myVar[id];
       // console.log(id);
         //$scope.myVar = true;
    }
    $scope.save = function(id){
        var changedStudent = $scope.studentModel[id-1];
        $http({
            url: 'http://localhost:3000/Students/'+id,
            method: "PUT",
            data: changedStudent
        }).then(function (response) {
            // success
            console.log("Success put", response.data);
            alert("Successfully Saved");
        },
            function (response) { // optional
                // failed
                console.log("Failed put", response);
                alert("Save failed");
            });
    }
    // $scope.delete = function(id){
    //     $http({
    //         url: "http://localhost:3000/students/"+id,
    //         method: "DELETE",
    //     }).then(function(response){
    //         alert("Student info deleted");
    //     }, function(response){
    //         alert("Delete failed");
    //     });
    // }
    $scope.toggleAdd = false;
    $scope.newStudent =  {
        id: "",
        firstName: "",
        lastName: ""
    };
    $scope.AddStudent = function () {
        $scope.toggleAdd = true;
        $scope.newStudent.id = $scope.studentModel.length + 1;
        $scope.newStudent.firstName = "";
        $scope.newStudent.lastName = "";
    }
    $scope.SaveStudent = function(id){
        $http({
            url: "http://localhost:3000/students",
            method: "POST",
            data: $scope.newStudent
        }).then(function(response){
            alert("Successfully Saved");
        }, function(response){
            alert("Save failed");
        });
    }
    //on controller load this will be invoked.
    $http({
        url: "http://localhost:3000/students",
        method: "GET"
    }).then(function(response){
         for(var i=0; i< response.data.length; i++){
             $scope.studentModel.push(response.data[i]);
             $scope.myVar.push(false);
         }
        console.log(response.data);
    },function(response){
         console.log(response);
    });
}]);