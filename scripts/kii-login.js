function performLogin() {
    
    var email = $("login-email").val();
    var password = $("#login-password").val();
    
    KiiUser.authenticate(email, password, {
        success: function(theUser) {
            console.log("User authenticated!");
            console.log(theUser);
        },

        failure: function(theUser, errorString) {
            console.log("Error Authenticating: " + errorString);
        }
    });
}
$(document).ready(function() {
    // initialize the Kii SDK!
    Kii.initializeWithSite("3548f996", "245e2a0d275ff86e28e3eb0c2e4eb989", KiiSite.US);
    // bind clicks to our login/sign up methods
    $("#login-button").click(performLogin);
});