console.log('injected');

/*document.addEventListener("mousedown", function(event){

    var brightpearl = getURLParameter('scode')==="invoice";
	var toll = window.location.pathname==="/trackandtrace/newConnoteEntry.do"; 

	if(brightpearl===false&&toll===false){
		chrome.extension.sendRequest({cmd: "delete_menu"});
	}else if (brightpearl===true){
	   chrome.extension.sendRequest({cmd: "create_menu_brightpearl"});
	}
	else if (toll===true){
	chrome.extension.sendRequest({cmd: "create_menu_toll"});
	}
	
}, true);
*/

chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		if(request.method=="copyBrightpearlOrder"){

			var copyFields = Copy_Order_Fields();
			var orderID = getURLParameter('oID');
			var storeFields = {};
			console.log(copyFields);
			copyFields.each(function(index){
				storeFields[this.id]=this.value;
			});
			storeFields['orderRef']=orderID;
			
			var messageToSend = JSON.stringify(storeFields);
			sendResponse({data:messageToSend});

			
		}
		else if(request.method=="pasteToll"){
			
			var customerData=JSON.parse(request.data);
			jQuery.when(updateData()).then(function(){
					jQuery('input[name=receiverSuburb]').focus();
					jQuery('select[name=serviceId]').focus();
					});
					
		function updateData(){
			jQuery('input[name=receiverContactName]').val(customerData.delivery_name);
			jQuery('input[name=receiverCompanyName]').val(customerData.delivery_company);
			jQuery('input[name=receiverAddress1]').val(customerData.delivery_street_address);
			jQuery('input[name=receiverAddress2]').val(customerData.delivery_suburb);
			jQuery('input[name=receiverSuburb]').val(customerData.delivery_city);
			jQuery('input[name=receiverPostCode]').val(customerData.delivery_postcode);
			jQuery('input[name=receiverEmailAddress]').val(customerData.delivery_email_address);
			if(customerData.delivery_telephone==""){
			jQuery('input[name=receiverContactNumber]').val(customerData.delivery_mobile);
			} else {
			jQuery('input[name=receiverContactNumber]').val(customerData.delivery_telephone);
			}
			jQuery('input[name=connoteRef]').val(customerData.orderRef);
		
		}
		}
		else if(request.method=="copyBrightpearlCustomer"){
			var copyFields = Copy_Customer_Fields();
			var storeFields = {}

			copyFields.each(function(index){
			storeFields[this.id]=this.value;
			})
			var messageToSend = JSON.stringify(storeFields);
			sendResponse({data:messageToSend});
		}
		else if(request.method=="pasteBrightpearlCustomer"){
			var retrieveFields = JSON.parse(request.data);
			for (field in retrieveFields) {
				jQuery("#"+field).val(retrieveFields[field]);
    
			}
		}
		else if(request.method=="findAddressInGoogle"){
			var url = "https://www.google.com/maps/search/";
			var searchFields = "";
			var addressFields = Address_Fields();

			addressFields.each(function(index){
				if (this.value!=="") {
					searchFields+=this.value.trim()+" ";    
				}
				
			})  


			searchFields=searchFields.replace(/\W+/g, " ");
			searchFields=searchFields.trim();
			searchFields=searchFields.replace(/ /g, "+");
			url=url+searchFields;
			window.open(url,'_blank');

			 function Address_Fields(){
				
				copyFields = jQuery('#street1,\
									#suburb1,\
									#city1,\
									#entry_state1,\
									#cust_postcode1,\
									#street2,\
									#suburb2,\
									#city2,\
									#entry_state2,\
									#cust_postcode2');
				return copyFields;
			}
    
		}

});

function Copy_Order_Fields(){
    
    copyFields = jQuery('#delivery_name,\
						#delivery_company,\
						#delivery_street_address,\
						#delivery_suburb,\
						#delivery_city,\
						#delivery_state,\
						#delivery_postcode,\
						#delivery_telephone,\
						#delivery_mobile,\
						#delivery_email_address');
    return copyFields;
}

function Copy_Customer_Fields(){
    
    copyFields = jQuery('#entry_company,\
                        #customers_website,\
                        #PCF_ABN,\
                        #PCF_ENTNAME,\
                        #PCF_ENTTYPE,\
                        #PCF_STATE,\
                        #PCF_POSTCODE,\
                        #PCF_TRADINGN,\
                        #PCF_STATUS,\
                        #customers_code,\
                        #customers_accounts_email,\
                        #customers_credit_limit,\
                        #customers_credit_terms,\
                        #street1,\
                        #suburb1,\
                        #city1,\
                        #entry_state1,\
                        #cust_postcode1,\
                        #street2,\
                        #suburb2,\
                        #city2,\
                        #entry_state2,\
                        #cust_postcode2');
    return copyFields;
}
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}