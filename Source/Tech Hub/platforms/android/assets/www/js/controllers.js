angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

/*

  $(document).ready(function(){
    $("#search").keypress(function(e){
      if(e.keyCode === 13){
        var search = $("#search").val();
        var url = "https://en.wikipedia.org/w/api.php";
        $.ajax({
          url: url,
          data: {
            action: 'opensearch',
            search: search,
            format: 'json'
          },
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp"
        })
          .done(function(data, status, jqXHR) {
            $("#search-result").html();
            for(i=0;i<data[1].length;i++){
              $("#search-result").prepend("<div><div class='docs'><a href="+data[3][i]+"><h2>"+data[1][i]+"</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
            }
          });
      }
    })
    $("#button").on("click",function(){
      $("#c1").fadeToggle();
    });
    $("#submit").on("click", function(event) {
      event.preventDefault();
      var search = $("#user-input").val();
      var url = "https://en.wikipedia.org/w/api.php";
      $.ajax({
        url: url,
        data: {
          action: 'opensearch',
          search: search,
          format: 'json'
        },
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp"
      })
        .done(function(data, status, jqXHR) {
          $("#search-result").html();
          for(i=0;i<data[1].length;i++){
            $("#search-result").prepend("<div><div class='docs'><a href="+data[3][i]+"><h2>"+data[1][i]+"</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
          }
        });
    });
    $('#reset').click(event, function(){
      event.preventDefault();
      $('#search-results').empty();
      $('#search-result').empty();
    });
  });

*/
}])

.controller('loginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function(username) {

    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
      $state.go('menu.home');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });

  }
  $scope.FBlogin= function () {

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1796618383953118',
                cookie     : true,  // enable cookies to allow the server to access
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.5' // use graph api version 2.5
            });

            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
                    $state.go('menu.home')
                      });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });

            FB.getLoginStatus(function(response) {
                console.log(response.status);
            });
        };
    }

})


.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
  .controller('registerCtrl', function($scope, RegisterService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.register = function(userdata){

      RegisterService.RegisterUser($scope.data.firstname, $scope.data.lastname,$scope.data.email,$scope.data.username, $scope.data.password ).success(function(data) {
        $state.go('login');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })




.controller('videoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  var nextPageToken, prevPageToken;
  $('#controls').hide();

  function clearEntry(){
    $('#user-input').val('').focus();
  }

  function entryList (newEntry){
    var allHtml;
    allHtml += newEntry+'<hr>';
    $('#search-results').prepend(allHtml);
    nextPageToken = newEntry.result.nextPageToken;
    prevPageToken = newEntry.result.prevPageToken;
    $('#controls').fadeIn(1000);

  }

  function nextPage() {
    requestVideoPlaylist(playlistId, nextPageToken);
  }

// Retrieve the previous page of videos in the playlist.
  function previousPage() {
    requestVideoPlaylist(playlistId, prevPageToken);
  }

  function showResults(results){
    //console.log('show');
    var html=' ';
    $.each(results, function(index, value){

      var result = results[index];
      var position = index+1;
      if (result.id.kind == 'youtube#channel'){
        var url = 'https://www.youtube.com/channel/'+result.id.channelId;
      }
      else {
        var url = 'https://www.youtube.com/watch?v='+result.id.videoId;
      }

      var title = result.snippet.title;
      var thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+result.snippet.thumbnails.high.url+')"></div></a>';

      html += '<div class="docs"><h3>'+ position +'. '+title+'</h3>'+thumb+'<p>'+result.snippet.description+'</p></div>';



    });
    entryList(html);
    clearEntry();

  }



  function getRequest(searchTerm) {
    console.log('get');
    var params = {
      // s: searchTerm,
      r: 'json',
      q: searchTerm,
      part: 'snippet',
      order: 'viewCount',
      startIndex: 1,
      pagetoken: 'CAoQAA',
      maxResults: 10,
      key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'

    };
    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function(data){

      showResults(data.items);
    });
  }

  $(function() {
    console.log('start');
    clearEntry();
    $('#searchVideo').submit(function(event){
      event.preventDefault();
      var searchTerm = $('#user-input').val();
      getRequest(searchTerm);
    });




    $('#reset').click(event, function(){
      event.preventDefault();
      $('#search-results').empty();
    });
  });

}])


  .controller('wikiCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

      $(document).ready(function() {
        $("#search").keypress(function (e) {
          if (e.keyCode === 13) {
            var search = $("#search").val();
            var url = "https://en.wikipedia.org/w/api.php";
            $.ajax({
              url: url,
              data: {
                action: 'opensearch',
                search: search,
                format: 'json'
              },
              type: "GET",
              contentType: "application/json; charset=utf-8",
              dataType: "jsonp"
            })
              .done(function (data, status, jqXHR) {
                $("#search-result").html();
                for (i = 0; i < data[1].length; i++) {
                  $("#search-result").prepend("<div><div class='docs'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
                }
              });
          }
        })
        $("#button").on("click", function () {
          $("#c1").fadeToggle();
        });
        $("#submitWiki").on("click", function (event) {
          event.preventDefault();
          var search = $("#search").val();
          var url = "https://en.wikipedia.org/w/api.php";
          $.ajax({
            url: url,
            data: {
              action: 'opensearch',
              search: search,
              format: 'json'
            },
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp"
          })
            .done(function (data, status, jqXHR) {
              $("#search-result").html();
              for (i = 0; i < data[1].length; i++) {
                $("#search-result").prepend("<div><div class='docs'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
              }
            });
        });
      });

    }])



  .controller('feedbackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

  .controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller('changeusernameCtlr', function($scope, DeleteService, UpdateService,$ionicPopup, $state) {
    $scope.go = function () {
      $state.go('changeusername');
    } // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    $scope.init = function () {
      $scope.data = {
        firstname: localStorage.firstname,
        lastname: localStorage.lastname,
        username: localStorage.username,
        password: localStorage.password,
        email: localStorage.email,
        id: localStorage.id
      };
    }
  })

  .controller('changepasswordCtlr', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('changeemailCtlr', function($scope, DeleteService, UpdateService,$ionicPopup, $state) {
    $scope.go = function () {
      $state.go('changeusername');
    } // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    $scope.init = function () {
      $scope.data = {
        firstname: localStorage.firstname,
        lastname: localStorage.lastname,
        username: localStorage.username,
        password: localStorage.password,
        email: localStorage.email,
        id: localStorage.id
      };
    }
  })

  .controller('eventsCtrl', function($scope, $ionicPopup, $state) {
    $scope.data = {};

    $scope.findevents = function(values){
      l=$scope.data.city
      e="technology"
      var oArgs = {
        app_key: "rqJNStmNMPNtvngf",
        q: e,
        where: l,
        page_size: 10,
        sort_order: "popularity",
        date:"This week",
      };
      var content = '';
      EVDB.API.call("/events/search", oArgs, function(oData) {
        console.log(oData)
        //Get the title for each item
        for (var i = 0; i < oData.events.event.length;i++) {
          content +=
            '<div class="box"><a href=' +
            oData.events.event[i].url + '>' +
            oData.events.event[i].title + '</a>' +
            " at the " + oData.events.event[i].venue_name +
            " Start Date and Time: " + oData.events.event[i].start_time

            + '</div>';
        }
        // Show Data on page
        $("#ListEvents").html(content);
      });
    }
  })

//   .controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
//     function ($scope, $stateParams) {
//
//
//     }])

  .controller('profileCtrl', function($scope, DeleteService, UpdateService,$ionicPopup, $state) {
    $scope.go= function () {
      $state.go('menu.profile');
    }
    $scope.init = function() {
      $scope.data = { firstname: localStorage.firstname,
        lastname: localStorage.lastname,
        username: localStorage.username,
        password: localStorage.password,
        email: localStorage.email,
        id:localStorage.id
      };
    }
    $scope.delete =function()
    {
      DeleteService.deleteUser(localStorage.username).success(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Deleted!',
          template: 'Your account is deleted succesfully!'
        });
        $state.go('login');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
    $scope.update =function()
    {
      UpdateService.updateUser($scope.data).success(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Your account is deleted succesfully!'
        });
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Update failed!',
          template: 'Sorry! Failed to update'
        });
      });
    }
  })

.controller('coursesCtrl', function($scope, $http) {
  $scope.start=0;
  $scope.end=10;
  $scope.dropdown=false;



  $scope.pagination=function(val){
    console.log("val="+val);
    $scope.start=val*10-10;
    $scope.end=val*10;
    console.log($scope.start);
    console.log($scope.end);
  }

  $scope.fetch=function(event){
    $scope.dropdown=false;
    console.log($scope.searchval);
    if(event.which==13){
      $scope.fill($scope.searchval);
    }
    $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+$scope.searchval).success(function(response) {
      $scope.details = response;
      console.log(response);
    })
      .error(function(err){
        console.log(err)
      });


  }

  $scope.data = {};
  $scope.enterval=function(values){
    $scope.dropdown=true;

    var val=$scope.data.sub;

    $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+val+"&includes=instructorIds,partnerIds,photoUrl&fields=instructorIds,partnerIds,photoUrl").success(function(response) {
      $scope.courses = response;
      $scope.inst=[];
      $scope.prov=[];
      angular.forEach($scope.courses.elements, function ( item ) {
        var val=[];
        console.log("courses.....")
        angular.forEach(item.instructorIds, function ( item1 ) {
          $http.get("https://api.coursera.org/api/instructors.v1/"+item1).success(function(response){
            val.push(response.elements[0].fullName);

          })
            .error(function(err){

            });


        });
        var val2=[];
        angular.forEach(item.partnerIds, function ( item1 ) {

          $http.get("https://api.coursera.org/api/partners.v1/"+item1).success(function(response){
            val2.push(response.elements[0].name);
          })
            .error(function(err){

            });


        });

        $scope.prov.push(val2)
        $scope.inst.push(val);
      });
    })
      .error(function(err){
        console.log(err)
      });
    console.log($scope.inst);
  }


  $scope.fill=function(val){
    $scope.dropdown=true;
    console.log("working="+val);
    $scope.searchval=val;
    $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+val+"&includes=instructorIds,partnerIds,photoUrl&fields=instructorIds,partnerIds,photoUrl").success(function(response) {
      $scope.courses = response;
      $scope.inst=[];
      $scope.prov=[];
      angular.forEach($scope.courses.elements, function ( item ) {
        var val=[];
        console.log("courses.....")
        angular.forEach(item.instructorIds, function ( item1 ) {
          $http.get("https://api.coursera.org/api/instructors.v1/"+item1).success(function(response){
            val.push(response.elements[0].fullName);

          })
            .error(function(err){

            });


        });
        var val2=[];
        angular.forEach(item.partnerIds, function ( item1 ) {

          $http.get("https://api.coursera.org/api/partners.v1/"+item1).success(function(response){
            val2.push(response.elements[0].name);
          })
            .error(function(err){

            });


        });

        $scope.prov.push(val2)
        $scope.inst.push(val);
      });
    })
      .error(function(err){
        console.log(err)
      });
    console.log($scope.inst);
  }
})
  .filter('slice', function() {
    return function(arr, start, end) {
      return (arr || []).slice(start, end);
    };
  })

