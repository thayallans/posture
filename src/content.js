/* 
=================
= content.js =
=================
*/

// When the page is ready adds a videoContainer which displays the videoStream + eye tracking
$(document).ready(function() {

    chrome.storage.local.get('number', function(data){
        var current = data.number
        if (current == 1){
            stop()
        }
        else {
            start()
        }
    });

    var $div = $('<div />').appendTo('body');
    $div.attr('id', 'videoContainer');
    console.log(document.body);
});

// Adds a chrome listener to start or stop the extension based off of when the click was registed in background.js and passed to here.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action_1") {
            console.log("sticky");
            stop()
        }
        else {
            console.log("grind");
            start()            
        }
    }
);