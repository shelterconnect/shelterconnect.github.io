"use strict";
var apiBase = "https://shelterconnect.ngrok.com";
apiBase = "https://shelterconnect.ngrok.com";
var userRoles = {
    "public": void 0,
    shelter: 1,
    restaurant: 2,
    church: 3
};
angular.module("frontendApp", ["ngCookies", "ngResource", "ngSanitize", "ngRoute", "mm.foundation", "google-maps", "ngGeolocation"]).config(["$routeProvider", "$httpProvider", function(a, b) {
    var c = userRoles;
    a.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        access: c.public
    }).when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        access: c.public
    }).when("/register", {
        templateUrl: "views/register.html",
        controller: "RegisterCtrl"
    }).when("/team", {
        templateUrl: "views/team.html",
        controller: "TeamCtrl"
    }).when("/contact", {
        templateUrl: "views/contact.html",
        controller: "ContactCtrl"
    }).when("/shelters", {
        templateUrl: "views/shelters.html",
        controller: "SheltersCtrl"
    }).when("/shelters/:id", {
        templateUrl: "views/shelter.html",
        controller: "ShelterCtrl"
    }).otherwise({
        redirectTo: "/"
    }), b.interceptors.push("authInterceptor")
}]), angular.module("frontendApp").controller("MainCtrl", ["$scope", "Organization", "Auth", function(a, b, c) {
    a.map = {
        center: {
            latitude: 33.9587073,
            longitude: -118.2634171
        },
        zoom: 10,
        orgs: b.query()
    }, a.loggedIn = c.loggedIn
}]), angular.module("frontendApp").controller("NavCtrl", ["$scope", "$location", "Auth", function(a, b, c) {
    a.isActive = function(a) {
        return a === b.path()
    }, a.loggedIn = c.loggedIn, a.logout = c.logout
}]), angular.module("frontendApp").controller("LoginCtrl", ["$scope", "$location", "Auth", function(a, b, c) {
    a.map = {
        center: {
            latitude: 39,
            longitude: -101
        },
        zoom: 4
    }, a.user = {
        email: "",
        password: ""
    }, a.message = "", a.submit = function() {
        c.login(a.user, function() {
            a.message = "Login successful!", b.path("/"), b.path("/")
        }, function() {
            a.message = "Invalid email or password."
        })
    }
}]), angular.module("frontendApp").controller("RegisterCtrl", ["$scope", "$location", "Auth", function(a, b, c) {
    a.map = {
        center: {
            latitude: 39,
            longitude: -101
        },
        zoom: 4
    }, a.user = {}, a.message = "", a.types = ["Shelter", "Restaurant", "Volunteer Group"], a.submit = function() {
        c.register(a.user, function() {
            a.message = "Account created successfully.", b.path("/login")
        }, function() {
            a.message = "Error creating account."
        })
    }
}]), angular.module("frontendApp").controller("TeamCtrl", ["$scope", "$location", "Auth", function(a, b, c) {
    a.map = {
        center: {
            latitude: 39,
            longitude: -101
        },
        zoom: 4
    }
}]), angular.module("frontendApp").controller("ContactCtrl", ["$scope", "$location", "Auth", function(a, b, c) {
    a.map = {
        center: {
            latitude: 39,
            longitude: -101
        },
        zoom: 4
    }
}]), angular.module("frontendApp").controller("AuthFormMapCtrl", ["$scope", function(a) {
    a.map = {
        center: {
            latitude: 34.0141392,
            longitude: -118.2866044
        },
        zoom: 12
    }
}]);
var apiBase, userRoles;
angular.module("frontendApp").factory("Auth", ["$rootScope", "$cookieStore", "$http", function(a, b, c) {
    var d = b.get("token");
    return {
        register: function(a, b, d) {
            c.post(apiBase + "/organizations", a).success(b).error(d)
        },
        login: function(a, e, f) {
            c.post(apiBase + "/organizations/authenticate", a).success(function(a) {
                d = a.token, b.put("token", a.token), e(a)
            }).error(f)
        },
        logout: function() {
            d = null, b.remove("token")
        },
        userRoles: userRoles,
        token: d,
        loggedIn: function() {
            return null !== d && void 0 !== d
        }
    }
}]);
var apiBase;
angular.module("frontendApp").factory("Organization", ["$resource", function(a) {
    return a(apiBase + "/organizations/:id", {
        id: "@id"
    }, {
        me: {
            method: "GET",
            params: {
                id: "me"
            }
        }
    })
}]), angular.module("frontendApp").controller("ShelterCtrl", ["$scope", "$routeParams", "Shelter", function(a, b, c) {
    a.shelter = c.get({
        id: b.id
    })
}]), angular.module("frontendApp").controller("SheltersCtrl", ["$scope", "Shelter", function(a, b) {
    a.shelters = b.query()
}]);
var apiBase;
angular.module("frontendApp").factory("Shelter", ["$resource", function(a) {
    return a(apiBase + "/shelters/:id", {
        id: "@id"
    })
}]), angular.module("frontendApp").controller("UserHomeCtrl", ["$scope", "Organization", function(a, b) {
    a.me = b.me(), a.map = {
        center: {
            latitude: 39,
            longitude: -101
        },
        zoom: 10
    }
}]), angular.module("frontendApp").factory("authInterceptor", ["$q", "$cookieStore", function(a, b) {
    return {
        request: function(a) {
            return a.headers = a.headers || {}, b.get("token") && (a.headers.Authorization = "Bearer " + b.get("token")), a
        },
        response: function(b) {
            return b || a.when(b)
        }
    }
}]);