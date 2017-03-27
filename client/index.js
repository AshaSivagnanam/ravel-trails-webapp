$(function(){
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '156830984786265',
            xfbml      : true,
            version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
        FB.getLoginStatus(function(response){
            if(response.status === 'connected') {
                console.log("User logged in");
                window.location.href = "/search.html";
            }
            else if(response.status === 'not_authorized') {
                console.log("User not authorized app");
            }
            else {
                console.log("User not logged in");
            }
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    function login() {
        FB.login(function(response) {
            if(response.authResponse) {
                console.log("User authorized app");
                FB.api('/me', function(currentUser){
                    console.log(currentUser); // id, name
                    localStorage.setItem('user', {'name' : currentUser.name, 'id' : currentUser.id});
                    test();
/*                            FB.api('/me/friends/1104227586356450', function(res) {
                        console.log(res);
                    });
                    var url = '/me/friends';
                    FB.api(url, function(res){
                        console.log("friends");
                        console.log(res);
                    });*/
                    

                });
                //window.location.href = "/search.html";
            }
            console.log(response);
        });
    }
    function setUser(currentUser) {
        var user = {'name' : currentUser.name, 'id' : currentUser.id};
/*        chrome.storage.local.set({ 'user' : user }, function() {
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });*/                
    }
    function test() {
        alert( "username = " + localStorage.getItem("user"));
    }
    

});
