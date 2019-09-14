$(document).ready(function() {
    var $div = $('<div />').appendTo('body');
    $div.attr('id', 'videoContainer');
    console.log(document.body);
});

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