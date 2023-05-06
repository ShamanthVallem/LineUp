i = 0
chrome.runtime.onInstalled.addListener(function(){
    console.log("Extension Installed Successfully");
    i++;
    console.log(i);
})