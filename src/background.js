/* 
=================
= background.js =
=================
*/

// Adds a chrome listener when extension is installed to set application to off.
chrome.runtime.onStartup.addListener(function () {
    chrome.storage.sync.set({ number:  0}, function () {
        console.log('off');
    });
});

// Anonymous function called when the user clicks on the browserAction to set the icon for the extension.
const updateIcon = () => {
    chrome.storage.sync.get('number', function (data) {
        var current = data.number; // If current == 1 camera is on but will turn off
        console.log(current);
        if (current == 1) {
            console.log(current);
            chrome.browserAction.setIcon({ path: 'img/red.png' });
            console.log("off");
        }
        else {
            console.log(current);
            chrome.browserAction.setIcon({ path: 'img/green.png' });
            console.log("on");
        }
        
    });
}


// Anonymous function called when the user clicks on the browserAction to send information to content.js to act on current tab.
const sent = (tab) => {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.storage.sync.get('number', function (data) {
            var current = data.number;
            if (current == 1) {
                chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action_1" });
                current = 0;
                console.log(current);
            }
            else {
                chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action_2" });
                console.log("on");
                current = 1;
            }
            chrome.storage.sync.set({ number: current}, function () {
                console.log('The number is set to ' + current);
            });
        });
    });
    
}

// Anonymous function called when the user clicks on the browserAction to call 2 subfunctions that change the icon and send info to current tab
const chainActions = (tab) => {
    updateIcon()
    sent(tab)
}


// Add a chrome listener when the browserAction is clicked to run the function chainActions.
chrome.browserAction.onClicked.addListener(chainActions);
