function performRegistration() {
    
    var username = $("#register-name").val();
    var password = $("#register-password").val();
    var email = $("register-email").val();
    
    var user = KiiUser.userWithEmailAddressAndUsername(email, username, password);

    user.register({
        success: function(theUser) {
            console.log("User registered!");
            console.log(theUser);
        },

        failure: function(theUser, errorString) {
            console.log("Error Registering: " + errorString);
        }
    });
}
$(document).ready(function() {
    // initialize the Kii SDK!
    Kii.initializeWithSite("3548f996", "245e2a0d275ff86e28e3eb0c2e4eb989", KiiSite.US);
    // bind clicks to our login/sign up methods
    $("#register-button").click(performRegistration);
});