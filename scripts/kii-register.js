function performRegistration() {
    // show a loading animation
    $.mobile.showPageLoadingMsg();  
    
    // get the user credentials from the UI
    var username = $("#register-name").val();
    var password = $("#register-password").val();
    
    // create the user
    try {
        var user = KiiUser.userWithUsername(username, password);

        // perform the asynchronous registration, with callbacks defined
        user.register({
        
            // callback for successful registration
            success: function(theAuthedUser) {
            
                // show the list of objects
                $.mobile.changePage("list.html");
                
                // hide the loading animation
                $.mobile.hidePageLoadingMsg();  
                
                // tell the console
                Kii.logger("User registered: " + user);
            },
            
            // callback for failed registration
            failure: function(theUser, anErrorString) {

                // hide the loading animation
                $.mobile.hidePageLoadingMsg();  
                
                // tell the user
                alert("Unable to register: " + anErrorString);
                
                // tell the console
                Kii.logger("Unable to register user: " + anErrorString);
            }
        });

    } catch(e) {

        // hide the loading animation
        $.mobile.hidePageLoadingMsg();  
        
        // tell the user
        alert("Unable to register: " + e.message);
        
        // tell the console
        Kii.logger("Unable to register user: " + e.message);
    }

}
$(document).ready(function() {
    // initialize the Kii SDK!
    Kii.initializeWithSite("3548f996", "245e2a0d275ff86e28e3eb0c2e4eb989", KiiSite.US);
    // bind clicks to our login/sign up methods
    $("#register-button").click(performRegistration);
});