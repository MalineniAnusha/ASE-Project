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
      'side-menu21': {
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
      'side-menu21': {
        templateUrl: 'templates/courses.html',
        controller: 'coursesCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.settings', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.events', {
    url: '/eventsnearby',
    views: {
      'side-menu21': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })

    .state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu21': {
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
      'side-menu21': {
        templateUrl: 'templates/video.html',
        controller: 'videoCtrl'
      }
    }
  })

    .state('menu.wiki', {
      url: '/wiki',
      views: {
        'side-menu21': {
          templateUrl: 'templates/wiki.html',
          controller: 'wikiCtrl'
        }
      }
    })



    .state('menu.feedback', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/login')



});
