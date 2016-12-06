angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('menu.home', {
    url: '/home',
    views: {
      'side_menu': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.courses', {
    url: '/courses',
    views: {
      'side_menu': {
        templateUrl: 'templates/courses.html',
        controller: 'coursesCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side_menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.settings', {
    url: '/settings',
    views: {
      'side_menu': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.events', {
    url: '/eventsnearby',
    views: {
      'side_menu': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })

    .state('menu.profile', {
      url: '/profile',
      views: {
        'side_menu': {
          templateUrl: 'templates/Profile.html',
          controller: 'profileCtrl'
        }
      }
    })


    .state('register', {
    url: '/signup',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })


   .state('menu.video', {
    url: '/video',
    views: {
      'side_menu': {
        templateUrl: 'templates/video.html',
        controller: 'homeCtrl'
      }
    }
  })

    .state('menu.wiki', {
      url: '/wiki',
      views: {
        'side_menu': {
          templateUrl: 'templates/wiki.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('changeusername', {
      url: '/changeusername',
      templateUrl: 'templates/changeUsername.html',
      controller: 'changeusernameCtlr'
    })
    .state('changeemail', {
      url: '/changeemail',
      templateUrl: 'templates/changeEmail.html',
      controller: 'changeemailCtlr'
    })
    .state('changepassword', {
      url: '/changepassword',
      templateUrl: 'templates/changePassword.html',
      controller: 'changepasswordCtlr'
    })

    .state('menu.feedback', {
    url: '/feedback',
    views: {
      'side_menu': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })



$urlRouterProvider.otherwise('/login')



});
