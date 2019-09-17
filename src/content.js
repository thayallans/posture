/* 
=================
= content.js =
=================
*/

// When the page is ready adds a videoContainer which displays the videoStream + eye tracking
$(window).ready(function() {
    chrome.storage.sync.get('number', function(data) {
        var $div = $('<div />').appendTo('body');
        $div.attr('id', 'videoContainer');
        console.log(document.body);

        var current = data.number
        console.log(current)
        //current == 1 --> camera is on
        if (current == 1) {
            
            console.log("start");
            start();
        }
    });

    
});

// Adds a chrome listener to start or stop the extension based off of when the click was registed in background.js and passed to here.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action_1") {
            console.log("Turning off");
            stop();
        }
        else {
            console.log("Turning on");
            start();            
        }
    }
);