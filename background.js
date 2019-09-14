// background.js



chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ number: 0 }, function () {
        console.log('off');
    });
});

// Called when the user clicks on the browser action.
const updateIcon = () => {
    chrome.storage.sync.get('number', function (data) {
        var current = data.number;
        if (current == 1) {
            chrome.browserAction.setIcon({ path: 'piedPiperGreen.png' });
            current = 0;
            console.log(document.body);

            console.log("off");
        }
        else {
            chrome.browserAction.setIcon({ path: 'PiedPiperRed.png' });
            current = 1;
            console.log("on");
        }
        chrome.storage.sync.set({ number: current }, function () {
            console.log('The number is set to ' + current);
        });
    });
}

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

const chainActions = (tab) => {
    sent(tab)
    updateIcon()
}

//chrome.browserAction.onClicked.addListener(updateIcon);
chrome.browserAction.onClicked.addListener(chainActions);

//updateIcon();

/*
chrome.browserAction.onClicked.addListener();
*/
