
var brightpearlOrderUrl = ["https://euw1.brightpearl.com/*/patt-op.php?scode=invoice*"];
chrome.contextMenus.create({
	"title" : "Copy From Brightpearl Order",
	"type" : "normal",
	"documentUrlPatterns":brightpearlOrderUrl,
	"onclick": copyBrightpearlOrder
});

var tollUrl = ["https://online.toll.com.au/trackandtrace/newConnoteEntry.do"];
chrome.contextMenus.create({
	"title" : "Paste To Toll",
	"type" : "normal",
	"documentUrlPatterns":tollUrl,
	"onclick":pasteToll
});
        
var brightpearlExistingCustomerUrl = ["https://euw1.brightpearl.com/*/patt-op.php?scode=contact&cID=*"];
chrome.contextMenus.create({
	"title" : "Copy From Brightpearl Customer",
	"type" : "normal",
	"documentUrlPatterns":brightpearlExistingCustomerUrl,
	"onclick": copyBrightpearlCustomer
});

var brightpearlNewCustomerUrl = ["https://euw1.brightpearl.com/*/patt-op.php?scode=contact&type=customer"];
chrome.contextMenus.create({
	"title" : "Paste Brightpearl Customer",
	"type" : "normal",
	"documentUrlPatterns":brightpearlNewCustomerUrl,
	"onclick": pasteBrightpearlCustomer
});

var brightpearlCustomerUrl = ["https://euw1.brightpearl.com/*/patt-op.php?scode=contact*"];
chrome.contextMenus.create({
	"title" : "Search Address 1 in Google Maps",
	"type" : "normal",
	"documentUrlPatterns":brightpearlCustomerUrl,
	"onclick": searchBrightpearlAddress
});

function copyBrightpearlOrder(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {method: "copyBrightpearlOrder"},function(response){
			localStorage.setItem('CustomerFields',response.data);
		});
});
}

function pasteToll(){
	var customerData = localStorage.getItem('CustomerFields');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {method: "pasteToll",data:customerData},function(response){

		
		});
	});
	
}

function copyBrightpearlCustomer(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {method: "copyBrightpearlCustomer"},function(response){
			localStorage.setItem('CustomerFieldsCustomer',response.data);
		});
});
}

function pasteBrightpearlCustomer(){
	var customerData = localStorage.getItem('CustomerFieldsCustomer');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {method: "pasteBrightpearlCustomer",data:customerData},function(response){


		});
	});
}
	
function searchBrightpearlAddress(){

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {method: "findAddressInGoogle"},function(response){
		});
	});
}
