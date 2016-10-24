var app = angular.module('twitter');

app.controller('login', function ($scope, userSession, $location, $rootScope, $timeout, appbaseService, loginService, tweetService) {
    "use strict";
	
    // Hide *navbar* if no one is logged in
    $rootScope.hideNav();	
    $rootScope.feed = 'global';
	
	//User Login	
    $scope.login = function () {
      $scope.loading = true;
	  var user = $scope.userId;
	  var pass = $scope.password;
	  if((user == 'demo' || user == 'demo1' || user == 'demo2'|| user == 'demo3'|| user == 'demo4') && pass == 'demo') {
		 loginService.init($scope.afterLogin);
		 userSession.setUser($scope.userId.replace(/ /g, "_"));
	  } else {
		 $scope.loading = false; 
		 $scope.error = true;
	  }      
    }
    $scope.afterLogin = function(){
      $timeout(function(){
        userSession.initComplete = true;
        $scope.loading = false;
        $location.path('/home/global');
      });
    }	
  })


  .controller('navbar', function ($scope, userSession, $rootScope) {
    "use strict";
    $scope.gotoProfile = function (userId) {
      if (userId === undefined) { 
		userId = userSession.getUser(); 
	}
	$rootScope.gotoProfile(userId);
    };	
  })
  

  .controller('home', function ($scope, userSession, $rootScope, $routeParams, tweetService, appbaseService, $compile ) {
    "use strict";
	var tweetsArr = [];
	var retrievedData = localStorage.getItem('tweetsInfo');
	var tweetsArr = JSON.parse(retrievedData);
	$scope.listArr = [];
	$scope.listArr = tweetsArr;	
	
	
    // Check if the session is properly initiated,
    // i.e. the 'global' controller set the flag 'initComplete' in userSession.
    if (!userSession.initComplete) {
      if (!userSession.getUser()) {
        $rootScope.exit();
      } else {
        $rootScope.load();
      }
      return;
    }

    $rootScope.showNav();
    $rootScope.currentPerson = userSession.getUser();
    $rootScope.feed = $routeParams.feed === undefined ? 'global' : $routeParams.feed;	
	
    // add tweet.
    $scope.addTweet = function () {
		var tweetInfo = JSON.parse(localStorage.getItem('tweetsInfo')) || [];
		tweetInfo.push({name: userSession.getUser(), tweetMsg: $scope.msg, curDate: new Date()});
		localStorage.setItem('tweetsInfo', JSON.stringify(tweetInfo));	
		$compile($scope.listArr);
		$scope.msg = '';
    };
	

  })

  .controller('profile', function ($scope, userSession, $rootScope, $routeParams, tweetService, appbaseService ) {
    "use strict";
	
	function filterByName(obj) {
	  if (obj.name == userSession.getUser()){	
		return true;
	  } else {			
		return false;
	  }
	}	
	var myTweetsArr = [];
	$scope.myListArr = [];
	var myRetrievedData = localStorage.getItem('tweetsInfo');
	var myTweetsArr = JSON.parse(myRetrievedData);	
	var myArray = myTweetsArr.filter(filterByName);	
	$scope.myListArr = myArray;

	function countFollowing(obj) {
	  if (obj.followers == userSession.getUser()){	
		return true;
	  } else {			
		return false;
	  }
	}
	
	function countFollowers(obj) {
	  if (obj.following == userSession.getUser()){	
		return true;
	  } else {			
		return false;
	  }
	}
	
	var followArr = [];
	var retrievedFollowData = localStorage.getItem('followInfo');
	var followArr = JSON.parse(retrievedFollowData);
	if(followArr != null){
		var myfollowingArray = followArr.filter(countFollowing);
	
		var myfollowersArray = followArr.filter(countFollowers);
		
		$scope.listFollowing = myfollowingArray.length;
		$scope.listFollowingArr = myfollowingArray;
		
		$scope.listFollowers = myfollowersArray.length;
		$scope.listFollowersArr = myfollowersArray;
	} else {
		$scope.listFollowing = 0;
		$scope.listFollowers = 0;
	}
	
    var notLoggedIn;
    if (!userSession.initComplete) {
      notLoggedIn = true;
    }
    !notLoggedIn && $rootScope.showNav();

    // Get the userId from route params.
    var userId = $routeParams.userId;
    $scope.userId = $routeParams.userId;
    $rootScope.currentPerson = userId;
    $rootScope.feed = 'personal';
    // Check whether this profile is of the logged in user.
    $scope.isMe = userSession.getUser() === userId;
    $scope.userName = $routeParams.userId;
    
    $scope.gotoProfile = $rootScope.gotoProfile;
    $scope.follow = function (userId) {
		var followsInfo = JSON.parse(localStorage.getItem('followInfo')) || [];
		followsInfo.push({followers: userSession.getUser(), following: userId});
		localStorage.setItem('followInfo', JSON.stringify(followsInfo));	  
		$rootScope.isBeingFollowed = true;
    };
    $scope.unFollow = function (userId) { 
      $rootScope.isBeingFollowed = false;
    };
    $scope.addTweet = function () {	  
		var tweetInfo = JSON.parse(localStorage.getItem('tweetsInfo')) || [];
		tweetInfo.push({name: userSession.getUser(), tweetMsg: $scope.msg, curDate: new Date()});
		localStorage.setItem('tweetsInfo', JSON.stringify(tweetInfo));	
		$scope.msg = '';
    };
    $rootScope.isBeingFollowed = false;
    $scope.isReady = false;
  })
  