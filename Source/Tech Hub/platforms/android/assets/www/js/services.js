angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

  .service('UpdateService', function($q, $http) {
    return {

      updateUser:function(data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
          method: 'PUT' ,
          url: 'https://mlab.com/databases/firstdb/collections/ASEProject/'+data.id+'?apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
          data: JSON.stringify( { "$set" : { "firstname": data.firstname,
            "lastname": data.lastname,
            "username": data.username,
            "password": data.password } } ),

          contentType: "application/json"
        }).success(function (data) {
        })
        deferred.resolve('Welcome !');


        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;

      }

    }
  })

  .service('DeleteService', function($q, $http) {
    return {

      deleteUser:function(name) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/firstdb/collections/ASEProject?q={username:\''+name+'\'}&apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
          contentType:"application/json"

        }).success(function(data){
          $http({
            method: 'DELETE' ,
            url: 'https://api.mongolab.com/api/1/databases/firstdb/collections/ASEProject/'+data[0]._id.$oid+'?apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',

          }).success(function (data) {
          })
          deferred.resolve('Welcome ' + data[0].username + '!');


        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;

      }

    }
  })
  .service('LoginService', function($q, $http) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/firstdb/collections/ASEProject?q={username:\''+name+'\'}&apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
          contentType:"application/json"

        }).success(function(data){
          if (name == data[0].username && pw == data[0].password) {

            console.log(data[0]);

            localStorage.setItem("firstname", data[0].firstname);
            localStorage.setItem("lastname", data[0].lastname);
            localStorage.setItem("username", data[0].username);
            localStorage.setItem("password", data[0].password);
            localStorage.setItem("email",data[0].email);
            localStorage.setItem("id", data[0]._id.$oid);
            deferred.resolve('Welcome ' + data[0].username + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})

.service('RegisterService', function($q, $http) {
  return {
    RegisterUser: function(fname, lname,email,username, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/firstdb/collections/ASEProject?apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
        data: JSON.stringify({
          firstname: fname,
          lastname: lname,
          email:email,
          username: username,
          password: password,
        }),
        contentType:"application/json"

      }).success(function(data){

        deferred.resolve('Welcome!');
        /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
         deferred.resolve('Welcome ' + data[0].username + '!');
         } else {
         deferred.reject('please fill all the fields');
         }
         */

      })
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;

    }
  }
})
  .service('EventService', function($q, $http) {
    return {
      showEvents: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/firstdb/collections/ASEProject?q={username:\''+name+'\'}&apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
          contentType:"application/json"

        }).success(function(data){
          if (name == data[0].username && pw == data[0].password) {
            deferred.resolve('Welcome ' + data[0].username + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})

;
