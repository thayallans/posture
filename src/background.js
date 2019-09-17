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

// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here
    
    ga('create', 'UA-148183683-1', 'auto'); // Our GA identifier
    ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
    ga('require', 'displayfeatures');
    ga('send', 'pageview', 'content.js'); // Specify the virtual path