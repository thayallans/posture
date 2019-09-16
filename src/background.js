/* 
=================
= background.js =
=================
*/

// Adds a chrome listener when extension is installed to set application to off.
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ number: 0 }, function () {
        console.log('off');
    });
});

// Anonymous function called when the user clicks on the browserAction to set the icon for the extension.
const updateIcon = () => {
    chrome.storage.sync.get('number', function (data) {
        var current = data.number;
        if (current == 1) {
            chrome.browserAction.setIcon({ path: 'img/piedPiperGreen.png' });
            current = 0;
            console.log(document.body);

            console.log("off");
        }
        else {
            chrome.browserAction.setIcon({ path: 'img/PiedPiperRed.png' });
            current = 1;
            console.log("on");
        }
        chrome.storage.sync.set({ number: current }, function () {
            console.log('The number is set to ' + current);
        });
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
                console.log("off");
            }
            else {
                chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action_2" });
                console.log("on");
            }
        });
        
    });
}

// Anonymous function called when the user clicks on the browserAction to call 2 subfunctions that change the icon and send info to current tab
const chainActions = (tab) => {
    sent(tab)
    updateIcon()
}


// Add a chrome listener when the browserAction is clicked to run the function chainActions.
chrome.browserAction.onClicked.addListener(chainActions);
