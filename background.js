var toggle = false;
var status = 'off';
var the_tab_id = '';

function set_status() {
    toggle = !toggle;
    status = 'off';
    if(toggle) { status = 'on'; }
}

/* add local storing */

function toggle_extension(tab){
    // Set icon
    chrome.browserAction.setIcon({ path: status+'.png', tabId:tab.id });
    // Pass variable & execute script
    chrome.tabs.executeScript({ code: 'var extension_status = "'+status+'"' });
    chrome.tabs.executeScript({ file: 'content.js' });
    // Set the tab id
    the_tab_id = tab.id;
}

function my_listener(tabId, changeInfo, tab) {
    // If updated tab matches this one
    if (changeInfo.status == "complete" && tabId == the_tab_id && status == 'on') {
        toggle_extension(tab);
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    set_status();
    toggle_extension(tab);
});

chrome.tabs.onUpdated.addListener(my_listener); 

//next version should be save to LocalStore
